/* eslint-disable promise/param-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth'
import { ROUTE_LOGIN, ROUTE_INIT } from '../routes'
import { USER_REQUEST } from '../actions/user'
import axios from "axios";

const state = { token: localStorage.getItem('keshikiJWT') || '', status: '', hasLoadedOnce: false }

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
}

const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      axios.post(ROUTE_LOGIN, user).then(resp => {
        localStorage.setItem('keshikiJWT', resp.data.token)
        axios.defaults.headers.common['Authorization'] = resp.data.token
        commit(AUTH_SUCCESS, resp)
        dispatch(USER_REQUEST).then((resp) => {
          resolve(resp)
        }).catch((err)=>{
          commit(AUTH_ERROR, err)
          reject(err)  
        })
        
      }).catch(err => {
        commit(AUTH_ERROR, err)
        localStorage.removeItem('keshikiJWT')
        reject(err)
      })
    })
  },
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      axios.defaults.headers.common['Authorization'] = null
      localStorage.removeItem('keshikiJWT')
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.token = resp.data.token
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: (state, err) => {
    state.status = err.response.data.error
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}