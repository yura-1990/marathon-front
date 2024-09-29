import { defineStore } from 'pinia'
import axios from '@/axios'
import type { AxiosResponse } from 'axios'

interface State {
  marathons: any,
  marathonTypes: any
}


export const useMarathonStore = defineStore('marathons',  {
  state: (): State => ({
    marathons: [],
    marathonTypes: [],
  }),

  actions: {
    async getMarathons(language: string = 'ru'): Promise<void> {
      try {
        const response: AxiosResponse<any> = await axios.get('/marathon/all', {
          params: {
            language
          }
        })

        this.marathons = response.data

      } catch (error: any) {
        console.log('Error in event')
      }

    },

    async getMarathonTypes(language: string = 'ru'): Promise<void> {
      try {
        const response: AxiosResponse<any> = await axios.get('/marathon-types/all', {
          params: {
            language
          }
        })

        console.log(response.data)
        this.marathonTypes = response.data

      } catch (error: any) {
        console.log('Error in event')
      }

    }
  }
})
