import { defineStore } from 'pinia'
import axios from '@/axios'
import type { AxiosResponse } from 'axios'

interface State {
  participantCategories: any
}


export const useParticipantCategoryStore = defineStore('participant-categories',  {
  state: (): State => ({
    participantCategories: [],
  }),

  actions: {
    async getOrganizations(language: string = 'ru'): Promise<void> {
      try {
        const response: AxiosResponse<any> = await axios.get('/participant-categories/all',{
          params: {
            language
          }
        })
        this.participantCategories = response.data

      } catch (error: any) {
        console.log('Error in event')
      }

    },

  }
})