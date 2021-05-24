<template>
  <div
    class="w-full flex flex-col justify-center items-center text-center bg-primary notifications-page"
    :class="`${isLoaded ? 'active' : ''}`"
  >
    <h1
      class="page-title text-white-100 text-center font-semibold tracking-wide"
    >
      {{ $t('soonna') }}
    </h1>
    <div class="page-content flex flex-col justify-center items-center h-full">
      <div class="mb-8 mx-auto mt-auto">
        <img src="@/assets/images/icons/clockLight.png" alt="alarm" />
      </div>

      <p
        class="text-base font-medium sm:text-xl text-blue-100 mb-32 mx-2 px-10"
      >
        {{ $t('note_desc') }}
      </p>
      <router-link
        :to="{ name: 'privacy' }"
        class="btn btn-allow-notifications text-sky-400 mx-auto mb-8"
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
@import '@/styles/pages/legal/notifications';
</style>
