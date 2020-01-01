import Vuex from 'vuex'
import axios from '~/plugins/axios'

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            counter: 0,
            // auth: false,
            errors: [],
            user: {},
            products: []
        }),
        getters: {
            // auth(state) {
            //     return state.auth
            // },
            errors(state) {
                return state.errors
            },
            user(state) {
                return state.user
            },
            products(state) {
                return state.products
            }
        },
        mutations: {
            increment(state) {
                state.counter++
            },
            login(state, res) {
                state.errors = []
                state.user = res.data.user
                if (res.data.auth) {
                    state.auth = res.data.auth
                }
            },
            errors(state, errors) {
                state.errors = []
                if (errors) {
                    state.errors.push(errors)
                }
            },
            logout(state, auth) {
                state.auth = auth
            },
            signup(state) {
                state.errors = []
            },
            getproducts(state, res) {
                state.products = res.data.products
                state.auth = res.data.auth
            },
            authenticate(state, auth) {
                state.auth = auth
            }
        },
        actions: {
            async login({ commit }, formData) {
                let res = await axios.post('/user/login', formData)
                if (res.data.response) {
                    commit('errors', res.data.response.error)
                    this.$router.push('/')
                } else {
                    localStorage.setItem('id', res.data.user._id)
                    commit('login', res)
                    this.$router.push('/user/dashboard')
                }
            },
            async logout({ commit }, auth) {
                commit('logout', auth)
                this.$router.push('/')
            },
            async getuser(id) {
                let res = await axios.get('/user/' + id)
                if (res.data.response) {
                    commit('errors', res.data.response.error)
                    this.$router.push('/')
                } else {
                    localStorage.setItem('id', res.data.user._id)
                    commit('login', res)
                }

            },
            async signup({ commit }, formData) {
                console.log('this.form', formData)
                let res = await axios.post('/auth/register', formData);
                console.log(res);
                if (res.data.response) {
                    commit('errors', res.data.response.error)
                        // this.$router.push('/signup')
                } else {
                    commit('errors', 'Created successfully')
                    this.$router.push('/')
                }
            },
            async getproducts({ commit }) {
                let res = await axios.get('/products')
                if (res.data.products) {
                    commit('getproducts', res)
                }
            },
            async dashboard({ commit }, auth) {
                commit('authenticate', auth)
            },
            async updateproduct({ commit }, item) {
                await axios.patch('/products/' + item._id, item)
            },
            async deleteproduct({ commit }, id) {
                await axios.delete('/products/' + id)
            }
        }
    })
}

export default createStore