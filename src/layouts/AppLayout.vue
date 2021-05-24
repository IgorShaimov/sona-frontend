<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
const defaultLayout = 'default'
export default {
  name: 'AppLayout',
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout
      if (this.$route.name === null) {
        return () => import(`@/layouts/basic.vue`)
      } else {
        return () => import(`@/layouts/${layout}.vue`)
      }
    }
  }
}
</script>
