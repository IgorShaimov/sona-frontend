<template>
  <div class="w-full flex flex-col text-center register-page bg-sky-400">
    <h1
      class="text-blue-100 text-center text-3xl font-bold tracking-wide my-auto"
    >
      {{ $t('soonna') }}
    </h1>

    <h1
      class="text-sky-100 text-center text-xl font-extrabold tracking-wide mt-auto mb-8"
    >
      {{ $t('sign_up') }}
    </h1>

    <form
      class="flex flex-col items-center"
      @submit.prevent="register"
      @keydown="form.onKeydown($event)"
    >
      <div class="form-group w-full mb-4">
        <label for="firstName" />
        <input
          id="firstName"
          v-model="form.firstName"
          :class="{ invalid: form.errors.has('firstName') }"
          class="cus-input text-center"
          placeholder="First Name"
          name="firstName"
          type="text"
        />
        <has-error
          class="text-sm text-red-500 font-semibold mt-2"
          :form="form"
          field="firstName"
        />
      </div>
      <div class="form-group w-full mb-4">
        <label for="lastName" />
        <input
          id="lastName"
          v-model="form.lastName"
          :class="{ invalid: form.errors.has('lastName') }"
          class="cus-input text-center"
          placeholder="Last Name"
          name="lastName"
          type="text"
        />
        <has-error
          class="text-sm text-red-500 font-semibold mt-2"
          :form="form"
          field="lastName"
        />
      </div>
      <div class="form-group w-full mb-4">
        <label for="email" />
        <input
          id="email"
          v-model="form.email"
          :class="{
            invalid: form.errors.has('email') || form.errors.has('credentials')
          }"
          class="cus-input text-center"
          placeholder="example@soonna.com"
          name="email"
          type="email"
        />
        <has-error
          class="text-sm text-red-500 font-semibold mt-2"
          :form="form"
          field="email"
        />
      </div>
      <div class="form-group w-full mb-4">
        <label for="password" />
        <input
          id="password"
          v-model="form.password"
          :class="{ invalid: form.errors.has('password') }"
          class="cus-input text-center"
          placeholder="password"
          name="password"
          type="password"
        />
        <has-error
          class="text-sm text-red-500 font-semibold mt-2"
          :form="form"
          field="password"
        />
      </div>

      <div class="form-group w-full mb-4">
        <label for="confirmPassword" />
        <input
          id="confirmPassword"
          v-model="form.password_confirmation"
          :class="{ invalid: form.errors.has('password_confirmation ') }"
          class="cus-input text-center"
          placeholder="Confirm password"
          name="password"
          type="password"
        />
        <has-error
          class="text-sm text-red-500 font-semibold mt-2"
          :form="form"
          field="password_confirmation"
        />
      </div>
      <div class="form-group w-full">
        <v-button
          class="btn cus-button bg-sky-100 text-gray-700 mx-auto py-2"
          :loading="form.busy"
        >
          {{ $t('create_account') }}
        </v-button>
      </div>
    </form>

    <p class="text-xs mt-12 mb-8 font-normal f_desc">
      {{ $t('existing_account') }}
      <router-link :to="{ name: 'login' }" class="text-sky-100">
        {{ $t('sign_in') }}
      </router-link>
    </p>
  </div>
</template>

<script>
import { Form } from 'vform'
import VButton from '../../components/Button'

export default {
  components: { VButton },
  middleware: 'guest',
  layout: 'basic',

  metaInfo() {
    return { title: this.$t('register') }
  },

  data: () => ({
    form: new Form({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password_confirmation: ''
    }),
    mustVerifyEmail: false
  }),

  methods: {
    async register() {
      const { data } = await this.form.post(
        `${process.env.VUE_APP_API_URL}/api/register`
      )

      // Must verify email fist.
      if (data.status) {
        this.mustVerifyEmail = true
      } else {
        // Log in the user.
        const {
          data: { token }
        } = await this.form.post(`${process.env.VUE_APP_API_URL}/api/login`)

        // Save the token.
        this.$store.dispatch('auth/saveToken', { token })

        // Update the user.
        await this.$store.dispatch('auth/updateUser', { user: data })

        // Redirect home.
        this.$router.push({ name: 'alarm' })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/pages/auth/register';
</style>
