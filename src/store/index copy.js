import { createStore} from 'vuex'

const store = createStore({

        state () {
            return {
            loadedSteps: []
            }
        },
        mutations : {
            setSteps(state, steps){
                state.loadedSteps.push(steps)
            }
        },
        actions : {
            setSteps(vuexContext, steps){
                vuexContext.commit('setSteps', steps)

            }
        },
        getters : {
            getSteps(state) {
            return state.loadedSteps
        }}
    })

export default store
