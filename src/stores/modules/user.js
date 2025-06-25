import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useGetInfoService } from '@/api/user.js'

export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    // 添加token
    const setToken = (newToken) => {
      token.value = newToken
    }
    // 清除token
    const delToken = () => {
      token.value = ''
    }
    // 获取用户的个人信息
    const user = ref({})
    const getUser = async () => {
      const res = await useGetInfoService() //获取请求数据
      user.value = res.data.data
    }
    // 清除个人信息
    const delUser = () => {
      user.value = {}
    }
    return {
      token,
      setToken,
      delToken,
      user,
      getUser,
      delUser
    }
  },
  {
    persist: true
  }
)
