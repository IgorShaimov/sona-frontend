import Cookies from 'js-cookie'
import * as types from '../mutation-types'

const journal = Cookies.get('journal')
// state
export const state = {
  journal: journal ? JSON.parse(journal) : null
}

// getters
export const getters = {
  journal: state => state.journal
}

// mutations
export const mutations = {
  [types.SET_JOURNAL](state, { journal }) {
    state.journal = journal
  }
}

// actions
export const actions = {
  setJournal({ commit }, { journal }) {
    if (!journal) return

    commit(types.SET_JOURNAL, { journal })

    Cookies.set('journal', JSON.stringify(journal), { expires: 365 })
  }
}
