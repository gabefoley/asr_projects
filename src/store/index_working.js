// import { markRaw } from 'vue';
import { createStore} from 'vuex'
import axios from 'axios';

// import TheCharts from "../components/TheCharts.vue"
// import Jquerytable from "../components/Jquerytable.vue"

// var component_dict = {
//   "Jquerytable": Jquerytable,
//   "TheCharts" : TheCharts
// };

const store = createStore({
    state: {
        layout:  []
    },
    mutations: {
        set_layout(state, new_layout) {
            console.log("mutation called from store")
            console.log(state)
            console.log(new_layout)
            state.layout = new_layout

        },

        add_layout(state, new_layout){
            state.layout.push(new_layout)

        },

        store_in_database(state){
            axios.push(state)

        }

    },
    getters: {
        layout(state) {
            console.log("getter called from store")
            axios.get("http://localhost:5000/get")
            
            .then((response)=>
            {
                console.log("got from the db")
                console.log(response.data)
                console.log(response.data.data)
                state.layout = [response.data];
            })
            return state.layout
        }
    }
})

      // { x: 0, y: 0, w: 2, h: 4, i: "1", static: false, "c" : shallowRef(TheCharts) },

export default store



