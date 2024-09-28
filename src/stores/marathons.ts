import { defineStore } from 'pinia'
import axios from '@/axios'
import type { AxiosResponse } from 'axios'

interface State {
  marathons: any
}


export const useMarathonStore = defineStore('marathons',  {
  state: (): State => ({
    marathons: []
  }),

  actions: {
    async getMarathons(): Promise<void> {
      try {
        const response: AxiosResponse<any> = await axios.get('/marathon/all')

        console.log(response.data)
        this.marathons = response.data

      } catch (error: any) {
        console.log('Error in event')
      }

    }
  }
})
