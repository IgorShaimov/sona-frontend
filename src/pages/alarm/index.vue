<template>
  <div
    class="w-full flex flex-col text-center overflow-y-auto overflow-x-hidden bg-black-100 alarm-page"
    :class="`${isLoaded ? 'active' : ''}`"
  >
    <div class="mt-16 px-6">
      <alarm-selector @change="handleCategoryChange($event)" />
    </div>

    <div class="mt-8">
      <div class="title text-sky-400 mb-2">{{ pageTitle }}</div>
      <div class="desc text-blue-100">{{ description }}</div>
    </div>

    <div class="my-auto" />

    <in-time-select
      size="md"
      :height="50"
      base-color="#333f5b"
      active-color="#2889AD"
      @onChange="handleTimeChange($event)"
    />

    <div class="my-auto" />

    <h1
      class="text-center text-primary text-1xl md:text-2xl lg:text-3xl font-normal tracking-wide text-blue-100"
    >
      {{ sleepTime }}
    </h1>

    <button
      class="btn customize-btn bg-sky-100 text-sky-400 mx-auto px-16 py-2 my-4 text-xl"
      @click="handleSubmit($event)"
    >
      {{ $t('confirm') }}
    </button>

    <AlarmFooter />
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import AlarmFooter from '../../components/alarm/AlarmFooter'
import InTimeSelect from '../../components/alarm/InTimeSelect'
import AlarmSelector from '../../components/AlarmSelector'

export default {
  components: { AlarmFooter, InTimeSelect, AlarmSelector },
  middleware: 'auth',
  layout: 'basic',

  data: () => ({
    title: process.env.APP_NAME,
    time: null,
    hour: 0,
    min: 0,
    category: 'normal',
    isLoaded: false
  }),

  computed: {
    pageTitle() {
      if (this.category === 'normal') {
        return this.$t('alarm_with_range')
      } else if (this.category === 'by_hours') {
        return this.$t('how_many_hours')
      }
      return this.$t('no_alarm')
    },
    description() {
      if (this.category === 'normal') {
        return `${this.$t('soonna_wakeup_at')} ${this.hour}:${this.min}hr`
      } else if (this.category === 'by_hours') {
        return this.$t('choose_how_many_hours_sleep')
      }
      return this.$t('when you wake up')
    },
    sleepTime() {
      const date = this.getWakupDate()
      const diffTime = moment(date).diff(moment())

      return `${Math.floor(diffTime / 1000 / 3600)} hr ${Math.round(
        diffTime / 60000
      ) % 60} of sleep`
      // if (this.category === 'normal' || this.category === 'no_alarm') {
      //   return `${Math.floor(diffTime / 1000 / 3600)} hr ${Math.round(diffTime / 60000) % 60} of sleep`
      // } else if (this.category === 'by_hours') {
      //   return `${this.hour} hr ${this.min} of sleep`
      // }
      // return ''
    }
  },

  mounted() {
    setTimeout(() => {
      this.isLoaded = true
    }, 30)
  },

  methods: {
    handleCategoryChange: function(e) {
      this.category = e
    },
    handleTimeChange: function(e) {
      this.hour = e.hour
      this.min = e.min
    },
    getWakupDate: function() {
      const hour = moment().hour()
      const minutes = moment().minutes()
      let date

      if (this.hour > hour || (this.hour === hour && this.min > minutes)) {
        const year = moment().year()
        const month = moment().month() + 1
        const days = moment().date()
        date = moment(
          `${year}-${month}-${days} ${this.hour}:${this.min}`,
          'YYYY-MM-DD HH:mm'
        )
      } else {
        const year = moment()
          .add(1, 'day')
          .year()
        const month =
          moment()
            .add(1, 'day')
            .month() + 1
        const days = moment()
          .add(1, 'day')
          .date()
        date = moment(
          `${year}-${month}-${days} ${this.hour}:${this.min}`,
          'YYYY-MM-DD HH:mm'
        )
      }

      return date.format('YYYY-MM-DD HH:mm')
    },
    handleSubmit: async function() {
      try {
        const res = await axios.post(
          `${process.env.VUE_APP_API_URL}/api/journals`,
          {
            date: this.getWakupDate()
          }
        )

        this.$store.dispatch('journal/setJournal', { journal: res.data })

        this.$router.push({ name: 'alarm.tiredness' })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/pages/alarm/index';
</style>
