export interface IUser {
  username: string
  password: string
  file?: File | string
}
export interface IHttpResponse<T> {
  code: number
  datat?: T
  msg: string
  err?: string
}
export interface IFileFormData extends FormData {
  file?: File
}
export interface IRes {
  res: number
  authorization?: string
}
