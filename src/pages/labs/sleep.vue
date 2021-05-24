<template>
  <div
    class="w-full flex flex-col overflow-y-auto overflow-x-hidden bg-black-100 labs-page"
  >
    <div class="w-full flex justify-between px-6 pt-12 items-center mb-6">
      <div class="text-2xl text-white font-bold">
        {{ $t('Sleep lab') }}
      </div>
      <img src="@/assets/images/icons/info.png" alt="info" />
    </div>
    <div class="category-selector-wrapper">
      <div class="category-selector">
        <div
          class="category bg-primary"
          :class="`${category === 'Days' ? 'active' : ''}`"
          @click="category = 'Days'"
        >
          {{ $t('Days') }}
        </div>
        <div
          class="category bg-primary"
          :class="`${category === 'Weeks' ? 'active' : ''}`"
          @click="category = 'Weeks'"
        >
          {{ $t('Weeks') }}
        </div>
        <div
          class="category bg-primary"
          :class="`${category === 'Months' ? 'active' : ''}`"
          @click="category = 'Months'"
        >
          {{ $t('Months') }}
        </div>
        <div
          class="category bg-primary"
          :class="`${category === 'All' ? 'active' : ''}`"
          @click="category = 'All'"
        >
          {{ $t('All') }}
        </div>
      </div>
    </div>

    <div class="w-full flex justify-between px-6 pt-12 items-center mb-6">
      <div class="text-white font-normal">
        {{ $t('Sleep dashboard') }}
      </div>
      <img src="@/assets/images/icons/down.png" alt="download" />
    </div>

    <div class="px-6 sleep-chart">
      <custom-chart
        :labels="xLabels"
        :y-labels="[20, 22, 24, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]"
        :values="sleepValues"
        y-labels-prefix="h"
      ></custom-chart>
    </div>

    <div class="text-white font-normal px-6 pt-12 mb-6">
      {{ $t('Sleep quality') }}
    </div>
    <div class="px-6 mb-32 quality-chart">
      <custom-chart
        :labels="xLabels"
        :y-labels="[1, 2, 3, 4, 5]"
        :values="qualityValues"
        y-labels-prefix="1-5"
      ></custom-chart>
    </div>
    <div class="footer">
      <AlarmFooter />
    </div>
  </div>
</template>
<script>
import AlarmFooter from '../../components/alarm/AlarmFooter'
import axios from 'axios'
import moment from 'moment'
import CustomChart from '../../components/CustomChart'

export default {
  components: { AlarmFooter, CustomChart },
  layout: 'basic',
  data() {
    return {
      xLabels: [],
      category: 'Days',
      journals: [],
      qualityValues: [],
      sleepValues: []
    }
  },
  mounted() {
    axios.get(`${process.env.VUE_APP_API_URL}/journals`).then(res => {
      this.setJournals(res.data)
      this.setData()
    })
  },
  methods: {
    setJournals(data) {
      this.journals = data
    },
    setData() {
      const startDay = moment().add(-6, 'day')
      for (let i = 0; i < 7; i++) {
        this.xLabels.push({
          main: moment(startDay)
            .add(i, 'day')
            .format('ddd'),
          sub: moment(startDay)
            .add(i, 'day')
            .format('DD/M')
        })

        const startTime = moment(
          `${moment(startDay)
            .add(i - 1, 'day')
            .format('YYYY-MM-DD')} 20`,
          'YYYY-MM-DD hh'
        )
        const endTime = moment(
          `${moment(startDay)
            .add(i, 'day')
            .format('YYYY-MM-DD')} 20`,
          'YYYY-MM-DD hh'
        )

        let quality = 0
        let count = 0
        const sleepValue = []

        for (let j = 0; j < this.journals.length; j++) {
          const journal = this.journals[j]
          if (moment(journal.get_bed_time).isBetween(startTime, endTime)) {
            const start =
              moment(journal.get_bed_time).diff(startTime) / 1000 / 7200
            const end =
              moment(journal.wakeup_time).diff(startTime) / 1000 / 7200
            sleepValue.push([start, end])
            quality += journal.sleepness
            count = count + 1
          }
        }
        this.qualityValues.push([[0, count === 0 ? 0 : quality / count]])
        this.sleepValues.push(sleepValue)
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/pages/labs/sleep';
</style>
