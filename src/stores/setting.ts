import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { useJwt } from '@vueuse/integrations/useJwt'
import type { UseJwtReturn } from '@vueuse/integrations/useJwt'


interface State {
  openSidebar: boolean
  token: string | undefined
  user: UseJwtReturn<any, any, null> | undefined
}


export const useSettingStore = defineStore('setting',  {
  state: (): State => ({
    openSidebar: true,
    token: '',
    user: undefined
  }),

  actions: {
    getEvents(): void
    {
      this.openSidebar = !this.openSidebar
    },

    async getToken(): Promise<any | null>
    {
      try {
        const token = Cookies.get('auth_token');
        if (token) {
          this.token = token;
          this.user = useJwt(token)
        } else {
          console.error('Token is undefined');
        }

      } catch (e) {
        console.error('Failed to decode token', e);
      }
    },
  }
})
