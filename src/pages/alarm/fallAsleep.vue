<template>
  <div
    class="w-full flex flex-col text-center overflow-y-auto overflow-x-hidden after-alarm-question-page bg-primary"
    :class="`${isLoaded ? 'loaded' : ''}`"
  >
    <span class="question-title mt-8">{{ $t('question') }} 1</span>

    <div class="relative text-center mt-4 mb-12 relative text-xl font-semibold">
      <router-link :to="{ name: 'alarm.stop' }">
        <img
          src="@/assets/images/icons/back.png"
          alt="back"
          class="absolute back-icon"
        />
      </router-link>
    </div>

    <h1 class="text-sky-400 text-2xl mx-12 text-white font-bold">
      {{ $t('sleep_time_question') }}
    </h1>

    <div class="flex flex-col mt-8 mb-auto flex-grow">
      <div class="bedtime-desc text-lg font-normal">
        <div>{{ $t('bedtime_desc') }}</div>
        <div>{{ bedTime }}</div>
      </div>

      <div class="my-auto" />
      <in-time-select
        size="md"
        :height="50"
        top-mask="linear-gradient(rgba(9, 31, 67, 0.8) 25%, rgba(0, 0, 0, 0) 100%)"
        bottom-mask="linear-gradient(rgba(0, 0, 0, 0) 35%, rgba(9, 31, 67, 0.8) 50%, rgba(9, 31, 67, 0.9) 90%)"
        active-color="#ADC9FF"
        base-color="#333f5b"
        @onChange="handleTimeChange($event)"
      />
      <div class="my-auto" />
    </div>

    <div
      class="btn background-none mx-auto my-8 text-xl px-12 py-2 bg-transparent customize-btn"
      @click="handleSubmit()"
    >
      {{ $t('confirm') }}
    </div>

    <div class="my-8 self-center">
      <Bullets :size="3" :current-status="0" />
    </div>
  </div>
</template>

<script>
import Bullets from '../../components/alarm/Bullets'
import InTimeSelect from '../../components/alarm/InTimeSelect'
import moment from 'moment'
import axios from 'axios'

export default {
  layout: 'basic',

  components: { Bullets, InTimeSelect },

  metaInfo() {
    return { title: this.$t('home') }
  },

  data: function() {
    return {
      title: process.env.APP_NAME,
      isLoaded: false,
      hour: 0,
      min: 0
    }
  },

  computed: {
    bedTime() {
      const journal = this.$store.state.journal.journal
      return journal && journal.get_bed_time
        ? moment(journal.get_bed_time).format('HH:mm')
        : ''
    }
  },

  mounted() {
    setTimeout(() => {
      this.isLoaded = true
    }, 30)
  },

  methods: {
    handleTimeChange: function(e) {
      this.hour = e.hour
      this.min = e.min
    },
    handleSubmit: async function() {
      try {
        const journal = this.$store.state.journal.journal
        if (!journal || !journal.id) {
          alert('There is no alarm!')
          this.$router.push({ name: 'alarm' })
          return
        }

        const res = await axios.put(
          `${process.env.VUE_APP_API_URL}/journals/${journal.id}`,
          {
            fall_asleep_time: moment(
              `${this.hour}:${this.min}`,
              'HH:mm'
            ).format('HH:mm:ss')
          }
        )

        this.$store.dispatch('journal/setJournal', { journal: res.data })

        this.$router.push({ name: 'alarm.sleepness' })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/pages/alarm/afterSleep';
</style>
