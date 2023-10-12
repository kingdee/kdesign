import axios from 'axios'

// 开发环境
const DEV_ENVIRONMENT_ADDRESS = 'http://172.20.166.37:7002/api'
// 生产环境
const PRO_ENVIRONMENTAL_ADDRESS = 'https://kui.kingdee.com/kd/api'

export let tempAddress: string, displayIlluAddress: string

if (process.env.NODE_ENV === 'production') {
  tempAddress = PRO_ENVIRONMENTAL_ADDRESS
  displayIlluAddress = tempAddress + '/static/illustration/product'
} else {
  tempAddress = DEV_ENVIRONMENT_ADDRESS
  displayIlluAddress = tempAddress + '/static/illustration/develop'
}

const request = axios.create({
  baseURL: tempAddress,
  headers: { 'Content-type': 'application/x-www-form-urlencoded' },
})

export default request
