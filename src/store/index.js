import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentSubj: "",
    searchQuery: "",
    article: "",
    searchResults: []
  },
  actions: {
    setResults(ctx, results) {
      ctx.commit("setResults", results)
    },
    setSubject(ctx, subj) {
      ctx.commit("setSubject", subj)
    },
    setArticle(ctx, article) {
      ctx.commit("setArticle", article)
    },
    setQuery(ctx, query) {
      ctx.commit("setQuery", query)
    },
    addResults(ctx, res) {
      ctx.commit("addResults", res)
    }
  },
  mutations: {
    setResults(state, results) {
      state.searchResults = results
    },
    setSubject(state, subj) {
      state.currentSubj = subj
    },
    setArticle(state, article) {
      state.article = article
    },
    setQuery(state, query) {
      state.searchQuery = query
    },
    addResults(state, res) {
      state.searchResults = [...res, ...state.searchResults]
    }
  },
  getters: {
    getResults(state) {
      return state.searchResults
    },
    getSubject(state) {
      return state.currentSubj
    },
    getQuery(state) {
      return state.searchQuery
    }
  },
  modules: {
  }
})
