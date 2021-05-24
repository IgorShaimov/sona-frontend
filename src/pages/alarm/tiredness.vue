<template>
  <div
    class="w-full flex flex-col text-center overflow-y-auto overflow-x-hidden bg-primary alarm-question-page"
    :class="`${isLoaded ? 'active' : ''}`"
  >
    <span class="question-title mt-4">{{ $t('question') }} 1</span>

    <div class="relative text-center mt-4 mb-12 text-xl font-semibold">
      <router-link :to="{ name: 'alarm' }">
        <img
          src="@/assets/images/icons/back.png"
          alt="back"
          class="absolute back-icon"
        />
      </router-link>
    </div>

    <h1 class="text-sky-400 text-xl mb-16 mx-16 font-bold">
      {{ $t('sleepy_question') }}
    </h1>

    <div class="my-auto mx-auto">
      <Slider
        :labels="['very', 'a_bit', 'not_at_all']"
        @change="handleChange($event)"
      />
    </div>

    <button
      class="btn background-none text-sky-400 mx-auto my-12  px-16 py-2 bg-transparent text-xl customize-btn"
      @click="handleSubmit()"
    >
      {{ $t('continue') }}
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Slider from '../../components/alarm/Slider'
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
            get_bed_time: moment().format('YYYY-MM-DD HH:mm')
          }
        )

        await axios.post(`${process.env.VUE_APP_API_URL}/api/tiredness`, {
          tiredness: this.tiredness,
          journal_id: journal.id
        })

        this.$store.dispatch('journal/setJournal', { journal: res.data })

        this.$router.push({ name: 'alarm.note' })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/pages/alarm/tiredness';
</style>
