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
    const topic = this.topics.get(name)
    if (topic !== undefined) {
      return topic
    }
    console.debug('fetching topic', name)
    // TODO: normolize name
    const url = name === '~root' ? '/@data/topic/meta.toml' : `/@data/topic/${name}/meta.toml`
    const resp = await fetch(url)
    const text = await resp.text()
    const data = toml.parse(text)
    const parent = name.split('/').slice(0, -1).join('/')
    const sub = (data.topic['sub-topics'] ?? []).map((n: string) => n.replace(/^@\//, name + '/'))
    return { name, sub, parent: parent === '' ? null : parent, display: new Display(data.display ?? name) }
  }
}

export default new Vuex.Store(RootState)
