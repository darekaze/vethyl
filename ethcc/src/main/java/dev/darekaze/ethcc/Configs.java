package dev.darekaze.ethcc;

import dev.darekaze.ethcc.core.ChainBuffer;
import dev.darekaze.ethcc.ethereum.EthBean;
import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.concurrent.Executors;

@Configuration
public class Configs {

  @Bean(destroyMethod = "shutdown")
  RedissonClient redisson(@Value("classpath:redisson.yaml") Resource configFile) throws IOException {
    Config config = Config.fromYAML(configFile.getInputStream());
    return Redisson.create(config);
  }

  @Bean
  ChainBuffer chainBuffer(RedissonClient redisson) {
    return new ChainBuffer(redisson);
  }

  @Bean(destroyMethod = "close")
  EthBean ethBeanInstance(ChainBuffer chainBuffer) {
    EthBean ethBean = new EthBean(chainBuffer);
    Executors.newSingleThreadExecutor().submit(ethBean::start);
    return ethBean;
  }
}
