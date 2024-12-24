import { defineStore } from 'pinia'
import axios from '@/axios'
import type { AxiosResponse } from 'axios'

interface State {
  marathons: any,
  marathonTypes: any,
  marathon: any,
  singleMarathons: any
}


export const useMarathonStore = defineStore('marathons',  {
  state: (): State => ({
    marathons: [],
    marathonTypes: [],
    marathon: [],
    singleMarathons: []
  }),

  actions: {
    async getMarathons(language: string = 'ru', paginate: number = 25): Promise<void> {
      try {
        const response: AxiosResponse<any> = await axios.get('/marathon/all', {
          params: {
            language, paginate
          }
        })

        console.log(response.data)

        this.marathons = response.data

      } catch (error: any) {
        console.log('Error in event')
      }

    },

    async getSingleMarathon(marathonId: string | string[], language: string = 'ru',): Promise<void> {
      try {
        const response: AxiosResponse<any> = await axios.get('/marathon/show/' + marathonId, {
          params: {
            language
          }
        })

        this.marathon = response.data

        console.log(response.data)

      } catch (error: any) {
        console.log('Error in event')
      }

    },

    async getMarathon(marathonId: string | string[], language: string = 'ru',): Promise<void> {
      try {
        const response: AxiosResponse<any> = await axios.get('/marathon/single/' + marathonId, {
          params: {
            language
          }
        })

        this.singleMarathons = response.data

        console.log(response.data)

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

        this.marathonTypes = response.data

      } catch (error: any) {
        console.log('Error in event')
      }

    }
  }
})
