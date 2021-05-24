<template>
  <router-link
    class="w-full flex justify-center items-center text-center bg-primary"
    :to="{ name: 'notifications' }"
  >
    <h1 class="text-white-100 text-center text-3xl font-semibold tracking-wide">
      {{ $t('soonna') }}
    </h1>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'basic',

  metaInfo() {
    return { title: this.$t('home') }
  },

  data: () => ({
    title: process.env.APP_NAME
  }),

  computed: mapGetters({
    authenticated: 'auth/check'
  })
}
</script>

<style scoped lang="scss"></style>
