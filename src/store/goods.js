import { createStore} from 'vuex'
import axios from 'axios';

const resource_uri = "http://localhost:5000/goods/get";


const store = createStore({

    state: {
        goods:  []
    },

    getters : {
        goods: state => state.goods
    },


actions : {
    async fetchGoods({ commit }) {
        console.log("Fetch the goods")
        const response = await axios.get(resource_uri);
        console.log("Here is what axios got from postgres")
        console.log(response.data)    
        commit('setGoods', response.data);
    },

},

mutations : {
    setGoods: (state, goods) => state.goods = goods
}

})

export default store