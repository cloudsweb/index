<template>
  <div class="home">
    <Topic :topic-id="topicId"/>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import Topic from '@/components/Topic.vue'

@Component({
  components: { Topic }
})
export default class Home extends Vue {
  get topicId () {
    return this.$route.params.topic_id ?? '~root'
  }
}
</script>
