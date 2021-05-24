<template>
  <div
    class="w-full flex flex-col text-center overflow-y-auto overflow-x-hidden after-alarm-question-page bg-primary"
    :class="`${isLoaded ? 'loaded' : ''}`"
  >
    <span class="question-title mt-8">{{ $t('question') }} 3</span>

    <div class="relative text-center mt-4 mb-12 relative text-xl font-semibold">
      <router-link :to="{ name: 'alarm.sleepness' }">
        <img
          src="@/assets/images/icons/back.png"
          alt="back"
          class="absolute back-icon"
        />
      </router-link>
    </div>

    <h1 class="text-sky-400 text-2xl mx-12 text-white font-bold">
      {{ $t('fresh_feel_question') }}
    </h1>

    <div class="m-auto">
      <Slider
        :value="mood"
        :labels="['not_a_bit', 'good', 'super']"
        @change="handleSliderChange($event)"
      />
    </div>

    <button
      class="btn background-none mx-auto my-8 text-xl px-12 py-2 bg-transparent customize-btn"
      @click="handleSubmit()"
    >
      {{ $t('complete') }}
    </button>

    <div class="my-8 self-center">
      <Bullets :size="3" :current-status="2" />
    </div>
  </div>
</template>

<script>
import Bullets from '../../components/alarm/Bullets'
import Slider from '../../components/alarm/Slider'
import axios from 'axios'

export default {
  layout: 'basic',

  components: { Bullets, Slider },

  metaInfo() {
    return { title: this.$t('home') }
  },

  data: function() {
    return {
      title: process.env.APP_NAME,
      isLoaded: false,
      mood: 3
    }
  },

  computed: {},

  mounted() {
    setTimeout(() => {
      this.isLoaded = true
    }, 30)
  },

  methods: {
    handleSliderChange: function(e) {
      this.mood = e
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
            mood: this.mood
          }
        )

        this.$store.dispatch('journal/setJournal', { journal: res.data })

        this.$router.push({ name: 'alarm.daily' })
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
