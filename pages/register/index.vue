<template>
  <div
    class="relative m-auto mt-[100px] w-[400px] md:w-[500px] shadow-xl p-10 rounded-[25px] bg-white animate-[fadeUp_0.5s]"
  >
    <div class="flex justify-center mb-4">
      <h3
        class="text-dark_primary text-[1.6rem] md:text-[1.5rem] font-bold tracking-wider uppercase select-none"
      >
        {{ $t('auth.register') }}
      </h3>
    </div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <div class="flex justify-center my-3">
          <p ref="errorMsg" class="text-red-500 text-[1rem] hidden">Error</p>
        </div>
        <div class="mb-6">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|maximumLen:30"
          >
            <input
              id="exampleFormControlInput2"
              v-model="fullName"
              type="text"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border-b-[2px] border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-dark_primary focus:outline-none"
              :placeholder="$t('auth.fullNamePlaceholder')"
            />
            <p class="text-red-500 text-[0.9rem] italic ml-4">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>
        <div class="mb-6">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <input
              id="exampleFormControlInput2"
              v-model="email"
              type="text"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border-b-[2px] border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-dark_primary focus:outline-none"
              placeholder="Email"
              rule="required"
            />
            <p class="text-red-500 text-[0.9rem] italic ml-4">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <div class="mb-6">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <input
              id="exampleFormControlInput2"
              v-model="password"
              type="password"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border-b-[2px] border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-dark_primary focus:outline-none"
              :placeholder="$t('auth.password')"
              rule="required"
            />
            <p class="text-red-500 text-[0.9rem] italic ml-4">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <div class="mb-6">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <input
              id="exampleFormControlInput2"
              v-model="rePassword"
              type="password"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border-b-[2px] border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-dark_primary focus:outline-none"
              :placeholder="$t('auth.rePasswordPlaceholder')"
              rule="required"
            />
            <p class="text-red-500 text-[0.9rem] italic ml-4">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </div>

        <div class="text-center lg:text-left">
          <button
            type="submit"
            class="w-full inline-block px-7 py-3 bg-dark_primary text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:opacity-75 hover:shadow-lg focus:opacity-75 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
          >
            {{ $t('auth.register') }}
          </button>
          <p class="text-sm font-semibold mt-2 pt-1 mb-0">
            {{ $t('auth.haveAccount') }}
            <nuxt-link
              :to="{
                path: `/login`,
                name: `login___${$i18n.locale}`,
              }"
              class="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
              >{{ $t('auth.login') }}</nuxt-link
            >
          </p>
        </div>
      </form>
    </ValidationObserver>
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
