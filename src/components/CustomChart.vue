<template>
  <div>
    <svg ref="customChart" height="400" width="100%">
      <g>
        <g
          v-for="(label, index) in labels"
          :key="index"
          font-size="14"
          font-family="sans-serif"
          fill="black"
        >
          <text x="0" :y="50 * index + 15" fill="#ADC9FF">
            {{ label.main }}
          </text>
          <text x="0" :y="50 * index + 35" fill="#3e4f83">
            {{ label.sub }}
          </text>
        </g>
      </g>

      <!-- draw x grid line -->
      <g>
        <g v-for="(label, index) in labels" :key="index" stroke="#494D53">
          <line
            x1="40"
            :y1="50 * index + 19"
            x2="100%"
            :y2="50 * index + 19"
            style="stroke:#494D53;stroke-width:1"
          />
        </g>
      </g>
      <g>
        <g v-for="(value, index) in values" :key="index" stroke="#494D53">
          <rect
            v-for="(item, jdx) in value"
            :key="jdx"
            :x="40 + item[0] * yInterval"
            :y="13 + 50 * index"
            :width="(item[1] - item[0]) * yInterval"
            height="12"
            rx="6"
            ry="6"
            fill="#3289AD"
            stroke="none"
          ></rect>
        </g>
      </g>
      <g font-size="12" font-family="sans-serif">
        <text :x="30" y="380" fill="#3e4f83">{{ yLabelsPrefix }}</text>
        <g
          v-for="(label, index) in yLabels"
          :key="index"
          font-size="12"
          font-family="sans-serif"
          fill="black"
        >
          <line x1="30" y1="360" x2="100%" y2="360" stroke="#9BA0A2"></line>
          <text :x="index * yInterval + 50" y="380" fill="#3e4f83">
            {{ label }}
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'CustomChart',
  props: {
    labels: {
      type: Array,
      default: function() {
        return []
      }
    },
    yLabels: {
      type: Array,
      default: function() {
        return []
      }
    },
    yLabelsPrefix: {
      type: String,
      default: ''
    },
    values: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      yInterval: 15
    }
  },
  mounted() {
    this.yInterval =
      (this.$refs.customChart.clientWidth - 70) / (this.yLabels.length - 1)
  }
}
</script>

<style scoped></style>
