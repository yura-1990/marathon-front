import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { useJwt } from '@vueuse/integrations/useJwt'
import { useI18n } from 'vue-i18n'

interface State {
  openSidebar: boolean
  token: string | undefined
  user: any
}

export const useSettingStore = defineStore('setting', {
  state: (): State => ({
    openSidebar: true,
    token: '',
    user: undefined
  }),

  actions: {
    getEvents(): void {
      this.openSidebar = !this.openSidebar
    },

    async getToken(): Promise<any | null> {
      try {
        const token = Cookies.get('auth_token')
        if (token) {
          this.token = token
          const users: any = useJwt(token)?.payload?.value
          this.user = users?.users
          console.log(users?.users)
        } else {
          console.error('Token is undefined')
        }
      } catch (e) {
        console.error('Failed to decode token', e)
      }
    },

    formatDate(dateString: string): string | null {
      const { t } = useI18n()
      const date = new Date(dateString)

      const formatDate = (date: Date) => {
        const day = date.getDate().toString().padStart(2, '0')
        const monthKey = date.toLocaleString('en', { month: 'long' }).toLowerCase()
        const year = date.getFullYear()

        const month = t(`${monthKey}`)

        return `${day} ${month} ${year}`
      }

      return formatDate(date)
    },

    formatEventDateRange(marathons: Array<{ date_event: string }>) {
      const { t } = useI18n()
      if (!marathons || marathons.length === 0) return 'Upcoming events'

      const startDateString = marathons[0].date_event
      const endDateString = marathons[marathons.length - 1].date_event

      const startDate = new Date(startDateString)
      const endDate = new Date(endDateString)

      const formatDate = (date: Date, includeYear: boolean = true) => {
        const day = date.getDate().toString().padStart(2, '0')
        const month = t(`${date.toLocaleString('en', { month: 'long' }).toLowerCase()}`)
        const year = date.getFullYear()
        return includeYear ? `${day} ${month} ${year}` : `${day} ${month}`
      }

      const sameMonth = startDate.getMonth() === endDate.getMonth()
      const sameYear = startDate.getFullYear() === endDate.getFullYear()

      let formattedStartDate = formatDate(startDate, !sameYear)
      const formattedEndDate = formatDate(endDate)

      if (sameMonth && sameYear) {
        formattedStartDate = startDate.getDate().toString().padStart(2, '0') // Just day for start date
      }

      return `${formattedStartDate} - ${formattedEndDate}`
    },

    getInitials(name: string ): string {
      const words = name.trim().split(' ')

      if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase()
      } else {
        return (words[0][0] + words[1][0]).toUpperCase()
      }
    },

    formatAMPM(timeString: string): string
    {
      const currentDate = new Date();

      const [hoursStr, minutesStr] = timeString.split(':');

      const parsedHours = parseInt(hoursStr, 10);
      const parsedMinutes = parseInt(minutesStr, 10);

      currentDate.setHours(parsedHours, parsedMinutes);

      const hours = currentDate.getHours();

      return hours >= 12 ? 'PM' : 'AM';
    }
  }
})
