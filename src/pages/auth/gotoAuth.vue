<template>
  <div
    class="w-full flex flex-col text-center goto-auth-page bg-sky-400"
    :class="`${isLoaded ? 'active' : ''}`"
  >
    <h1
      class="text-blue-100 text-center text-3xl font-bold tracking-wide my-auto"
    >
      {{ $t('soonna') }}
    </h1>

    <router-link
      :to="{ name: 'register' }"
      class="btn cus-button bg-sky-100 text-white-100 mt-auto mx-auto mb-4"
    >
      {{ $t('sign_up_email') }}
    </router-link>

    <hr
      class="w-1/4 mx-auto mb-4 border-white border-t border-b border-solid"
    />

    <router-link
      :to="{ name: '' }"
      class="btn cus-button text-white-100 bg-blue-200 mx-auto mb-4"
    >
      <img src="@/assets/images/icons/facebook.svg" class="social-icon mr-1" />
      {{ $t('sign_up_facebook') }}
    </router-link>
    <router-link
      :to="{ name: '' }"
      class="btn cus-button text-gray-700 bg-white mx-auto mb-16"
    >
      <img src="@/assets/images/icons/google.svg" class="social-icon mr-1" />
      {{ $t('sign_up_google') }}
    </router-link>

    <p class="text-xs mb-12 text-gray-100">
      {{ $t('existing_account') }}
      <router-link :to="{ name: 'login' }" class="text-sky-100">
        {{ $t('Sign In') }}
      </router-link>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'basic',

  metaInfo() {
    return { title: this.$t('home') }
  },

  data: () => ({
    title: process.env.APP_NAME,
    isLoaded: false
  }),

  computed: mapGetters({
    authenticated: 'auth/check',
    icon() {
      return ['fas', 'coffee']
    }
  }),

  mounted() {
    setTimeout(() => {
      this.isLoaded = true
    }, 30)
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/pages/auth/gotoAuth';
</style>
