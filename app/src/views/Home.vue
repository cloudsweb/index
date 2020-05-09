<template>
  <div class="home">
    <Topic topic-id="~root"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Topic from '@/components/Topic.vue'

export default {
  name: 'Home',
  components: {
    Topic
  }
}
</script>
