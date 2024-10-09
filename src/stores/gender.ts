import { defineStore } from 'pinia'
import axios from '@/axios'
import type { AxiosResponse } from 'axios'

interface State {
  genders: any
}


export const useGenderStore = defineStore('genders',  {
  state: (): State => ({
    genders: [],
  }),

  actions: {
    async getGenders(language: string = 'ru'): Promise<void> {
      try {
        const response: AxiosResponse<any> = await axios.get('/gender/all',{
          params: {
            language
          }
        })
        this.genders = response.data

      } catch (error: any) {
        console.log('Error in event')
      }

    },

  }
})
