<template>
  <div class="slide-container">
    <img
      :src="
        `@/assets/images/icons/emoticon_${
          currentStatus < 3 ? 1 : currentStatus < 5 ? 4 : 5
        }.png`
      "
      alt="emoticon"
      class="emoticon-face mx-auto mb-8"
    />

    <label class="relative">
      <span
        class="slider-track"
        :style="`width: calc(${currentStatus * 20}% - 2rem)`"
        @click.prevent
      />
      <input
        :value="currentStatus"
        type="range"
        min="1"
        max="5"
        class="slider"
        @change="handleChange($event)"
      />
      <span class="slider-back" />
    </label>
    <div class="mx-3 mt-4 flex justify-between items-center">
      <span
        v-for="(i, index) in [1, 2, 3, 4, 5]"
        :key="index"
        :class="`${currentStatus === index + 1 ? 'active' : ''}`"
        class="text-label"
      >
        {{ index + 1 }}
      </span>
    </div>
    <div class="mx-3 mt-4 flex justify-between cate-label">
      <div class="relative">
        <span
          :class="`${currentStatus === 1 ? 'active' : ''}`"
          class="text-base"
        >
          {{ $t(labels[0]) }}
        </span>
      </div>

      <div class="relative ">
        <span
          :class="`${currentStatus === 3 ? 'active' : ''}`"
          class="text-base"
        >
          {{ $t(labels[1]) }}
        </span>
      </div>

      <div class="relative">
        <span
          :class="`${currentStatus === 5 ? 'active' : ''}`"
          class="text-base"
        >
          {{ $t(labels[2]) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'basic',

  props: {
    labels: {
      type: Array,
      default: () => []
    },
    value: {
      type: Number,
      default: 3
    }
  },
  data: () => ({
    title: process.env.APP_NAME,
    currentStatus: 3
  }),

  watch: {
    value: function() {
      this.$nextTick(() => {
        this.currentStatus = parseInt(this.value, 10)
      })
    }
  },

  methods: {
    handleChange: function(e) {
      this.currentStatus = parseInt(e.target.value, 10)
      this.$emit('change', this.currentStatus)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.slide-container {
  min-width: 260px;

  .text-label {
    font-size: 0.75rem;

    &.active {
      font-size: 0.9rem;
    }
  }

  span {
    white-space: nowrap;
    color: #445c87;
    font-weight: 500;

    &.active {
      color: $sky-400;
    }
  }

  .cate-label {
    span {
      position: absolute;
      transform: translate(-50%, 10px);
    }
  }

  .slider-track {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    height: 12px;
    background: $sky-400;
    border-radius: 6px;
    z-index: 10;
  }

  .slider-back {
    width: 100%;
    display: block;
    position: absolute;
    top: 50%;
    height: 12px;
    transform: translateY(-50%);
    background: #445c87;
    border-radius: 1rem;
    opacity: 1;
    z-index: 9;
  }
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 12px;
  position: relative;
  z-index: 11;
  border-radius: 1rem;
  background-color: #00000000;

  outline: none;
  opacity: 1;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  background: $sky-400;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.6);
  cursor: pointer;
  z-index: 99;
}
</style>
