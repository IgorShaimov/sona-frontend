<template>
  <div class="w-full flex flex-col text-center reset-send-page bg-sky-400">
    <h1
      class="text-blue-100 text-center text-3xl font-bold tracking-wide my-24"
    >
      {{ $t('soonna') }}
    </h1>

    <h1
      class="text-sky-100 text-center text-xl md:text-3xl lg:text-4xl font-extrabold tracking-wide mb-4"
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
      @submit.prevent="send"
      class="flex flex-col items-center"
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

      <v-button
        class="btn cus-button mx-auto mb-12 bg-sky-100"
        :loading="form.busy"
      >
        {{ $t('send_password_reset_link') }}
      </v-button>
    </form>
    <div v-else class="text-center mb-auto">
      <fa
        :icon="['far', 'envelope-open']"
        class="text-blue-500 opacity-50 text-7xl mb-4"
      />
      <h1 class="text-3xl font-bold text-blue-600 leading-loose">
        You've got mail
      </h1>
      <h2 class="text-base font-medium text-blue-500">
        {{ status }}
      </h2>
    </div>

    <router-link
      :to="{ name: 'login' }"
      class="btn back-btn mx-auto mb-12 text-sky-100"
    >
      <fa :icon="['fas', 'chevron-left']" class="mr-5 text-sm" />
      {{ $t('sign_in') }}
    </router-link>
  </div>
</template>

<script>
import Form from 'vform'

export default {
  middleware: 'guest',
  layout: 'basic',

  metaInfo() {
    return { title: this.$t('reset_password') }
  },

  data: () => ({
    status: null,
    form: new Form({
      email: ''
    })
  }),

  methods: {
    async send() {
      const { data } = await this.form.post(
        `${process.env.VUE_APP_API_URL}/api/password/email`
      )

      this.status = data.status

      this.form.reset()
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/pages/auth/password/email';
</style>
