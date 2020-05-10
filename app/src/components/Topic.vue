<template>
  <div class="hello">
    <h1>{{ topicDisplay }}</h1>
    <div class="loading" v-if="loading">
      loading...
    </div>
    <ul class="topics" v-if="!loading">
      <li v-for="sub in subTopics" :key="sub.name">{{ sub.display.get(lang) }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { topic } from '@/store/types'

@Component
export default class Topic extends Vue {
  @Prop() private topicId!: string;
  lang = 'zh_CN'
  topic: topic | null = null
  subTopics: topic[] = []

  async created () {
    this.topic = await this.$stock.fetchTopic(this.topicId)
    this.subTopics = await Promise.all(this.topic.sub.map(this.$stock.fetchTopic))
  }

  get loading () {
    return this.topic === null
  }

  get topicDisplay () {
    return this.topic?.display.get(this.lang) || this.topicId
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
