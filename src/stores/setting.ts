import { defineStore } from 'pinia'
import axios from '@/axios'
import type { AxiosResponse } from 'axios'

interface State {
  openSidebar: boolean
}


export const useSettingStore = defineStore('setting',  {
  state: (): State => ({
    openSidebar: true
  }),

  actions: {
    getEvents(): void
    {
      this.openSidebar = !this.openSidebar
    }
  }
})
