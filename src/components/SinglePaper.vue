
<template>
  <div class="single-item">
    <Toast />

    <!-- User {{ $route.params.id }} -->
    <h1>{{ paper_name }}</h1>
    <h3>{{ paper_short_info }}</h3>
    <h3>Status: {{ paper_status }}</h3>

    <!-- {{ markdown }} -->
    <div v-html="markdownToHtml"></div>
  </div>

  <button @click="toggle = !toggle">Edit Description</button>

  <div v-show="toggle">
    <textarea class="markdown-editor" v-model="markdown"></textarea>
    <Button
      label="Update Description"
      icon="pi pi-check"
      class="p-button-text"
      @click="savePaper"
    />
  </div>
</template>
<script>
import { marked } from "marked";
import axios from "axios";

export default {
  data() {
    return {
      markdown: null,
      paper_name: null,
      paper_short_info: null,
      paper_description: null,
      paper_status: null,
      markdownText: null,
      props: null,
      options: null,
      contentRows: null,
      rows: null,
      toggle: false,
    };
  },
  computed: {
    markdownToHtml() {
      if (this.markdown) {
        return marked(this.markdown);
      }

      return '""';
    },
  },
  created() {
    console.log(this.$route);
    // this.productService.getProducts().then(data => this.products = data);
    axios
      .get("http://localhost:5000/papers/get/" + this.$route.params.id)
      .then((response) => {
        console.log(response.data);
        this.paper_id = response.data.paper_id;
        this.paper_name = response.data.paper_name;
        this.paper_short_info = response.data.paper_short_info;
        this.paper_description = response.data.paper_description;
        this.paper_status = response.data.paper_status;
        this.markdown = this.paper_description;
        console.log(this.markdown);
      });
  },

  methods: {
    savePaper(event) {
      this.submitted = true;

      event.preventDefault();
      console.log("Updating Description");

      console.log(this.markdown);

      const paper = JSON.stringify({
        paper_name: this.paper_name,
        paper_short_info: this.paper_short_info,
        paper_description: this.markdown,
        paper_status: this.paper_status,
      });
      axios
        .put("http://localhost:5000/papers/update/" + this.paper_id, paper, {
          headers: { "Content-Type": "application/json" }, // <== add this field
        })
        .then((response) => {
          console.log(response);
        });
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Description Updated",
        life: 3000,
      });
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.markdown-editor {
  width: 900px;
  height: 400px;
  margin-top: 10px;
  overflow: scroll;
}

.single-item {
  /* display: flex; */
  justify-content: center;
  align-items: center;
  margin: 20px;
}
</style>


