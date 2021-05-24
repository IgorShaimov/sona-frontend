<template>
  <div
    class="w-full flex flex-col text-center login-page bg-sky-400"
    :class="`${isLoaded ? 'active' : ''}`"
  >
    <h1
      class="text-blue-100 text-center text-3xl font-bold tracking-wide my-auto"
    >
      {{ $t('soonna') }}
    </h1>

    <h1
      class="text-sky-100 text-center text-xl font-extrabold tracking-wide mt-auto mb-8"
    >
      {{ $t('sign_in') }}
    </h1>

    <form class="flex flex-col items-center" @submit.prevent="login">
      <div class="form-group w-full mb-4">
        <label for="email" />
        <input
          id="email"
          v-model="form.email"
          :class="{
            invalid: form.errors.has('email') || form.errors.has('credentials')
          }"
          class="cus-input text-center"
          placeholder="soonna@gmail.com"
          name="email"
          type="email"
        />
      </div>

      <div class="form-group w-full mb-4">
        <label for="password" />
        <input
          id="password"
          v-model="form.password"
          :class="{
            invalid:
              form.errors.has('password') || form.errors.has('credentials')
          }"
          class="cus-input text-center"
          placeholder="●●●●●●●●"
          name="password"
          type="password"
        />
        <has-error
          class="text-sm text-red-500 font-semibold mt-2"
          :form="form"
          field="credentials"
        />
      </div>

      <v-button
        :loading="form.busy"
        class="btn cus-button bg-sky-100 text-gray-700 mx-auto mb-4"
        to="alarm"
      >
        {{ $t('sign_in') }}
      </v-button>
    </form>

    <router-link
      :to="{ name: 'password.request' }"
      class="text-xs mb-3 text-blue-600 size-anim"
    >
      {{ $t('forgot_password') }}
    </router-link>

    <hr class="w-2/4 mx-auto mb-4 border-gray-400 border-t border-solid" />

    <router-link
      :to="{ name: '' }"
      class="btn cus-button bg-blue-200 text-white-100 mx-auto mb-4"
    >
      <img
        src="@/assets/images/icons/facebook.svg"
        alt="facebook"
        class="social-icon"
      />
      {{ $t('sign_up_facebook') }}
    </router-link>
    <router-link
      :to="{ name: '' }"
      class="btn cus-button bg-white text-gray-700 mx-auto"
    >
      <img
        src="@/assets/images/icons/google.svg"
        alt="google"
        class="social-icon"
      />
      {{ $t('sign_up_google') }}
    </router-link>

    <p class="text-xs mt-12 mb-8 font-normal text-gray-100">
      {{ $t('do_not_account') }}
      <router-link :to="{ name: 'register' }" class="text-sky-100">
        {{ $t('sign_up') }}
      </router-link>
    </p>
  </div>
</template>

<script>
import Form from 'vform'
import VButton from '../../components/Button'

export default {
  components: { VButton },
  middleware: 'guest',
  layout: 'basic',

  metaInfo() {
    return { title: this.$t('login') }
  },

  data: () => ({
    form: new Form({
      email: '',
      password: ''
    }),
    remember: false,
    isLoaded: false
  }),

  mounted() {
    setTimeout(() => {
      this.isLoaded = true
    }, 30)
  },

  methods: {
    login: async function() {
      try {
        const { data } = await this.form.post(
          `${process.env.VUE_APP_API_URL}/api/login`
        )

        // Save the token.
        this.$store.dispatch('auth/saveToken', {
          token: data.token,
          remember: this.remember
        })

        // Fetch the user.
        await this.$store.dispatch('auth/fetchUser')

        // Redirect home.
        this.$router.push({ name: 'alarm' })
      } catch (e) {
        const error = { ...e }
        console.error('login', error.response.data.message)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/pages/auth/login';
</style>
