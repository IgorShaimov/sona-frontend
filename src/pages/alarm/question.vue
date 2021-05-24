<template>
  <div
    class="w-full flex flex-col text-center overflow-y-auto overflow-x-hidden alarm-question-page"
    :class="`${isLoaded ? 'active' : ''}`"
  >
    <div
      class="relative text-center mt-20 mb-12 relative text-xl font-semibold question-title"
    >
      <router-link :to="{ name: 'alarm' }">
        <fa
          :icon="['fas', 'chevron-left']"
          class="absolute back-icon text-2xl"
        />
      </router-link>
      <span class="">{{ $t('question') }} 1</span>
    </div>

    <h1 class="text-2xl mb-16 mx-16 text-white font-bold">
      {{ $t('sleepy_question') }}
    </h1>

    <span class="mx-auto alarm-icon">
      <img
        src="@/assets/images/icons/emoti.svg"
        alt="emoticon"
        class="emoticon-face"
      />
    </span>

    <div class="my-16 mx-auto">
      <Slider
        :labels="
          currentStep === 1
            ? ['bad', 'good', 'super']
            : ['not_a_bit', 'good', 'super']
        "
        @change="handleChange($event)"
      />
    </div>

    <button
      @click="handleSubmit()"
      :to="{ name: 'alarm.stop' }"
      class="btn background-none with-google mx-auto my-12 bg-transparent customize-btn"
    >
      {{ $t('start') }}
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Slider from '../../components/common/Slider'
import axios from 'axios'
import moment from 'moment'

export default {
  layout: 'basic',
  components: { Slider },

  metaInfo() {
    return { title: this.$t('home') }
  },

  data: function() {
    return {
      title: process.env.APP_NAME,
      tiredness: 3,
      isLoaded: false,
      currentStep: 0
    }
  },

  computed: mapGetters({
    authenticated: 'auth/check'
  }),

  mounted() {
    setTimeout(() => {
      this.isLoaded = true
    }, 30)
  },

  methods: {
    handleChange: function(e) {
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

        const res = await axios.put(
          `${process.env.VUE_APP_API_URL}/journals/${journal.id}`,
          {
            tiredness: this.tiredness,
            get_bed_time: moment().format('YYYY-MM-DD HH:mm')
          }
        )

        this.$store.dispatch('journal/setJournal', { journal: res.data })

        this.$router.push({ name: 'alarm.stop' })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/pages/alarm/question';
</style>
