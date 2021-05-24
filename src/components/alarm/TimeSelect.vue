<template>
  <div
    class="flex items-center self-center text-5xl md:text-6xl lg:text-7xl font-normal tracking-wide text-white px-4 time-wrapper relative"
    :style="`height: ${height}px`"
  >
    <div
      id="h-select"
      class="hour absolute flex flex-col"
      @scroll="handleHourScroll($event)"
    >
      <div
        v-for="(hour, index) in Array(24)"
        :key="index"
        class="time text-right"
        :style="`min-height: ${height}px`"
      >
        {{ index }}
      </div>
    </div>
    <span class="px-4 pb-2 colon">:</span>
    <div
      id="m-select"
      class="min absolute flex flex-col"
      @scroll="handleMinScroll($event)"
    >
      <div
        v-for="(min, index) in Array(60)"
        :key="index"
        class="time text-right"
        :style="`min-height: ${height}px`"
      >
        {{ index }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    height: {
      type: Number,
      default: 75
    }
  },
  data: function() {
    return {
      min: 0,
      hour: 0,
      htimerId: 0,
      mtimerId: 0
    }
  },
  methods: {
    handleMinScroll: function(e) {
      window.clearTimeout(this.mtimerId)

      this.mtimerId = setTimeout(() => {
        this.min = Math.round(e.target.scrollTop / this.height)
        e.target.scrollTop =
          Math.round(e.target.scrollTop / this.height) * this.height
      }, 100)
    },
    handleHourScroll: function(e) {
      window.clearTimeout(this.htimerId)

      this.htimerId = setTimeout(() => {
        this.hour = Math.round(e.target.scrollTop / this.height)
        e.target.scrollTop =
          Math.round(e.target.scrollTop / this.height) * this.height
      }, 100)
    },
    init: function() {
      this.hour = moment().hour()
      this.min = moment().minutes()
      const hSelector = document.getElementById('h-select')
      hSelector.scrollTop = this.hour * this.height
      const mSelector = document.getElementById('m-select')
      mSelector.scrollTop = this.min * this.height
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped lang="scss">
.time-wrapper {
  min-width: 180px;
  position: relative;
}
.min {
  height: 100%;
  overflow: auto;
  right: 1rem;
}
.colon {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.hour {
  height: 100%;
  overflow: auto;
  left: 1rem;
}
</style>
