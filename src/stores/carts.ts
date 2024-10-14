import { defineStore } from 'pinia'
import axios from '@/axios'
import type { AxiosResponse } from 'axios'

interface State {
    carts: any
    cartStatus: boolean
}

export const useCartStore = defineStore('carts',  {
    state: (): State => ({
        carts: [],
        cartStatus: false
    }),

    actions: {
        async createNumberStatus(data: any): Promise<void>
        {
            try {
                const response: AxiosResponse<any> = await axios.post('/number-status/create',data)
                this.carts = response.data


            } catch (error: any) {
                console.log('Error in event')
            }

        },

        async deleteNumberStatus(data: any): Promise<void>
        {
            try {
                const response: AxiosResponse<any> = await axios.post('/number-status/delete', data)
                this.cartStatus = true
                console.log(response.data)
                setTimeout(()=>this.carts = false, 1000)

            } catch (error: any) {
                console.log('Error in event')
            }

        },

    }
})
