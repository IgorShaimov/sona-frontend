<template>
  <div
    class="w-full flex flex-col text-center overflow-y-auto overflow-x-hidden alarm-note-page bg-primary"
    :class="`${isLoaded ? 'active' : ''}`"
  >
    <span class="question-title mt-4">{{ $t('note') }}</span>

    <div class="relative text-center mt-4 mb-12 text-xl font-semibold">
      <router-link :to="{ name: 'alarm.tiredness' }">
        <img
          src="@/assets/images/icons/back.png"
          alt="back"
          class="absolute back-icon"
        />
      </router-link>
      <router-link :to="{ name: 'alarm.stop' }">
        <div class="absolute skip text-sky-400">
          {{ $t('skip') }}
        </div>
      </router-link>
    </div>

    <h1 class="title text-sky-400 text-xl px-2 mb-16 mx-16 font-bold">
      {{ $t('leave_note_desc') }}
    </h1>

    <div class="note-wrapper bg-blue-100">
      <label>Your notes: </label>
      <textarea v-model="notes" rows="8" />
      <div class="text-sky-100 text-right">{{ currentDate }}</div>
    </div>
    <button
      class="btn background-none text-sky-400 mx-auto my-12 text-xl px-12 py-2 bg-transparent customize-btn"
      @click="handleSubmit()"
    >
      <fa :icon="['fas', 'plus']" class="mr-1" />
      {{ $t('add_note') }}
    </button>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  layout: 'basic',

  metaInfo() {
    return { title: this.$t('home') }
  },

  data: function() {
    return {
      title: process.env.APP_NAME,
      isLoaded: false,
      notes: ''
    }
  },

  computed: {
    currentDate() {
      return moment().format('DD/MM/YY')
    }
  },

  mounted() {
    setTimeout(() => {
      this.isLoaded = true
    }, 30)
  },

  methods: {
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
            notes: this.notes
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
@import '@/styles/pages/alarm/note';
</style>
