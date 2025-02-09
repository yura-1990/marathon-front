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
                const getCarts = JSON.parse(<string>localStorage.getItem('carts'))
                getCarts.push(response.data)
                this.carts = getCarts

                localStorage.setItem('carts', JSON.stringify(this.carts))
                localStorage.setItem('cart_time', JSON.stringify({ time: new Date() }))

                console.log(response.data)


            } catch (error: any) {
                console.log('Error in event')
            }

        },

        async deleteNumberStatus(data: number): Promise<void>
        {
            try {
                const response: AxiosResponse<any> = await axios.delete(`/number-status/delete/${data}`)
                this.cartStatus = true
                setTimeout(()=>this.carts = false, 1000)

            } catch (error: any) {
                console.log('Error in event')
            }

        },

    }
})
