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

export type topic = {
  name: string;
  sub: string[];
  display: Display;
}
