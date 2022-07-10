import axios from 'axios'
import { Toast } from '../common/toast'
import { DataToSign } from './types'

// declare type postBody = {
//   address: string
//   network?: string 
// }

export type postBody = {
  address: string
  user?: string
  nickname?: string
  whaleAddress?: string
  network?: string 

}

const axiosObject = axios.create({
  // baseURL: 'https://nft-bot-354317.de.r.appspot.com',
  baseURL: 'https://cthua.ebg.tw',
//   timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
})

const ApiPost = async (url: string, data: DataToSign, signer: any) => {
  try {
    // const adress = await signer.getAddress();
    const signature: string = await signer.signMessage( JSON.stringify(data))

    // TODO: 若連續2次簽署，則除了最後一個皆取消

    // TODO: sign快取

    const response = await axiosObject({
      method: 'post',
      url: url,
      data: {
        // 這格就是body
        ...data,
        signature
      },
    })
    return response
  } catch (e) {
    console.log('e :', e)
    Toast.error("拒絕簽署訊息")
    throw e;
  }
}

const API = {
  GET: null,
  POST: ApiPost,
  PUT: null,
  DELETE: null,
}

export default API
