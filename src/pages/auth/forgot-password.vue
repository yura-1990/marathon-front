<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth'

const route = useRoute();
const email = ref<string | null>(null);
const token = ref<string | null>(null);
const password = ref<string | null>(null);
const passwordConfirmation = ref<string | null>(null);
const passwordStore = useAuthStore()
const loading = ref<boolean>(false)

onMounted(async () => {
  email.value = route.query.email as string || null;
  token.value = route.query.token as string || null;
});

async function updatePassword()
{
  const data = {
    email: email.value,
    password: password.value,
    password_confirmation: passwordConfirmation.value,
    token: token.value,
  }
  loading.value = true
  await passwordStore.forgetPassword(data)
}

</script>

<template>
  <div class="d-flex align-items-center py-4 bg-body-tertiary vh-100 overflow-hidden">
    <div class="form-signin w-100 m-auto">
      <form @submit.prevent="updatePassword">
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
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            v-model="password"
          />
          <label for="floatingPassword">New Password</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPasswordConfirmation"
            placeholder="Repeat Password"
            v-model="passwordConfirmation"
          />
          <label for="floatingPasswordConfirmation">Repeat the password</label>
        </div>

        <button :disabled="loading" class="btn btn-primary w-100 py-2" type="submit">
          <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          Login
        </button>
      </form>
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