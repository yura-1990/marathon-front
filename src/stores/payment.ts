import { defineStore } from 'pinia'
import axiosInstance from '@/axios'
import axios, { type AxiosResponse } from 'axios'

interface State {
  payment: Array<any>
  code: string
  error: any,
  invoiceStatus: any,
  errorCode: any,
  invoices: any,
  qrcodes: Array<any>
}

export const usePaymentStore = defineStore('payment', {
  state: (): State => ({
    payment: [],
    code: '',
    error: '',
    invoiceStatus: [],
    errorCode: '',
    invoices: [],
    qrcodes: []
  }),

  actions: {
    async createTransaction(data: { cart_number: string, expired_date: string, total_sum: string, type: string}): Promise<void>
    {
      try {
        const response: AxiosResponse<any> = await axiosInstance.post('/invoice/create', data)
        localStorage.setItem('invoice_number', JSON.stringify(response.data))

        this.payment = response.data
        console.log(response)

      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          this.error = 'not_enough_funds'
          this.error = error?.response?.data.errors;
        } else {
          this.error = 'unknown_error';
          console.log('An unknown error occurred', error);
        }

      }
    },

    async checkInvoice(data: { invoice_id: string, code: string, invoices: Array<{invoice_item_id: number}>}): Promise<void>
    {
      try {
        const response: AxiosResponse<any> = await axiosInstance.post('/invoice/check/code', data)
        this.invoiceStatus = response.data

        console.log(response.data)

      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          // Check if error.response is defined
          this.error = 'not_enough_funds'

          if (error.response) {
            const status = error.response.status;
            this.errorCode = error.response.data.errors;
          } else {
            // Network or other Axios error without a response
            this.error = 'network_error';
            console.log('Network error or no response', error.message);
          }
        } else {
          // Handle non-Axios errors
          this.error = 'unknown_error';
          console.log('An unknown error occurred', error);
        }
      }
    },

    async resetInvoice(invoice_id: number): Promise<void>
    {
      try {
        const response: AxiosResponse<any> = await axiosInstance.put(`/invoice/reset/${invoice_id}`)
        this.payment = response.data
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          this.error = 'not_enough_funds'

          this.error = error?.response?.data.errors;

          if (error.response) {
            const status = error.response.status;

            if (status === 404) {
              this.error = 'not_found'; // Handle 404 error
              console.log('404 Error: Resource not found');
            } else if (status === 400) {
               // Handle 400 error
              console.log('400 Error: Bad request');

            } else {
              this.error = 'server_error'; // General server error
              console.log(`Error: ${status}`, error.response.data);
            }
          } else {
            // Network or other Axios error without a response
            this.error = 'network_error';
            console.log('Network error or no response', error.message);
          }
        } else {
          // Handle non-Axios errors
          this.error = 'unknown_error';
          console.log('An unknown error occurred', error);
        }
      }
    },

    async deleteInvoice(invoice: number): Promise<void>
    {
      try {
        const response: AxiosResponse<any> = await axiosInstance.delete(`/invoice/delete/${invoice}`)

        if (response.data.status == 'canceled'){
          localStorage.removeItem('invoice_number')
        }

      } catch (error: any) {
        this.error = error
        console.log('Error in event')
      }
    },

    async getInvoice(language: string): Promise<void>
    {
      try {
        const response: AxiosResponse<any> = await axiosInstance.get(`/invoice/all`, {
          params: {
            language
          }
        })
        this.invoices = response.data
        console.log(response.data)

      } catch (error: any) {
        this.error = error
        console.log('Error in event')
      }
    },

    async getQRCode(language: string, invouceItem: string | string[]): Promise<void>
    {
      try {
        const response: AxiosResponse<any> = await axiosInstance.get(`/news/show-qrcode/${invouceItem}`, {
          params: {
            language
          }
        })

        this.qrcodes = response.data
        console.log(response.data)

      } catch (error: any) {
        this.error = error
        console.log('Error in event')
      }
    }


  }
})