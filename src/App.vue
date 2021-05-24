<template>
  <div id="app">
    <loading ref="loading" />
    <AppLayout>
      <router-view />
    </AppLayout>
    <!-- <transition name="page" mode="out-in">
      <component :is="layout" v-if="layout" />
    </transition> -->
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import AppLayout from '@/layouts/AppLayout'

// Load layout components dynamically.
// const requireContext = require.context('./layouts', false, /.*\.vue$/)

// const layouts = requireContext.keys()
//   .map(file =>
//     [file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)]
//   )
//   .reduce((components, [name, component]) => {
//     components[name] = component.default || component
//     return components
//   }, {})

export default {
  components: {
    Loading,
    AppLayout
  },

  data: () => ({
    // layout: null,
    // defaultLayout: 'default'
  }),

  metaInfo() {
    return {
      title: process.env.APP_NAME,
      titleTemplate: `%s · ${process.env.APP_NAME}`
    }
  },

  mounted() {
    this.$parent.$loading = this.$refs.loading
  },

  methods: {
    /**
     * Set the application layout.
     *
     * @param {String} layout
     */
    // setLayout (layout) {
    //   if (!layout || !layouts[layout]) {
    //     layout = this.defaultLayout
    //   }
    //   this.layout = layouts[layout]
    // }
  }
}
</script>
