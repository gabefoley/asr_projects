
<template>
	<div class="single-project">
<!-- User {{ $route.params.id }} -->
<h1> {{project_name}} </h1>



<h3>
	{{ project_description}}

</h3>


<textarea
 class="markdown-input"
 placeholder="Input your markdown here"
 v-model="markdownText"
/>

## Output HTML here

<section class="markdown-output">
  <VueShowdown
    :markdown="markdownText"
    :options="options"
/>
</section>

<!-- ## Set vue-showdown props

<ul class="vue-showdown-props">
  <li
    v-for="prop in Object.keys(props)"
    :key="prop"
  >
    <span>{{ prop }}</span>
    <input
      v-model="props[prop]"
      :type="typeof props[prop] === 'boolean' ? 'checkbox' : 'text'">
  </li>
</ul>

## Set showdown options

<ul class="showdown-options">
  <li
    v-for="opt in Object.keys(options)"
    :key="opt">
    <span>{{ opt }}</span>
    <input
      v-model="options[opt]"
      :type="typeof options[opt] === 'boolean' ? 'checkbox' : 'text'">
  </li>
</ul> -->



<VueShowdown markdown="`vue-showdown` is easy to use :kissing_heart:" />
<VueShowdown
  markdown="## markdown text :kissing_heart:"
  flavor="github"
  :options="{ emoji: true }"
/>

	</div>
</template>

<script>

import axios from 'axios'
// import { ref } from 'vue'

// const markdownText = ref(`\
// ### Hello, Vue Showdown! :tada:

// Input your markdown here and get the HTML right now!

// Set the \`emoji\` option below to enable emoji parsing! :smile:

// Set the \`vueTemplate\` prop below to enable vue template parsing!

// <span v-for="n in 5" :key="n" v-text="n"/>`)

// const props = reactive({
//   vueTemplate: false,
// })

// const options = reactive({
//   omitExtraWLInCodeBlocks: false,
//   noHeaderId: false,
//   prefixHeaderId: false,
//   rawPrefixHeaderId: false,
//   ghCompatibleHeaderId: false,
//   rawHeaderId: false,
//   headerLevelStart: false,
//   parseImgDimensions: false,
//   simplifiedAutoLink: false,
//   excludeTrailingPunctuationFromURLs: false,
//   literalMidWordUnderscores: false,
//   literalMidWordAsterisks: false,
//   strikethrough: false,
//   tables: false,
//   tablesHeaderId: false,
//   ghCodeBlocks: true,
//   tasklists: false,
//   smoothLivePreview: false,
//   smartIndentationFix: false,
//   disableForced4SpacesIndentedSublists: false,
//   simpleLineBreaks: false,
//   requireSpaceBeforeHeadingText: false,
//   ghMentions: false,
//   ghMentionsLink: 'https://github.com/{u}',
//   encodeEmails: true,
//   openLinksInNewWindow: false,
//   backslashEscapesHTMLTags: false,
//   emoji: false,
//   underline: false,
//   ellipsis: true,
//   completeHTMLDocument: false,
//   metadata: false,
//   splitAdjacentBlockquotes: false,
// })

// const contentRows = computed(() => markdownText.value.split('\n').length - 1)

// const rows = computed(() => contentRows.value < 3 ? 5 : contentRows.value + 2)


export default {




	data() {

		
		return {
			project_name: null,
			project_description: null,
			markdownText : null,
			props: null,
			options: null,
			contentRows : null,
			rows: null
			

		}

	},



		


		created() {

			

			console.log(this.$route)
		// this.productService.getProducts().then(data => this.products = data);
        axios.get("http://localhost:5000/projects/get/" + this.$route.params.id ).then((response)=>
        {
            console.log(response.data)
            this.project_name = response.data.project_name
			this.project_description = response.data.project_description
        })


		



	},




	
}





</script>

<style scoped>
	.single-project {
    /* display: flex; */
    justify-content: center;
    align-items: center;
	margin: 20px;
}

</style>



