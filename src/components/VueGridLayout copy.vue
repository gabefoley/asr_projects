<template>
cc
  <!-- <grid-layout
    v-model:layout="layout"
    :col-num="12"
    :row-height="30"
    is-draggable
    is-resizable
    vertical-compact
    use-css-transforms
  > -->
    <grid-layout
    v-model:layout="layout"
    :col-num="12"
    :row-height="30"
    is-draggable
    is-resizable
    vertical-compact
    use-css-transforms
  >
    <grid-item
      v-for="item in layout"
      :static="item.static"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.id"
    >
        <!-- <grid-item
      v-for="item in loadedSteps"
      :static="false"
      :x="0"
      :y="0"
      :w="2"
      :h="4"
      :i="1"
      :key="item"
    > -->


      <component :is="item.c"></component>

      <!-- <span class="text">{{ itemTitle(item) }}</span> -->
    </grid-item>
  </grid-layout>

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

import {mapState, useStore} from 'vuex'




import Jquerytable from "./Jquerytable.vue";
import TheCharts from "./TheCharts.vue"

var component_dict = {
  "Jquerytable": Jquerytable,
  "TheCharts" : TheCharts
};



import { shallowRef, ref } from "vue";
export default {

      methods: {

            add_component_1(name) {
                console.log('hit compo1')
                console.log(name)
                console.log(this.id)
                this.$store.commit('setSteps', 'compo1')
            }
      },

       computed: {

        ...mapState(['loadedSteps']),


       },
    components: {
        // Jquerytable,
        TheCharts
    },


    
  created() {

    
    const store = useStore()

        console.log('running setup')
        console.log(component_dict)
        const steps = store.state.loadedSteps
        console.log(steps)
        console.log(component_dict)

        console.log('chango bango?')
        console.log(store.getters.getSteps)



        const layout_array = ref([])



        console.log(layout_array)

                    for (let x in steps){

                      const component = shallowRef(component_dict[steps[x]])

                      layout_array.value.push({ x: 0, y: 0, w: 2, h: 4, i: x, static: false, "c" : component })
              console.log(steps[x])
              console.log('hello')
            }

          console.log(layout_array)

          const layout = ref(layout_array



      // { x: 0, y: 0, w: 2, h: 4, i: "1", static: false, "c" : shallowRef(TheCharts) },
    // { x: 0, y: 0, w: 10, h: 10, i: "0", static: false, "c" : shallowRef(Jquerytable) },

    );
    // const layout = ref([
    //   { x: 0, y: 0, w: 2, h: 2, i: "0", static: false },
    //   { x: 2, y: 0, w: 2, h: 4, i: "1", static: true },
    //   { x: 4, y: 0, w: 2, h: 5, i: "2", static: false },
    //   { x: 6, y: 0, w: 2, h: 3, i: "3", static: false },
    //   { x: 8, y: 0, w: 2, h: 3, i: "4", static: false },
    //   { x: 10, y: 0, w: 2, h: 3, i: "5", static: false },
    //   { x: 0, y: 5, w: 2, h: 5, i: "6", static: false },
    //   { x: 2, y: 5, w: 2, h: 5, i: "7", static: false },
    //   { x: 4, y: 5, w: 2, h: 5, i: "8", static: false },
    //   { x: 6, y: 3, w: 2, h: 4, i: "9", static: true },
    //   { x: 8, y: 4, w: 2, h: 4, i: "10", static: false },
    //   { x: 10, y: 4, w: 2, h: 4, i: "11", static: false },
    //   { x: 0, y: 10, w: 2, h: 5, i: "12", static: false },
    //   { x: 2, y: 10, w: 2, h: 5, i: "13", static: false },
    //   { x: 4, y: 8, w: 2, h: 4, i: "14", static: false },
    //   { x: 6, y: 8, w: 2, h: 4, i: "15", static: false },
    //   { x: 8, y: 10, w: 2, h: 5, i: "16", static: false },
    //   { x: 10, y: 4, w: 2, h: 2, i: "17", static: false },
    //   { x: 0, y: 9, w: 2, h: 3, i: "18", static: false },
    //   { x: 2, y: 6, w: 2, h: 2, i: "19", static: false },
    // ]);
    const itemTitle = (item) => {
      let result = item.i;
      if (item.static) {
        result += " - Static";
      }
      return result;
    };
    return {
      layout,
      itemTitle,
    };
  },

};
</script>
<style scoped>
.vue-grid-layout {
  background: #eee;
}
.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  border: 1px solid black;
}
.vue-grid-item .resizing {
  opacity: 0.9;
}
.vue-grid-item .static {
  background: #cce;
}
.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}
.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}
.vue-grid-item .minMax {
  font-size: 12px;
}
.vue-grid-item .add {
  cursor: pointer;
}
.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>")
    no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}
</style>