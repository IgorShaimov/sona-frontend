<template>
  <div class="alarm-page">
    <div
      class="w-full flex flex-col text-center overflow-y-auto overflow-x-hidden bg-black-100 alarm-stop-page"
      :class="`${status === 1 ? 'active' : ''} ${isLoaded ? 'loaded' : ''}`"
    >
      <div class="mx-auto mt-12 clock-wrap">
        <img
          v-show="status === 0"
          src="@/assets/images/icons/clock1.png"
          class="clock_desc"
          alt="alarm"
        />
        <img
          v-show="status === 1"
          src="@/assets/images/icons/clock_active.png"
          class="clock_desc"
          alt="alarm"
        />
        <digital-clock
          :blink="true"
          class="text-sky-100"
          :class="`${status === 2 ? 'active' : ''}`"
        />
      </div>

      <router-link
        :to="{ name: 'alarm' }"
        class="edit_alarm text-sky-100 underline"
      >
        {{ $t('edit alarm time') }}
      </router-link>

      <div class="flex flex-col flex-grow">
        <h1
          class="text-center mt-8 text-primary text-lg md:text-2xl lg:text-3xl font-normal tracking-wide time-duration px-10 helper-text"
        >
          {{ getHelperText }}
        </h1>

        <div
          v-show="status === 1"
          class="flex self-center justify-center items-center stop-alarm-wrapper my-auto relative"
          @click="handleStopAlarm()"
        >
          <div class="inner-wrapper">
            <span class="text-xl stop-alarm-text font-bold">
              {{ $t('Stop alarm') }}
            </span>
          </div>
        </div>
        <div
          v-show="status === 1"
          class="text-sky-400 tracking-wide mb-4"
          @click="handleSnooze()"
        >
          <fa :icon="['fas', 'chevron-up']" class="mr-1" />
          <div>{{ $t('snoose') }}</div>
        </div>
      </div>
    </div>
    <div
      class="w-full flex flex-col text-center overflow-y-auto overflow-x-hidden bg-black-100 alarm-finish-page finish"
      :class="status === 2 ? (snooze ? 'toUp' : 'toBottom') : ''"
    >
      <div class="mx-auto mt-12 clock-wrap">
        <digital-clock :blink="true" class="text-sky-100 active" />
      </div>

      <div class="flex flex-col flex-grow">
        <h1
          class="text-center mt-12 text-primary text-large md:text-2xl lg:text-3xl font-normal tracking-wide time-duration px-10 helper-text"
        >
          {{ $t('good_morning') }}
          <br />
          <span>{{ userName }}!</span>
        </h1>

        <div class="answer-questions text-xl">
          {{ $t('answer_questions') }}
        </div>
        <router-link
          :to="{ name: 'alarm.asleep' }"
          class="btn mx-auto my-8 text-xl px-12 py-2 bg-transparent text-sky-100 customize-btn"
        >
          {{ $t('quick_check_up') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import DigitalClock from 'vue-digital-clock'
import moment from 'moment'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  components: { DigitalClock },
  layout: 'basic',

  metaInfo() {
    return { title: this.$t('home') }
  },

  data: () => ({
    title: process.env.APP_NAME,
    status: 0,
    canStopAlarm: false,
    isLoaded: false,
    helperText: '',
    snooze: false
  }),

  computed: {
    ...mapGetters({
      authenticated: 'auth/check'
    }),
    userName() {
      const user = this.$store.state.auth.user

      if (!user) return ''

      return `${user.firstName} ${user.lastName}`
    },
    getHelperText() {
      return this.helperText
    }
  },

  mounted() {
    const journal = this.$store.state.journal.journal

    if (!journal) {
      this.$router.push({ name: 'alarm' })
    }

    const diffTime = moment(journal.wakeup_time).diff(moment())

    if (diffTime > 0) {
      setTimeout(() => {
        this.status = 1
        this.canStopAlarm = true

        const audio = new Audio('/audio/alarm.wav')
        audio.play()
      }, 3000)
    } else if (diffTime > -900000) {
      this.status = 1
      this.canStopAlarm = true
    } else {
      this.$router.push({ name: 'alarm' })
    }

    setTimeout(() => {
      this.isLoaded = true
    }, 30)

    const hour = Math.floor(diffTime / 3600000)

    if (this.status === 0 || this.status === 1) {
      this.setHelperText(
        `${this.$t('soonna_wakeup_in')} ${hour > 0 ? hour : 0} hrs`
      )
    } else {
      this.setHelperText(`${this.$t('good_morning')}`)
    }

    setInterval(() => {
      const wakeupTime = this.$store.state.journal.journal
        ? this.$store.state.journal.journal.wakeup_time
        : ''

      if (!wakeupTime) return ''

      const diffTime = moment(wakeupTime).diff(moment())
      const hour = Math.round(diffTime / 3600000)

      if (this.status === 0 || this.status === 1) {
        this.setHelperText(
          `${this.$t('soonna_wakeup_in')} ${hour > 0 ? hour : 0} hrs`
        )
      } else {
        this.setHelperText(`${this.$t('good_morning')}`)
      }
    }, 60000)
  },

  methods: {
    setHelperText: function(text) {
      this.helperText = text
    },
    handleStopAlarm: async function() {
      try {
        if (!this.canStopAlarm) return

        const journal = this.$store.state.journal.journal

        if (!journal || !journal.id) {
          alert('There is no alarm!')
          this.$router.push({ name: 'alarm' })
          return
        }

        const diff = Math.floor(moment().diff(journal.get_bed_time) / 1000)
        const res = await axios.put(
          `${process.env.VUE_APP_API_URL}/journals/${journal.id}`,
          {
            sleep_time: `${Math.floor(diff / 3600)}:${Math.floor(
              (diff % 3600) / 60
            )}:${diff % 60}`
          }
        )

        this.status = this.status + 1

        this.$store.dispatch('journal/setJournal', { journal: res.data })
      } catch (err) {
        console.error(err)
      }
    },
    handleSnooze: async function() {
      this.snooze = true
      await this.handleStopAlarm()
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/pages/alarm/alarm';
</style>
