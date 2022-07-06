import { response } from 'express'
import api from '../boot/axios'

export const PostData = async (url, data, token) => {
  try {
    const headers = { 'Authorization': token }
    response = await api.post(url, data, headers)
    return response.data

  } catch (error) {
    return {status:'erro', message:'Ocorreu um erro interno.'}
  }

}
