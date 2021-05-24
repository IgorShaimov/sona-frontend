<template>
  <div
    class="flex flex-col items-center self-center font-normal tracking-wide text-white time-wrapper relative"
    :style="
      `min-height: ${height * 3}px; font-size: ${height > 70 ? '3rem' : '2rem'}`
    "
  >
    <div
      class="overall-top-window"
      :style="topMask && `background-image: ${topMask}`"
    />
    <div
      class="overall-bottom-window"
      :style="bottomMask && `background-image: ${bottomMask}`"
    />

    <div
      class="view-wrapper flex items-center self-center"
      :style="`height: ${height * 3}px`"
    >
      <div
        id="h-select"
        class="hour absolute flex flex-col"
        :style="`height: ${height * 3}px`"
        @scroll="handleHourScroll($event)"
      >
        <div
          v-for="(value, index) in Array(26)"
          :key="index"
          class="time text-right"
          :style="
            `min-height: ${height}px; color: ${
              (index + 23) % 24 === hour ? activeColor : baseColor
            }`
          "
          :class="`${(index + 23) % 24 === hour ? 'active' : ''}`"
        >
          {{ (index + 23) % 24 }}
        </div>
      </div>
      <span class="px-4 pb-2 colon" :style="`color: ${activeColor}`">:</span>
      <div
        id="m-select"
        class="min absolute flex flex-col items-start"
        :style="`height: ${height * 3}px`"
        @scroll="handleMinScroll($event)"
      >
        <div
          v-for="(value, index) in Array(14)"
          :key="index"
          class="time text-right"
          :style="
            `min-height: ${height}px; color: ${
              ((index + 11) % 12) * 5 === min ? activeColor : baseColor
            }`
          "
          :class="`${((index + 11) % 12) * 5 === min ? 'active' : ''}`"
        >
          {{ ((index + 11) % 12) * 5 }}
        </div>
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
    },
    size: {
      type: String,
      default: 'lg'
    },
    topMask: {
      type: String,
      default: ''
    },
    bottomMask: {
      type: String,
      default: ''
    },
    maskBackground: {
      type: String,
      default: ''
    },
    maskBorder: {
      type: String,
      default: ''
    },
    baseColor: {
      type: String,
      default: '#ffffff80'
    },
    activeColor: {
      type: String,
      default: '#ffffff'
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
  mounted() {
    this.init()
  },
  methods: {
    handleMinScroll: function(e) {
      window.clearTimeout(this.mtimerId)

      this.mtimerId = setTimeout(() => {
        this.min = Math.round(e.target.scrollTop / this.height) * 5
        e.target.scrollTop =
          Math.round(e.target.scrollTop / this.height) * this.height
        this.$emit('onChange', { hour: this.hour, min: this.min })
      }, 100)
    },
    handleHourScroll: function(e) {
      window.clearTimeout(this.htimerId)

      this.htimerId = setTimeout(() => {
        this.hour = Math.round(e.target.scrollTop / this.height)
        e.target.scrollTop =
          Math.round(e.target.scrollTop / this.height) * this.height
        this.$emit('onChange', { hour: this.hour, min: this.min })
      }, 100)
    },
    init: function() {
      this.hour = moment().hour()
      this.min = Math.round(moment().minutes() / 5) * 5

      const hSelector = document.getElementById('h-select')
      hSelector.scrollTop = this.hour * this.height

      const mSelector = document.getElementById('m-select')
      mSelector.scrollTop = Math.round(this.min / 5) * this.height
    }
  }
}
</script>

<style scoped lang="scss">
.time-wrapper {
  min-width: 200px;
  position: relative;
  padding: 0;
  color: #2d3748;
  font-weight: bold;
}
.view-wrapper {
  width: 100%;
}
.min {
  height: 100%;
  overflow: auto;
  right: 0;
}
.colon {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.hour {
  height: 100%;
  overflow: auto;
  left: 0;
}
.time {
  display: block;
  z-index: 1;

  &.active {
    z-index: 100;
    color: white;
  }
}
.overall-top-window {
  position: absolute;
  width: 150vw;
  height: 30%;
  top: 0;
  left: -50vw;
  background-image: linear-gradient(
    rgba(1, 7, 16, 0.8) 35%,
    rgba(0, 0, 0, 0) 70%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 200;
}
.overall-bottom-window {
  position: absolute;
  width: 150vw;
  bottom: 0;
  height: 30%;
  left: -50vw;
  background-image: linear-gradient(
    rgba(0, 0, 0, 0) 40%,
    rgba(1, 7, 16, 0.8) 100%
  );
  z-index: 200;
}
.view-window {
  background: #1276ff38;
  border: 1px solid #1276ff99;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  z-index: 3;
}
#h-select,
#m-select {
  z-index: 100;
  width: 50%;
  padding: 0 1.5rem;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
