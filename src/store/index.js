import Vue from 'vue'
import Vuex from 'vuex'

import { fetchSurveys, fetchSurvey, saveSurveyResponse } from '@/api'

Vue.use(Vuex)

const state = {
  // Single source of data
  surveys: [],
  currentSurvey: {}
}

const actions = {
  // async operations
  loadSurveys(context) {
    return fetchSurveys()
      .then((res) => context.commit('setSurveys', { surveys: res }))
  },
  loadSurvey(context, { id }) {
    return fetchSurvey(id)
      .then((res) => context.commit('setSurvey', { survey: res }))
  },
  addSurveyResponse(context) {
    return saveSurveyResponse(context.state.currentSurvey)
  },
  submitNewSurvey(context, survey) {
    return postNewSurvey(survey)
  }
}

const mutations = {
  // isolated data changes
  setSurveys(state, payload) {
    state.surveys = payload.surveys
  },
  setSurvey(state, payload) {
    const nQuestions = payload.survey.questions.length
    for (let i = 0; i < nQuestions; i++) {
      payload.survey.questions[i].choice = null
    }
    state.currentSurvey = payload.survey
  },
  setChoice(state, payload) {
    const { questionId, choice } = payload
    nQuestions = state. currentSurvey.questions.length
    for (let i = 0; i < nQuestions; i++) {
      if (state.currentSurvey.question[i].id === questionId) {
        state.currentSurvey.questions[i].choice = choice
        break
      }
    }
  }
}

const getters = {
  // reusable data accessors
}

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})

export default store