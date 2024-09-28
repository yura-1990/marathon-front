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

export const usePasswordStore = defineStore('password',  {
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

        console.log(response.data)
        this.loginStatus = response.data.status
        this.sendEmailStatusMessage = response.data.message

        if (response.data.status){
          window.location.href = '/login'
        } else {
          window.location.href = '/not-found'
        }

      } catch (error: any) {
        console.log('Error in event')
      } finally {
        this.loginStatus = false
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

        console.log(response.data)
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
          Cookies.set( 'auth_token',(response.data as Token))

          window.location.href = '/dashboard'
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

          window.location.href = '/dashboard'
        }

      } catch (error: any) {
        console.log('Error in event')
      } finally {
        this.loginStatus = false
      }
    },

    async logout(): Promise<void>
    {
      try {
        const response: AxiosResponse<any> = await axios.get('/auth/logout')

        console.log(response.data)
        if (response.data.status){
          Cookies.remove('auth_token')

          window.location.href = '/'
        }

      } catch (error: any) {
        console.log('Error in event')

        Cookies.remove('auth_token')

        window.location.href = '/'
      }
    },
  }
})
