
<template>
  <div class="single-item">
    <Toast />

    <!-- User {{ $route.params.id }} -->
    <h1>{{ project_name }}</h1>
    <h3>{{ project_short_info }}</h3>

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
      @click="saveProject"
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
      project_name: null,
      project_short_info: null,
      project_description: null,
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
      .get("http://localhost:5000/projects/get/" + this.$route.params.id)
      .then((response) => {
        console.log(response.data);
        this.project_id = response.data.project_id;
        this.project_name = response.data.project_name;
        this.project_short_info = response.data.project_short_info;
        this.project_description = response.data.project_description;
        this.markdown = this.project_description;
        console.log(this.markdown);
      });
  },

  methods: {
    saveProject(event) {
      this.submitted = true;

      event.preventDefault();
      console.log("Updating Description");

      console.log(this.markdown);

      const paper = JSON.stringify({
        project_name: this.project_name,
        project_short_info: this.project_short_info,
        project_description: this.markdown,
      });
      axios
        .put(
          "http://localhost:5000/projects/update/" + this.project_id,
          paper,
          {
            headers: { "Content-Type": "application/json" }, // <== add this field
          }
        )
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


