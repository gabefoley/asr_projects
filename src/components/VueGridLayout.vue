<template>
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
    v-model:layout="layoutFromStore"
    :col-num="12"
    :row-height="50"
    is-draggable
    is-resizable
    vertical-compact
    use-css-transforms
  >
    <grid-item
      v-for="item in layoutFromStore"
      :static="item.static"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.i"
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
<!-- <grid-item v-for="item in layout"
               :x="item.x"
               :y="item.y"
               :w="item.w"
               :h="item.h"
               :i="item.i"> -->
             <div v-html="item.c"></div>
<!-- </grid-item> -->
<component :is="item.c" v-html="item.c"/>
      <!-- <component :is="item.c"></component> -->
      <div> test y </div>
      <!-- <span class="text">{{item.i}}</span>
      <span class="remove" @click="removeItem(item.i)">x</span> -->
      <!-- <span class="text">{{ itemTitle(item) }}</span> -->
    </grid-item>
  </grid-layout>

   <div>
        <h1>Here is the from menu</h1>

        <button class="btn btn-primary" @click="add_component_1(chuck)"> Add component 1 </button>
        
        <button class="btn btn-primary" @click="add_component_2"> Add component 2 </button> 
        <!-- {{loadedSteps }} -->

                {{layoutFromStore }}
        <!-- <ul v-for="step in loadedSteps" :key=step.id>
            <li> {{step}} </li>
        </ul> -->

    </div>
</template>



<script>

// import {mapState, useStore} from 'vuex'
import { shallowRef } from "vue";


console.log(shallowRef)
console.log(TheCharts)

// import Jquerytable from "./Jquerytable.vue";
import TheCharts from "./TheCharts.vue"

// var component_dict = {
//   "Jquerytable": Jquerytable,
//   "TheCharts" : TheCharts
// };
    import * as VueGridLayout from "vue-grid-layout";

var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;
   export default{
        data() {
            return {
                layout: []
            }
        },
        created() {
          console.log("Called created")
          console.log(this.layoutFromStore)
            this.layout = JSON.parse(JSON.stringify(this.layoutFromStore));
            // this.layout.push({ x: 0, y: 0, w: 10, h: 10, i: "0", static: false, "c" : shallowRef(TheCharts)})
            console.log(this.layout)
        },
        components: {
            "GridLayout": GridLayout,
            "GridItem": GridItem
        },
        watch: {
            layoutFromStore(val) {
              console.log('here is something')
              console.log(val)
                if (val) {
                  console.log("layoutfrom store changed")
                  console.log(this.layoutFromStore)
                    // this.layout = JSON.parse(JSON.stringify(this.layoutFromStore));
                }
            },
        },
        computed: {
            layoutFromStore: {
                get() {
                  console.log("calling getter")
                  console.log(this.$store.getters['layout'])
                return this.$store.getters['layout']
                },

                set(newLayout) {
                    this.$store.commit('setLayout', newLayout);
                }
            }
        },
        methods:{
            layoutUpdatedEvent: function(newLayout){
              console.log('updated event')

                let filtered;
                filtered = newLayout.map( (item) => { return { x: item.x, y: item.y, w: item.w, h: item.h, i: item.i, static: item.static, c : item.c }})


                this.$store.commit('setLayout', filtered);
            },

            removeItem(val){
              console.log("Called remove item")
              console.log(this.layoutFromStore)
              console.log(val)
              const index = this.layoutFromStore.map(item => item.i).indexOf(val);
              console.log(index)
              this.layoutFromStore.splice(index, 1);
                              this.$store.commit('setLayout', this.layout);

            }
        }
    }


</script>
<style scoped>
.layoutJSON {
    background: #ddd;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
}
.columns {
    -moz-columns: 120px;
    -webkit-columns: 120px;
    columns: 120px;
}
/*************************************/
.remove {
    position: absolute;
    right: 2px;
    top: 0;
    cursor: pointer;
}
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
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
}
</style>