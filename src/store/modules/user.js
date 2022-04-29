import { login, userInfo, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/common/auth'

const SET_UUID = 'SET_UUID'
const SET_ACCOUNT = 'SET_ACCOUNT'
const SET_TOKEN = 'SET_TOKEN'
const SET_REALNAME = 'SET_REALNAME'
const SET_AGE = 'SET_AGE'
const SET_SEX = 'SET_AEX'
const SET_MOBILE = 'SET_MOBILE'
const SET_TYPE = 'SET_TYPE'
const SET_ADDRESS = 'SET_ADDRESS'
const SET_CARDNO = 'SET_CARDNO'
const SET_PERMISSIONS = 'PERMISSIONS'
const SET_ALL = 'SET_ALL'
const user = {
  state: {
    uuid: '',
    token: getToken(),
    account: '',
    realName: '',
    age: 0,
    sex: '',
    address: '',
    mobile: '',
    userType: '',
    id: '',
    permissions: ''
  },
  mutations: {
    [SET_UUID](state,uuid){
      state.uuid = uuid
    },
    [SET_ACCOUNT](state, account) {
      state.account = account
    },
    [SET_TOKEN](state, token) {
      state.token = token
    },
    [SET_REALNAME](state, realName) {
      state.realName = realName
    },
    [SET_AGE](state, age) {
      state.age = age
    },
    [SET_SEX](state, sex) {
      state.sex = sex
    },
    [SET_MOBILE](state, mobile) {
      state.mobile = mobile
    },
    [SET_TYPE](state, type) {
      state.type = type
    },
    [SET_ADDRESS](state, address) {
      state.address = address
    },
    [SET_CARDNO](state, id) {
      state.id = id
    },
    [SET_PERMISSIONS](state, permissions) {
      state.permissions = permissions
    },
    [SET_ALL](state, userInfo) {
      state = Object.assign(state, userInfo)
    }
  },
  actions: {
    // 用户登录
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(resp => {
          let data = resp.data.data
          if(resp.data.status === 200) {
            setToken(data.token)
            commit(SET_TOKEN, data.token)
            commit(SET_ACCOUNT, data.loginName)
          }
          return resolve(resp)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 拉取用户信息
    pullUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        userInfo().then(resp => {
          let user = resp.data.data
          let data = user.userInfo
          commit(SET_UUID, data.uuid)
          commit(SET_ACCOUNT, data.loginName)
          commit(SET_REALNAME, data.realName)
          commit(SET_AGE, data.age)
          commit(SET_SEX, data.sex)
          commit(SET_TYPE, data.userType)
          commit(SET_ADDRESS, data.address)
          commit(SET_MOBILE, data.mobile)
          commit(SET_CARDNO, data.id)
          commit(SET_PERMISSIONS, user.permissions)
          return resolve(user)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 用户退出登录
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(resp => {
          removeToken()
          commit(SET_TOKEN, '')
          commit(SET_ACCOUNT, '')
          return resolve()
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 头像更新
    doUpdateAvatar({ commit }, imgFile) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    },
    /**
     * 更新用户信息
     * userInfo: 用户信息表对象
     */
    doUpdateUser({ commit }, userInfo) {
      return new Promise(resolve => {
        commit(SET_ALL, userInfo)
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    }
  },
  getters: {
    token: state => state.token,
    name: state => state.loginName,
    age: state => state.age,
    // avatar: state => state.avatar,
    permissions: state => state.permissions,
    allInfo: state => state
  }
}

export default user
