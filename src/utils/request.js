/**
 * 全局---网络请求模块封装
 */

// 后台基础地址

const BASE_URL = 'https://api-ugo-dev.itheima.net'

/**
 * 封装uni.request
 * @param {*} param0 {url：路径, method：方法（get/post）, data：参数, header}
 */
export default async function request({ url, method, data, header }) {
  // 请求之前 => loading
  uni.showLoading({
    title: '请求中...'
  })
  let [error, res] = await uni.request({
    url: `${BASE_URL}${url}`,
    data,
    header,
    method
  });
  if (!error) {
    // 处理返回数据
    let { data: { message, meta } } = res
    uni.hideLoading()
    // 返回需要的数据
    return {
      msg: meta,
      data: message
    }
  } else {
    uni.hideLoading()
    return []
  }
}