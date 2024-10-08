import { defineStore } from 'pinia'
import axios from '@/axios'
import type { AxiosResponse } from 'axios'

interface State {
  numberTypes: any
}

export const useNumberStore = defineStore('numbers',  {
  state: (): State => ({
    numberTypes: [],
  }),

  actions: {
    async getNumbers(language: string = 'ru'): Promise<void> {
      try {
        const response: AxiosResponse<any> = await axios.get('/numbers/all',{
          params: {
            language
          }
        })
        this.numberTypes = response.data
        console.log(response.data)

      } catch (error: any) {
        console.log('Error in event')
      }

    },

  }
})
