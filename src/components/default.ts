import m, { Vnode } from "mithril";

export default {
  view(_vnode: Vnode) {
    return m(".sf-root", [
      m("h1", "Hello, World!")
    ]);
  }
} as m.Component;
