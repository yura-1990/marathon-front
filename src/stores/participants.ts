import { defineStore } from 'pinia'
import axios from '@/axios'
import type { AxiosResponse } from 'axios'

interface State {
  participants: any
  cartStatus: boolean
}

export const useParticipantStore = defineStore('participants',  {
  state: (): State => ({
    participants: [],
    cartStatus: false
  }),

  actions: {
    async createNumberStatus(data: any): Promise<void>
    {
      try {
        const response: AxiosResponse<any> = await axios.post('/number-status/create',data)
        this.participants = response.data

      } catch (error: any) {
        console.log('Error in event')
      }

    },

  }
})
