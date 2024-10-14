import { defineStore } from 'pinia'
import axios from '@/axios'
import type { AxiosResponse } from 'axios'

interface State {
  organizations: any
}


export const useOrganizationStore = defineStore('organizations',  {
  state: (): State => ({
    organizations: [],
  }),

  actions: {
    async getOrganizations(language: string = 'ru'): Promise<void> {
      try {
        const response: AxiosResponse<any> = await axios.get('/organizations/all',{
          params: {
            language
          }
        })
        this.organizations = response.data

      } catch (error: any) {
        console.log('Error in event')
      }

    },

  }
})
