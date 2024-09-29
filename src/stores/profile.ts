import { defineStore } from 'pinia'
import axios from '@/axios'
import type { AxiosResponse } from 'axios'

interface State {
    profile: any
}


export const useProfileStore = defineStore('profile',  {
    state: (): State => ({
        profile: []
    }),

    actions: {
        async updateProfile(data: any): Promise<void>
        {
            try {
                const formData = new FormData();
                formData.append('avatar', data.file)
                formData.append('name', data.name)
                formData.append('email', data.email)
                formData.append('file', data.file)

                console.log(formData)
                // const response: AxiosResponse<any> = await axios.post('/event/all', formData)
                // this.events = response.data

            } catch (error: any) {
                console.log('Error in event')
            }

        }
    }
})
