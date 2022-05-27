<template>
<div>

    <draggable 
  v-model="goodsFromStore" 
  group="people" 
  @start="drag=true" 
  @end="drag=false" 
  item-key="id">
  <template #item="{element}">
    <div>{{element.name}}</div>
   </template>
</draggable>

    {{goods}}
</div>
</template>


<script>
  import draggable from 'vuedraggable'


   export default{

       components: {
           draggable
       },
        data() {
            return {
                goods: [],
                drag: false,

            }
        },
        created() {
          console.log("Called created")
          console.log(this.goodsFromStore)
            this.goods = JSON.parse(JSON.stringify(this.goodsFromStore));
        },

        // watch: {
        //     layoutFromStore(val) {
        //       console.log('here is something')
        //       console.log(val)
        //         if (val) {
        //           console.log("layoutfrom store changed")
        //           console.log(this.layoutFromStore)
        //             // this.layout = JSON.parse(JSON.stringify(this.layoutFromStore));
        //         }
        //     },
        // },
        computed: {
            goodsFromStore: {
                get() {
                    console.log('called getter')
                  console.log(this.$store.getters['goods'])
                return this.$store.getters['goods']

                },

                

            }
        },
        // methods:{
        //     layoutUpdatedEvent: function(newLayout){
        //       console.log('updated event')

        //         let filtered;
        //         filtered = newLayout.map( (item) => { return { x: item.x, y: item.y, w: item.w, h: item.h, i: item.i, static: item.static, c : item.c }})


        //         this.$store.commit('setLayout', filtered);
        //     },

        //     removeItem(val){
        //       console.log("Called remove item")
        //       console.log(this.layoutFromStore)
        //       console.log(val)
        //       const index = this.layoutFromStore.map(item => item.i).indexOf(val);
        //       console.log(index)
        //       this.layoutFromStore.splice(index, 1);
        //                       this.$store.commit('setLayout', this.layout);

        //     }
        // }
    }


</script>