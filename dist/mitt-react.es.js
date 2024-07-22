import { useCallback as c, useEffect as u } from "react";
function r(t) {
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
const f = r();
function m(t, i) {
  const e = c(i, [i]);
  u(() => (f.on(t, e), () => {
    f.off(t, e);
  }), [t, e]);
}
function a(t, i) {
  f.emit(t, i);
}
export {
  a as eventEmit,
  m as useEventListener
};
