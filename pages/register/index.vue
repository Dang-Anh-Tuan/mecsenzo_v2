<template>
  <div class="w-[500px] m-auto mt-[150px]">
    <form @submit.prevent="onSubmit">
      <h3 class="text-[2rem] font-semibold">Sign Up</h3>
      <div class="flex justify-center my-3">
        <p ref="errorMsg" class="text-red-500 text-[1rem] hidden">Error</p>
      </div>
      <div
        class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
      ></div>
      <div class="mb-6">
        <input
          id="exampleFormControlInput2"
          v-model="fullName"
          type="text"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Enter your full name ..."
        />
      </div>
      <!-- Email input -->
      <div class="mb-6">
        <input
          id="exampleFormControlInput2"
          v-model="email"
          type="text"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Email address"
        />
      </div>

      <!-- Password input -->
      <div class="mb-6">
        <input
          id="exampleFormControlInput2"
          v-model="password"
          type="password"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Password"
        />
      </div>

      <div class="mb-6">
        <input
          id="exampleFormControlInput2"
          v-model="rePassword"
          type="password"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Re - Password"
        />
      </div>

      <div class="flex justify-between items-center mb-6">
        <div class="form-group form-check">
          <input
            id="exampleCheck2"
            type="checkbox"
            class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label
            class="form-check-label inline-block text-gray-800"
            for="exampleCheck2"
            >Remember me</label
          >
        </div>
        <a href="#!" class="text-gray-800">Forgot password?</a>
      </div>

      <div class="text-center lg:text-left">
        <button
          type="submit"
          class="w-full inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Register
        </button>
        <p class="text-sm font-semibold mt-2 pt-1 mb-0">
          Do have an account?
          <nuxt-link
            :to="{
              path: `/login`,
              name: `login___${$i18n.locale}`,
            }"
            class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
            >Login</nuxt-link
          >
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { createUser, getUserByEmail, setActiveUser } from '@/api/user.api'

export default {
  layout: 'auth',

  middleware: 'auth-forbidden',

  data() {
    return {
      email: '',
      password: '',
      rePassword: '',
      fullName: '',
    }
  },

  methods: {
    checkValidPassword() {
      return this.password === this.rePassword
    },

    onSubmit() {
      const validPassword = this.checkValidPassword()
      if (validPassword) {
        this.$store
          .dispatch('account/authenticateUser', {
            email: this.email,
            password: this.password,
            isLogin: this.isLogin,
          })
          .then(async () => {
            await createUser({
              fullName: this.fullName,
              email: this.email,
              avatar: null,
              address: null,
              age: null,
              isActive: true,
            })
          })
          .then(() => {
            getUserByEmail(this.email).then((user) => {
              localStorage.setItem('user', JSON.stringify(user))
              this.$store.dispatch('user/setUser', user)
              setActiveUser(true)
            })
          })
          .then(() => {
            this.$router.push({
              path: '/',
              name: `index___${this.$i18n.locale}`,
            })
          })
          .catch((e) => {
            this.$refs.errorMsg.classList.remove('hidden')
            this.$refs.errorMsg.textContent = e.data.error.message
          })
      } else {
        // show message invalid password
      }
    },
  },
}
</script>
