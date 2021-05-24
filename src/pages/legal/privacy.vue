<template>
  <div
    class="w-full flex justify-center text-center lg:items-center bg-primary privacy-page"
    :class="`${isLoaded ? 'active' : ''}`"
  >
    <h1
      class="page-title text-center text-white-100 text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide mt-12 mb-16"
    >
      {{ $t('soonna') }}
    </h1>

    <div class="flex flex-col wrapper">
      <h1
        class="text-center text-white-100 text-lg md:text-2xl lg:text-3xl font-semibold tracking-wide mb-8 mt-auto"
      >
        {{ $t('respect_privacy') }}
      </h1>

      <p class="text-base font-medium sm:text-xl text-blue-100 mb-4 leading-6">
        {{ $t('policy_desc1') }}
      </p>

      <p class="text-base font-medium sm:text-xl text-blue-100 leading-6">
        {{ $t('policy_desc2') }}
        <a class="text-sky-100">{{ $t('privacy_policy') }}</a>
        {{ $t('and') }}
        <a class="text-sky-100">{{ $t('terms_of_use') }}</a>
        {{ $t('policy_desc3') }}
      </p>
      <router-link
        :to="{ name: 'gotoAuth' }"
        class="btn btn-allow-notifications text-sky-400 mx-auto mt-16 mb-8"
      >
        {{ $t('allow_notifications') }}
      </router-link>
    </div>
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
    authenticated: 'auth/check'
  }),

  mounted() {
    setTimeout(() => {
      this.isLoaded = true
    }, 30)
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/pages/legal/privacy';
</style>
