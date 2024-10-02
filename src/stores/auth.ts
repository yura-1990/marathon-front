import { defineStore } from 'pinia'
import axios from '@/axios'
import type { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

interface State {
  loginStatus: boolean,
  sendEmailStatus: boolean,
  sendEmailStatusMessage: string
}

type Token = string

export const useAuthStore = defineStore('auth',  {
  state: (): State => ({
    loginStatus: false,
    sendEmailStatus: false,
    sendEmailStatusMessage: ''
  }),

  actions: {
    async forgetPassword(data: any): Promise<void>
    {
      try {
        const response: AxiosResponse<any> = await axios.post('/auth/set-new-password', data)

        if (response.data.status){
          this.sendEmailStatus = false
        }

      } catch (error: any) {
        console.log('Error in event')
      }

    },

    async checkStatus(data: any): Promise<void>
    {
      try {
        const response: AxiosResponse<any> = await axios.post('/auth/check-status', data)

        console.log(response.data)

        this.loginStatus = response.data.status

      } catch (error: any) {
        console.log('Error in event')
      }

    },

    async sendEmail(data: any): Promise<void>
    {
      try {
        const response: AxiosResponse<any> = await axios.post('/auth/forgot-password', data)
        this.sendEmailStatus = response.data.status
        this.sendEmailStatusMessage = response.data.message

      } catch (error: any) {
        console.log('Error in event')
      } finally {
        this.loginStatus = false
      }

    },

    async login(data: any): Promise<void>
    {
      try {
        const response: AxiosResponse<any> = await axios.post('/auth/login', data)

        if (response.data.status){
          this.sendEmailStatus = false
          this.sendEmailStatusMessage = 'login success'
          Cookies.set( 'auth_token',(response.data.token as Token))
        }

      } catch (error: any) {
        console.log('Error in event')
      }
    },

    async register(data: any): Promise<void>
    {
      try {
        const response: AxiosResponse<any> = await axios.post('/auth/register', data)

        if (response.data.status){
          Cookies.set( 'auth_token',(response.data as Token))

          this.sendEmailStatus = false
        }

      } catch (error: any) {
        console.log('Error in event')
      }
    },

    async logout(): Promise<void>
    {
      try {
        const response: AxiosResponse<any> = await axios.get('/auth/logout')

        if (response.data.status){
          Cookies.remove('auth_token')

          location.reload()
        }

      } catch (error: any) {
        console.log('Error in event')

        Cookies.remove('auth_token')

        location.reload()
      }
    },
  }
})
