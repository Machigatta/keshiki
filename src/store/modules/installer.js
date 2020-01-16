/* eslint-disable promise/param-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { INSTALLER_PING, NO_CONNECTION, CONNECTION_SUCCESS } from '../actions/installer'
import { CODE_MAP } from "../actions/errorcodes";
import { ROUTE_PING } from '../routes'
import axios from "axios";

const state = { connectedFlag: localStorage.getItem('keshiki-buildstate') || '', connectionStatus: 'pending...'}

const getters = {
  isConnected: state => !!state.connectedFlag,
  isInstalled: state => !!state.buildstateFlag,
  getConnectionStatus: state => state.connectionStatus,
}

const actions = {
  [INSTALLER_PING]: ({commit,dispatch}) => {
    return new Promise((resolve, reject) => {
      axios.post(ROUTE_PING).then(resp => {
        
      
        commit(CONNECTION_SUCCESS,resp)
        resolve();
      }).catch(err => {
        
        if (!err.response) {
          
            commit(NO_CONNECTION, CODE_MAP['NETWORK_ERROR']);  
          
        }else{
          if(typeof err.response.data.error !== 'undefined'){
            commit(NO_CONNECTION, err.response.data.error);
          }else{
            commit(NO_CONNECTION, CODE_MAP[err.response.status]);
          }
        }
        reject();
      })  
    })    
  },
}

const mutations = {
  [NO_CONNECTION]: (state, errnumber) => {
    localStorage.removeItem('keshiki-buildstate')
    state.connectedFlag = ''
    state.connectionStatus = errnumber;
  },
  [CONNECTION_SUCCESS]: (state, resp) => {
    state.connectionStatus = null;
    localStorage.setItem('keshiki-buildstate',resp.data.meta.buildstate);
    state.connectedFlag = resp.data.meta.buildstate
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}