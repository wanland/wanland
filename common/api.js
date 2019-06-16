import request from './request'

const ExtranetUrl = 'http://lincaln.imwork.net:10605/insurance-api/'
const productUrl = ''

const baseUrl = ExtranetUrl
const imgPreUrl = `${baseUrl}file/getFile?id=`
/**
 * 模板
 */
function userLogin (params) {
  return request.post(`${baseUrl}mini/LoginByCodeOrMobile`, params)
}

export default{
	userLogin
}