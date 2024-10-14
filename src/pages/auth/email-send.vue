<script setup lang="ts">
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { storeToRefs } from 'pinia'
  const email = ref<string>('')
  const loading = ref<boolean>(false)

  const passwordStore = useAuthStore()
  const { sendEmailStatus, sendEmailStatusMessage } = storeToRefs(passwordStore)

  async function sendEmail(): Promise<void>
  {
    loading.value = true
    await passwordStore.sendEmail({email: email.value})
  }

</script>

<template>
  <div class="d-flex align-items-center py-4 bg-body-tertiary vh-100 overflow-hidden">
    <div class="form-signin w-100 m-auto">
      <template v-if="!sendEmailStatus">
        <form @submit.prevent="sendEmail">
          <div class="d-flex justify-content-center align-items-center">
            <img
              class=""
              src="/assets/images/logo_itog.png"
              alt=""
              width="150"
            />
          </div>
          <div class="form-floating">
            <input
              type="email"
              class="form-control"
              id="floatingEmail"
              placeholder="Email"
              v-model="email"
            />
            <label for="floatingPassword">Email</label>
          </div>


          <button :disabled="loading" class="btn btn-primary w-100 py-2" type="submit">
            <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            Send
          </button>
        </form>
      </template>
      <template v-else>
        <h1 class="text-dark">{{ sendEmailStatusMessage }}</h1>
      </template>
    </div>
  </div>
</template>

<style scoped>
.form-signin {
  max-width: 330px;
  padding: 1rem;
}

.bg-body-tertiary {
  background-color: #0b0b0b;
}
</style>