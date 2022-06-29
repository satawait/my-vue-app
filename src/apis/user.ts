import request from '@/utils/request'
import { IUser, IRes } from '@/types'

export const registerUser = (user: IUser) => {
  const formsData = new FormData()
  formsData.append('username', user.username)
  formsData.append('password', user.username)
  if (user.file) {
    formsData.append('file', user.file)
  }
  return request.upload<IRes>('api/users/api', formsData)
}
export const updateUser = (user: IUser) => {
  return request.put<IRes>('api/users/api', user)
}
export const deleteUser = (user: IUser) => {
  return request.delete<IRes>('api/users/api', user)
}
export const getUser = (user: IUser) => {
  return request.get<IRes>(`api/users/api?username=${user.username}`, user)
}
