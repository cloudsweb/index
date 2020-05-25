<template>
  <div class="hello">
    <div class="topic-chain" v-if="!loading">
      <span v-for="ancestor in ancestorTopics" :key="ancestor.name">
        <router-link :to="topicUrl(ancestor)">
          {{ ancestor.display.get(lang) }}
        </router-link>
        /
      </span>
    </div>
    <h1>{{ topicDisplay }}</h1>
    <div class="loading" v-if="loading">
      loading...
    </div>
    <ul class="topics" v-if="!loading">
      <li v-for="sub in subTopics" :key="sub.name">
        <router-link :to="topicUrl(sub)">
          {{ sub.display.get(lang) }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { topic } from '@/store/types'

@Component
export default class Topic extends Vue {
  @Prop() private topicId!: string;
  lang = 'zh_CN'
  topic: topic | null = null
  subTopics: topic[] = []
  ancestorTopics: topic[] = []

  created () {
    this.update()
  }

  @Watch('topicId')
  async update () {
    this.topic = await this.$stock.fetchTopic(this.topicId)
    this.subTopics = await Promise.all(this.topic.sub.map(this.$stock.fetchTopic))
    const ancestors = []
    let current = this.topic
    while (current.parent !== null) {
      current = await this.$stock.fetchTopic(current.parent)
      ancestors.push(current)
    }
    this.ancestorTopics = ancestors.reverse()
  }

  get loading () {
    return this.topic === null
  }

  get topicDisplay () {
    return this.topic?.display.get(this.lang) || this.topicId
  }

  topicUrl (topic: topic) {
    return `/topic/${topic.name}`
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
