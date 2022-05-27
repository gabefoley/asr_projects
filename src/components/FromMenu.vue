<template>
    <div>
        <h1>Here is the from menu</h1>

        <button class="btn btn-primary" @click="add_component_1(chuck)"> Add component 1 </button>
        
        <button class="btn btn-primary" @click="add_component_2"> Add component 2 </button> 
        {{loadedSteps }}
        <ul v-for="step in loadedSteps" :key=step.id>
            <li> {{step}} </li>
        </ul>

    </div>
</template>





<script>
import {mapState} from 'vuex'
 
export default {

    computed: {

        ...mapState(['loadedSteps'])
        },

        methods: {
            add_component_1(name) {
                console.log('hit compo1')
                console.log(name)
                console.log(this.id)
                this.$store.commit('setSteps', 'compo1')
            }
        }
    
}


</script>

<style>

</style>