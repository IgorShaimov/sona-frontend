<template>
  <div
    class="w-full flex flex-col text-center overflow-y-auto overflow-x-hidden after-alarm-question-page bg-primary"
    :class="`${isLoaded ? 'loaded' : ''}`"
  >
    <span class="question-title mt-8">{{ $t('daily_question') }}</span>

    <div class="relative text-center mt-4 mb-12 relative text-xl font-semibold">
      <router-link :to="{ name: 'alarm.mood' }">
        <img
          src="@/assets/images/icons/back.png"
          alt="back"
          class="absolute back-icon"
        />
      </router-link>
    </div>

    <h1 class="text-sky-400 text-2xl mx-12 text-white font-bold">
      {{ $t('sleepy_question') }}
    </h1>

    <div class="m-auto">
      <Slider
        :value="tiredness"
        :labels="['very', 'a_bit', 'not_at_all']"
        @change="handleSliderChange($event)"
      />
    </div>

    <button
      class="btn background-none mx-auto my-8 text-xl px-12 py-2 bg-transparent customize-btn"
      @click="handleSubmit()"
    >
      {{ $t('complete') }}
    </button>
  </div>
</template>

<script>
import Slider from '../../components/alarm/Slider'
import axios from 'axios'

export default {
  layout: 'basic',

  components: { Slider },

  metaInfo() {
    return { title: this.$t('home') }
  },

  data: function() {
    return {
      title: process.env.APP_NAME,
      isLoaded: false,
      tiredness: 3
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
      this.tiredness = e
    },
    handleSubmit: async function() {
      try {
        const journal = this.$store.state.journal.journal
        if (!journal || !journal.id) {
          alert('There is no alarm!')
          this.$router.push({ name: 'alarm' })
          return
        }

        await axios.post(`${process.env.VUE_APP_API_URL}/tiredness`, {
          tiredness: this.tiredness,
          journal_id: journal.id
        })

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
