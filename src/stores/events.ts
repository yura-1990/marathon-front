import { defineStore } from 'pinia'
import axios from '@/axios'
import type { AxiosResponse } from 'axios'

interface State {
  events: any
}


export const useEventStore = defineStore('events',  {
  state: (): State => ({
    events: []
  }),

  actions: {
    async getEvents(): Promise<void> {
      try {
        const response: AxiosResponse<any> = await axios.get('/event/all')
        this.events = response.data

      } catch (error: any) {
        console.log('Error in event')
      }

    }
  }
})
