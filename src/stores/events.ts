import { defineStore } from 'pinia'
import axios from '@/axios'
import type { AxiosResponse } from 'axios'

interface State {
  events: any
  event: any
}


export const useEventStore = defineStore('events',  {
  state: (): State => ({
    events: [],
    event: [],
  }),

  actions: {
    async getEvents(language: string = 'ru', paginate:number = 25): Promise<void> {
      try {
        const response: AxiosResponse<any> = await axios.get('/event/all',{
          params: {
            language, paginate
          }
        })
        this.events = response.data
       } catch (error: any) {
        console.log('Error in event')
      }

    },

    async getOneEvent(id: string | string[], language: string = 'ru'): Promise<void> {
      try {
        const response: AxiosResponse<any> = await axios.get(`event/show/${id}`, {
          params: {
            language
          }
        })

        this.event = response.data

        console.log(response.data)

      } catch (error: any) {
        console.log('Error in event')
      }

    }
  }
})
