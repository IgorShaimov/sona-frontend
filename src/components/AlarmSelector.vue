<template>
  <div class="alarm-selector">
    <div
      class="category"
      :class="`${category === 'normal' ? 'active' : ''}`"
      @click="handleChange('normal')"
    >
      <div class="text">{{ $t('normal') }}</div>
    </div>
    <div
      class="category"
      :class="`${category === 'by_hours' ? 'active' : ''}`"
      @click="handleChange('by_hours')"
    >
      <div class="text">{{ $t('by_hours') }}</div>
    </div>
    <div
      class="category"
      :class="`${category === 'no_alarm' ? 'active' : ''}`"
      @click="handleChange('no_alarm')"
    >
      <div class="text">{{ $t('no_alarm') }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: 'normal'
    }
  },
  methods: {
    handleChange: function(newCategory) {
      this.category = newCategory
      this.$emit('change', this.category)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/variables.scss';
.alarm-selector {
  display: flex;
  background-color: $blue-400;
  border-radius: 20px;
  border: 1px solid $sky-100;
  align-items: center;

  .category {
    flex: 1;
    text-align: center;
    color: #3a5562;
    font-weight: 500;
    border-radius: 8px;
    height: 100%;
    box-sizing: content-box;

    .text {
      margin: 0.35rem 0;
    }

    &:nth-child(2) {
      .text {
        border-right: 1px solid $sky-100;
        border-left: 1px solid $sky-100;
      }
    }

    &.active {
      background-color: $sky-100;
      color: $sky-400;
      border: 1px solid $sky-100;
      transition: 0.3s background-color, color ease-in;
      .text {
        border-right: 0;
        border-left: 0;
      }
    }

    &:first-child {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }

    &:last-child {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
  }
}
</style>
