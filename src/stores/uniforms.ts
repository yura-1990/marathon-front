import { defineStore } from 'pinia'
import axios from '@/axios'
import type { AxiosResponse } from 'axios'

interface State {
  uniforms: Array<any>
}

export const useUniformStore = defineStore('uniforms',  {
  state: (): State => ({
    uniforms: [],
  }),

  actions: {
    async getUniforms(language: string = 'ru'): Promise<void>
    {
      try {
        const response: AxiosResponse<any> = await axios.get('/uniforms/all',{
          params: {
            language
          }
        })
        this.uniforms = response.data
        console.log(response.data)

      } catch (error: any) {
        console.log('Error in event')
      }

    },

  }
})
