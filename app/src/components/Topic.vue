<template>
  <div class="hello">
    <h1>{{ topicDisplay }}</h1>
    <div class="loading" v-if="loading">
      loading...
    </div>
    <ul class="topics" v-if="!loading">
      <li v-for="sub in subtopics" :key="sub">{{ sub }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import toml from 'toml'

@Component
export default class Topic extends Vue {
  @Prop() private topicId!: string;
  lang = 'zh_CN'
  loading = true;
  display: string | null = null;
  subtopics: string[] | null = null;

  created () {
    this.fetchData()
  }

  async fetchData () {
    const resp = await fetch('/@data/topic/meta.toml')
    const text = await resp.text()
    const data = toml.parse(text)
    console.log(data)
    this.loading = true
    this.subtopics = data.topic['sub-topics'] || []
    this.display = data.display[this.lang] || data.display.en_US || null
    this.loading = false
  }

  get topicDisplay () {
    return this.display || this.topicId
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
