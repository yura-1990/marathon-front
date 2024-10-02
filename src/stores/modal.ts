import { defineStore } from 'pinia'

interface State {
  openModal: boolean
  form: any
}

  export const useModalStore = defineStore('modal', {
  state: (): State => ({
    openModal: true,
    form: []
  }),

  actions: {
    toggleModal(): void {
      this.openModal = !this.openModal
    },

    getForm(form: Array<any>): void
    {
        this.form = form
    }
  }
})
