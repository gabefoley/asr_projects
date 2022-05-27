<template>
  <div>

    <h1>EnzOnomy Curation Workflow
    </h1>
    <VueGridLayout/>
    <!-- <caustic-flow/> -->


  </div>
</template>

<script>
// import Jquerytable from "./components/Jquerytable.vue";
// import TheCharts from "./components/TheCharts.vue"
import VueGridLayout from "./VueGridLayout.vue"
// import Flowchart from "./components/Flowchart.vue";
// import GettingStarted from "./components/GettingStarted.vue"
// import Phylocanvas from "./components/Phylocanvas.vue"
// import PhyloTree from "./components/PhyloTree.vue"
// import CausticFlow from "./CausticFlow.vue"

export default {

  components: {
    // TheCharts,
    // Jquerytable,
    VueGridLayout,
    // Phylocanvas,
    // PhyloTree,
    // Flowchart,
    // GettingStarted
    // CausticFlow
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#table {
  display: flex;
  justify-content: center;
  align-items: center;
  background: lightgoldenrodyellow;
}
</style>

