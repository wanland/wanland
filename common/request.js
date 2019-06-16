import Fly from 'flyio/dist/npm/wx'

const request = new Fly()

request.config.timeout = 15 * 1000

// request.config.baseURL = 'http://192.168.1.55'
request.interceptors.request.use((request) => {
  // console.log(request)
  if (!request.body.bol) {
    request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  } else {
    delete request.body.bol
  }
  uni.showLoading({ title: '加载中', mask: true })
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    uni.hideLoading()
    let result = {data: response.data.data, status: response.status}
    if (response.status > 200 && response.status < 300) {
      // console.log(response.data)
      result.errMsg = response.data.msg || ''
    }
    return promise.resolve(result)
  },
  (err, promise) => {
    // console.log(err, 'errquest')
    if (err.status === 1) {
      err.message = '请求超时'
    } else {
      err.message = '请求异常'
    }
    uni.hideLoading()
    uni.showToast({
      title: err.errMsg || err.message,
      icon: 'none'
    })
    return promise.resolve()
  }
)

export default request