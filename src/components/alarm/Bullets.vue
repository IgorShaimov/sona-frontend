<template>
  <div class="flex self-center items-center bullets">
    <div
      v-for="(i, index) in Array(size)"
      :key="index"
      class="dot mx-1"
      :class="`${index === currentStatus ? 'active' : ''}`"
    />
  </div>
</template>

<script>
export default {
  layout: 'basic',

  props: {
    size: {
      type: Number,
      default: 3
    },
    currentStatus: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    title: process.env.APP_NAME,
    status: 0
  })
}
</script>
<style scoped lang="scss">
@import '@/styles/variables.scss';

.bullets {
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 100%;
    border: 1px solid $sky-400;

    &.active {
      width: 14px;
      height: 14px;
      background-color: $sky-400;
      border-color: $sky-400;
    }
  }
}
</style>
