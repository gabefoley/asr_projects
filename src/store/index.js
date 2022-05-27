import { createStore} from 'vuex'
import axios from 'axios';

const resource_uri = "http://localhost:5000/get";

const goods_uri = "http://localhost:5000/goods/get";

const store = createStore({

    state: {
        layout:  [],
        goods : ['gabe']
    },

    getters : {
        layout: state => state.layout,
        goods: state => state.goods

    },


actions : {
    async fetchLayout({ commit }) {
        console.log("Fetch layout")
        const response = await axios.get(resource_uri);
        console.log("Here is what axios got from postgres")
        console.log(response.data)    
        commit('setLayout', response.data);
    },
    async addStep( { commit }, step) {
        const response = await axios.post(resource_uri, step);
        commit('newStep', response.data);
    },
    async updateStep( { commit }, step) {
        const response = await axios.put(`${resource_uri}${step.id}`, step);
        commit('updStep', response.data);
    },
    async removeStep( { commit }, step) {
        await axios.delete(`${resource_uri}${step.id}`);
        console.log("Called remove step from within store")
        commit('deleteStep', step);
    },

    async fetchGoods({ commit }) {
        console.log("Fetch the goods")
        const response = await axios.get(goods_uri);
        console.log("Here is what axios got from postgres")
        console.log(response.data)    
        commit('setGoods', response.data);
    },
},

mutations : {
    setLayout: (state, layout) => state.layout = layout,
    newStep: (state, step) => state.layout.unshift(step),
    updStep: (state, updatedTask) => {
        const index = state.tasks.findIndex(t => t.id === updatedTask.id);
        if(index !== -1) {
            state.tasks.splice(index, 1, updatedTask);
        }        
    },
    deleteStep: (state, step) => state.layout = state.layout.filter(s => step.id !== s.id),
    setGoods: (state, goods) => state.goods = goods

},





})

export default store
