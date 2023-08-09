// userService.ts

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getData, postData, putData, deleteData } from '@/api/config/client'

// User 데이터 티입
interface GetUser {
  id: number
  name: string
}

// User 조회 -> GET 요청
const getUser = async (): Promise<GetUser> => {
  try {
    const response = await getData<GetUser>('/users/1')
    const { name, id } = response.data

    console.log(response)
    console.log(response.data)

    console.log(name, id)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to get user')
  }
}
getUser

interface User {
  name: string
  email: string
}

// User 생성 -> POST 요청
const createUser = async (newUser: User): Promise<User> => {
  try {
    const response = await postData<User>('/users', newUser)
    const createdUser = response.data
    console.log(createdUser)
    return createdUser
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create user')
  }
}
createUser

const ImageUpload = async (data: Object) => {
  try {
    const formData = new FormData()
    const values = Object.values(data)
    Object.keys(data).forEach((key, index) => formData.append(key, values[index]))

    const response = await postData('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // 헤더 설정
      }
    })

    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}
ImageUpload
