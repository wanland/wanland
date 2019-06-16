import { CHANGE_USER_INFO } from '../mutations-type'
const state = {
  userInfo: {
    avatarUrl: '',
    nickName: '',
    account: ''
  }
}

const mutations = {
  [CHANGE_USER_INFO] (state, info) {
    state.userInfo = info
  }
}

const actions = {
  changeUserInfo ({commit}, info) {
		console.log(info, 'info')
    commit(CHANGE_USER_INFO, info)
  }
}

export default {
  state,
  mutations,
  actions
}
