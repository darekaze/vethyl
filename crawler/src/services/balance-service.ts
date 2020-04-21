import { Service, Inject } from 'typedi'
import { Logger } from 'pino'
import Big from 'big.js'
import _isArray from 'lodash/isArray'
import _mergeWith from 'lodash/mergeWith'
import {
  DbBlock,
  DbTransaction,
  UncleInfo,
  IBalanceState,
  IBalanceRecord,
  ExchangeList,
  BalanceInfo,
} from 'src/@types'

// Future: also trace internal txns and old transaction state
// https://ethereum.stackexchange.com/questions/1179/how-to-know-if-a-transaction-went-through-or-not-out-of-gas
// https://eips.ethereum.org/EIPS/eip-658
// https://eips.ethereum.org/EIPS/eip-609

@Service()
export class BalanceService {
  constructor(
    @Inject('BalanceStateModel') private balanceState: Models.BalanceStateModel,
    @Inject('BalanceRecordModel') private balanceRecord: Models.BalanceRecordModel,
    @Inject('logger') private logger: Logger,
  ) {
    Big.DP = 40 // Mark Decimal place to 40
  }

  public async updateBalances(
    block: DbBlock,
    txns: DbTransaction[],
    uncleInfos: UncleInfo[],
  ): Promise<IBalanceState[]> {
    try {
      const [totalTxnFee, recordsFromTxns] = this.calTxnFees(txns)
      const recordsFromRewards = this.calRewards(block, uncleInfos)
      recordsFromRewards[block.miner].push(totalTxnFee)

      // Merge two records and format to BalanceInfo
      const balanceInfos = this.formatRecordsToBalance(
        recordsFromRewards,
        recordsFromTxns,
      )

      // dont bother balance, sort out income expense info first
      // use $inc to change balance state's balance field (work with decimal)
      // TODO: 3. perform upserts...

      return []
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }

  private calTxnFees(txns: DbTransaction[]): [Big, ExchangeList] {
    // If txn list is empty
    if (txns.length < 1) return [Big(0), {}]

    // TODO: check state
    const records: ExchangeList = {}
    const totalTxnFee = txns.reduce<Big>((sum, txn) => {
      const { from, to } = txn
      const value = Big(txn.value).times(1e-18)
      const gasPrice = Big(txn.gasPrice).times(1e-18)
      const txnFee = gasPrice.times(txn.gasUsed)

      if (!records[from]) {
        records[from] = []
      }
      records[from].push(value.plus(txnFee).times(-1))

      if (!records[to]) {
        records[to] = []
      }
      records[to].push(value)

      return sum.plus(txnFee)
    }, Big(0))

    return [totalTxnFee, records]
  }

  private calRewards(block: DbBlock, uncleInfos: UncleInfo[]): ExchangeList {
    const blockReward = Big(this.getReward(block.number))
    const inclusionReward = blockReward.div(32).times(uncleInfos.length)
    const records: ExchangeList = {
      [block.miner]: [blockReward.plus(inclusionReward)],
    }

    if (uncleInfos.length < 1) return records

    uncleInfos.forEach((uncle) => {
      if (!records[uncle.miner]) {
        records[uncle.miner] = []
      }
      records[uncle.miner].push(
        Big(uncle.number + 8 - block.number)
          .times(blockReward)
          .div(8),
      )
    })

    return records
  }

  private getReward(blockNum: number): number {
    if (blockNum < 4370000) {
      return 5
    }
    if (blockNum < 7280000) {
      return 3
    }
    return 2
  }

  private formatRecordsToBalance(r1: ExchangeList, r2: ExchangeList) {
    const mergedRecords = _mergeWith(r1, r2, (v1, v2) => {
      if (_isArray(v1)) {
        return v1.concat(v2)
      }
      return undefined
    })

    return Object.entries(mergedRecords).map(
      ([address, exchanges]): BalanceInfo => {
        const income = exchanges.reduce(
          (sum, value) => (value.gt(0) ? sum.plus(value) : sum),
          Big(0),
        )
        const expense = exchanges.reduce(
          (sum, value) => (value.lt(0) ? sum.plus(value) : sum),
          Big(0),
        )
        return {
          address,
          income,
          expense,
          exchange: income.plus(expense),
        }
      },
    )
  }

  // change it to bulk upsert instead?
  // private async getAddressBalance(address: string): Promise<IBalanceState> {
  //   try {
  //     this.logger.trace('Get balance of %s', address)
  //     const account = await this.balanceState.findOne({ address }).exec()

  //     if (!account) {
  //       this.logger.warn(
  //         'No balance record for %s, returning 0 for balance',
  //         address,
  //       )
  //       return { address, balance: 0 }
  //     }

  //     return account.balance
  //   } catch (e) {
  //     this.logger.error(e)
  //     throw e
  //   }
  // }
}
