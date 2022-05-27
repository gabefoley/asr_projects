
<template>
  <div class="single-item">
    <Toast />

    <!-- User {{ $route.params.id }} -->
    <h1>{{ recon_name }}</h1>
    <h3>{{ recon_short_info }}</h3>
    <h3>Status: {{ recon_status }}</h3>
    <h3>Files: {{ recon_files }}</h3>
    <h3>Ancestors: {{ recon_ancestors }}</h3>

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
      @click="saveRecon"
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
      recon_name: null,
      recon_short_info: null,
      recon_description: null,
      recon_status: null,
      recon_files: null,
      recon_ancestors: null,
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
      .get("http://localhost:5000/recons/get/" + this.$route.params.id)
      .then((response) => {
        console.log(response.data);
        this.recon_id = response.data.recon_id;
        this.recon_name = response.data.recon_name;
        this.recon_short_info = response.data.recon_short_info;
        this.recon_description = response.data.recon_description;
        this.markdown = this.project_description;
        this.recon_status = response.data.recon_status;
        this.recon_files = response.data.recon_files;
        this.recon_ancestors = response.data.recon_ancestors;

        console.log(this.markdown);
      });
  },

  methods: {
    saveRecon(event) {
      this.submitted = true;

      event.preventDefault();
      console.log("Updating Description");

      console.log(this.markdown);

      const recon = JSON.stringify({
        recon_name: this.recon_name,
        recon_short_info: this.recon_short_info,
        recon_description: this.markdown,
        recon_status: this.recon_status,
        recon_files: this.recon_files,
        recon_ancestors: this.recon_ancestors,
      });
      axios
        .put(
          "http://localhost:5000/recons/update/" + this.recon_id,
          recon,
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


