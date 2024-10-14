<script setup lang="ts">

import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

interface Login {
  email: string
  password: string
}

interface Register extends Login {
  name: string
  password_confirmation: string
}

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

const container = ref<Boolean>(true)
function toggleAuth(isLogin: boolean): void
{
  container.value = !isLogin
}

async function submit(type: string='login'): Promise<void>
{
  loading.value = true
  if (type === 'register') {
    await auth.register(register.value)
  } else {
    await auth.login(login.value)
  }

}

</script>

<template>
  <div class="login-container">
    <div class="auth-container" :class="{'sign-up-mode': container}">
      <a href="/" class="auth-back">
        <img src="/assets/images/logo_itog.png" alt="">
      </a>
      <div class="forms-container">

        <div class="signin-signup">
          <form @submit.prevent="submit()" class="sign-in-form">
            <h2 class="title">Sign in</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="email" v-model="login.email" placeholder="Email" />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" v-model="login.password" placeholder="Password" />
            </div>
            <div class="d-flex align-items-center justify-content-start gap-3 my-3">
              <i class="fa-light fa-face-clouds"></i>
              <a href="/send-email">Forgot password</a>
            </div>
            <button :disabled="loading" type="submit" class="btn solid" >
              <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              Sign in
            </button>
            <p class="social-text">Or Sign in with social platforms</p>
            <div class="social-media">
              <a href="#" class="social-icon">
                <i class="fab fa-google"></i>
              </a>
            </div>
          </form>

          <form @submit.prevent="submit('register')" class="sign-up-form">
            <h2 class="title">Sign up</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" v-model="register.name" placeholder="Name" />
            </div>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input type="email" v-model="register.email" placeholder="Email" />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" v-model="register.password" placeholder="Password" />
            </div>
            <div class="input-field">
              <i class="fa-solid fa-square-check"></i>
              <input type="password" v-model="register.password_confirmation" placeholder="Repeat password" />
            </div>
            <button :disabled="loading" type="submit" class="btn" >
              <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              Sign up
            </button>

            <p class="social-text">Or Sign up with social platforms</p>

            <div class="social-media">
              <a href="#" class="social-icon">
                <i class="fab fa-google"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>New to our community ?</h3>
            <p>
              Discover a world of possibilities! Join us and explore a vibrant
              community where ideas flourish and connections thrive.
            </p>
            <button class="btn transparent" id="sign-up-btn" @click="toggleAuth(false)">
              Sign up
            </button>
          </div>
          <img  src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png" class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>One of Our Valued Members</h3>
            <p>
              Thank you for being part of our community. Your presence enriches our
              shared experiences. Let's continue this journey together!
            </p>
            <button class="btn transparent" id="sign-in-btn" @click="toggleAuth(true)">
              Sign in
            </button>
          </div>
          <img src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png"  class="image" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');

.auth-back{
  position: absolute;
  z-index: 9;
  top: 10px;
  left: 10px;
  width: 95px;
  height: 95px;
  display: flex;
}

.login-container{
  font-family: 'Montserrat', sans-serif;
  width: 100%;
  overflow: hidden;
}

.auth-container {
  position: relative;
  width: 100%;
  background-image: linear-gradient(-45deg, rgba(24, 248, 0, 0.55) 0%, #2196b8 100%);
  min-height: 100vh;
  overflow: hidden;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.signin-signup {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 75%;
  width: 50%;
  transition: 1s 0.7s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0rem 5rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

form.sign-up-form {
  opacity: 0;
  z-index: 1;
}

form.sign-in-form {
  z-index: 2;
}

.title {
  font-size: 2.2rem;
  color: #444;
  margin-bottom: 10px;
}

.input-field {
  max-width: 380px;
  width: 100%;
  background-color: #f0f0f0;
  margin: 10px 0;
  height: 55px;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 0.4rem;
  position: relative;
}

.input-field i {
  text-align: center;
  line-height: 55px;
  color: #acacac;
  transition: 0.5s;
  font-size: 1.1rem;
}

.input-field input {
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.input-field input::placeholder {
  color: #aaa;
  font-weight: 500;
}

.social-text {
  padding: 0.7rem 0;
  font-size: 1rem;
}

.social-media {
  display: flex;
  justify-content: center;
}

.social-icon {
  height: 46px;
  width: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.45rem;
  color: #333;
  border-radius: 50%;
  border: 1px solid #333;
  text-decoration: none;
  font-size: 1.1rem;
  transition: 0.3s;
}

.social-icon:hover {
  color: #F86F03;
  border-color: #F86F03;
}

.btn {
  width: 150px;
  background-color: #F86F03;
  border: none;
  outline: none;
  height: 49px;
  border-radius: 4px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn:hover {
  background-color: #f98c39;
}
.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.auth-container:before {
  content: "";
  position: absolute;
  min-height: 1500px;
  width: 1500px;
  top: 5%;
  right: 48%;
  transform: translateY(-20%);
  background-image: linear-gradient(-45deg, rgba(33, 255, 0, 0.55) 0%, #015371 100%);
  transition: 1.8s ease-in-out;
  border-radius: 50%;
  z-index: 6;
}

.image {
  width: 100%;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.4s;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 6;
}

.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}

.panel .content {
  color: #fff;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 1.5rem;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

.btn.transparent {
  margin: 0;
  background: none;
  border: 2px solid #fff;
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8rem;
}

.right-panel .image,
.right-panel .content {
  transform: translateX(800px);
}

/* ANIMATION */

.auth-container.sign-up-mode:before {
  transform: translate(100%, -30%);
  right: 52%;
}

.auth-container.sign-up-mode .left-panel .image,
.auth-container.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}

.auth-container.sign-up-mode .signin-signup {
  left: 25%;
}

.auth-container.sign-up-mode form.sign-up-form {
  opacity: 1;
  z-index: 2;
}

.auth-container.sign-up-mode form.sign-in-form {
  opacity: 0;
  z-index: 1;
}

.auth-container.sign-up-mode .right-panel .image,
.auth-container.sign-up-mode .right-panel .content {
  transform: translateX(0%);
}

.auth-container.sign-up-mode .left-panel {
  pointer-events: none;
}

.auth-container.sign-up-mode .right-panel {
  pointer-events: all;
}

@media (max-width: 870px) {
  .auth-container {
    position: relative;
    min-height: 800px;
    height: 100vh;
  }
  .signin-signup {
    width: 100%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }

  .signin-signup,
  .auth-container.sign-up-mode .signin-signup {
    left: 50%;
  }

  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }

  .right-panel {
    grid-row: 3 / 4;
  }

  .left-panel {
    grid-row: 1 / 2;
  }

  .image {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  .panel .content {
    padding-right: 15%;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.8s;
  }

  .panel h3 {
    font-size: 1.2rem;
  }

  .panel p {
    font-size: 0.7rem;
    padding: 0.5rem 0;
  }

  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7rem;
  }

  .auth-container:before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 30%;
    bottom: 68%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }

  .auth-container.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .auth-container.sign-up-mode .left-panel .image,
  .auth-container.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }

  .auth-container.sign-up-mode .right-panel .image,
  .auth-container.sign-up-mode .right-panel .content {
    transform: translateY(0px);
  }

  .right-panel .image,
  .right-panel .content {
    transform: translateY(300px);
  }

  .auth-container.sign-up-mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0);
  }
}

@media (max-width: 570px) {
  form {
    padding: 0 1.5rem;
  }

  .image {
    display: none;
  }
  .panel .content {
    padding: 0.5rem 1rem;
  }
  .auth-container {
    padding: 1.5rem;
  }

  .auth-container:before {
    bottom: 72%;
    left: 50%;
  }

  .auth-container.sign-up-mode:before {
    bottom: 28%;
    left: 50%;
  }
}
</style>