  import { defineStore } from 'pinia'
  import axios from '@/axios'
  import type { AxiosResponse } from 'axios'

  interface State {
    regions: any
  }


  export const useRegionStore = defineStore('regions',  {
    state: (): State => ({
      regions: [],
    }),

    actions: {
      async getRegions(language: string = 'ru'): Promise<void> {
        try {
          const response: AxiosResponse<any> = await axios.get('/regions/all',{
            params: {
              language
            }
          })
          this.regions = response.data

        } catch (error: any) {
          console.log('Error in event')
        }

      },

    }
  })
