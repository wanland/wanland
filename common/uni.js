import api from './api'

export function login () {
  return new Promise((resolve, reject) => {
    uni.login({ success: resolve, fail: reject })
  })
}

export function getUserInfo () {
  return new Promise((resolve, reject) => {
    uni.getUserInfo({ success: resolve, fail: reject })
  })
}

export function setStorage (key, value) {
  return new Promise((resolve, reject) => {
    uni.setStorage({ key: key, data: value, success: resolve, fail: reject })
  })
}

export function getStorage (key) {
  return new Promise((resolve, reject) => {
    uni.getStorage({ key: key, success: resolve, fail: reject })
  })
}

export function getLocation (type) {
  return new Promise((resolve, reject) => {
    uni.getLocation({ type: type, success: resolve, fail: reject })
  })
}

export function getSetting (type) {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      success (res) {
        if (res.authSetting[type]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          resolve(true)
        } else {
          resolve(false)
        }
      }
    })
  })
}

export function chooseImage (count) {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: count || 9, // 默认9
      sizeType: ['original', 'compressed'],
      // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],
      // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        resolve(res)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

export function uploadFile (filePath) {
  uni.showLoading({ title: '上传中' })
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: `${api.baseUrl}file/miniUploadFile`,
      header: {
        'content-type': 'multipart/form-data'
      },
      filePath: filePath,
      name: 'imageFile',
      complete (res) {
        uni.hideLoading()
        if (res.statusCode === 200) {
          resolve(JSON.parse(res.data))
        } else {
          reject(res.data)
        }
      }
    })
  })
}

export function downloadFile (url) {
  uni.showLoading({ title: '下载中' })
  return new Promise((resolve, reject) => {
    uni.downloadFile({
      url: url,
      complete (res) {
        uni.hideLoading()
        if (res.statusCode === 200) {
          resolve(res.tempFilePath)
        } else {
          reject(res.errMsg)
        }
      }
    })
  })
}

export function saveFile (path) {
  uni.showLoading({ title: '下载中' })
  return new Promise((resolve, reject) => {
    uni.saveFile({
      tempFilePath: path,
      complete (res) {
        console.log(res)
        uni.hideLoading()
        if (res.statusCode === 200) {
          resolve(res.savedFilePath)
        } else {
          reject(res.errMsg)
        }
      }
    })
  })
}

export function canvasToTempFilePath (params) {
  if (!params) params = {}
  return new Promise((resolve, reject) => {
    const obj = {
      ...params,
      success (res) {
        resolve(res.tempFilePath)
      },
      fail (err) {
        reject(err)
      }
    }
    uni.canvasToTempFilePath(obj)
  })
}

export function showToast (title, icon, time, url) {
  if (time === 0) time = 0
  if (!time && time !== 0) time = 2000
  uni.showToast({
    title: title,
    icon: icon,
    image: url || '',
    duration: time
  })
}

export function getImageInfo (url) {
  return new Promise((resolve, reject) => {
    uni.getImageInfo({
      src: url,
      success (res) {
        let src
        if (res.path) {
          src = res.path
        } else {
          src = url
        }
        resolve(src)
      },
      fail () {
        reject(url)
      }
    })
  })
}