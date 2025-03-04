var grayscale = (function () {
  var e = {
      colorProps: [
        "color",
        "backgroundColor",
        "borderBottomColor",
        "borderTopColor",
        "borderLeftColor",
        "borderRightColor",
        "backgroundImage",
      ],
      externalImageHandler: {
        init: function (e, t) {
          if (e.nodeName.toLowerCase() === "img") {
          } else {
            r(e).backgroundImageSRC = t
            e.style.backgroundImage = ""
          }
        },
        reset: function (e) {
          if (e.nodeName.toLowerCase() === "img") {
          } else {
            e.style.backgroundImage =
              "url(" + (r(e).backgroundImageSRC || "") + ")"
          }
        },
      },
    },
    t = function () {
      try {
        window.console.log.apply(console, arguments)
      } catch (e) {}
    },
    n = function (e) {
      return new RegExp("https?://(?!" + window.location.hostname + ")").test(e)
    },
    r = (function () {
      var e = [0],
        t = "data" + +new Date()
      return function (n) {
        var r = n[t],
          i = e.length
        if (!r) {
          r = n[t] = i
          e[r] = {}
        }
        return e[r]
      }
    })(),
    i = function (e, t, n) {
      var s = document.createElement("canvas"),
        u = s.getContext("2d"),
        a = e.naturalHeight || e.offsetHeight || e.height,
        f = e.naturalWidth || e.offsetWidth || e.width,
        l
      s.height = a
      s.width = f
      u.drawImage(e, 0, 0)
      try {
        l = u.getImageData(0, 0, f, a)
      } catch (c) {}
      if (t) {
        i.preparing = true
        var h = 0
        ;(function () {
          if (!i.preparing) {
            return
          }
          if (h === a) {
            u.putImageData(l, 0, 0, 0, 0, f, a)
            n
              ? (r(n).BGdataURL = s.toDataURL())
              : (r(e).dataURL = s.toDataURL())
          }
          for (var t = 0; t < f; t++) {
            var c = (h * f + t) * 4
            l.data[c] =
              l.data[c + 1] =
              l.data[c + 2] =
                o(l.data[c], l.data[c + 1], l.data[c + 2])
          }
          h++
          setTimeout(arguments.callee, 0)
        })()
        return
      } else {
        i.preparing = false
      }
      for (var h = 0; h < a; h++) {
        for (var p = 0; p < f; p++) {
          var d = (h * f + p) * 4
          l.data[d] =
            l.data[d + 1] =
            l.data[d + 2] =
              o(l.data[d], l.data[d + 1], l.data[d + 2])
        }
      }
      u.putImageData(l, 0, 0, 0, 0, f, a)
      return s
    },
    s = function (e, t) {
      var n =
        document.defaultView && document.defaultView.getComputedStyle
          ? document.defaultView.getComputedStyle(e, null)[t]
          : e.currentStyle[t]
      if (n && /^#[A-F0-9]/i.test(n)) {
        var r = n.match(/[A-F0-9]{2}/gi)
        n =
          "rgb(" +
          parseInt(r[0], 16) +
          "," +
          parseInt(r[1], 16) +
          "," +
          parseInt(r[2], 16) +
          ")"
      }
      return n
    },
    o = function (e, t, n) {
      return parseInt(0.2125 * e + 0.7154 * t + 0.0721 * n, 10)
    },
    u = function (e) {
      var t = Array.prototype.slice.call(e.getElementsByTagName("*"))
      t.unshift(e)
      return t
    }
  var a = function (t) {
    if (t && t[0] && t.length && t[0].nodeName) {
      var f = Array.prototype.slice.call(t),
        l = -1,
        c = f.length
      while (++l < c) {
        a.call(this, f[l])
      }
      return
    }
    t = t || document.documentElement
    if (!document.createElement("canvas").getContext) {
      t.style.filter =
        "progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)"
      t.style.zoom = 1
      return
    }
    var h = u(t),
      p = -1,
      d = h.length
    while (++p < d) {
      var v = h[p]
      if (v.nodeName.toLowerCase() === "img") {
        var m = v.getAttribute("src")
        if (!m) {
          continue
        }
        if (n(m)) {
          e.externalImageHandler.init(v, m)
        } else {
          r(v).realSRC = m
          try {
            v.src = r(v).dataURL || i(v).toDataURL()
          } catch (g) {
            e.externalImageHandler.init(v, m)
          }
        }
      } else {
        for (var y = 0, b = e.colorProps.length; y < b; y++) {
          var w = e.colorProps[y],
            E = s(v, w)
          if (!E) {
            continue
          }
          if (v.style[w]) {
            r(v)[w] = E
          }
          if (E.substring(0, 4) === "rgb(") {
            var S = o.apply(null, E.match(/\d+/g))
            v.style[w] = E = "rgb(" + S + "," + S + "," + S + ")"
            continue
          }
          if (E.indexOf("url(") > -1) {
            var x = /\(['"]?(.+?)['"]?\)/,
              T = E.match(x)[1]
            if (n(T)) {
              e.externalImageHandler.init(v, T)
              r(v).externalBG = true
              continue
            }
            try {
              var N =
                r(v).BGdataURL ||
                (function () {
                  var e = document.createElement("img")
                  e.src = T
                  return i(e).toDataURL()
                })()
              v.style[w] = E.replace(x, function (e, t) {
                return "(" + N + ")"
              })
            } catch (g) {
              e.externalImageHandler.init(v, T)
            }
          }
        }
      }
    }
  }
  a.reset = function (t) {
    if (t && t[0] && t.length && t[0].nodeName) {
      var i = Array.prototype.slice.call(t),
        s = -1,
        o = i.length
      while (++s < o) {
        a.reset.call(this, i[s])
      }
      return
    }
    t = t || document.documentElement
    if (!document.createElement("canvas").getContext) {
      t.style.filter =
        "progid:DXImageTransform.Microsoft.BasicImage(grayscale=0)"
      return
    }
    var f = u(t),
      l = -1,
      c = f.length
    while (++l < c) {
      var h = f[l]
      if (h.nodeName.toLowerCase() === "img") {
        var p = h.getAttribute("src")
        if (n(p)) {
          e.externalImageHandler.reset(h, p)
        }
        h.src = r(h).realSRC || p
      } else {
        for (var d = 0, v = e.colorProps.length; d < v; d++) {
          if (r(h).externalBG) {
            e.externalImageHandler.reset(h)
          }
          var m = e.colorProps[d]
          h.style[m] = r(h)[m] || ""
        }
      }
    }
  }
  a.prepare = function (e) {
    if (e && e[0] && e.length && e[0].nodeName) {
      var t = Array.prototype.slice.call(e),
        o = -1,
        f = t.length
      while (++o < f) {
        a.prepare.call(null, t[o])
      }
      return
    }
    e = e || document.documentElement
    if (!document.createElement("canvas").getContext) {
      return
    }
    var l = u(e),
      c = -1,
      h = l.length
    while (++c < h) {
      var p = l[c]
      if (r(p).skip) {
        return
      }
      if (p.nodeName.toLowerCase() === "img") {
        if (p.getAttribute("src") && !n(p.src)) {
          i(p, true)
        }
      } else {
        var d = s(p, "backgroundImage")
        if (d.indexOf("url(") > -1) {
          var v = /\(['"]?(.+?)['"]?\)/,
            m = d.match(v)[1]
          if (!n(m)) {
            var g = document.createElement("img")
            g.src = m
            i(g, true, p)
          }
        }
      }
    }
  }
  return a
})()
