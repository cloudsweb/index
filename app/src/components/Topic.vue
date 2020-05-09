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

@Component
export default class HelloWorld extends Vue {
  @Prop() private topicId!: string;
  loading = true;
  subtopics: string[] | null = null;

  get topicDisplay () {
    return this.topicId
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
