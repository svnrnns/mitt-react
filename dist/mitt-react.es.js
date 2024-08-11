import { useCallback as f, useEffect as u } from "react";
function s(t) {
  return { all: t = t || /* @__PURE__ */ new Map(), on: function(i, e) {
    var n = t.get(i);
    n ? n.push(e) : t.set(i, [e]);
  }, off: function(i, e) {
    var n = t.get(i);
    n && (e ? n.splice(n.indexOf(e) >>> 0, 1) : t.set(i, []));
  }, emit: function(i, e) {
    var n = t.get(i);
    n && n.slice().map(function(o) {
      o(e);
    }), (n = t.get("*")) && n.slice().map(function(o) {
      o(i, e);
    });
  } };
}
const c = s();
function r(t, i) {
  c.emit(t, i);
}
function a(t, i) {
  const e = f(i, [i]);
  u(() => (c.on(t, e), () => {
    c.off(t, e);
  }), [t, e]);
}
const l = r;
export {
  l as eventEmit,
  r as useEventEmit,
  a as useEventListener
};
