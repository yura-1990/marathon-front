import { defineStore } from 'pinia'
import axiosInstance from "@/axios";

interface State {
  news: Array<any>
  oneNews: any
}

export const useNewsStore = defineStore('news', {
    state: (): State =>({
        news: [],
        oneNews: {}
    }),

    actions: {
        async getAllNews(language: string='ru', paginate: number=12, page: number=1): Promise<void>
        {
            const response = await axiosInstance.get("/news/all", {
                params: {
                    language, paginate, page
                }
            })

            console.log(response.data)

            if (response.status === 200) {
                this.news = response.data
            }
        },

        async getOneNews(language: string='ru', news: number): Promise<void>
        {
            const response = await axiosInstance.get(`/news/show/${news}`, {
                params: {
                    language
                }
            })

            console.log(response.data)

            if (response.status === 200) {
                this.oneNews = response.data
            }
        },

    }
})
