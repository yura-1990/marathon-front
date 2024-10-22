import { defineStore } from 'pinia'
import axios from '@/axios'
import type { AxiosResponse } from 'axios'

interface State {
  payment: Array<any>
  code: string
}

export const usePaymentStore = defineStore('payment', {
  state: (): State => ({
    payment: [],
    code: ''
  }),

  actions: {
    async createTransaction(data: { cart_number: string, expired_date: string, total_sum: string, type: string}): Promise<void>
    {
      try {
        const response: AxiosResponse<any> = await axios.post('/invoice/create', data)
        console.log(response.data)
        localStorage.setItem('invoice_number', JSON.stringify(response.data))
        this.payment = response.data
      } catch (error: any) {
        console.log('Error in event')
      }
    },

    async checkInvoice(data: { invoice_id: string, code: string, invoices: Array<{invoice_item_id: number}>}): Promise<void>
    {
      try {
        const response: AxiosResponse<any> = await axios.post('/invoice/check/code', data)
        console.log(response.data)
      } catch (error: any) {
        console.log('Error in event')
      }
    },

    async deleteInvoice(invoice: number): Promise<void>
    {
      try {
        const response: AxiosResponse<any> = await axios.delete(`/invoice/delete/${invoice}`)

        if (response.data.status == 'canceled'){
          localStorage.removeItem('invoice_number')
        }

      } catch (error: any) {
        console.log('Error in event')
      }
    }
  }
})