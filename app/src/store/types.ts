export class Display {
  static fallback = 'en_US'
  data!: Record<string, string>
  constructor (data: Record<string, string> | string) {
    if (typeof data === 'string') {
      this.data = { [Display.fallback]: data }
    } else {
      this.data = data
    }
  }

  get (lang: string) {
    return this.data[lang] || this.data[Display.fallback]
  }
}

export type node = {
  name: string;
  topic: topic;
  display: Display;
}

export type topic = {
  name: string;
  parent: string | null;
  sub: string[];
  display: Display;
  nodes: string[];
}
