import Vue from 'vue'
import Vuex, { Module, Action, Mutation } from 'vuex-module-decorators'
import { topic, Display } from './types'
import toml from 'toml'

Vue.use(Vuex)

declare module 'vue/types/vue' {
  interface Vue {
    $stock: RootState;
  }
}

@Module
export class RootState extends Vuex.Module {
  topics = new Map<string, topic>()

  @Mutation
  addTopic (topic: topic) {
    this.topics.set(topic.name, topic)
  }

  @Action({ commit: 'addTopic' })
  async fetchTopic (name: string) {
    console.trace('fetching topic', name)
    if (this.topics.get(name) !== undefined) {
      return
    }
    // TODO: normolize name
    const url = name === '~root' ? '/@data/topic/meta.toml' : `/@data/topic/${name}/meta.toml`
    const resp = await fetch(url)
    const text = await resp.text()
    console.log(text)
    const data = toml.parse(text)
    console.log(data)
    return { name, sub: data.topic['sub-topics'] ?? [], display: new Display(data.display ?? name) }
  }
}

export default new Vuex.Store(RootState)
