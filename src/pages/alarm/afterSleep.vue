<template>
  <div
    class="w-full flex flex-col text-center overflow-y-auto overflow-x-hidden after-alarm-question-page"
    :class="`${isLoaded ? 'active' : ''}`"
  >
    <span class="question-title mt-8">{{ question }}</span>

    <div class="relative text-center mt-4 mb-12 relative text-xl font-semibold">
      <router-link v-if="currentStep === 0" :to="{ name: 'alarm.stop' }">
        <img
          src="@/assets/images/icons/back.png"
          alt="back"
          class="absolute back-icon"
        />
      </router-link>
      <button v-else @click="currentStep = currentStep - 1">
        <img
          src="@/assets/images/icons/back.png"
          alt="back"
          class="absolute back-icon"
        />
      </button>
    </div>

    <h1 class="title text-2xl mx-12 text-white font-bold">
      {{ questionTitle }}
    </h1>

    <div
      v-show="currentStep === 0"
      class="flex flex-col mt-8 mb-auto flex-grow"
    >
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

    <div v-show="currentStep > 0" class="m-auto">
      <Slider
        :value="currentStep === 1 ? sleepness : mood"
        :labels="
          currentStep === 1
            ? ['bad', 'good', 'super']
            : currentStep === 2
            ? ['not_a_bit', 'good', 'super']
            : ['very', 'a_bit', 'not_at_all']
        "
        @change="handleSliderChange($event)"
      />
    </div>

    <div
      v-show="currentStep < 3"
      class="btn background-none with-google mx-auto my-8 text-xl px-12 py-2 bg-transparent customize-btn"
      @click="handleConfirm()"
    >
      {{ $t('confirm') }}
    </div>

    <button
      v-show="currentStep === 3"
      class="btn background-none with-google mx-auto my-8 text-xl px-12 py-2 bg-transparent customize-btn"
      @click="handleSubmit()"
    >
      {{ $t('complete') }}
    </button>

    <div v-show="currentStep < 3" class="my-8 self-center">
      <Bullets :size="3" :current-status="currentStep" />
    </div>
  </div>
</template>

<script>
import Bullets from '../../components/common/Bullets'
import Slider from '../../components/common/Slider'
import InTimeSelect from '../../components/common/InTimeSelect'
import moment from 'moment'
import axios from 'axios'

export default {
  layout: 'basic',

  components: { Bullets, Slider, InTimeSelect },

  metaInfo() {
    return { title: this.$t('home') }
  },

  data: function() {
    return {
      title: process.env.APP_NAME,
      currentStep: 0,
      isLoaded: false,
      hour: 0,
      min: 0,
      sleepness: 3,
      mood: 3
    }
  },

  computed: {
    bedTime() {
      const journal = this.$store.state.journal.journal
      return journal && journal.get_bed_time
        ? moment(journal.get_bed_time).format('HH:mm')
        : ''
    },
    question() {
      if (this.currentStep < 3) {
        return `${this.$t('question')} ${this.currentStep + 1}`
      }
      return this.$t('daily_question')
    },
    questionTitle() {
      switch (this.currentStep) {
        case 0:
          return this.$t('sleep_time_question')
        case 1:
          return this.$t('good_sleep_question')
        case 2:
          return this.$t('fresh_feel_question')
        case 3:
          return this.$t('sleepy_question')
        default:
          return ''
      }
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
    handleConfirm: function() {
      this.currentStep++
    },
    handleSliderChange: function(e) {
      if (this.currentStep === 1) {
        this.sleepness = e
      } else if (this.currentStep === 2) {
        this.mood = e
      }
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
            ).format('HH:mm:ss'),
            sleepness: this.sleepness,
            mood: this.mood
          }
        )

        this.$store.dispatch('journal/setJournal', { journal: res.data })

        this.$router.push({ name: 'labs.sleep' })
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
