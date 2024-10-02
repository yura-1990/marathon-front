<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

interface Login {
  email: string
  password: string
}
interface Register extends Login {
  name: string
  password_confirmation: string
}

interface ResetPassword {
  token: string
  password: string
  password_confirmation: string
}

const authStore = useAuthStore()
const {sendEmailStatus, sendEmailStatusMessage} = storeToRefs(authStore)

const password = ref<boolean>(true)
const loginPassword = ref<boolean>(true)
const passwordRepeat = ref<boolean>(true)
const login = ref<Login>({
  email: '',
  password: '',
})
const register = ref<Register>({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})
const loading = ref<boolean>(false)
const email = ref<string>('')
const resetPassword = ref<ResetPassword>({
  token: '',
  password: '',
  password_confirmation: ''
})
const loginModal = ref<HTMLElement|null>(null)

async function submit(type: string='login'): Promise<void>
{
  loading.value = true

  if (type === 'register') {
    await authStore.register(register.value)
  } else {
    await authStore.login(login.value)
  }
}

async function sendEmail(): Promise<void>
{
  loading.value = true

  if (!sendEmailStatus.value) {
    await authStore.sendEmail({email: email.value})
  } else {
    const data = {
      email: email.value,
      password: resetPassword.value.password,
      password_confirmation: resetPassword.value.password_confirmation,
      token: resetPassword.value.token,
    }

    await authStore.forgetPassword(data)
  }
}

watch(()=>sendEmailStatus.value, (value)=>{
  loading.value = false

  if (!value){
    loginModal.value?.click()

    login.value.password
      = login.value.email
      = register.value.name
      = register.value.name
      = register.value.email
      = register.value.password
      = register.value.password_confirmation
      = email.value
      = resetPassword.value.password
      = resetPassword.value.password_confirmation = ''
  }
})

watch(()=>sendEmailStatusMessage.value, ()=>{
  loading.value = false

  login.value.password
    = login.value.email
    = register.value.name
    = register.value.name
    = register.value.email
    = register.value.password
    = register.value.password_confirmation
    = email.value
    = resetPassword.value.password
    = resetPassword.value.password_confirmation = ''

  location.reload()

})

</script>

<template>
  <div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-md modal-dialog-centered ">
        <div class="modal-content modal-template overflow-hidden">
          <div class="modal-header">
            <div class="title-header">
              <h3 class="title modal-title text-dark">Login</h3>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="contact-form-block">
              <form @submit.prevent="submit()" id="login" class="wrap-form query_form-1 contact_form">
                <div class="row">
                  <div class="col-lg-12">
                    <span class="text-input text-dark">
                        <span class="heading-name">your email</span>
                        <input class="text-dark shadow-lg"
                               v-model="login.email"
                               type="email"
                               placeholder="someone@example.com"
                        >
                    </span>
                  </div>
                  <div class="col-lg-12">
                    <span class="text-input">
                       <span class="heading-name">your password</span>
                      <input class="text-dark shadow-lg"
                             v-model="login.password"
                             :type="loginPassword ? 'password' : 'text'"
                             placeholder="password"
                      >
                      <span class="login-password" @click="loginPassword = !loginPassword">
                        <i class="fa-regular" :class="loginPassword ? 'fa-eye' : 'fa-eye-slash'"></i>
                      </span>
                    </span>
                  </div>
                </div>
              </form>
              <a href="#" data-bs-target="#exampleModalToggle3" data-bs-toggle="modal" data-bs-dismiss="modal" class="forgot-password">Forgot password</a>
            </div>
          </div>
          <div class="modal-footer  d-flex justify-content-between align-items-center">
            <a href="#" class=" text-theme h5 d-flex align-items-center gap-2 bg-transparent" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">
              <i class="fa-light fa-arrow-left-long"></i>
              Register
            </a>
            <button :disabled="loading" class="prt-btn prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-skincolor"
                    type="submit"
                    form="login"
            >
              <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              submit form
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-template overflow-hidden">
          <div class="modal-header">
            <div class="title-header">
              <h3 class="title modal-title text-dark">Register</h3>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="contact-form-block">
              <form @submit.prevent="submit('register')" id="register" class="wrap-form query_form-1 contact_form">
                <div class="row">
                  <div class="col-lg-12">
                    <span class="text-input text-dark">
                        <span class="heading-name">your name</span>
                        <input class="text-dark shadow-lg"
                               v-model="register.name"
                               type="text"
                               placeholder="Habib"
                        >
                    </span>
                  </div>
                  <div class="col-lg-12">
                    <span class="text-input text-dark ">
                        <span class="heading-name">your email</span>
                        <input class="text-dark shadow-lg"
                               type="email"
                               v-model="register.email"
                               placeholder="someone@example.com"
                        >
                    </span>
                  </div>
                  <div class="col-lg-12">
                    <span class="text-input position-relative">
                      <span class="heading-name">your password</span>
                      <input class="text-dark shadow-lg"
                             v-model="register.password"
                             :type="password ? 'password' : 'text'"
                             placeholder="password"
                      >
                      <span class="login-password" @click="password = !password">
                        <i class="fa-regular" :class="password ? 'fa-eye' : 'fa-eye-slash'"></i>
                      </span>
                    </span>
                  </div>

                  <div class="col-lg-12">
                    <span class="text-input position-relative">
                      <span class="heading-name">repeat password</span>
                      <input class="emai shadow-lg"
                             v-model="register.password_confirmation"
                             :type="passwordRepeat ? 'password' : 'text'"
                             placeholder="password"
                      >
                      <span class="login-password" @click="passwordRepeat=!passwordRepeat">
                         <i class="fa-regular" :class="passwordRepeat ? 'fa-eye' : 'fa-eye-slash'"></i>
                      </span>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-between align-items-center">
            <a href="#" class="text-theme h5 d-flex align-items-center gap-2 bg-transparent" data-bs-target="#exampleModal" data-bs-toggle="modal" data-bs-dismiss="modal">
              <i class="fa-light fa-arrow-left-long"></i>
              Login
            </a>
            <button :disabled="loading" class="prt-btn prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-skincolor"
                     type="submit"
                     form="register"
            >
              <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            submit form
          </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="exampleModalToggle3" aria-hidden="true" aria-labelledby="exampleModalToggleLabel3" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-template overflow-hidden" :class="{'active': loading}">
          <div class="modal-header">
            <div class="title-header">
              <template v-if="!sendEmailStatus">
                <h3 class="title modal-title text-dark">Send email</h3>
              </template>
              <template v-else>
                <h4 class="title modal-title fw-bold text-dark">Code Sent to {{ email }}</h4>
              </template>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="contact-form-block">
              <form @submit.prevent="sendEmail()" id="send-email" class="wrap-form query_form-1 contact_form">
                <div class="row">
                  <template v-if="!sendEmailStatus">
                    <div class="col-lg-12">
                      <span class="text-input text-dark">
                        <span class="heading-name">your email</span>
                        <input class="text-dark shadow-lg"
                               v-model="email"
                               type="text"
                               placeholder="example@example.com"
                        >
                      </span>
                    </div>
                  </template>

                  <template v-else>
                    <div class="col-lg-12">
                      <span class="text-input text-dark">
                        <span class="heading-name">Code</span>
                        <input class="text-dark shadow-lg"
                               v-model="resetPassword.token"
                               type="text"
                               placeholder="1 2 3 4 5"
                        >
                      </span>
                    </div>
                    <div class="col-lg-12">
                      <span class="text-input text-dark position-relative">
                        <span class="heading-name">your password</span>
                        <input class="text-dark shadow-lg"
                               v-model="resetPassword.password"
                               :type="password ? 'password' : 'text'"
                               placeholder="password"
                        >
                        <span class="login-password" @click="password = !password">
                          <i class="fa-regular" :class="password ? 'fa-eye' : 'fa-eye-slash'"></i>
                        </span>
                      </span>
                    </div>
                    <div class="col-lg-12">
                      <span class="text-input text-dark position-relative">
                        <span class="heading-name">repeat password</span>
                        <input class="text-dark shadow-lg"
                               v-model="resetPassword.password_confirmation"
                               :type="passwordRepeat ? 'password' : 'text'"
                               placeholder="password"
                        >
                        <span class="login-password" @click="passwordRepeat = !passwordRepeat">
                          <i class="fa-regular" :class="passwordRepeat ? 'fa-eye' : 'fa-eye-slash'"></i>
                        </span>
                      </span>
                    </div>
                  </template>

                </div>
              </form>

            </div>
          </div>
          <div class="modal-footer d-flex justify-content-between align-items-center">
            <a href="#" ref="loginModal" class=" text-theme h5 d-flex align-items-center gap-2 bg-transparent" data-bs-target="#exampleModal" data-bs-toggle="modal" data-bs-dismiss="modal">
              <i class="fa-light fa-arrow-left-long"></i>
              Login
            </a>
            <button :disabled="loading" class="prt-btn prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-skincolor"
                    type="submit"
                    form="send-email"
            >
              <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              submit form
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>