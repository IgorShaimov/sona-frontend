<template>
  <div class="w-full flex flex-col text-center reset-page bg-sky-400">
    <h1
      class="text-blue-100 text-center text-3xl font-bold tracking-wide my-24"
    >
      {{ $t('soonna') }}
    </h1>

    <h1
      class="text-center text-sky-100 text-xl md:text-3xl lg:text-4xl font-extrabold tracking-wide mb-4"
    >
      {{ $t('reset_your_password') }}
    </h1>

    <p class="text-xs mb-auto font-normal">
      {{ $t('now_here') }}
      <router-link :to="{ name: 'register' }" class="text-sky-100">
        {{ $t('sign_up') }}
      </router-link>
    </p>
    <form
      v-if="!status"
      class="mb-12 flex flex-col items-center"
      @submit.prevent="reset"
      @keydown="form.onKeydown($event)"
    >
      <label for="email" />
      <input
        id="email"
        v-model="form.email"
        :class="{
          invalid: form.errors.has('email') || form.errors.has('credentials')
        }"
        class="cus-input mb-8 text-center"
        placeholder="soonna@gmail.com"
        name="email"
        type="email"
      />

      <label for="password" />
      <input
        id="password"
        v-model="form.password"
        :class="{
          invalid: form.errors.has('password') || form.errors.has('credentials')
        }"
        class="cus-input mb-8 text-center"
        placeholder="●●●●●●●●"
        name="password"
        type="password"
      />

      <v-button
        class="btn cus-button bg-sky-100 mx-auto mt-auto"
        :loading="form.busy"
      >
        {{ $t('reset_password') }}
      </v-button>
    </form>
    <div v-else class="text-center mb-auto">
      <fa
        :icon="['far', 'check-circle']"
        class="text-blue-500 opacity-50 text-7xl mb-4"
      />
      <h1 class="text-3xl font-bold text-blue-600 leading-loose">
        Reset successful
      </h1>
      <h2 class="text-base font-medium text-blue-500">
        {{ status }}
      </h2>
    </div>

    <router-link
      :to="{ name: 'login' }"
      class="btn back-btn text-sky-100 mx-auto mb-12"
    >
      <fa :icon="['fas', 'chevron-left']" class="mr-5 text-sm" />
      {{ $t('sign_in') }}
    </router-link>
  </div>
</template>

<script>
import Form from 'vform'
import VButton from '../../../components/Button'

export default {
  components: { VButton },
  middleware: 'guest',
  layout: 'basic',

  metaInfo() {
    return { title: this.$t('reset_password') }
  },

  data: () => ({
    status: '',
    form: new Form({
      token: '',
      email: '',
      password: '',
      password_confirmation: ''
    })
  }),

  created() {
    this.form.email = this.$route.query.email
    this.form.token = this.$route.params.token
  },

  methods: {
    async reset() {
      const { data } = await this.form.post(
        `${process.env.VUE_APP_API_URL}/api/password/reset`
      )

      this.status = data.status

      this.form.reset()
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/pages/auth/password/reset';
</style>
