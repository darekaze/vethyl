/* eslint-disable no-console */
const apiMonitor = (response: any): void => {
  if (response.ok) {
    console.log(
      `%c API_RESPONSE_OK!  ${response.config.url} %c`,
      'background: #222; color: #bada55; font-size:16px',
      'background:red;color:white;',
    )
  } else {
    console.log(
      `%c API_RESPONSE_ERR! ${response.config.url} %c`,
      'background: #222; color: #ff7788; font-size:16px',
      'background:red;color:white;',
    )
  }
  console.log(response.data)
}

export default apiMonitor
