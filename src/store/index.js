import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
    state: {
        drawerOpened: false
    },
    getters: {
        drawer: state => {
            return state.drawerOpened    // 让外界能获取 drawerOpened
        }
    },
    mutations: {
        changeDrawer (state) {   // 让外界能改变drawerOpened
            state.drawerOpened = !state.drawerOpened
        }
    },
    actions: {                // 让外界能通过异步调用的方式 改变drawerOpened
        changeDrawer ({commit}) {
            commit('changeDrawer')
        }
    }
})