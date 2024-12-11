!(function (t) {
  var e = {}
  function i(n) {
    if (e[n]) return e[n].exports
    var s = (e[n] = { i: n, l: !1, exports: {} })
    return t[n].call(s.exports, s, s.exports, i), (s.l = !0), s.exports
  }
  ;(i.m = t),
    (i.c = e),
    (i.d = function (t, e, n) {
      i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n })
    }),
    (i.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 })
    }),
    (i.t = function (t, e) {
      if ((1 & e && (t = i(t)), 8 & e)) return t
      if (4 & e && "object" == typeof t && t && t.__esModule) return t
      var n = Object.create(null)
      if (
        (i.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var s in t)
          i.d(
            n,
            s,
            function (e) {
              return t[e]
            }.bind(null, s),
          )
      return n
    }),
    (i.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default
            }
          : function () {
              return t
            }
      return i.d(e, "a", e), e
    }),
    (i.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
    }),
    (i.p = ""),
    i((i.s = 13))
})([
  function (t, e, i) {
    var n
    void 0 ===
      (n = function () {
        return (function () {
          "use strict"
          var t
          function e(e) {
            e(t)
          }
          /**
           *  Tone.js
           *  @author Yotam Mann
           *  @license http://opensource.org/licenses/MIT MIT License
           *  @copyright 2014-2018 Yotam Mann
           */ return (
            (function (e) {
              t = e()
            })(function () {
              var t = function () {
                if (!(this instanceof t))
                  throw new Error(
                    "constructor needs to be called with the 'new' keyword",
                  )
              }
              ;(t.prototype.toString = function () {
                for (var e in t) {
                  var i = e[0].match(/^[A-Z]$/),
                    n = t[e] === this.constructor
                  if (t.isFunction(t[e]) && i && n) return e
                }
                return "Tone"
              }),
                (t.prototype.dispose = function () {
                  return this
                }),
                (t.prototype.set = function (e, i, n) {
                  if (t.isObject(e)) n = i
                  else if (t.isString(e)) {
                    var s = {}
                    ;(s[e] = i), (e = s)
                  }
                  t: for (var o in e) {
                    i = e[o]
                    var r = this
                    if (-1 !== o.indexOf(".")) {
                      for (var a = o.split("."), u = 0; u < a.length - 1; u++)
                        if ((r = r[a[u]]) instanceof t) {
                          a.splice(0, u + 1)
                          var l = a.join(".")
                          r.set(l, i)
                          continue t
                        }
                      o = a[a.length - 1]
                    }
                    var h = r[o]
                    t.isUndef(h) ||
                      ((t.Signal && h instanceof t.Signal) ||
                      (t.Param && h instanceof t.Param)
                        ? h.value !== i &&
                          (t.isUndef(n) ? (h.value = i) : h.rampTo(i, n))
                        : h instanceof AudioParam
                        ? h.value !== i && (h.value = i)
                        : t.TimeBase && h instanceof t.TimeBase
                        ? (r[o] = i)
                        : h instanceof t
                        ? h.set(i)
                        : h !== i && (r[o] = i))
                  }
                  return this
                }),
                (t.prototype.get = function (e) {
                  t.isUndef(e)
                    ? (e = this._collectDefaults(this.constructor))
                    : t.isString(e) && (e = [e])
                  for (var i = {}, n = 0; n < e.length; n++) {
                    var s = e[n],
                      o = this,
                      r = i
                    if (-1 !== s.indexOf(".")) {
                      for (var a = s.split("."), u = 0; u < a.length - 1; u++) {
                        var l = a[u]
                        ;(r[l] = r[l] || {}), (r = r[l]), (o = o[l])
                      }
                      s = a[a.length - 1]
                    }
                    var h = o[s]
                    t.isObject(e[s])
                      ? (r[s] = h.get())
                      : t.Signal && h instanceof t.Signal
                      ? (r[s] = h.value)
                      : t.Param && h instanceof t.Param
                      ? (r[s] = h.value)
                      : h instanceof AudioParam
                      ? (r[s] = h.value)
                      : h instanceof t
                      ? (r[s] = h.get())
                      : !t.isFunction(h) && t.isDefined(h) && (r[s] = h)
                  }
                  return i
                }),
                (t.prototype._collectDefaults = function (e) {
                  var i = []
                  if (
                    (t.isDefined(e.defaults) && (i = Object.keys(e.defaults)),
                    t.isDefined(e._super))
                  )
                    for (
                      var n = this._collectDefaults(e._super), s = 0;
                      s < n.length;
                      s++
                    )
                      -1 === i.indexOf(n[s]) && i.push(n[s])
                  return i
                }),
                (t.defaults = function (e, i, n) {
                  var s = {}
                  if (1 === e.length && t.isObject(e[0])) s = e[0]
                  else for (var o = 0; o < i.length; o++) s[i[o]] = e[o]
                  return t.isDefined(n.defaults)
                    ? t.defaultArg(s, n.defaults)
                    : t.isObject(n)
                    ? t.defaultArg(s, n)
                    : s
                }),
                (t.defaultArg = function (e, i) {
                  if (t.isObject(e) && t.isObject(i)) {
                    var n = {}
                    for (var s in e) n[s] = t.defaultArg(i[s], e[s])
                    for (var o in i) n[o] = t.defaultArg(e[o], i[o])
                    return n
                  }
                  return t.isUndef(e) ? i : e
                }),
                (t.connectSeries = function () {
                  for (var e = arguments[0], i = 1; i < arguments.length; i++) {
                    var n = arguments[i]
                    e.connect(n), (e = n)
                  }
                  return t
                }),
                (t.isUndef = function (t) {
                  return void 0 === t
                }),
                (t.isDefined = function (e) {
                  return !t.isUndef(e)
                }),
                (t.isFunction = function (t) {
                  return "function" == typeof t
                }),
                (t.isNumber = function (t) {
                  return "number" == typeof t
                }),
                (t.isObject = function (t) {
                  return (
                    "[object Object]" === Object.prototype.toString.call(t) &&
                    t.constructor === Object
                  )
                }),
                (t.isBoolean = function (t) {
                  return "boolean" == typeof t
                }),
                (t.isArray = function (t) {
                  return Array.isArray(t)
                }),
                (t.isString = function (t) {
                  return "string" == typeof t
                }),
                (t.isNote = function (e) {
                  return (
                    t.isString(e) &&
                    /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(e)
                  )
                }),
                (t.noOp = function () {}),
                (t.prototype._readOnly = function (t) {
                  if (Array.isArray(t))
                    for (var e = 0; e < t.length; e++) this._readOnly(t[e])
                  else
                    Object.defineProperty(this, t, {
                      writable: !1,
                      enumerable: !0,
                    })
                }),
                (t.prototype._writable = function (t) {
                  if (Array.isArray(t))
                    for (var e = 0; e < t.length; e++) this._writable(t[e])
                  else Object.defineProperty(this, t, { writable: !0 })
                }),
                (t.State = {
                  Started: "started",
                  Stopped: "stopped",
                  Paused: "paused",
                }),
                (t.equalPowerScale = function (t) {
                  var e = 0.5 * Math.PI
                  return Math.sin(t * e)
                }),
                (t.dbToGain = function (t) {
                  return Math.pow(10, t / 20)
                }),
                (t.gainToDb = function (t) {
                  return (Math.log(t) / Math.LN10) * 20
                }),
                (t.intervalToFrequencyRatio = function (t) {
                  return Math.pow(2, t / 12)
                }),
                (t.prototype.now = function () {
                  return t.context.now()
                }),
                (t.now = function () {
                  return t.context.now()
                }),
                (t.extend = function (e, i) {
                  function n() {}
                  t.isUndef(i) && (i = t),
                    (n.prototype = i.prototype),
                    (e.prototype = new n()),
                    (e.prototype.constructor = e),
                    (e._super = i)
                })
              var e = null
              return (
                Object.defineProperty(t, "context", {
                  get: function () {
                    return e
                  },
                  set: function (i) {
                    ;(e =
                      t.Context && i instanceof t.Context
                        ? i
                        : new t.Context(i)),
                      t.Context.emit("init", e)
                  },
                }),
                Object.defineProperty(t.prototype, "context", {
                  get: function () {
                    return t.context
                  },
                }),
                (t.setContext = function (e) {
                  t.context = e
                }),
                Object.defineProperty(t.prototype, "blockTime", {
                  get: function () {
                    return 128 / this.context.sampleRate
                  },
                }),
                Object.defineProperty(t.prototype, "sampleTime", {
                  get: function () {
                    return 1 / this.context.sampleRate
                  },
                }),
                Object.defineProperty(t, "supported", {
                  get: function () {
                    var t =
                        window.hasOwnProperty("AudioContext") ||
                        window.hasOwnProperty("webkitAudioContext"),
                      e = window.hasOwnProperty("Promise"),
                      i = window.hasOwnProperty("Worker")
                    return t && e && i
                  },
                }),
                Object.defineProperty(t, "initialized", {
                  get: function () {
                    return null !== e
                  },
                }),
                (t.getContext = function (e) {
                  if (t.initialized) e(t.context)
                  else {
                    var i = function () {
                      e(t.context), t.Context.off("init", i)
                    }
                    t.Context.on("init", i)
                  }
                  return t
                }),
                (t.version = "r12"),
                t
              )
            }),
            e(function (t) {
              return (
                (t.Emitter = function () {
                  t.call(this), (this._events = {})
                }),
                t.extend(t.Emitter),
                (t.Emitter.prototype.on = function (t, e) {
                  for (var i = t.split(/\W+/), n = 0; n < i.length; n++) {
                    var s = i[n]
                    this._events.hasOwnProperty(s) || (this._events[s] = []),
                      this._events[s].push(e)
                  }
                  return this
                }),
                (t.Emitter.prototype.once = function (t, e) {
                  var i = function () {
                    e.apply(this, arguments), this.off(t, i)
                  }.bind(this)
                  return this.on(t, i), this
                }),
                (t.Emitter.prototype.off = function (e, i) {
                  for (var n = e.split(/\W+/), s = 0; s < n.length; s++)
                    if (((e = n[s]), this._events.hasOwnProperty(e)))
                      if (t.isUndef(i)) this._events[e] = []
                      else
                        for (var o = this._events[e], r = 0; r < o.length; r++)
                          o[r] === i && o.splice(r, 1)
                  return this
                }),
                (t.Emitter.prototype.emit = function (t) {
                  if (this._events) {
                    var e = Array.apply(null, arguments).slice(1)
                    if (this._events.hasOwnProperty(t))
                      for (
                        var i = this._events[t].slice(0), n = 0, s = i.length;
                        n < s;
                        n++
                      )
                        i[n].apply(this, e)
                  }
                  return this
                }),
                (t.Emitter.mixin = function (e) {
                  var i = ["on", "once", "off", "emit"]
                  e._events = {}
                  for (var n = 0; n < i.length; n++) {
                    var s = i[n],
                      o = t.Emitter.prototype[s]
                    e[s] = o
                  }
                  return t.Emitter
                }),
                (t.Emitter.prototype.dispose = function () {
                  return (
                    t.prototype.dispose.call(this), (this._events = null), this
                  )
                }),
                t.Emitter
              )
            }),
            e(function (t) {
              return (
                (t.Timeline = function () {
                  var e = t.defaults(arguments, ["memory"], t.Timeline)
                  t.call(this), (this._timeline = []), (this.memory = e.memory)
                }),
                t.extend(t.Timeline),
                (t.Timeline.defaults = { memory: 1 / 0 }),
                Object.defineProperty(t.Timeline.prototype, "length", {
                  get: function () {
                    return this._timeline.length
                  },
                }),
                (t.Timeline.prototype.add = function (e) {
                  if (t.isUndef(e.time))
                    throw new Error(
                      "Tone.Timeline: events must have a time attribute",
                    )
                  e.time = e.time.valueOf()
                  var i = this._search(e.time)
                  if (
                    (this._timeline.splice(i + 1, 0, e),
                    this.length > this.memory)
                  ) {
                    var n = this.length - this.memory
                    this._timeline.splice(0, n)
                  }
                  return this
                }),
                (t.Timeline.prototype.remove = function (t) {
                  var e = this._timeline.indexOf(t)
                  return -1 !== e && this._timeline.splice(e, 1), this
                }),
                (t.Timeline.prototype.get = function (e, i) {
                  i = t.defaultArg(i, "time")
                  var n = this._search(e, i)
                  return -1 !== n ? this._timeline[n] : null
                }),
                (t.Timeline.prototype.peek = function () {
                  return this._timeline[0]
                }),
                (t.Timeline.prototype.shift = function () {
                  return this._timeline.shift()
                }),
                (t.Timeline.prototype.getAfter = function (e, i) {
                  i = t.defaultArg(i, "time")
                  var n = this._search(e, i)
                  return n + 1 < this._timeline.length
                    ? this._timeline[n + 1]
                    : null
                }),
                (t.Timeline.prototype.getBefore = function (e, i) {
                  i = t.defaultArg(i, "time")
                  var n = this._timeline.length
                  if (n > 0 && this._timeline[n - 1][i] < e)
                    return this._timeline[n - 1]
                  var s = this._search(e, i)
                  return s - 1 >= 0 ? this._timeline[s - 1] : null
                }),
                (t.Timeline.prototype.cancel = function (t) {
                  if (this._timeline.length > 1) {
                    var e = this._search(t)
                    if (e >= 0)
                      if (this._timeline[e].time === t) {
                        for (
                          var i = e;
                          i >= 0 && this._timeline[i].time === t;
                          i--
                        )
                          e = i
                        this._timeline = this._timeline.slice(0, e)
                      } else this._timeline = this._timeline.slice(0, e + 1)
                    else this._timeline = []
                  } else
                    1 === this._timeline.length &&
                      this._timeline[0].time >= t &&
                      (this._timeline = [])
                  return this
                }),
                (t.Timeline.prototype.cancelBefore = function (t) {
                  var e = this._search(t)
                  return (
                    e >= 0 && (this._timeline = this._timeline.slice(e + 1)),
                    this
                  )
                }),
                (t.Timeline.prototype.previousEvent = function (t) {
                  var e = this._timeline.indexOf(t)
                  return e > 0 ? this._timeline[e - 1] : null
                }),
                (t.Timeline.prototype._search = function (e, i) {
                  if (0 === this._timeline.length) return -1
                  i = t.defaultArg(i, "time")
                  var n = 0,
                    s = this._timeline.length,
                    o = s
                  if (s > 0 && this._timeline[s - 1][i] <= e) return s - 1
                  for (; n < o; ) {
                    var r = Math.floor(n + (o - n) / 2),
                      a = this._timeline[r],
                      u = this._timeline[r + 1]
                    if (a[i] === e) {
                      for (var l = r; l < this._timeline.length; l++)
                        this._timeline[l][i] === e && (r = l)
                      return r
                    }
                    if (a[i] < e && u[i] > e) return r
                    a[i] > e ? (o = r) : (n = r + 1)
                  }
                  return -1
                }),
                (t.Timeline.prototype._iterate = function (e, i, n) {
                  ;(i = t.defaultArg(i, 0)),
                    (n = t.defaultArg(n, this._timeline.length - 1)),
                    this._timeline.slice(i, n + 1).forEach(
                      function (t) {
                        e.call(this, t)
                      }.bind(this),
                    )
                }),
                (t.Timeline.prototype.forEach = function (t) {
                  return this._iterate(t), this
                }),
                (t.Timeline.prototype.forEachBefore = function (t, e) {
                  var i = this._search(t)
                  return -1 !== i && this._iterate(e, 0, i), this
                }),
                (t.Timeline.prototype.forEachAfter = function (t, e) {
                  var i = this._search(t)
                  return this._iterate(e, i + 1), this
                }),
                (t.Timeline.prototype.forEachBetween = function (t, e, i) {
                  var n = this._search(t),
                    s = this._search(e)
                  return (
                    -1 !== n && -1 !== s
                      ? (this._timeline[n].time !== t && (n += 1),
                        this._timeline[s].time === e && (s -= 1),
                        this._iterate(i, n, s))
                      : -1 === n && this._iterate(i, 0, s),
                    this
                  )
                }),
                (t.Timeline.prototype.forEachFrom = function (t, e) {
                  for (
                    var i = this._search(t);
                    i >= 0 && this._timeline[i].time >= t;

                  )
                    i--
                  return this._iterate(e, i + 1), this
                }),
                (t.Timeline.prototype.forEachAtTime = function (t, e) {
                  var i = this._search(t)
                  return (
                    -1 !== i &&
                      this._iterate(
                        function (i) {
                          i.time === t && e.call(this, i)
                        },
                        0,
                        i,
                      ),
                    this
                  )
                }),
                (t.Timeline.prototype.dispose = function () {
                  return (
                    t.prototype.dispose.call(this),
                    (this._timeline = null),
                    this
                  )
                }),
                t.Timeline
              )
            }),
            e(function (t) {
              t.supported &&
                (!window.hasOwnProperty("OfflineAudioContext") &&
                  window.hasOwnProperty("webkitOfflineAudioContext") &&
                  (window.OfflineAudioContext =
                    window.webkitOfflineAudioContext),
                new OfflineAudioContext(1, 1, 44100).startRendering() instanceof
                  Promise ||
                  ((OfflineAudioContext.prototype._native_startRendering =
                    OfflineAudioContext.prototype.startRendering),
                  (OfflineAudioContext.prototype.startRendering = function () {
                    return new Promise(
                      function (t) {
                        ;(this.oncomplete = function (e) {
                          t(e.renderedBuffer)
                        }),
                          this._native_startRendering()
                      }.bind(this),
                    )
                  })))
            }),
            e(function (t) {
              if (t.supported) {
                !window.hasOwnProperty("AudioContext") &&
                  window.hasOwnProperty("webkitAudioContext") &&
                  (window.AudioContext = window.webkitAudioContext),
                  AudioContext.prototype.close ||
                    (AudioContext.prototype.close = function () {
                      return (
                        t.isFunction(this.suspend) && this.suspend(),
                        Promise.resolve()
                      )
                    }),
                  AudioContext.prototype.resume ||
                    (AudioContext.prototype.resume = function () {
                      return Promise.resolve()
                    }),
                  !AudioContext.prototype.createGain &&
                    AudioContext.prototype.createGainNode &&
                    (AudioContext.prototype.createGain =
                      AudioContext.prototype.createGainNode),
                  !AudioContext.prototype.createDelay &&
                    AudioContext.prototype.createDelayNode &&
                    (AudioContext.prototype.createDelay =
                      AudioContext.prototype.createDelayNode)
                var e = !1,
                  i = new OfflineAudioContext(1, 1, 44100),
                  n = new Uint32Array([
                    1179011410, 48, 1163280727, 544501094, 16, 131073, 44100,
                    176400, 1048580, 1635017060, 8, 0, 0, 0, 0,
                  ]).buffer
                try {
                  i.decodeAudioData(n) instanceof Promise && (e = !0)
                } catch (t) {
                  e = !1
                }
                e ||
                  ((AudioContext.prototype._native_decodeAudioData =
                    AudioContext.prototype.decodeAudioData),
                  (AudioContext.prototype.decodeAudioData = function (t) {
                    return new Promise(
                      function (e, i) {
                        this._native_decodeAudioData(t, e, i)
                      }.bind(this),
                    )
                  }))
              }
            }),
            e(function (t) {
              ;(t.Context = function () {
                t.Emitter.call(this)
                var i = t.defaults(arguments, ["context"], t.Context)
                if (
                  !i.context &&
                  ((i.context = new window.AudioContext()), !i.context)
                )
                  throw new Error(
                    "could not create AudioContext. Possibly too many AudioContexts running already.",
                  )
                for (var n in ((this._context = i.context), this._context))
                  this._defineProperty(this._context, n)
                ;(this._latencyHint = i.latencyHint),
                  (this._constants = {}),
                  (this.lookAhead = i.lookAhead),
                  (this._computedUpdateInterval = 0),
                  (this._ticker = new e(
                    this.emit.bind(this, "tick"),
                    i.clockSource,
                    i.updateInterval,
                  )),
                  (this._timeouts = new t.Timeline()),
                  (this._timeoutIds = 0),
                  this.on("tick", this._timeoutLoop.bind(this))
              }),
                t.extend(t.Context, t.Emitter),
                t.Emitter.mixin(t.Context),
                (t.Context.defaults = {
                  clockSource: "worker",
                  latencyHint: "interactive",
                  lookAhead: 0.1,
                  updateInterval: 0.03,
                }),
                (t.Context.prototype._defineProperty = function (e, i) {
                  t.isUndef(this[i]) &&
                    Object.defineProperty(this, i, {
                      get: function () {
                        return "function" == typeof e[i] ? e[i].bind(e) : e[i]
                      },
                      set: function (t) {
                        e[i] = t
                      },
                    })
                }),
                (t.Context.prototype.now = function () {
                  return this._context.currentTime + this.lookAhead
                }),
                (t.Context.prototype.ready = function () {
                  return new Promise(
                    function (t) {
                      "running" === this._context.state
                        ? t()
                        : this._context.resume().then(function () {
                            t()
                          })
                    }.bind(this),
                  )
                }),
                (t.Context.prototype.close = function () {
                  return this._context.close().then(
                    function () {
                      t.Context.emit("close", this)
                    }.bind(this),
                  )
                }),
                (t.Context.prototype.getConstant = function (t) {
                  if (this._constants[t]) return this._constants[t]
                  for (
                    var e = this._context.createBuffer(
                        1,
                        128,
                        this._context.sampleRate,
                      ),
                      i = e.getChannelData(0),
                      n = 0;
                    n < i.length;
                    n++
                  )
                    i[n] = t
                  var s = this._context.createBufferSource()
                  return (
                    (s.channelCount = 1),
                    (s.channelCountMode = "explicit"),
                    (s.buffer = e),
                    (s.loop = !0),
                    s.start(0),
                    (this._constants[t] = s),
                    s
                  )
                }),
                (t.Context.prototype._timeoutLoop = function () {
                  for (
                    var t = this.now();
                    this._timeouts &&
                    this._timeouts.length &&
                    this._timeouts.peek().time <= t;

                  )
                    this._timeouts.shift().callback()
                }),
                (t.Context.prototype.setTimeout = function (t, e) {
                  this._timeoutIds++
                  var i = this.now()
                  return (
                    this._timeouts.add({
                      callback: t,
                      time: i + e,
                      id: this._timeoutIds,
                    }),
                    this._timeoutIds
                  )
                }),
                (t.Context.prototype.clearTimeout = function (t) {
                  return (
                    this._timeouts.forEach(function (e) {
                      e.id === t && this.remove(e)
                    }),
                    this
                  )
                }),
                Object.defineProperty(t.Context.prototype, "updateInterval", {
                  get: function () {
                    return this._ticker.updateInterval
                  },
                  set: function (t) {
                    this._ticker.updateInterval = t
                  },
                }),
                Object.defineProperty(t.Context.prototype, "clockSource", {
                  get: function () {
                    return this._ticker.type
                  },
                  set: function (t) {
                    this._ticker.type = t
                  },
                }),
                Object.defineProperty(t.Context.prototype, "latencyHint", {
                  get: function () {
                    return this._latencyHint
                  },
                  set: function (e) {
                    var i = e
                    if (((this._latencyHint = e), t.isString(e)))
                      switch (e) {
                        case "interactive":
                          ;(i = 0.1), (this._context.latencyHint = e)
                          break
                        case "playback":
                          ;(i = 0.8), (this._context.latencyHint = e)
                          break
                        case "balanced":
                          ;(i = 0.25), (this._context.latencyHint = e)
                          break
                        case "fastest":
                          ;(this._context.latencyHint = "interactive"),
                            (i = 0.01)
                      }
                    ;(this.lookAhead = i), (this.updateInterval = i / 3)
                  },
                }),
                (t.Context.prototype.dispose = function () {
                  return this.close().then(
                    function () {
                      for (var e in (t.Emitter.prototype.dispose.call(this),
                      this._ticker.dispose(),
                      (this._ticker = null),
                      this._timeouts.dispose(),
                      (this._timeouts = null),
                      this._constants))
                        this._constants[e].disconnect()
                      this._constants = null
                    }.bind(this),
                  )
                })
              var e = function (e, i, n) {
                ;(this._type = i),
                  (this._updateInterval = n),
                  (this._callback = t.defaultArg(e, t.noOp)),
                  this._createClock()
              }
              return (
                (e.Type = {
                  Worker: "worker",
                  Timeout: "timeout",
                  Offline: "offline",
                }),
                (e.prototype._createWorker = function () {
                  window.URL = window.URL || window.webkitURL
                  var t = new Blob([
                      "var timeoutTime = " +
                        (1e3 * this._updateInterval).toFixed(1) +
                        ";self.onmessage = function(msg){\ttimeoutTime = parseInt(msg.data);};function tick(){\tself.postMessage(1);}setInterval(tick, timeoutTime)",
                    ]),
                    e = URL.createObjectURL(t),
                    i = new Worker(e)
                  ;(i.onmessage = this._callback.bind(this)), (this._worker = i)
                }),
                (e.prototype._createTimeout = function () {
                  this._timeout = setTimeout(
                    function () {
                      this._createTimeout(), this._callback()
                    }.bind(this),
                    1e3 * this._updateInterval,
                  )
                }),
                (e.prototype._createClock = function () {
                  if (this._type === e.Type.Worker)
                    try {
                      this._createWorker()
                    } catch (t) {
                      ;(this._type = e.Type.Timeout), this._createClock()
                    }
                  else this._type === e.Type.Timeout && this._createTimeout()
                }),
                Object.defineProperty(e.prototype, "updateInterval", {
                  get: function () {
                    return this._updateInterval
                  },
                  set: function (t) {
                    ;(this._updateInterval = Math.max(t, 128 / 44100)),
                      this._type === e.Type.Worker &&
                        this._worker.postMessage(Math.max(1e3 * t, 1))
                  },
                }),
                Object.defineProperty(e.prototype, "type", {
                  get: function () {
                    return this._type
                  },
                  set: function (t) {
                    this._disposeClock(), (this._type = t), this._createClock()
                  },
                }),
                (e.prototype._disposeClock = function () {
                  this._timeout &&
                    (clearTimeout(this._timeout), (this._timeout = null)),
                    this._worker &&
                      (this._worker.terminate(),
                      (this._worker.onmessage = null),
                      (this._worker = null))
                }),
                (e.prototype.dispose = function () {
                  this._disposeClock(), (this._callback = null)
                }),
                t.getContext(function () {
                  var e = AudioNode.prototype.connect,
                    i = AudioNode.prototype.disconnect
                  function n(i, n, s) {
                    if (i.input)
                      return (
                        (s = t.defaultArg(s, 0)),
                        t.isArray(i.input)
                          ? this.connect(i.input[s])
                          : this.connect(i.input, n, s)
                      )
                    try {
                      return i instanceof AudioNode
                        ? (e.call(this, i, n, s), i)
                        : (e.call(this, i, n), i)
                    } catch (t) {
                      throw new Error(
                        "error connecting to node: " + i + "\n" + t,
                      )
                    }
                  }
                  AudioNode.prototype.connect !== n &&
                    ((AudioNode.prototype.connect = n),
                    (AudioNode.prototype.disconnect = function (e, n, s) {
                      if (e && e.input && t.isArray(e.input))
                        (s = t.defaultArg(s, 0)),
                          this.disconnect(e.input[s], n, 0)
                      else if (e && e.input) this.disconnect(e.input, n, s)
                      else
                        try {
                          i.apply(this, arguments)
                        } catch (t) {
                          throw new Error(
                            "error disconnecting node: " + e + "\n" + t,
                          )
                        }
                    }))
                }),
                t.supported && !t.initialized
                  ? ((t.context = new t.Context()),
                    window.TONE_SILENCE_VERSION_LOGGING ||
                      console.log(
                        "%c * Tone.js " + t.version + " * ",
                        "background: #000; color: #fff",
                      ))
                  : t.supported ||
                    console.warn("This browser does not support Tone.js"),
                t.Context
              )
            }),
            e(function (t) {
              return (
                (t.AudioNode = function () {
                  t.call(this)
                  var e = t.defaults(arguments, ["context"], {
                    context: t.context,
                  })
                  this._context = e.context
                }),
                t.extend(t.AudioNode),
                Object.defineProperty(t.AudioNode.prototype, "context", {
                  get: function () {
                    return this._context
                  },
                }),
                (t.AudioNode.prototype.createInsOuts = function (t, e) {
                  1 === t
                    ? (this.input = this.context.createGain())
                    : t > 1 && (this.input = new Array(t)),
                    1 === e
                      ? (this.output = this.context.createGain())
                      : e > 1 && (this.output = new Array(e))
                }),
                Object.defineProperty(t.AudioNode.prototype, "channelCount", {
                  get: function () {
                    return this.output.channelCount
                  },
                  set: function (t) {
                    return (this.output.channelCount = t)
                  },
                }),
                Object.defineProperty(
                  t.AudioNode.prototype,
                  "channelCountMode",
                  {
                    get: function () {
                      return this.output.channelCountMode
                    },
                    set: function (t) {
                      return (this.output.channelCountMode = t)
                    },
                  },
                ),
                Object.defineProperty(
                  t.AudioNode.prototype,
                  "channelInterpretation",
                  {
                    get: function () {
                      return this.output.channelInterpretation
                    },
                    set: function (t) {
                      return (this.output.channelInterpretation = t)
                    },
                  },
                ),
                Object.defineProperty(t.AudioNode.prototype, "numberOfInputs", {
                  get: function () {
                    return this.input
                      ? t.isArray(this.input)
                        ? this.input.length
                        : 1
                      : 0
                  },
                }),
                Object.defineProperty(
                  t.AudioNode.prototype,
                  "numberOfOutputs",
                  {
                    get: function () {
                      return this.output
                        ? t.isArray(this.output)
                          ? this.output.length
                          : 1
                        : 0
                    },
                  },
                ),
                (t.AudioNode.prototype._onConnect = function () {}),
                (t.AudioNode.prototype.connect = function (e, i, n) {
                  return (
                    e._onConnect && e._onConnect(this),
                    t.isArray(this.output)
                      ? ((i = t.defaultArg(i, 0)),
                        this.output[i].connect(e, 0, n))
                      : this.output.connect(e, i, n),
                    this
                  )
                }),
                (t.AudioNode.prototype.disconnect = function (e, i, n) {
                  t.isArray(this.output)
                    ? t.isNumber(e)
                      ? this.output[e].disconnect()
                      : ((i = t.defaultArg(i, 0)),
                        this.output[i].disconnect(e, 0, n))
                    : this.output.disconnect.apply(this.output, arguments)
                }),
                (t.AudioNode.prototype.chain = function () {
                  for (var t = this, e = 0; e < arguments.length; e++) {
                    var i = arguments[e]
                    t.connect(i), (t = i)
                  }
                  return this
                }),
                (t.AudioNode.prototype.fan = function () {
                  for (var t = 0; t < arguments.length; t++)
                    this.connect(arguments[t])
                  return this
                }),
                window.AudioNode &&
                  ((AudioNode.prototype.chain = t.AudioNode.prototype.chain),
                  (AudioNode.prototype.fan = t.AudioNode.prototype.fan)),
                (t.AudioNode.prototype.dispose = function () {
                  return (
                    t.isDefined(this.input) &&
                      (this.input instanceof AudioNode &&
                        this.input.disconnect(),
                      (this.input = null)),
                    t.isDefined(this.output) &&
                      (this.output instanceof AudioNode &&
                        this.output.disconnect(),
                      (this.output = null)),
                    (this._context = null),
                    this
                  )
                }),
                t.AudioNode
              )
            }),
            e(function (t) {
              return (
                (t.SignalBase = function () {
                  t.AudioNode.call(this)
                }),
                t.extend(t.SignalBase, t.AudioNode),
                (t.SignalBase.prototype.connect = function (e, i, n) {
                  return (
                    (t.Signal && t.Signal === e.constructor) ||
                    (t.Param && t.Param === e.constructor)
                      ? (e._param.cancelScheduledValues(0),
                        (e._param.value = 0),
                        (e.overridden = !0))
                      : e instanceof AudioParam &&
                        (e.cancelScheduledValues(0), (e.value = 0)),
                    t.AudioNode.prototype.connect.call(this, e, i, n),
                    this
                  )
                }),
                t.SignalBase
              )
            }),
            e(function (t) {
              if (t.supported) {
                var e = navigator.userAgent.toLowerCase()
                if (e.includes("safari") && !e.includes("chrome")) {
                  var i = function (t) {
                    for (var e in ((this._internalNode =
                      this.input =
                      this.output =
                        t._native_createWaveShaper()),
                    (this._curve = null),
                    this._internalNode))
                      this._defineProperty(this._internalNode, e)
                  }
                  Object.defineProperty(i.prototype, "curve", {
                    get: function () {
                      return this._curve
                    },
                    set: function (t) {
                      this._curve = t
                      var e = new Float32Array(t.length + 1)
                      e.set(t, 1), (e[0] = t[0]), (this._internalNode.curve = e)
                    },
                  }),
                    (i.prototype._defineProperty = function (e, i) {
                      t.isUndef(this[i]) &&
                        Object.defineProperty(this, i, {
                          get: function () {
                            return "function" == typeof e[i]
                              ? e[i].bind(e)
                              : e[i]
                          },
                          set: function (t) {
                            e[i] = t
                          },
                        })
                    }),
                    (AudioContext.prototype._native_createWaveShaper =
                      AudioContext.prototype.createWaveShaper),
                    (AudioContext.prototype.createWaveShaper = function () {
                      return new i(this)
                    })
                }
              }
            }),
            e(function (t) {
              return (
                (t.WaveShaper = function (e, i) {
                  t.SignalBase.call(this),
                    (this._shaper =
                      this.input =
                      this.output =
                        this.context.createWaveShaper()),
                    (this._curve = null),
                    Array.isArray(e)
                      ? (this.curve = e)
                      : isFinite(e) || t.isUndef(e)
                      ? (this._curve = new Float32Array(t.defaultArg(e, 1024)))
                      : t.isFunction(e) &&
                        ((this._curve = new Float32Array(
                          t.defaultArg(i, 1024),
                        )),
                        this.setMap(e))
                }),
                t.extend(t.WaveShaper, t.SignalBase),
                (t.WaveShaper.prototype.setMap = function (t) {
                  for (
                    var e = new Array(this._curve.length),
                      i = 0,
                      n = this._curve.length;
                    i < n;
                    i++
                  ) {
                    var s = (i / (n - 1)) * 2 - 1
                    e[i] = t(s, i)
                  }
                  return (this.curve = e), this
                }),
                Object.defineProperty(t.WaveShaper.prototype, "curve", {
                  get: function () {
                    return this._shaper.curve
                  },
                  set: function (t) {
                    ;(this._curve = new Float32Array(t)),
                      (this._shaper.curve = this._curve)
                  },
                }),
                Object.defineProperty(t.WaveShaper.prototype, "oversample", {
                  get: function () {
                    return this._shaper.oversample
                  },
                  set: function (t) {
                    if (!["none", "2x", "4x"].includes(t))
                      throw new RangeError(
                        "Tone.WaveShaper: oversampling must be either 'none', '2x', or '4x'",
                      )
                    this._shaper.oversample = t
                  },
                }),
                (t.WaveShaper.prototype.dispose = function () {
                  return (
                    t.SignalBase.prototype.dispose.call(this),
                    this._shaper.disconnect(),
                    (this._shaper = null),
                    (this._curve = null),
                    this
                  )
                }),
                t.WaveShaper
              )
            }),
            e(function (t) {
              return (
                (t.TimeBase = function (e, i) {
                  if (!(this instanceof t.TimeBase)) return new t.TimeBase(e, i)
                  if (
                    ((this._val = e),
                    (this._units = i),
                    t.isUndef(this._units) &&
                      t.isString(this._val) &&
                      parseFloat(this._val) == this._val &&
                      "+" !== this._val.charAt(0))
                  )
                    (this._val = parseFloat(this._val)),
                      (this._units = this._defaultUnits)
                  else if (e && e.constructor === this.constructor)
                    (this._val = e._val), (this._units = e._units)
                  else if (e instanceof t.TimeBase)
                    switch (this._defaultUnits) {
                      case "s":
                        this._val = e.toSeconds()
                        break
                      case "i":
                        this._val = e.toTicks()
                        break
                      case "hz":
                        this._val = e.toFrequency()
                        break
                      case "midi":
                        this._val = e.toMidi()
                        break
                      default:
                        throw new Error(
                          "Unrecognized default units " + this._defaultUnits,
                        )
                    }
                }),
                t.extend(t.TimeBase),
                (t.TimeBase.prototype._expressions = {
                  n: {
                    regexp: /^(\d+)n(\.?)$/i,
                    method: function (t, e) {
                      t = parseInt(t)
                      var i = "." === e ? 1.5 : 1
                      return 1 === t
                        ? this._beatsToUnits(this._getTimeSignature()) * i
                        : this._beatsToUnits(4 / t) * i
                    },
                  },
                  t: {
                    regexp: /^(\d+)t$/i,
                    method: function (t) {
                      return (
                        (t = parseInt(t)),
                        this._beatsToUnits(8 / (3 * parseInt(t)))
                      )
                    },
                  },
                  m: {
                    regexp: /^(\d+)m$/i,
                    method: function (t) {
                      return this._beatsToUnits(
                        parseInt(t) * this._getTimeSignature(),
                      )
                    },
                  },
                  i: {
                    regexp: /^(\d+)i$/i,
                    method: function (t) {
                      return this._ticksToUnits(parseInt(t))
                    },
                  },
                  hz: {
                    regexp: /^(\d+(?:\.\d+)?)hz$/i,
                    method: function (t) {
                      return this._frequencyToUnits(parseFloat(t))
                    },
                  },
                  tr: {
                    regexp:
                      /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?$/,
                    method: function (t, e, i) {
                      var n = 0
                      return (
                        t &&
                          "0" !== t &&
                          (n += this._beatsToUnits(
                            this._getTimeSignature() * parseFloat(t),
                          )),
                        e &&
                          "0" !== e &&
                          (n += this._beatsToUnits(parseFloat(e))),
                        i &&
                          "0" !== i &&
                          (n += this._beatsToUnits(parseFloat(i) / 4)),
                        n
                      )
                    },
                  },
                  s: {
                    regexp: /^(\d+(?:\.\d+)?)s$/,
                    method: function (t) {
                      return this._secondsToUnits(parseFloat(t))
                    },
                  },
                  samples: {
                    regexp: /^(\d+)samples$/,
                    method: function (t) {
                      return parseInt(t) / this.context.sampleRate
                    },
                  },
                  default: {
                    regexp: /^(\d+(?:\.\d+)?)$/,
                    method: function (t) {
                      return this._expressions[this._defaultUnits].method.call(
                        this,
                        t,
                      )
                    },
                  },
                }),
                (t.TimeBase.prototype._defaultUnits = "s"),
                (t.TimeBase.prototype._getBpm = function () {
                  return t.Transport ? t.Transport.bpm.value : 120
                }),
                (t.TimeBase.prototype._getTimeSignature = function () {
                  return t.Transport ? t.Transport.timeSignature : 4
                }),
                (t.TimeBase.prototype._getPPQ = function () {
                  return t.Transport ? t.Transport.PPQ : 192
                }),
                (t.TimeBase.prototype._now = function () {
                  return this.now()
                }),
                (t.TimeBase.prototype._frequencyToUnits = function (t) {
                  return 1 / t
                }),
                (t.TimeBase.prototype._beatsToUnits = function (t) {
                  return (60 / this._getBpm()) * t
                }),
                (t.TimeBase.prototype._secondsToUnits = function (t) {
                  return t
                }),
                (t.TimeBase.prototype._ticksToUnits = function (t) {
                  return t * (this._beatsToUnits(1) / this._getPPQ())
                }),
                (t.TimeBase.prototype._noArg = function () {
                  return this._now()
                }),
                (t.TimeBase.prototype.valueOf = function () {
                  if (t.isUndef(this._val)) return this._noArg()
                  if (t.isString(this._val) && t.isUndef(this._units))
                    for (var e in this._expressions)
                      if (this._expressions[e].regexp.test(this._val.trim())) {
                        this._units = e
                        break
                      }
                  if (t.isDefined(this._units)) {
                    var i = this._expressions[this._units],
                      n = this._val.toString().trim().match(i.regexp)
                    return n
                      ? i.method.apply(this, n.slice(1))
                      : i.method.call(this, parseFloat(this._val))
                  }
                  return this._val
                }),
                (t.TimeBase.prototype.toSeconds = function () {
                  return this.valueOf()
                }),
                (t.TimeBase.prototype.toFrequency = function () {
                  return 1 / this.toSeconds()
                }),
                (t.TimeBase.prototype.toSamples = function () {
                  return this.toSeconds() * this.context.sampleRate
                }),
                (t.TimeBase.prototype.toMilliseconds = function () {
                  return 1e3 * this.toSeconds()
                }),
                (t.TimeBase.prototype.dispose = function () {
                  ;(this._val = null), (this._units = null)
                }),
                t.TimeBase
              )
            }),
            e(function (t) {
              ;(t.Frequency = function (e, i) {
                if (!(this instanceof t.Frequency)) return new t.Frequency(e, i)
                t.TimeBase.call(this, e, i)
              }),
                t.extend(t.Frequency, t.TimeBase),
                (t.Frequency.prototype._expressions = Object.assign(
                  {},
                  t.TimeBase.prototype._expressions,
                  {
                    midi: {
                      regexp: /^(\d+(?:\.\d+)?midi)/,
                      method: function (e) {
                        return "midi" === this._defaultUnits
                          ? e
                          : t.Frequency.mtof(e)
                      },
                    },
                    note: {
                      regexp: /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i,
                      method: function (i, n) {
                        var s = e[i.toLowerCase()] + 12 * (parseInt(n) + 1)
                        return "midi" === this._defaultUnits
                          ? s
                          : t.Frequency.mtof(s)
                      },
                    },
                    tr: {
                      regexp:
                        /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,
                      method: function (t, e, i) {
                        var n = 1
                        return (
                          t &&
                            "0" !== t &&
                            (n *= this._beatsToUnits(
                              this._getTimeSignature() * parseFloat(t),
                            )),
                          e &&
                            "0" !== e &&
                            (n *= this._beatsToUnits(parseFloat(e))),
                          i &&
                            "0" !== i &&
                            (n *= this._beatsToUnits(parseFloat(i) / 4)),
                          n
                        )
                      },
                    },
                  },
                )),
                (t.Frequency.prototype.transpose = function (e) {
                  return new this.constructor(
                    this.valueOf() * t.intervalToFrequencyRatio(e),
                  )
                }),
                (t.Frequency.prototype.harmonize = function (t) {
                  return t.map(
                    function (t) {
                      return this.transpose(t)
                    }.bind(this),
                  )
                }),
                (t.Frequency.prototype.toMidi = function () {
                  return t.Frequency.ftom(this.valueOf())
                }),
                (t.Frequency.prototype.toNote = function () {
                  var e = this.toFrequency(),
                    n = Math.log2(e / t.Frequency.A4),
                    s = Math.round(12 * n) + 57,
                    o = Math.floor(s / 12)
                  return o < 0 && (s += -12 * o), i[s % 12] + o.toString()
                }),
                (t.Frequency.prototype.toSeconds = function () {
                  return 1 / t.TimeBase.prototype.toSeconds.call(this)
                }),
                (t.Frequency.prototype.toFrequency = function () {
                  return t.TimeBase.prototype.toFrequency.call(this)
                }),
                (t.Frequency.prototype.toTicks = function () {
                  var e = this._beatsToUnits(1),
                    i = this.valueOf() / e
                  return Math.floor(i * t.Transport.PPQ)
                }),
                (t.Frequency.prototype._noArg = function () {
                  return 0
                }),
                (t.Frequency.prototype._frequencyToUnits = function (t) {
                  return t
                }),
                (t.Frequency.prototype._ticksToUnits = function (e) {
                  return (
                    1 / ((60 * e) / (t.Transport.bpm.value * t.Transport.PPQ))
                  )
                }),
                (t.Frequency.prototype._beatsToUnits = function (e) {
                  return 1 / t.TimeBase.prototype._beatsToUnits.call(this, e)
                }),
                (t.Frequency.prototype._secondsToUnits = function (t) {
                  return 1 / t
                }),
                (t.Frequency.prototype._defaultUnits = "hz")
              var e = {
                  cbb: -2,
                  cb: -1,
                  c: 0,
                  "c#": 1,
                  cx: 2,
                  dbb: 0,
                  db: 1,
                  d: 2,
                  "d#": 3,
                  dx: 4,
                  ebb: 2,
                  eb: 3,
                  e: 4,
                  "e#": 5,
                  ex: 6,
                  fbb: 3,
                  fb: 4,
                  f: 5,
                  "f#": 6,
                  fx: 7,
                  gbb: 5,
                  gb: 6,
                  g: 7,
                  "g#": 8,
                  gx: 9,
                  abb: 7,
                  ab: 8,
                  a: 9,
                  "a#": 10,
                  ax: 11,
                  bbb: 9,
                  bb: 10,
                  b: 11,
                  "b#": 12,
                  bx: 13,
                },
                i = [
                  "C",
                  "C#",
                  "D",
                  "D#",
                  "E",
                  "F",
                  "F#",
                  "G",
                  "G#",
                  "A",
                  "A#",
                  "B",
                ]
              return (
                (t.Frequency.A4 = 440),
                (t.Frequency.mtof = function (e) {
                  return t.Frequency.A4 * Math.pow(2, (e - 69) / 12)
                }),
                (t.Frequency.ftom = function (e) {
                  return 69 + Math.round(12 * Math.log2(e / t.Frequency.A4))
                }),
                t.Frequency
              )
            }),
            e(function (t) {
              return (
                (t.Time = function (e, i) {
                  if (!(this instanceof t.Time)) return new t.Time(e, i)
                  t.TimeBase.call(this, e, i)
                }),
                t.extend(t.Time, t.TimeBase),
                (t.Time.prototype._expressions = Object.assign(
                  {},
                  t.TimeBase.prototype._expressions,
                  {
                    quantize: {
                      regexp: /^@(.+)/,
                      method: function (e) {
                        if (t.Transport) {
                          var i = new this.constructor(e)
                          return t.Transport.nextSubdivision(i)
                        }
                        return 0
                      },
                    },
                    now: {
                      regexp: /^\+(.+)/,
                      method: function (t) {
                        return this._now() + new this.constructor(t)
                      },
                    },
                  },
                )),
                (t.Time.prototype.quantize = function (e, i) {
                  i = t.defaultArg(i, 1)
                  var n = new this.constructor(e),
                    s = this.valueOf()
                  return s + (Math.round(s / n) * n - s) * i
                }),
                (t.Time.prototype.toNotation = function () {
                  for (
                    var e = this.toSeconds(), i = ["1m"], n = 1;
                    n < 8;
                    n++
                  ) {
                    var s = Math.pow(2, n)
                    i.push(s + "n."), i.push(s + "n"), i.push(s + "t")
                  }
                  i.push("0")
                  var o = i[0],
                    r = t.Time(i[0]).toSeconds()
                  return (
                    i.forEach(function (i) {
                      var n = t.Time(i).toSeconds()
                      Math.abs(n - e) < Math.abs(r - e) && ((o = i), (r = n))
                    }),
                    o
                  )
                }),
                (t.Time.prototype.toBarsBeatsSixteenths = function () {
                  var t = this._beatsToUnits(1),
                    e = this.valueOf() / t,
                    i = Math.floor(e / this._getTimeSignature()),
                    n = (e % 1) * 4
                  return (
                    (e = Math.floor(e) % this._getTimeSignature()),
                    (n = n.toString()).length > 3 &&
                      (n = parseFloat(parseFloat(n).toFixed(3))),
                    [i, e, n].join(":")
                  )
                }),
                (t.Time.prototype.toTicks = function () {
                  var t = this._beatsToUnits(1),
                    e = this.valueOf() / t
                  return Math.round(e * this._getPPQ())
                }),
                (t.Time.prototype.toSeconds = function () {
                  return this.valueOf()
                }),
                (t.Time.prototype.toMidi = function () {
                  return t.Frequency.ftom(this.toFrequency())
                }),
                t.Time
              )
            }),
            e(function (t) {
              return (
                (t.TransportTime = function (e, i) {
                  if (!(this instanceof t.TransportTime))
                    return new t.TransportTime(e, i)
                  t.Time.call(this, e, i)
                }),
                t.extend(t.TransportTime, t.Time),
                (t.TransportTime.prototype._now = function () {
                  return t.Transport.seconds
                }),
                t.TransportTime
              )
            }),
            e(function (t) {
              return (
                (t.Type = {
                  Default: "number",
                  Time: "time",
                  Frequency: "frequency",
                  TransportTime: "transportTime",
                  Ticks: "ticks",
                  NormalRange: "normalRange",
                  AudioRange: "audioRange",
                  Decibels: "db",
                  Interval: "interval",
                  BPM: "bpm",
                  Positive: "positive",
                  Gain: "gain",
                  Cents: "cents",
                  Degrees: "degrees",
                  MIDI: "midi",
                  BarsBeatsSixteenths: "barsBeatsSixteenths",
                  Samples: "samples",
                  Hertz: "hertz",
                  Note: "note",
                  Milliseconds: "milliseconds",
                  Seconds: "seconds",
                  Notation: "notation",
                }),
                (t.prototype.toSeconds = function (e) {
                  return t.isNumber(e)
                    ? e
                    : t.isUndef(e)
                    ? this.now()
                    : t.isString(e)
                    ? new t.Time(e).toSeconds()
                    : e instanceof t.TimeBase
                    ? e.toSeconds()
                    : void 0
                }),
                (t.prototype.toFrequency = function (e) {
                  return t.isNumber(e)
                    ? e
                    : t.isString(e) || t.isUndef(e)
                    ? new t.Frequency(e).valueOf()
                    : e instanceof t.TimeBase
                    ? e.toFrequency()
                    : void 0
                }),
                (t.prototype.toTicks = function (e) {
                  return t.isNumber(e) || t.isString(e)
                    ? new t.TransportTime(e).toTicks()
                    : t.isUndef(e)
                    ? t.Transport.ticks
                    : e instanceof t.TimeBase
                    ? e.toTicks()
                    : void 0
                }),
                t
              )
            }),
            e(function (t) {
              return (
                (t.Param = function () {
                  var e = t.defaults(
                    arguments,
                    ["param", "units", "convert"],
                    t.Param,
                  )
                  t.AudioNode.call(this),
                    (this._param = this.input = e.param),
                    (this.units = e.units),
                    (this.convert = e.convert),
                    (this.overridden = !1),
                    (this._events = new t.Timeline(1e3)),
                    t.isDefined(e.value) &&
                      this._param &&
                      (this.value = e.value)
                }),
                t.extend(t.Param, t.AudioNode),
                (t.Param.defaults = {
                  units: t.Type.Default,
                  convert: !0,
                  param: void 0,
                }),
                Object.defineProperty(t.Param.prototype, "value", {
                  get: function () {
                    var t = this.now()
                    return this._toUnits(this.getValueAtTime(t))
                  },
                  set: function (t) {
                    ;(this._initialValue = this._fromUnits(t)),
                      this.cancelScheduledValues(this.context.currentTime),
                      this.setValueAtTime(t, this.context.currentTime)
                  },
                }),
                Object.defineProperty(t.Param.prototype, "minValue", {
                  get: function () {
                    return this.units === t.Type.Time ||
                      this.units === t.Type.Frequency ||
                      this.units === t.Type.NormalRange ||
                      this.units === t.Type.Positive ||
                      this.units === t.Type.BPM
                      ? 0
                      : this.units === t.Type.AudioRange
                      ? -1
                      : this.units === t.Type.Decibels
                      ? -1 / 0
                      : this._param.minValue
                  },
                }),
                Object.defineProperty(t.Param.prototype, "maxValue", {
                  get: function () {
                    return this.units === t.Type.NormalRange ||
                      this.units === t.Type.AudioRange
                      ? 1
                      : this._param.maxValue
                  },
                }),
                (t.Param.prototype._fromUnits = function (e) {
                  if (
                    (!this.convert && !t.isUndef(this.convert)) ||
                    this.overridden
                  )
                    return e
                  switch (this.units) {
                    case t.Type.Time:
                      return this.toSeconds(e)
                    case t.Type.Frequency:
                      return this.toFrequency(e)
                    case t.Type.Decibels:
                      return t.dbToGain(e)
                    case t.Type.NormalRange:
                      return Math.min(Math.max(e, 0), 1)
                    case t.Type.AudioRange:
                      return Math.min(Math.max(e, -1), 1)
                    case t.Type.Positive:
                      return Math.max(e, 0)
                    default:
                      return e
                  }
                }),
                (t.Param.prototype._toUnits = function (e) {
                  if (!this.convert && !t.isUndef(this.convert)) return e
                  switch (this.units) {
                    case t.Type.Decibels:
                      return t.gainToDb(e)
                    default:
                      return e
                  }
                }),
                (t.Param.prototype._minOutput = 1e-5),
                (t.Param.AutomationType = {
                  Linear: "linearRampToValueAtTime",
                  Exponential: "exponentialRampToValueAtTime",
                  Target: "setTargetAtTime",
                  SetValue: "setValueAtTime",
                }),
                (t.Param.prototype.setValueAtTime = function (e, i) {
                  return (
                    (i = this.toSeconds(i)),
                    (e = this._fromUnits(e)),
                    this._events.add({
                      type: t.Param.AutomationType.SetValue,
                      value: e,
                      time: i,
                    }),
                    this._param.setValueAtTime(e, i),
                    this
                  )
                }),
                (t.Param.prototype.getValueAtTime = function (e) {
                  e = this.toSeconds(e)
                  var i = this._events.getAfter(e),
                    n = this._events.get(e),
                    s = t.defaultArg(
                      this._initialValue,
                      this._param.defaultValue,
                    ),
                    o = s
                  if (null === n) o = s
                  else if (n.type === t.Param.AutomationType.Target) {
                    var r,
                      a = this._events.getBefore(n.time)
                    ;(r = null === a ? s : a.value),
                      (o = this._exponentialApproach(
                        n.time,
                        r,
                        n.value,
                        n.constant,
                        e,
                      ))
                  } else
                    o =
                      null === i
                        ? n.value
                        : i.type === t.Param.AutomationType.Linear
                        ? this._linearInterpolate(
                            n.time,
                            n.value,
                            i.time,
                            i.value,
                            e,
                          )
                        : i.type === t.Param.AutomationType.Exponential
                        ? this._exponentialInterpolate(
                            n.time,
                            n.value,
                            i.time,
                            i.value,
                            e,
                          )
                        : n.value
                  return o
                }),
                (t.Param.prototype.setRampPoint = function (t) {
                  t = this.toSeconds(t)
                  var e = this.getValueAtTime(t)
                  return (
                    this.cancelAndHoldAtTime(t),
                    0 === e && (e = this._minOutput),
                    this.setValueAtTime(this._toUnits(e), t),
                    this
                  )
                }),
                (t.Param.prototype.linearRampToValueAtTime = function (e, i) {
                  return (
                    (e = this._fromUnits(e)),
                    (i = this.toSeconds(i)),
                    this._events.add({
                      type: t.Param.AutomationType.Linear,
                      value: e,
                      time: i,
                    }),
                    this._param.linearRampToValueAtTime(e, i),
                    this
                  )
                }),
                (t.Param.prototype.exponentialRampToValueAtTime = function (
                  e,
                  i,
                ) {
                  return (
                    (e = this._fromUnits(e)),
                    (e = Math.max(this._minOutput, e)),
                    (i = this.toSeconds(i)),
                    this._events.add({
                      type: t.Param.AutomationType.Exponential,
                      time: i,
                      value: e,
                    }),
                    this._param.exponentialRampToValueAtTime(e, i),
                    this
                  )
                }),
                (t.Param.prototype.exponentialRampTo = function (t, e, i) {
                  return (
                    (i = this.toSeconds(i)),
                    this.setRampPoint(i),
                    this.exponentialRampToValueAtTime(t, i + this.toSeconds(e)),
                    this
                  )
                }),
                (t.Param.prototype.linearRampTo = function (t, e, i) {
                  return (
                    (i = this.toSeconds(i)),
                    this.setRampPoint(i),
                    this.linearRampToValueAtTime(t, i + this.toSeconds(e)),
                    this
                  )
                }),
                (t.Param.prototype.targetRampTo = function (t, e, i) {
                  return (
                    (i = this.toSeconds(i)),
                    this.setRampPoint(i),
                    this.exponentialApproachValueAtTime(t, i, e),
                    this
                  )
                }),
                (t.Param.prototype.exponentialApproachValueAtTime = function (
                  t,
                  e,
                  i,
                ) {
                  var n = Math.log(this.toSeconds(i) + 1) / Math.log(200)
                  return (e = this.toSeconds(e)), this.setTargetAtTime(t, e, n)
                }),
                (t.Param.prototype.setTargetAtTime = function (e, i, n) {
                  if (((e = this._fromUnits(e)), n <= 0))
                    throw new Error("timeConstant must be greater than 0")
                  return (
                    (i = this.toSeconds(i)),
                    this._events.add({
                      type: t.Param.AutomationType.Target,
                      value: e,
                      time: i,
                      constant: n,
                    }),
                    this._param.setTargetAtTime(e, i, n),
                    this
                  )
                }),
                (t.Param.prototype.setValueCurveAtTime = function (e, i, n, s) {
                  ;(s = t.defaultArg(s, 1)),
                    (n = this.toSeconds(n)),
                    (i = this.toSeconds(i)),
                    this.setValueAtTime(e[0] * s, i)
                  for (var o = n / (e.length - 1), r = 1; r < e.length; r++)
                    this.linearRampToValueAtTime(e[r] * s, i + r * o)
                  return this
                }),
                (t.Param.prototype.cancelScheduledValues = function (t) {
                  return (
                    (t = this.toSeconds(t)),
                    this._events.cancel(t),
                    this._param.cancelScheduledValues(t),
                    this
                  )
                }),
                (t.Param.prototype.cancelAndHoldAtTime = function (e) {
                  var i = this.getValueAtTime(e),
                    n = this._events.get(e),
                    s = this._events.getAfter(e)
                  return (
                    n && n.time === e
                      ? s
                        ? this._events.cancel(s.time)
                        : this._events.cancel(e + 1e-6)
                      : s &&
                        (this._events.cancel(s.time),
                        this._param.cancelAndHoldAtTime ||
                          this._param.cancelScheduledValues(e),
                        s.type === t.Param.AutomationType.Linear
                          ? this._param.cancelAndHoldAtTime
                            ? this._events.add({
                                type: t.Param.AutomationType.Linear,
                                value: i,
                                time: e,
                              })
                            : this.linearRampToValueAtTime(i, e)
                          : s.type === t.Param.AutomationType.Exponential &&
                            (this._param.cancelAndHoldAtTime
                              ? this._events.add({
                                  type: t.Param.AutomationType.Exponential,
                                  value: i,
                                  time: e,
                                })
                              : this.exponentialRampToValueAtTime(i, e))),
                    this._events.add({
                      type: t.Param.AutomationType.SetValue,
                      value: i,
                      time: e,
                    }),
                    this._param.cancelAndHoldAtTime
                      ? this._param.cancelAndHoldAtTime(e)
                      : this._param.setValueAtTime(i, e),
                    this
                  )
                }),
                (t.Param.prototype.rampTo = function (e, i, n) {
                  return (
                    (i = t.defaultArg(i, 0.1)),
                    this.units === t.Type.Frequency ||
                    this.units === t.Type.BPM ||
                    this.units === t.Type.Decibels
                      ? this.exponentialRampTo(e, i, n)
                      : this.linearRampTo(e, i, n),
                    this
                  )
                }),
                (t.Param.prototype._exponentialApproach = function (
                  t,
                  e,
                  i,
                  n,
                  s,
                ) {
                  return i + (e - i) * Math.exp(-(s - t) / n)
                }),
                (t.Param.prototype._linearInterpolate = function (
                  t,
                  e,
                  i,
                  n,
                  s,
                ) {
                  return e + ((s - t) / (i - t)) * (n - e)
                }),
                (t.Param.prototype._exponentialInterpolate = function (
                  t,
                  e,
                  i,
                  n,
                  s,
                ) {
                  return e * Math.pow(n / e, (s - t) / (i - t))
                }),
                (t.Param.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    (this._param = null),
                    (this._events = null),
                    this
                  )
                }),
                t.Param
              )
            }),
            e(function (t) {
              return (
                (t.OfflineContext = function (e, i, n) {
                  var s = new OfflineAudioContext(e, i * n, n)
                  t.Context.call(this, {
                    context: s,
                    clockSource: "offline",
                    lookAhead: 0,
                    updateInterval: 128 / n,
                  }),
                    (this._duration = i),
                    (this._currentTime = 0)
                }),
                t.extend(t.OfflineContext, t.Context),
                (t.OfflineContext.prototype.now = function () {
                  return this._currentTime
                }),
                (t.OfflineContext.prototype.render = function () {
                  for (; this._duration - this._currentTime >= 0; )
                    this.emit("tick"), (this._currentTime += this.blockTime)
                  return this._context.startRendering()
                }),
                (t.OfflineContext.prototype.close = function () {
                  return (this._context = null), Promise.resolve()
                }),
                t.OfflineContext
              )
            }),
            e(function (t) {
              if (t.supported) {
                var e = navigator.userAgent.toLowerCase()
                e.includes("safari") &&
                  !e.includes("chrome") &&
                  e.includes("mobile") &&
                  (t.OfflineContext.prototype.createBufferSource = function () {
                    var t = this._context.createBufferSource(),
                      e = t.start
                    return (
                      (t.start = function (i) {
                        this.setTimeout(
                          function () {
                            e.call(t, i)
                          }.bind(this),
                          0,
                        )
                      }.bind(this)),
                      t
                    )
                  })
              }
            }),
            e(function (t) {
              return (
                (t.Gain = function () {
                  var e = t.defaults(arguments, ["gain", "units"], t.Gain)
                  t.AudioNode.call(this),
                    (this.input =
                      this.output =
                      this._gainNode =
                        this.context.createGain()),
                    (this.gain = new t.Param({
                      param: this._gainNode.gain,
                      units: e.units,
                      value: e.gain,
                      convert: e.convert,
                    })),
                    this._readOnly("gain")
                }),
                t.extend(t.Gain, t.AudioNode),
                (t.Gain.defaults = { gain: 1, convert: !0 }),
                (t.Gain.prototype.dispose = function () {
                  t.AudioNode.prototype.dispose.call(this),
                    this._gainNode.disconnect(),
                    (this._gainNode = null),
                    this._writable("gain"),
                    this.gain.dispose(),
                    (this.gain = null)
                }),
                t.Gain
              )
            }),
            e(function (t) {
              if (t.supported && !AudioContext.prototype.createConstantSource) {
                var e = function (t) {
                  this.context = t
                  for (
                    var e = t.createBuffer(1, 128, t.sampleRate),
                      i = e.getChannelData(0),
                      n = 0;
                    n < i.length;
                    n++
                  )
                    i[n] = 1
                  ;(this._bufferSource = t.createBufferSource()),
                    (this._bufferSource.channelCount = 1),
                    (this._bufferSource.channelCountMode = "explicit"),
                    (this._bufferSource.buffer = e),
                    (this._bufferSource.loop = !0)
                  var s = (this._output = t.createGain())
                  ;(this.offset = s.gain), this._bufferSource.connect(s)
                }
                ;(e.prototype.start = function (t) {
                  return this._bufferSource.start(t), this
                }),
                  (e.prototype.stop = function (t) {
                    return this._bufferSource.stop(t), this
                  }),
                  (e.prototype.connect = function () {
                    return (
                      this._output.connect.apply(this._output, arguments), this
                    )
                  }),
                  (e.prototype.disconnect = function () {
                    return (
                      this._output.disconnect.apply(this._output, arguments),
                      this
                    )
                  }),
                  (AudioContext.prototype.createConstantSource = function () {
                    return new e(this)
                  }),
                  (t.Context.prototype.createConstantSource = function () {
                    return new e(this)
                  })
              }
            }),
            e(function (t) {
              return (
                (t.Signal = function () {
                  var e = t.defaults(arguments, ["value", "units"], t.Signal)
                  t.Param.call(this, e),
                    (this._proxies = []),
                    (this._sourceStarted = !1),
                    (this._constantSource =
                      this.context.createConstantSource()),
                    (this._param = this._constantSource.offset),
                    (this.value = e.value),
                    (this.output = this._constantSource),
                    (this.input = this._param = this.output.offset)
                }),
                t.extend(t.Signal, t.Param),
                (t.Signal.defaults = {
                  value: 0,
                  units: t.Type.Default,
                  convert: !0,
                }),
                (t.Signal.prototype.connect = function (e) {
                  return (
                    this._isParam(e) && !this._sourceStarted
                      ? (this._proxies.push(e),
                        (e.overridden = !0),
                        this._applyAutomations(e))
                      : (t.SignalBase.prototype.connect.apply(this, arguments),
                        this._sourceStarted ||
                          ((this._sourceStarted = !0),
                          this._constantSource.start(0))),
                    this
                  )
                }),
                (t.Signal.prototype._isParam = function (e) {
                  return (
                    (t.Param && t.Param === e.constructor) ||
                    e instanceof AudioParam
                  )
                }),
                (t.Signal.prototype._connectProxies = function () {
                  this._sourceStarted ||
                    ((this._sourceStarted = !0), this._constantSource.start(0)),
                    this._proxies.forEach(
                      function (e) {
                        t.SignalBase.prototype.connect.call(this, e),
                          e._proxies && e._connectProxies()
                      }.bind(this),
                    )
                }),
                (t.Signal.prototype._onConnect = function (t) {
                  this._isParam(t) || this._connectProxies()
                }),
                (t.Signal.prototype._applyAutomations = function (t) {
                  var e = this.context.currentTime
                  t.cancelScheduledValues(e)
                  var i = this.getValueAtTime(e)
                  t.setValueAtTime(i, e),
                    this._events.forEachFrom(e, function (e) {
                      t[e.type](e.value, e.time, e.constant)
                    })
                }),
                (t.Signal.prototype.disconnect = function (e) {
                  if (this._proxies.includes(e)) {
                    var i = this._proxies.indexOf(e)
                    this._proxies.splice(i, 1)
                  } else e || (this._proxies = [])
                  return t.SignalBase.prototype.disconnect.apply(
                    this,
                    arguments,
                  )
                }),
                (t.Signal.prototype.getValueAtTime = function (e) {
                  return this._param.getValueAtTime
                    ? this._param.getValueAtTime(e)
                    : t.Param.prototype.getValueAtTime.call(this, e)
                }),
                [
                  "setValueAtTime",
                  "linearRampToValueAtTime",
                  "exponentialRampToValueAtTime",
                  "setTargetAtTime",
                ].forEach(function (e) {
                  var i = t.Signal.prototype[e]
                  t.Signal.prototype[e] = function () {
                    var t = arguments
                    i.apply(this, arguments),
                      (t[0] = this._fromUnits(t[0])),
                      (t[1] = this.toSeconds(t[1])),
                      this._proxies.forEach(function (i) {
                        i[e].apply(i, t)
                      })
                  }
                }),
                ["cancelScheduledValues", "cancelAndHoldAtTime"].forEach(
                  function (e) {
                    var i = t.Signal.prototype[e]
                    t.Signal.prototype[e] = function () {
                      var t = arguments
                      i.apply(this, arguments),
                        (t[0] = this.toSeconds(t[0])),
                        this._proxies.forEach(function (i) {
                          i[e].apply(i, t)
                        })
                    }
                  },
                ),
                (t.Signal.prototype.dispose = function () {
                  return (
                    t.Param.prototype.dispose.call(this),
                    this._constantSource.disconnect(),
                    (this._constantSource = null),
                    (this._proxies = null),
                    this
                  )
                }),
                t.Signal
              )
            }),
            e(function (t) {
              return (
                (t.Pow = function (e) {
                  t.SignalBase.call(this),
                    (this._exp = t.defaultArg(e, 1)),
                    (this._expScaler =
                      this.input =
                      this.output =
                        new t.WaveShaper(this._expFunc(this._exp), 8192))
                }),
                t.extend(t.Pow, t.SignalBase),
                Object.defineProperty(t.Pow.prototype, "value", {
                  get: function () {
                    return this._exp
                  },
                  set: function (t) {
                    ;(this._exp = t),
                      this._expScaler.setMap(this._expFunc(this._exp))
                  },
                }),
                (t.Pow.prototype._expFunc = function (t) {
                  return function (e) {
                    return Math.pow(Math.abs(e), t)
                  }
                }),
                (t.Pow.prototype.dispose = function () {
                  return (
                    t.SignalBase.prototype.dispose.call(this),
                    this._expScaler.dispose(),
                    (this._expScaler = null),
                    this
                  )
                }),
                t.Pow
              )
            }),
            e(function (t) {
              return (
                (t.Envelope = function () {
                  var e = t.defaults(
                    arguments,
                    ["attack", "decay", "sustain", "release"],
                    t.Envelope,
                  )
                  t.AudioNode.call(this),
                    (this.attack = e.attack),
                    (this.decay = e.decay),
                    (this.sustain = e.sustain),
                    (this.release = e.release),
                    (this._attackCurve = "linear"),
                    (this._releaseCurve = "exponential"),
                    (this._sig = this.output = new t.Signal(0)),
                    (this.attackCurve = e.attackCurve),
                    (this.releaseCurve = e.releaseCurve)
                }),
                t.extend(t.Envelope, t.AudioNode),
                (t.Envelope.defaults = {
                  attack: 0.01,
                  decay: 0.1,
                  sustain: 0.5,
                  release: 1,
                  attackCurve: "linear",
                  releaseCurve: "exponential",
                }),
                Object.defineProperty(t.Envelope.prototype, "value", {
                  get: function () {
                    return this.getValueAtTime(this.now())
                  },
                }),
                Object.defineProperty(t.Envelope.prototype, "attackCurve", {
                  get: function () {
                    if (t.isString(this._attackCurve)) return this._attackCurve
                    if (t.isArray(this._attackCurve)) {
                      for (var e in t.Envelope.Type)
                        if (t.Envelope.Type[e].In === this._attackCurve)
                          return e
                      return this._attackCurve
                    }
                  },
                  set: function (e) {
                    if (t.Envelope.Type.hasOwnProperty(e)) {
                      var i = t.Envelope.Type[e]
                      t.isObject(i)
                        ? (this._attackCurve = i.In)
                        : (this._attackCurve = i)
                    } else {
                      if (!t.isArray(e))
                        throw new Error("Tone.Envelope: invalid curve: " + e)
                      this._attackCurve = e
                    }
                  },
                }),
                Object.defineProperty(t.Envelope.prototype, "releaseCurve", {
                  get: function () {
                    if (t.isString(this._releaseCurve))
                      return this._releaseCurve
                    if (t.isArray(this._releaseCurve)) {
                      for (var e in t.Envelope.Type)
                        if (t.Envelope.Type[e].Out === this._releaseCurve)
                          return e
                      return this._releaseCurve
                    }
                  },
                  set: function (e) {
                    if (t.Envelope.Type.hasOwnProperty(e)) {
                      var i = t.Envelope.Type[e]
                      t.isObject(i)
                        ? (this._releaseCurve = i.Out)
                        : (this._releaseCurve = i)
                    } else {
                      if (!t.isArray(e))
                        throw new Error("Tone.Envelope: invalid curve: " + e)
                      this._releaseCurve = e
                    }
                  },
                }),
                (t.Envelope.prototype.triggerAttack = function (e, i) {
                  e = this.toSeconds(e)
                  var n = this.toSeconds(this.attack),
                    s = n,
                    o = this.toSeconds(this.decay)
                  i = t.defaultArg(i, 1)
                  var r = this.getValueAtTime(e)
                  if (
                    (r > 0 && (s = (1 - r) / (1 / s)),
                    "linear" === this._attackCurve)
                  )
                    this._sig.linearRampTo(i, s, e)
                  else if ("exponential" === this._attackCurve)
                    this._sig.targetRampTo(i, s, e)
                  else if (s > 0) {
                    this._sig.cancelAndHoldAtTime(e)
                    var a = this._attackCurve
                    if (s < n) {
                      var u = 1 - s / n,
                        l = Math.floor(u * this._attackCurve.length)
                      ;(a = this._attackCurve.slice(l))[0] = r
                    }
                    this._sig.setValueCurveAtTime(a, e, s, i)
                  }
                  return (
                    o && this._sig.targetRampTo(i * this.sustain, o, s + e),
                    this
                  )
                }),
                (t.Envelope.prototype.triggerRelease = function (e) {
                  e = this.toSeconds(e)
                  var i = this.getValueAtTime(e)
                  if (i > 0) {
                    var n = this.toSeconds(this.release)
                    if ("linear" === this._releaseCurve)
                      this._sig.linearRampTo(0, n, e)
                    else if ("exponential" === this._releaseCurve)
                      this._sig.targetRampTo(0, n, e)
                    else {
                      var s = this._releaseCurve
                      t.isArray(s) &&
                        (this._sig.cancelAndHoldAtTime(e),
                        this._sig.setValueCurveAtTime(s, e, n, i))
                    }
                  }
                  return this
                }),
                (t.Envelope.prototype.getValueAtTime = function (t) {
                  return this._sig.getValueAtTime(t)
                }),
                (t.Envelope.prototype.triggerAttackRelease = function (
                  t,
                  e,
                  i,
                ) {
                  return (
                    (e = this.toSeconds(e)),
                    this.triggerAttack(e, i),
                    this.triggerRelease(e + this.toSeconds(t)),
                    this
                  )
                }),
                (t.Envelope.prototype.cancel = function (t) {
                  return this._sig.cancelScheduledValues(t), this
                }),
                (t.Envelope.prototype.connect = t.SignalBase.prototype.connect),
                (function () {
                  var e,
                    i,
                    n = []
                  for (e = 0; e < 128; e++)
                    n[e] = Math.sin((e / 127) * (Math.PI / 2))
                  var s = []
                  for (e = 0; e < 127; e++) {
                    i = e / 127
                    var o = Math.sin(i * (2 * Math.PI) * 6.4 - Math.PI / 2) + 1
                    s[e] = o / 10 + 0.83 * i
                  }
                  s[127] = 1
                  var r = []
                  for (e = 0; e < 128; e++) r[e] = Math.ceil((e / 127) * 5) / 5
                  var a = []
                  for (e = 0; e < 128; e++)
                    (i = e / 127), (a[e] = 0.5 * (1 - Math.cos(Math.PI * i)))
                  var u = []
                  for (e = 0; e < 128; e++) {
                    i = e / 127
                    var l = 4 * Math.pow(i, 3) + 0.2,
                      h = Math.cos(l * Math.PI * 2 * i)
                    u[e] = Math.abs(h * (1 - i))
                  }
                  function c(t) {
                    for (var e = new Array(t.length), i = 0; i < t.length; i++)
                      e[i] = 1 - t[i]
                    return e
                  }
                  t.Envelope.Type = {
                    linear: "linear",
                    exponential: "exponential",
                    bounce: { In: c(u), Out: u },
                    cosine: {
                      In: n,
                      Out: (function (t) {
                        return t.slice(0).reverse()
                      })(n),
                    },
                    step: { In: r, Out: c(r) },
                    ripple: { In: s, Out: c(s) },
                    sine: { In: a, Out: c(a) },
                  }
                })(),
                (t.Envelope.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._sig.dispose(),
                    (this._sig = null),
                    (this._attackCurve = null),
                    (this._releaseCurve = null),
                    this
                  )
                }),
                t.Envelope
              )
            }),
            e(function (t) {
              return (
                (t.AmplitudeEnvelope = function () {
                  t.Envelope.apply(this, arguments),
                    (this.input = this.output = new t.Gain()),
                    this._sig.connect(this.output.gain)
                }),
                t.extend(t.AmplitudeEnvelope, t.Envelope),
                (t.AmplitudeEnvelope.prototype.dispose = function () {
                  return t.Envelope.prototype.dispose.call(this), this
                }),
                t.AmplitudeEnvelope
              )
            }),
            e(function (t) {
              t.supported &&
                (AnalyserNode.prototype.getFloatTimeDomainData ||
                  (AnalyserNode.prototype.getFloatTimeDomainData = function (
                    t,
                  ) {
                    var e = new Uint8Array(t.length)
                    this.getByteTimeDomainData(e)
                    for (var i = 0; i < e.length; i++) t[i] = (e[i] - 128) / 128
                  }))
            }),
            e(function (t) {
              return (
                (t.Analyser = function () {
                  var e = t.defaults(arguments, ["type", "size"], t.Analyser)
                  t.AudioNode.call(this),
                    (this._analyser =
                      this.input =
                      this.output =
                        this.context.createAnalyser()),
                    (this._type = e.type),
                    (this._buffer = null),
                    (this.size = e.size),
                    (this.type = e.type)
                }),
                t.extend(t.Analyser, t.AudioNode),
                (t.Analyser.defaults = {
                  size: 1024,
                  type: "fft",
                  smoothing: 0.8,
                }),
                (t.Analyser.Type = { Waveform: "waveform", FFT: "fft" }),
                (t.Analyser.prototype.getValue = function () {
                  return (
                    this._type === t.Analyser.Type.FFT
                      ? this._analyser.getFloatFrequencyData(this._buffer)
                      : this._type === t.Analyser.Type.Waveform &&
                        this._analyser.getFloatTimeDomainData(this._buffer),
                    this._buffer
                  )
                }),
                Object.defineProperty(t.Analyser.prototype, "size", {
                  get: function () {
                    return this._analyser.frequencyBinCount
                  },
                  set: function (t) {
                    ;(this._analyser.fftSize = 2 * t),
                      (this._buffer = new Float32Array(t))
                  },
                }),
                Object.defineProperty(t.Analyser.prototype, "type", {
                  get: function () {
                    return this._type
                  },
                  set: function (e) {
                    if (
                      e !== t.Analyser.Type.Waveform &&
                      e !== t.Analyser.Type.FFT
                    )
                      throw new TypeError("Tone.Analyser: invalid type: " + e)
                    this._type = e
                  },
                }),
                Object.defineProperty(t.Analyser.prototype, "smoothing", {
                  get: function () {
                    return this._analyser.smoothingTimeConstant
                  },
                  set: function (t) {
                    this._analyser.smoothingTimeConstant = t
                  },
                }),
                (t.Analyser.prototype.dispose = function () {
                  t.AudioNode.prototype.dispose.call(this),
                    this._analyser.disconnect(),
                    (this._analyser = null),
                    (this._buffer = null)
                }),
                t.Analyser
              )
            }),
            e(function (t) {
              return (
                (t.Compressor = function () {
                  var e = t.defaults(
                    arguments,
                    ["threshold", "ratio"],
                    t.Compressor,
                  )
                  t.AudioNode.call(this),
                    (this._compressor =
                      this.input =
                      this.output =
                        this.context.createDynamicsCompressor()),
                    (this.threshold = new t.Param({
                      param: this._compressor.threshold,
                      units: t.Type.Decibels,
                      convert: !1,
                    })),
                    (this.attack = new t.Param(
                      this._compressor.attack,
                      t.Type.Time,
                    )),
                    (this.release = new t.Param(
                      this._compressor.release,
                      t.Type.Time,
                    )),
                    (this.knee = new t.Param({
                      param: this._compressor.knee,
                      units: t.Type.Decibels,
                      convert: !1,
                    })),
                    (this.ratio = new t.Param({
                      param: this._compressor.ratio,
                      convert: !1,
                    })),
                    this._readOnly([
                      "knee",
                      "release",
                      "attack",
                      "ratio",
                      "threshold",
                    ]),
                    this.set(e)
                }),
                t.extend(t.Compressor, t.AudioNode),
                (t.Compressor.defaults = {
                  ratio: 12,
                  threshold: -24,
                  release: 0.25,
                  attack: 0.003,
                  knee: 30,
                }),
                (t.Compressor.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._writable([
                      "knee",
                      "release",
                      "attack",
                      "ratio",
                      "threshold",
                    ]),
                    this._compressor.disconnect(),
                    (this._compressor = null),
                    this.attack.dispose(),
                    (this.attack = null),
                    this.release.dispose(),
                    (this.release = null),
                    this.threshold.dispose(),
                    (this.threshold = null),
                    this.ratio.dispose(),
                    (this.ratio = null),
                    this.knee.dispose(),
                    (this.knee = null),
                    this
                  )
                }),
                t.Compressor
              )
            }),
            e(function (t) {
              return (
                (t.Add = function (e) {
                  t.Signal.call(this),
                    this.createInsOuts(2, 0),
                    (this._sum =
                      this.input[0] =
                      this.input[1] =
                      this.output =
                        new t.Gain()),
                    (this._param = this.input[1] = new t.Signal(e)),
                    this._param.connect(this._sum)
                }),
                t.extend(t.Add, t.Signal),
                (t.Add.prototype.dispose = function () {
                  return (
                    t.Signal.prototype.dispose.call(this),
                    this._sum.dispose(),
                    (this._sum = null),
                    this
                  )
                }),
                t.Add
              )
            }),
            e(function (t) {
              return (
                (t.Multiply = function (e) {
                  t.Signal.call(this),
                    this.createInsOuts(2, 0),
                    (this._mult = this.input[0] = this.output = new t.Gain()),
                    (this._param = this.input[1] = this.output.gain),
                    (this.value = t.defaultArg(e, 0))
                }),
                t.extend(t.Multiply, t.Signal),
                (t.Multiply.prototype.dispose = function () {
                  return (
                    t.Signal.prototype.dispose.call(this),
                    this._mult.dispose(),
                    (this._mult = null),
                    (this._param = null),
                    this
                  )
                }),
                t.Multiply
              )
            }),
            e(function (t) {
              return (
                (t.Negate = function () {
                  t.SignalBase.call(this),
                    (this._multiply =
                      this.input =
                      this.output =
                        new t.Multiply(-1))
                }),
                t.extend(t.Negate, t.SignalBase),
                (t.Negate.prototype.dispose = function () {
                  return (
                    t.SignalBase.prototype.dispose.call(this),
                    this._multiply.dispose(),
                    (this._multiply = null),
                    this
                  )
                }),
                t.Negate
              )
            }),
            e(function (t) {
              return (
                (t.Subtract = function (e) {
                  t.Signal.call(this),
                    this.createInsOuts(2, 0),
                    (this._sum = this.input[0] = this.output = new t.Gain()),
                    (this._neg = new t.Negate()),
                    (this._param = this.input[1] = new t.Signal(e)),
                    this._param.chain(this._neg, this._sum)
                }),
                t.extend(t.Subtract, t.Signal),
                (t.Subtract.prototype.dispose = function () {
                  return (
                    t.Signal.prototype.dispose.call(this),
                    this._neg.dispose(),
                    (this._neg = null),
                    this._sum.disconnect(),
                    (this._sum = null),
                    this
                  )
                }),
                t.Subtract
              )
            }),
            e(function (t) {
              return (
                (t.EqualPowerGain = function () {
                  t.SignalBase.call(this),
                    (this._eqPower =
                      this.input =
                      this.output =
                        new t.WaveShaper(
                          function (e) {
                            return Math.abs(e) < 0.001
                              ? 0
                              : t.equalPowerScale(e)
                          }.bind(this),
                          4096,
                        ))
                }),
                t.extend(t.EqualPowerGain, t.SignalBase),
                (t.EqualPowerGain.prototype.dispose = function () {
                  return (
                    t.SignalBase.prototype.dispose.call(this),
                    this._eqPower.dispose(),
                    (this._eqPower = null),
                    this
                  )
                }),
                t.EqualPowerGain
              )
            }),
            e(function (t) {
              return (
                (t.CrossFade = function (e) {
                  t.AudioNode.call(this),
                    this.createInsOuts(2, 1),
                    (this.a = this.input[0] = new t.Gain()),
                    (this.b = this.input[1] = new t.Gain()),
                    (this.fade = new t.Signal(
                      t.defaultArg(e, 0.5),
                      t.Type.NormalRange,
                    )),
                    (this._equalPowerA = new t.EqualPowerGain()),
                    (this._equalPowerB = new t.EqualPowerGain()),
                    (this._one = this.context.getConstant(1)),
                    (this._invert = new t.Subtract()),
                    this.a.connect(this.output),
                    this.b.connect(this.output),
                    this.fade.chain(this._equalPowerB, this.b.gain),
                    this._one.connect(this._invert, 0, 0),
                    this.fade.connect(this._invert, 0, 1),
                    this._invert.chain(this._equalPowerA, this.a.gain),
                    this._readOnly("fade")
                }),
                t.extend(t.CrossFade, t.AudioNode),
                (t.CrossFade.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._writable("fade"),
                    this._equalPowerA.dispose(),
                    (this._equalPowerA = null),
                    this._equalPowerB.dispose(),
                    (this._equalPowerB = null),
                    this.fade.dispose(),
                    (this.fade = null),
                    this._invert.dispose(),
                    (this._invert = null),
                    (this._one = null),
                    this.a.dispose(),
                    (this.a = null),
                    this.b.dispose(),
                    (this.b = null),
                    this
                  )
                }),
                t.CrossFade
              )
            }),
            e(function (t) {
              return (
                (t.Filter = function () {
                  var e = t.defaults(
                    arguments,
                    ["frequency", "type", "rolloff"],
                    t.Filter,
                  )
                  t.AudioNode.call(this),
                    this.createInsOuts(1, 1),
                    (this._filters = []),
                    (this.frequency = new t.Signal(
                      e.frequency,
                      t.Type.Frequency,
                    )),
                    (this.detune = new t.Signal(0, t.Type.Cents)),
                    (this.gain = new t.Signal({ value: e.gain, convert: !1 })),
                    (this.Q = new t.Signal(e.Q)),
                    (this._type = e.type),
                    (this._rolloff = e.rolloff),
                    (this.rolloff = e.rolloff),
                    this._readOnly(["detune", "frequency", "gain", "Q"])
                }),
                t.extend(t.Filter, t.AudioNode),
                (t.Filter.defaults = {
                  type: "lowpass",
                  frequency: 350,
                  rolloff: -12,
                  Q: 1,
                  gain: 0,
                }),
                Object.defineProperty(t.Filter.prototype, "type", {
                  get: function () {
                    return this._type
                  },
                  set: function (t) {
                    if (
                      -1 ===
                      [
                        "lowpass",
                        "highpass",
                        "bandpass",
                        "lowshelf",
                        "highshelf",
                        "notch",
                        "allpass",
                        "peaking",
                      ].indexOf(t)
                    )
                      throw new TypeError("Tone.Filter: invalid type " + t)
                    this._type = t
                    for (var e = 0; e < this._filters.length; e++)
                      this._filters[e].type = t
                  },
                }),
                Object.defineProperty(t.Filter.prototype, "rolloff", {
                  get: function () {
                    return this._rolloff
                  },
                  set: function (e) {
                    e = parseInt(e, 10)
                    var i = [-12, -24, -48, -96].indexOf(e)
                    if (-1 === i)
                      throw new RangeError(
                        "Tone.Filter: rolloff can only be -12, -24, -48 or -96",
                      )
                    ;(i += 1), (this._rolloff = e), this.input.disconnect()
                    for (var n = 0; n < this._filters.length; n++)
                      this._filters[n].disconnect(), (this._filters[n] = null)
                    this._filters = new Array(i)
                    for (var s = 0; s < i; s++) {
                      var o = this.context.createBiquadFilter()
                      ;(o.type = this._type),
                        this.frequency.connect(o.frequency),
                        this.detune.connect(o.detune),
                        this.Q.connect(o.Q),
                        this.gain.connect(o.gain),
                        (this._filters[s] = o)
                    }
                    var r = [this.input]
                      .concat(this._filters)
                      .concat([this.output])
                    t.connectSeries.apply(t, r)
                  },
                }),
                (t.Filter.prototype.dispose = function () {
                  t.AudioNode.prototype.dispose.call(this)
                  for (var e = 0; e < this._filters.length; e++)
                    this._filters[e].disconnect(), (this._filters[e] = null)
                  return (
                    (this._filters = null),
                    this._writable(["detune", "frequency", "gain", "Q"]),
                    this.frequency.dispose(),
                    this.Q.dispose(),
                    (this.frequency = null),
                    (this.Q = null),
                    this.detune.dispose(),
                    (this.detune = null),
                    this.gain.dispose(),
                    (this.gain = null),
                    this
                  )
                }),
                t.Filter
              )
            }),
            e(function (t) {
              return (
                (t.MultibandSplit = function () {
                  var e = t.defaults(
                    arguments,
                    ["lowFrequency", "highFrequency"],
                    t.MultibandSplit,
                  )
                  t.AudioNode.call(this),
                    (this.input = new t.Gain()),
                    (this.output = new Array(3)),
                    (this.low = this.output[0] = new t.Filter(0, "lowpass")),
                    (this._lowMidFilter = new t.Filter(0, "highpass")),
                    (this.mid = this.output[1] = new t.Filter(0, "lowpass")),
                    (this.high = this.output[2] = new t.Filter(0, "highpass")),
                    (this.lowFrequency = new t.Signal(
                      e.lowFrequency,
                      t.Type.Frequency,
                    )),
                    (this.highFrequency = new t.Signal(
                      e.highFrequency,
                      t.Type.Frequency,
                    )),
                    (this.Q = new t.Signal(e.Q)),
                    this.input.fan(this.low, this.high),
                    this.input.chain(this._lowMidFilter, this.mid),
                    this.lowFrequency.connect(this.low.frequency),
                    this.lowFrequency.connect(this._lowMidFilter.frequency),
                    this.highFrequency.connect(this.mid.frequency),
                    this.highFrequency.connect(this.high.frequency),
                    this.Q.connect(this.low.Q),
                    this.Q.connect(this._lowMidFilter.Q),
                    this.Q.connect(this.mid.Q),
                    this.Q.connect(this.high.Q),
                    this._readOnly([
                      "high",
                      "mid",
                      "low",
                      "highFrequency",
                      "lowFrequency",
                    ])
                }),
                t.extend(t.MultibandSplit, t.AudioNode),
                (t.MultibandSplit.defaults = {
                  lowFrequency: 400,
                  highFrequency: 2500,
                  Q: 1,
                }),
                (t.MultibandSplit.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._writable([
                      "high",
                      "mid",
                      "low",
                      "highFrequency",
                      "lowFrequency",
                    ]),
                    this.low.dispose(),
                    (this.low = null),
                    this._lowMidFilter.dispose(),
                    (this._lowMidFilter = null),
                    this.mid.dispose(),
                    (this.mid = null),
                    this.high.dispose(),
                    (this.high = null),
                    this.lowFrequency.dispose(),
                    (this.lowFrequency = null),
                    this.highFrequency.dispose(),
                    (this.highFrequency = null),
                    this.Q.dispose(),
                    (this.Q = null),
                    this
                  )
                }),
                t.MultibandSplit
              )
            }),
            e(function (t) {
              return (
                (t.EQ3 = function () {
                  var e = t.defaults(arguments, ["low", "mid", "high"], t.EQ3)
                  t.AudioNode.call(this),
                    (this.output = new t.Gain()),
                    (this._multibandSplit = this.input =
                      new t.MultibandSplit({
                        lowFrequency: e.lowFrequency,
                        highFrequency: e.highFrequency,
                      })),
                    (this._lowGain = new t.Gain(e.low, t.Type.Decibels)),
                    (this._midGain = new t.Gain(e.mid, t.Type.Decibels)),
                    (this._highGain = new t.Gain(e.high, t.Type.Decibels)),
                    (this.low = this._lowGain.gain),
                    (this.mid = this._midGain.gain),
                    (this.high = this._highGain.gain),
                    (this.Q = this._multibandSplit.Q),
                    (this.lowFrequency = this._multibandSplit.lowFrequency),
                    (this.highFrequency = this._multibandSplit.highFrequency),
                    this._multibandSplit.low.chain(this._lowGain, this.output),
                    this._multibandSplit.mid.chain(this._midGain, this.output),
                    this._multibandSplit.high.chain(
                      this._highGain,
                      this.output,
                    ),
                    this._readOnly([
                      "low",
                      "mid",
                      "high",
                      "lowFrequency",
                      "highFrequency",
                    ])
                }),
                t.extend(t.EQ3, t.AudioNode),
                (t.EQ3.defaults = {
                  low: 0,
                  mid: 0,
                  high: 0,
                  lowFrequency: 400,
                  highFrequency: 2500,
                }),
                (t.EQ3.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._writable([
                      "low",
                      "mid",
                      "high",
                      "lowFrequency",
                      "highFrequency",
                    ]),
                    this._multibandSplit.dispose(),
                    (this._multibandSplit = null),
                    (this.lowFrequency = null),
                    (this.highFrequency = null),
                    this._lowGain.dispose(),
                    (this._lowGain = null),
                    this._midGain.dispose(),
                    (this._midGain = null),
                    this._highGain.dispose(),
                    (this._highGain = null),
                    (this.low = null),
                    (this.mid = null),
                    (this.high = null),
                    (this.Q = null),
                    this
                  )
                }),
                t.EQ3
              )
            }),
            e(function (t) {
              return (
                (t.Scale = function (e, i) {
                  t.SignalBase.call(this),
                    (this._outputMin = t.defaultArg(e, 0)),
                    (this._outputMax = t.defaultArg(i, 1)),
                    (this._scale = this.input = new t.Multiply(1)),
                    (this._add = this.output = new t.Add(0)),
                    this._scale.connect(this._add),
                    this._setRange()
                }),
                t.extend(t.Scale, t.SignalBase),
                Object.defineProperty(t.Scale.prototype, "min", {
                  get: function () {
                    return this._outputMin
                  },
                  set: function (t) {
                    ;(this._outputMin = t), this._setRange()
                  },
                }),
                Object.defineProperty(t.Scale.prototype, "max", {
                  get: function () {
                    return this._outputMax
                  },
                  set: function (t) {
                    ;(this._outputMax = t), this._setRange()
                  },
                }),
                (t.Scale.prototype._setRange = function () {
                  ;(this._add.value = this._outputMin),
                    (this._scale.value = this._outputMax - this._outputMin)
                }),
                (t.Scale.prototype.dispose = function () {
                  return (
                    t.SignalBase.prototype.dispose.call(this),
                    this._add.dispose(),
                    (this._add = null),
                    this._scale.dispose(),
                    (this._scale = null),
                    this
                  )
                }),
                t.Scale
              )
            }),
            e(function (t) {
              return (
                (t.ScaleExp = function (e, i, n) {
                  t.SignalBase.call(this),
                    (this._scale = this.output = new t.Scale(e, i)),
                    (this._exp = this.input = new t.Pow(t.defaultArg(n, 2))),
                    this._exp.connect(this._scale)
                }),
                t.extend(t.ScaleExp, t.SignalBase),
                Object.defineProperty(t.ScaleExp.prototype, "exponent", {
                  get: function () {
                    return this._exp.value
                  },
                  set: function (t) {
                    this._exp.value = t
                  },
                }),
                Object.defineProperty(t.ScaleExp.prototype, "min", {
                  get: function () {
                    return this._scale.min
                  },
                  set: function (t) {
                    this._scale.min = t
                  },
                }),
                Object.defineProperty(t.ScaleExp.prototype, "max", {
                  get: function () {
                    return this._scale.max
                  },
                  set: function (t) {
                    this._scale.max = t
                  },
                }),
                (t.ScaleExp.prototype.dispose = function () {
                  return (
                    t.SignalBase.prototype.dispose.call(this),
                    this._scale.dispose(),
                    (this._scale = null),
                    this._exp.dispose(),
                    (this._exp = null),
                    this
                  )
                }),
                t.ScaleExp
              )
            }),
            e(function (t) {
              return (
                (t.Delay = function () {
                  var e = t.defaults(
                    arguments,
                    ["delayTime", "maxDelay"],
                    t.Delay,
                  )
                  t.AudioNode.call(this),
                    (this._maxDelay = Math.max(
                      this.toSeconds(e.maxDelay),
                      this.toSeconds(e.delayTime),
                    )),
                    (this._delayNode =
                      this.input =
                      this.output =
                        this.context.createDelay(this._maxDelay)),
                    (this.delayTime = new t.Param({
                      param: this._delayNode.delayTime,
                      units: t.Type.Time,
                      value: e.delayTime,
                    })),
                    this._readOnly("delayTime")
                }),
                t.extend(t.Delay, t.AudioNode),
                (t.Delay.defaults = { maxDelay: 1, delayTime: 0 }),
                Object.defineProperty(t.Delay.prototype, "maxDelay", {
                  get: function () {
                    return this._maxDelay
                  },
                }),
                (t.Delay.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._delayNode.disconnect(),
                    (this._delayNode = null),
                    this._writable("delayTime"),
                    (this.delayTime = null),
                    this
                  )
                }),
                t.Delay
              )
            }),
            e(function (t) {
              return (
                (t.FeedbackCombFilter = function () {
                  var e = t.defaults(
                    arguments,
                    ["delayTime", "resonance"],
                    t.FeedbackCombFilter,
                  )
                  t.AudioNode.call(this),
                    (this._delay =
                      this.input =
                      this.output =
                        new t.Delay(e.delayTime)),
                    (this.delayTime = this._delay.delayTime),
                    (this._feedback = new t.Gain(
                      e.resonance,
                      t.Type.NormalRange,
                    )),
                    (this.resonance = this._feedback.gain),
                    this._delay.chain(this._feedback, this._delay),
                    this._readOnly(["resonance", "delayTime"])
                }),
                t.extend(t.FeedbackCombFilter, t.AudioNode),
                (t.FeedbackCombFilter.defaults = {
                  delayTime: 0.1,
                  resonance: 0.5,
                }),
                (t.FeedbackCombFilter.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._writable(["resonance", "delayTime"]),
                    this._delay.dispose(),
                    (this._delay = null),
                    (this.delayTime = null),
                    this._feedback.dispose(),
                    (this._feedback = null),
                    (this.resonance = null),
                    this
                  )
                }),
                t.FeedbackCombFilter
              )
            }),
            e(function (t) {
              return (
                (t.FFT = function () {
                  var e = t.defaults(arguments, ["size"], t.FFT)
                  ;(e.type = t.Analyser.Type.FFT),
                    t.AudioNode.call(this),
                    (this._analyser =
                      this.input =
                      this.output =
                        new t.Analyser(e))
                }),
                t.extend(t.FFT, t.AudioNode),
                (t.FFT.defaults = { size: 1024 }),
                (t.FFT.prototype.getValue = function () {
                  return this._analyser.getValue()
                }),
                Object.defineProperty(t.FFT.prototype, "size", {
                  get: function () {
                    return this._analyser.size
                  },
                  set: function (t) {
                    this._analyser.size = t
                  },
                }),
                (t.FFT.prototype.dispose = function () {
                  t.AudioNode.prototype.dispose.call(this),
                    this._analyser.dispose(),
                    (this._analyser = null)
                }),
                t.FFT
              )
            }),
            e(function (t) {
              return (
                (t.Abs = function () {
                  t.SignalBase.call(this),
                    (this._abs =
                      this.input =
                      this.output =
                        new t.WaveShaper(function (t) {
                          return Math.abs(t) < 0.001 ? 0 : Math.abs(t)
                        }, 1024))
                }),
                t.extend(t.Abs, t.SignalBase),
                (t.Abs.prototype.dispose = function () {
                  return (
                    t.SignalBase.prototype.dispose.call(this),
                    this._abs.dispose(),
                    (this._abs = null),
                    this
                  )
                }),
                t.Abs
              )
            }),
            e(function (t) {
              return (
                (t.Follower = function () {
                  var e = t.defaults(
                    arguments,
                    ["attack", "release"],
                    t.Follower,
                  )
                  t.AudioNode.call(this),
                    this.createInsOuts(1, 1),
                    (this._abs = new t.Abs()),
                    (this._filter = this.context.createBiquadFilter()),
                    (this._filter.type = "lowpass"),
                    (this._filter.frequency.value = 0),
                    (this._filter.Q.value = -100),
                    (this._frequencyValues = new t.WaveShaper()),
                    (this._sub = new t.Subtract()),
                    (this._delay = new t.Delay(this.blockTime)),
                    (this._mult = new t.Multiply(1e4)),
                    (this._attack = e.attack),
                    (this._release = e.release),
                    this.input.chain(this._abs, this._filter, this.output),
                    this._abs.connect(this._sub, 0, 1),
                    this._filter.chain(this._delay, this._sub),
                    this._sub.chain(
                      this._mult,
                      this._frequencyValues,
                      this._filter.frequency,
                    ),
                    this._setAttackRelease(this._attack, this._release)
                }),
                t.extend(t.Follower, t.AudioNode),
                (t.Follower.defaults = { attack: 0.05, release: 0.5 }),
                (t.Follower.prototype._setAttackRelease = function (e, i) {
                  var n = this.blockTime
                  ;(e = t.Time(e).toFrequency()),
                    (i = t.Time(i).toFrequency()),
                    (e = Math.max(e, n)),
                    (i = Math.max(i, n)),
                    this._frequencyValues.setMap(function (t) {
                      return t <= 0 ? e : i
                    })
                }),
                Object.defineProperty(t.Follower.prototype, "attack", {
                  get: function () {
                    return this._attack
                  },
                  set: function (t) {
                    ;(this._attack = t),
                      this._setAttackRelease(this._attack, this._release)
                  },
                }),
                Object.defineProperty(t.Follower.prototype, "release", {
                  get: function () {
                    return this._release
                  },
                  set: function (t) {
                    ;(this._release = t),
                      this._setAttackRelease(this._attack, this._release)
                  },
                }),
                (t.Follower.prototype.connect = t.SignalBase.prototype.connect),
                (t.Follower.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._filter.disconnect(),
                    (this._filter = null),
                    this._frequencyValues.disconnect(),
                    (this._frequencyValues = null),
                    this._delay.dispose(),
                    (this._delay = null),
                    this._sub.disconnect(),
                    (this._sub = null),
                    this._abs.dispose(),
                    (this._abs = null),
                    this._mult.dispose(),
                    (this._mult = null),
                    (this._curve = null),
                    this
                  )
                }),
                t.Follower
              )
            }),
            e(function (t) {
              return (
                (t.ScaledEnvelope = function () {
                  var e = t.defaults(
                    arguments,
                    ["attack", "decay", "sustain", "release"],
                    t.Envelope,
                  )
                  t.Envelope.call(this, e),
                    (e = t.defaultArg(e, t.ScaledEnvelope.defaults)),
                    (this._exp = this.output = new t.Pow(e.exponent)),
                    (this._scale = this.output = new t.Scale(e.min, e.max)),
                    this._sig.chain(this._exp, this._scale)
                }),
                t.extend(t.ScaledEnvelope, t.Envelope),
                (t.ScaledEnvelope.defaults = { min: 0, max: 1, exponent: 1 }),
                Object.defineProperty(t.ScaledEnvelope.prototype, "min", {
                  get: function () {
                    return this._scale.min
                  },
                  set: function (t) {
                    this._scale.min = t
                  },
                }),
                Object.defineProperty(t.ScaledEnvelope.prototype, "max", {
                  get: function () {
                    return this._scale.max
                  },
                  set: function (t) {
                    this._scale.max = t
                  },
                }),
                Object.defineProperty(t.ScaledEnvelope.prototype, "exponent", {
                  get: function () {
                    return this._exp.value
                  },
                  set: function (t) {
                    this._exp.value = t
                  },
                }),
                (t.ScaledEnvelope.prototype.dispose = function () {
                  return (
                    t.Envelope.prototype.dispose.call(this),
                    this._scale.dispose(),
                    (this._scale = null),
                    this._exp.dispose(),
                    (this._exp = null),
                    this
                  )
                }),
                t.ScaledEnvelope
              )
            }),
            e(function (t) {
              return (
                (t.FrequencyEnvelope = function () {
                  var e = t.defaults(
                    arguments,
                    ["attack", "decay", "sustain", "release"],
                    t.Envelope,
                  )
                  t.ScaledEnvelope.call(this, e),
                    (e = t.defaultArg(e, t.FrequencyEnvelope.defaults)),
                    (this._octaves = e.octaves),
                    (this.baseFrequency = e.baseFrequency),
                    (this.octaves = e.octaves)
                }),
                t.extend(t.FrequencyEnvelope, t.Envelope),
                (t.FrequencyEnvelope.defaults = {
                  baseFrequency: 200,
                  octaves: 4,
                  exponent: 2,
                }),
                Object.defineProperty(
                  t.FrequencyEnvelope.prototype,
                  "baseFrequency",
                  {
                    get: function () {
                      return this._scale.min
                    },
                    set: function (t) {
                      ;(this._scale.min = this.toFrequency(t)),
                        (this.octaves = this._octaves)
                    },
                  },
                ),
                Object.defineProperty(
                  t.FrequencyEnvelope.prototype,
                  "octaves",
                  {
                    get: function () {
                      return this._octaves
                    },
                    set: function (t) {
                      ;(this._octaves = t),
                        (this._scale.max = this.baseFrequency * Math.pow(2, t))
                    },
                  },
                ),
                Object.defineProperty(
                  t.FrequencyEnvelope.prototype,
                  "exponent",
                  {
                    get: function () {
                      return this._exp.value
                    },
                    set: function (t) {
                      this._exp.value = t
                    },
                  },
                ),
                (t.FrequencyEnvelope.prototype.dispose = function () {
                  return t.ScaledEnvelope.prototype.dispose.call(this), this
                }),
                t.FrequencyEnvelope
              )
            }),
            e(function (t) {
              return (
                (t.GreaterThanZero = function () {
                  t.SignalBase.call(this),
                    (this._thresh = this.output =
                      new t.WaveShaper(function (t) {
                        return t <= 0 ? 0 : 1
                      }, 127)),
                    (this._scale = this.input = new t.Multiply(1e4)),
                    this._scale.connect(this._thresh)
                }),
                t.extend(t.GreaterThanZero, t.SignalBase),
                (t.GreaterThanZero.prototype.dispose = function () {
                  return (
                    t.SignalBase.prototype.dispose.call(this),
                    this._scale.dispose(),
                    (this._scale = null),
                    this._thresh.dispose(),
                    (this._thresh = null),
                    this
                  )
                }),
                t.GreaterThanZero
              )
            }),
            e(function (t) {
              return (
                (t.GreaterThan = function (e) {
                  t.Signal.call(this),
                    this.createInsOuts(2, 0),
                    (this._param = this.input[0] = new t.Subtract(e)),
                    (this.input[1] = this._param.input[1]),
                    (this._gtz = this.output = new t.GreaterThanZero()),
                    this._param.connect(this._gtz)
                }),
                t.extend(t.GreaterThan, t.Signal),
                (t.GreaterThan.prototype.dispose = function () {
                  return (
                    t.Signal.prototype.dispose.call(this),
                    this._gtz.dispose(),
                    (this._gtz = null),
                    this
                  )
                }),
                t.GreaterThan
              )
            }),
            e(function (t) {
              return (
                (t.Gate = function () {
                  var e = t.defaults(
                    arguments,
                    ["threshold", "attack", "release"],
                    t.Gate,
                  )
                  t.AudioNode.call(this),
                    this.createInsOuts(1, 1),
                    (this._follower = new t.Follower(e.attack, e.release)),
                    (this._gt = new t.GreaterThan(t.dbToGain(e.threshold))),
                    this.input.connect(this.output),
                    this.input.chain(this._gt, this._follower, this.output.gain)
                }),
                t.extend(t.Gate, t.AudioNode),
                (t.Gate.defaults = {
                  attack: 0.1,
                  release: 0.1,
                  threshold: -40,
                }),
                Object.defineProperty(t.Gate.prototype, "threshold", {
                  get: function () {
                    return t.gainToDb(this._gt.value)
                  },
                  set: function (e) {
                    this._gt.value = t.dbToGain(e)
                  },
                }),
                Object.defineProperty(t.Gate.prototype, "attack", {
                  get: function () {
                    return this._follower.attack
                  },
                  set: function (t) {
                    this._follower.attack = t
                  },
                }),
                Object.defineProperty(t.Gate.prototype, "release", {
                  get: function () {
                    return this._follower.release
                  },
                  set: function (t) {
                    this._follower.release = t
                  },
                }),
                (t.Gate.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._follower.dispose(),
                    this._gt.dispose(),
                    (this._follower = null),
                    (this._gt = null),
                    this
                  )
                }),
                t.Gate
              )
            }),
            e(function (t) {
              function e(t) {
                return function (e, i) {
                  ;(i = this.toSeconds(i)), t.apply(this, arguments)
                  var n = this._events.get(i),
                    s = this._events.previousEvent(n),
                    o = this._getTicksUntilEvent(s, i)
                  return (n.ticks = Math.max(o, 0)), this
                }
              }
              return (
                (t.TickSignal = function (e) {
                  ;(e = t.defaultArg(e, 1)),
                    t.Signal.call(this, { units: t.Type.Ticks, value: e }),
                    (this._events.memory = 1 / 0),
                    this.cancelScheduledValues(0),
                    this._events.add({
                      type: t.Param.AutomationType.SetValue,
                      time: 0,
                      value: e,
                    })
                }),
                t.extend(t.TickSignal, t.Signal),
                (t.TickSignal.prototype.setValueAtTime = e(
                  t.Signal.prototype.setValueAtTime,
                )),
                (t.TickSignal.prototype.linearRampToValueAtTime = e(
                  t.Signal.prototype.linearRampToValueAtTime,
                )),
                (t.TickSignal.prototype.setTargetAtTime = function (t, e, i) {
                  ;(e = this.toSeconds(e)),
                    this.setRampPoint(e),
                    (t = this._fromUnits(t))
                  for (
                    var n = this._events.get(e),
                      s = Math.round(Math.max(1 / i, 1)),
                      o = 0;
                    o <= s;
                    o++
                  ) {
                    var r = i * o + e,
                      a = this._exponentialApproach(n.time, n.value, t, i, r)
                    this.linearRampToValueAtTime(this._toUnits(a), r)
                  }
                  return this
                }),
                (t.TickSignal.prototype.exponentialRampToValueAtTime =
                  function (t, e) {
                    ;(e = this.toSeconds(e)), (t = this._fromUnits(t))
                    var i = this._events.get(e)
                    null === i && (i = { value: this._initialValue, time: 0 })
                    for (
                      var n = Math.round(Math.max(10 * (e - i.time), 1)),
                        s = (e - i.time) / n,
                        o = 0;
                      o <= n;
                      o++
                    ) {
                      var r = s * o + i.time,
                        a = this._exponentialInterpolate(
                          i.time,
                          i.value,
                          e,
                          t,
                          r,
                        )
                      this.linearRampToValueAtTime(this._toUnits(a), r)
                    }
                    return this
                  }),
                (t.TickSignal.prototype._getTicksUntilEvent = function (e, i) {
                  if (null === e) e = { ticks: 0, time: 0 }
                  else if (t.isUndef(e.ticks)) {
                    var n = this._events.previousEvent(e)
                    e.ticks = this._getTicksUntilEvent(n, e.time)
                  }
                  var s = this.getValueAtTime(e.time),
                    o = this.getValueAtTime(i)
                  return (
                    this._events.get(i).time === i &&
                      this._events.get(i).type ===
                        t.Param.AutomationType.SetValue &&
                      (o = this.getValueAtTime(i - this.sampleTime)),
                    0.5 * (i - e.time) * (s + o) + e.ticks
                  )
                }),
                (t.TickSignal.prototype.getTicksAtTime = function (t) {
                  t = this.toSeconds(t)
                  var e = this._events.get(t)
                  return Math.max(this._getTicksUntilEvent(e, t), 0)
                }),
                (t.TickSignal.prototype.getDurationOfTicks = function (t, e) {
                  e = this.toSeconds(e)
                  var i = this.getTicksAtTime(e)
                  return this.getTimeOfTick(i + t) - e
                }),
                (t.TickSignal.prototype.getTimeOfTick = function (e) {
                  var i = this._events.get(e, "ticks"),
                    n = this._events.getAfter(e, "ticks")
                  if (i && i.ticks === e) return i.time
                  if (
                    i &&
                    n &&
                    n.type === t.Param.AutomationType.Linear &&
                    i.value !== n.value
                  ) {
                    var s = this.getValueAtTime(i.time),
                      o = (this.getValueAtTime(n.time) - s) / (n.time - i.time),
                      r = Math.sqrt(Math.pow(s, 2) - 2 * o * (i.ticks - e)),
                      a = (-s + r) / o
                    return (a > 0 ? a : (-s - r) / o) + i.time
                  }
                  return i
                    ? 0 === i.value
                      ? 1 / 0
                      : i.time + (e - i.ticks) / i.value
                    : e / this._initialValue
                }),
                (t.TickSignal.prototype.ticksToTime = function (e, i) {
                  return (
                    (i = this.toSeconds(i)),
                    new t.Time(this.getDurationOfTicks(e, i))
                  )
                }),
                (t.TickSignal.prototype.timeToTicks = function (e, i) {
                  ;(i = this.toSeconds(i)), (e = this.toSeconds(e))
                  var n = this.getTicksAtTime(i),
                    s = this.getTicksAtTime(i + e)
                  return new t.Ticks(s - n)
                }),
                t.TickSignal
              )
            }),
            e(function (t) {
              return (
                (t.TimelineState = function (e) {
                  t.Timeline.call(this), (this._initial = e)
                }),
                t.extend(t.TimelineState, t.Timeline),
                (t.TimelineState.prototype.getValueAtTime = function (t) {
                  var e = this.get(t)
                  return null !== e ? e.state : this._initial
                }),
                (t.TimelineState.prototype.setStateAtTime = function (t, e) {
                  return this.add({ state: t, time: e }), this
                }),
                (t.TimelineState.prototype.getLastState = function (t, e) {
                  e = this.toSeconds(e)
                  for (var i = this._search(e); i >= 0; i--) {
                    var n = this._timeline[i]
                    if (n.state === t) return n
                  }
                }),
                (t.TimelineState.prototype.getNextState = function (t, e) {
                  e = this.toSeconds(e)
                  var i = this._search(e)
                  if (-1 !== i)
                    for (var n = i; n < this._timeline.length; n++) {
                      var s = this._timeline[n]
                      if (s.state === t) return s
                    }
                }),
                t.TimelineState
              )
            }),
            e(function (t) {
              return (
                (t.TickSource = function () {
                  var e = t.defaults(arguments, ["frequency"], t.TickSource)
                  ;(this.frequency = new t.TickSignal(
                    e.frequency,
                    t.Type.Frequency,
                  )),
                    this._readOnly("frequency"),
                    (this._state = new t.TimelineState(t.State.Stopped)),
                    this._state.setStateAtTime(t.State.Stopped, 0),
                    (this._tickOffset = new t.Timeline()),
                    this.setTicksAtTime(0, 0)
                }),
                t.extend(t.TickSource),
                (t.TickSource.defaults = { frequency: 1 }),
                Object.defineProperty(t.TickSource.prototype, "state", {
                  get: function () {
                    return this._state.getValueAtTime(this.now())
                  },
                }),
                (t.TickSource.prototype.start = function (e, i) {
                  return (
                    (e = this.toSeconds(e)),
                    this._state.getValueAtTime(e) !== t.State.Started &&
                      (this._state.setStateAtTime(t.State.Started, e),
                      t.isDefined(i) && this.setTicksAtTime(i, e)),
                    this
                  )
                }),
                (t.TickSource.prototype.stop = function (e) {
                  if (
                    ((e = this.toSeconds(e)),
                    this._state.getValueAtTime(e) === t.State.Stopped)
                  ) {
                    var i = this._state.get(e)
                    i.time > 0 &&
                      (this._tickOffset.cancel(i.time),
                      this._state.cancel(i.time))
                  }
                  return (
                    this._state.cancel(e),
                    this._state.setStateAtTime(t.State.Stopped, e),
                    this.setTicksAtTime(0, e),
                    this
                  )
                }),
                (t.TickSource.prototype.pause = function (e) {
                  return (
                    (e = this.toSeconds(e)),
                    this._state.getValueAtTime(e) === t.State.Started &&
                      this._state.setStateAtTime(t.State.Paused, e),
                    this
                  )
                }),
                (t.TickSource.prototype.cancel = function (t) {
                  return (
                    (t = this.toSeconds(t)),
                    this._state.cancel(t),
                    this._tickOffset.cancel(t),
                    this
                  )
                }),
                (t.TickSource.prototype.getTicksAtTime = function (e) {
                  e = this.toSeconds(e)
                  var i = this._state.getLastState(t.State.Stopped, e),
                    n = { state: t.State.Paused, time: e }
                  this._state.add(n)
                  var s = i,
                    o = 0
                  return (
                    this._state.forEachBetween(
                      i.time,
                      e + this.sampleTime,
                      function (e) {
                        var i = s.time,
                          n = this._tickOffset.get(e.time)
                        n.time >= s.time && ((o = n.ticks), (i = n.time)),
                          s.state === t.State.Started &&
                            e.state !== t.State.Started &&
                            (o +=
                              this.frequency.getTicksAtTime(e.time) -
                              this.frequency.getTicksAtTime(i)),
                          (s = e)
                      }.bind(this),
                    ),
                    this._state.remove(n),
                    o
                  )
                }),
                Object.defineProperty(t.TickSource.prototype, "ticks", {
                  get: function () {
                    return this.getTicksAtTime(this.now())
                  },
                  set: function (t) {
                    this.setTicksAtTime(t, this.now())
                  },
                }),
                Object.defineProperty(t.TickSource.prototype, "seconds", {
                  get: function () {
                    return this.getSecondsAtTime(this.now())
                  },
                  set: function (t) {
                    var e = this.now(),
                      i = this.frequency.timeToTicks(t, e)
                    this.setTicksAtTime(i, e)
                  },
                }),
                (t.TickSource.prototype.getSecondsAtTime = function (e) {
                  e = this.toSeconds(e)
                  var i = this._state.getLastState(t.State.Stopped, e),
                    n = { state: t.State.Paused, time: e }
                  this._state.add(n)
                  var s = i,
                    o = 0
                  return (
                    this._state.forEachBetween(
                      i.time,
                      e + this.sampleTime,
                      function (e) {
                        var i = s.time,
                          n = this._tickOffset.get(e.time)
                        n.time >= s.time && ((o = n.seconds), (i = n.time)),
                          s.state === t.State.Started &&
                            e.state !== t.State.Started &&
                            (o += e.time - i),
                          (s = e)
                      }.bind(this),
                    ),
                    this._state.remove(n),
                    o
                  )
                }),
                (t.TickSource.prototype.setTicksAtTime = function (t, e) {
                  return (
                    (e = this.toSeconds(e)),
                    this._tickOffset.cancel(e),
                    this._tickOffset.add({
                      time: e,
                      ticks: t,
                      seconds: this.frequency.getDurationOfTicks(t, e),
                    }),
                    this
                  )
                }),
                (t.TickSource.prototype.getStateAtTime = function (t) {
                  return (t = this.toSeconds(t)), this._state.getValueAtTime(t)
                }),
                (t.TickSource.prototype.getTimeOfTick = function (e, i) {
                  i = t.defaultArg(i, this.now())
                  var n = this._tickOffset.get(i),
                    s = this._state.get(i),
                    o = Math.max(n.time, s.time),
                    r = this.frequency.getTicksAtTime(o) + e - n.ticks
                  return this.frequency.getTimeOfTick(r)
                }),
                (t.TickSource.prototype.forEachTickBetween = function (
                  e,
                  i,
                  n,
                ) {
                  var s = this._state.get(e)
                  if (
                    (this._state.forEachBetween(
                      e,
                      i,
                      function (i) {
                        s.state === t.State.Started &&
                          i.state !== t.State.Started &&
                          this.forEachTickBetween(
                            Math.max(s.time, e),
                            i.time - this.sampleTime,
                            n,
                          ),
                          (s = i)
                      }.bind(this),
                    ),
                    (e = Math.max(s.time, e)),
                    s.state === t.State.Started && this._state)
                  ) {
                    var o = this.frequency.getTicksAtTime(e),
                      r = (o - this.frequency.getTicksAtTime(s.time)) % 1
                    0 !== r && (r = 1 - r)
                    for (
                      var a = this.frequency.getTimeOfTick(o + r), u = null;
                      a < i && this._state;

                    ) {
                      try {
                        n(a, Math.round(this.getTicksAtTime(a)))
                      } catch (t) {
                        u = t
                        break
                      }
                      this._state &&
                        (a += this.frequency.getDurationOfTicks(1, a))
                    }
                  }
                  if (u) throw u
                  return this
                }),
                (t.TickSource.prototype.dispose = function () {
                  return (
                    t.Param.prototype.dispose.call(this),
                    this._state.dispose(),
                    (this._state = null),
                    this._tickOffset.dispose(),
                    (this._tickOffset = null),
                    this._writable("frequency"),
                    this.frequency.dispose(),
                    (this.frequency = null),
                    this
                  )
                }),
                t.TickSource
              )
            }),
            e(function (t) {
              return (
                (t.Clock = function () {
                  var e = t.defaults(
                    arguments,
                    ["callback", "frequency"],
                    t.Clock,
                  )
                  t.Emitter.call(this),
                    (this.callback = e.callback),
                    (this._nextTick = 0),
                    (this._tickSource = new t.TickSource(e.frequency)),
                    (this._lastUpdate = 0),
                    (this.frequency = this._tickSource.frequency),
                    this._readOnly("frequency"),
                    (this._state = new t.TimelineState(t.State.Stopped)),
                    this._state.setStateAtTime(t.State.Stopped, 0),
                    (this._boundLoop = this._loop.bind(this)),
                    this.context.on("tick", this._boundLoop)
                }),
                t.extend(t.Clock, t.Emitter),
                (t.Clock.defaults = { callback: t.noOp, frequency: 1 }),
                Object.defineProperty(t.Clock.prototype, "state", {
                  get: function () {
                    return this._state.getValueAtTime(this.now())
                  },
                }),
                (t.Clock.prototype.start = function (e, i) {
                  return (
                    (e = this.toSeconds(e)),
                    this._state.getValueAtTime(e) !== t.State.Started &&
                      (this._state.setStateAtTime(t.State.Started, e),
                      this._tickSource.start(e, i),
                      e < this._lastUpdate && this.emit("start", e, i)),
                    this
                  )
                }),
                (t.Clock.prototype.stop = function (e) {
                  return (
                    (e = this.toSeconds(e)),
                    this._state.cancel(e),
                    this._state.setStateAtTime(t.State.Stopped, e),
                    this._tickSource.stop(e),
                    e < this._lastUpdate && this.emit("stop", e),
                    this
                  )
                }),
                (t.Clock.prototype.pause = function (e) {
                  return (
                    (e = this.toSeconds(e)),
                    this._state.getValueAtTime(e) === t.State.Started &&
                      (this._state.setStateAtTime(t.State.Paused, e),
                      this._tickSource.pause(e),
                      e < this._lastUpdate && this.emit("pause", e)),
                    this
                  )
                }),
                Object.defineProperty(t.Clock.prototype, "ticks", {
                  get: function () {
                    return Math.ceil(this.getTicksAtTime(this.now()))
                  },
                  set: function (t) {
                    this._tickSource.ticks = t
                  },
                }),
                Object.defineProperty(t.Clock.prototype, "seconds", {
                  get: function () {
                    return this._tickSource.seconds
                  },
                  set: function (t) {
                    this._tickSource.seconds = t
                  },
                }),
                (t.Clock.prototype.getSecondsAtTime = function (t) {
                  return this._tickSource.getSecondsAtTime(t)
                }),
                (t.Clock.prototype.setTicksAtTime = function (t, e) {
                  return this._tickSource.setTicksAtTime(t, e), this
                }),
                (t.Clock.prototype.getTicksAtTime = function (t) {
                  return this._tickSource.getTicksAtTime(t)
                }),
                (t.Clock.prototype.nextTickTime = function (t, e) {
                  e = this.toSeconds(e)
                  var i = this.getTicksAtTime(e)
                  return this._tickSource.getTimeOfTick(i + t, e)
                }),
                (t.Clock.prototype._loop = function () {
                  var e = this._lastUpdate,
                    i = this.now()
                  ;(this._lastUpdate = i),
                    e !== i &&
                      (this._state.forEachBetween(
                        e,
                        i,
                        function (e) {
                          switch (e.state) {
                            case t.State.Started:
                              var i = this._tickSource.getTicksAtTime(e.time)
                              this.emit("start", e.time, i)
                              break
                            case t.State.Stopped:
                              0 !== e.time && this.emit("stop", e.time)
                              break
                            case t.State.Paused:
                              this.emit("pause", e.time)
                          }
                        }.bind(this),
                      ),
                      this._tickSource.forEachTickBetween(
                        e,
                        i,
                        function (t, e) {
                          this.callback(t, e)
                        }.bind(this),
                      ))
                }),
                (t.Clock.prototype.getStateAtTime = function (t) {
                  return (t = this.toSeconds(t)), this._state.getValueAtTime(t)
                }),
                (t.Clock.prototype.dispose = function () {
                  t.Emitter.prototype.dispose.call(this),
                    this.context.off("tick", this._boundLoop),
                    this._writable("frequency"),
                    this._tickSource.dispose(),
                    (this._tickSource = null),
                    (this.frequency = null),
                    (this._boundLoop = null),
                    (this._nextTick = 1 / 0),
                    (this.callback = null),
                    this._state.dispose(),
                    (this._state = null)
                }),
                t.Clock
              )
            }),
            e(function (t) {
              ;(t.IntervalTimeline = function () {
                t.call(this), (this._root = null), (this._length = 0)
              }),
                t.extend(t.IntervalTimeline),
                (t.IntervalTimeline.prototype.add = function (i) {
                  if (t.isUndef(i.time) || t.isUndef(i.duration))
                    throw new Error(
                      "Tone.IntervalTimeline: events must have time and duration parameters",
                    )
                  i.time = i.time.valueOf()
                  var n = new e(i.time, i.time + i.duration, i)
                  for (
                    null === this._root
                      ? (this._root = n)
                      : this._root.insert(n),
                      this._length++;
                    null !== n;

                  )
                    n.updateHeight(),
                      n.updateMax(),
                      this._rebalance(n),
                      (n = n.parent)
                  return this
                }),
                (t.IntervalTimeline.prototype.remove = function (t) {
                  if (null !== this._root) {
                    var e = []
                    this._root.search(t.time, e)
                    for (var i = 0; i < e.length; i++) {
                      var n = e[i]
                      if (n.event === t) {
                        this._removeNode(n), this._length--
                        break
                      }
                    }
                  }
                  return this
                }),
                Object.defineProperty(t.IntervalTimeline.prototype, "length", {
                  get: function () {
                    return this._length
                  },
                }),
                (t.IntervalTimeline.prototype.cancel = function (t) {
                  return (
                    this.forEachFrom(
                      t,
                      function (t) {
                        this.remove(t)
                      }.bind(this),
                    ),
                    this
                  )
                }),
                (t.IntervalTimeline.prototype._setRoot = function (t) {
                  ;(this._root = t),
                    null !== this._root && (this._root.parent = null)
                }),
                (t.IntervalTimeline.prototype._replaceNodeInParent = function (
                  t,
                  e,
                ) {
                  null !== t.parent
                    ? (t.isLeftChild()
                        ? (t.parent.left = e)
                        : (t.parent.right = e),
                      this._rebalance(t.parent))
                    : this._setRoot(e)
                }),
                (t.IntervalTimeline.prototype._removeNode = function (t) {
                  if (null === t.left && null === t.right)
                    this._replaceNodeInParent(t, null)
                  else if (null === t.right)
                    this._replaceNodeInParent(t, t.left)
                  else if (null === t.left)
                    this._replaceNodeInParent(t, t.right)
                  else {
                    var e, i
                    if (t.getBalance() > 0)
                      if (null === t.left.right)
                        ((e = t.left).right = t.right), (i = e)
                      else {
                        for (e = t.left.right; null !== e.right; ) e = e.right
                        ;(e.parent.right = e.left),
                          (i = e.parent),
                          (e.left = t.left),
                          (e.right = t.right)
                      }
                    else if (null === t.right.left)
                      ((e = t.right).left = t.left), (i = e)
                    else {
                      for (e = t.right.left; null !== e.left; ) e = e.left
                      ;(e.parent = e.parent),
                        (e.parent.left = e.right),
                        (i = e.parent),
                        (e.left = t.left),
                        (e.right = t.right)
                    }
                    null !== t.parent
                      ? t.isLeftChild()
                        ? (t.parent.left = e)
                        : (t.parent.right = e)
                      : this._setRoot(e),
                      this._rebalance(i)
                  }
                  t.dispose()
                }),
                (t.IntervalTimeline.prototype._rotateLeft = function (t) {
                  var e = t.parent,
                    i = t.isLeftChild(),
                    n = t.right
                  ;(t.right = n.left),
                    (n.left = t),
                    null !== e
                      ? i
                        ? (e.left = n)
                        : (e.right = n)
                      : this._setRoot(n)
                }),
                (t.IntervalTimeline.prototype._rotateRight = function (t) {
                  var e = t.parent,
                    i = t.isLeftChild(),
                    n = t.left
                  ;(t.left = n.right),
                    (n.right = t),
                    null !== e
                      ? i
                        ? (e.left = n)
                        : (e.right = n)
                      : this._setRoot(n)
                }),
                (t.IntervalTimeline.prototype._rebalance = function (t) {
                  var e = t.getBalance()
                  e > 1
                    ? t.left.getBalance() < 0
                      ? this._rotateLeft(t.left)
                      : this._rotateRight(t)
                    : e < -1 &&
                      (t.right.getBalance() > 0
                        ? this._rotateRight(t.right)
                        : this._rotateLeft(t))
                }),
                (t.IntervalTimeline.prototype.get = function (t) {
                  if (null !== this._root) {
                    var e = []
                    if ((this._root.search(t, e), e.length > 0)) {
                      for (var i = e[0], n = 1; n < e.length; n++)
                        e[n].low > i.low && (i = e[n])
                      return i.event
                    }
                  }
                  return null
                }),
                (t.IntervalTimeline.prototype.forEach = function (t) {
                  if (null !== this._root) {
                    var e = []
                    this._root.traverse(function (t) {
                      e.push(t)
                    })
                    for (var i = 0; i < e.length; i++) {
                      var n = e[i].event
                      n && t(n)
                    }
                  }
                  return this
                }),
                (t.IntervalTimeline.prototype.forEachAtTime = function (t, e) {
                  if (null !== this._root) {
                    var i = []
                    this._root.search(t, i)
                    for (var n = i.length - 1; n >= 0; n--) {
                      var s = i[n].event
                      s && e(s)
                    }
                  }
                  return this
                }),
                (t.IntervalTimeline.prototype.forEachFrom = function (t, e) {
                  if (null !== this._root) {
                    var i = []
                    this._root.searchAfter(t, i)
                    for (var n = i.length - 1; n >= 0; n--) e(i[n].event)
                  }
                  return this
                }),
                (t.IntervalTimeline.prototype.dispose = function () {
                  var t = []
                  null !== this._root &&
                    this._root.traverse(function (e) {
                      t.push(e)
                    })
                  for (var e = 0; e < t.length; e++) t[e].dispose()
                  return (t = null), (this._root = null), this
                })
              var e = function (t, e, i) {
                ;(this.event = i),
                  (this.low = t),
                  (this.high = e),
                  (this.max = this.high),
                  (this._left = null),
                  (this._right = null),
                  (this.parent = null),
                  (this.height = 0)
              }
              return (
                (e.prototype.insert = function (t) {
                  t.low <= this.low
                    ? null === this.left
                      ? (this.left = t)
                      : this.left.insert(t)
                    : null === this.right
                    ? (this.right = t)
                    : this.right.insert(t)
                }),
                (e.prototype.search = function (t, e) {
                  t > this.max ||
                    (null !== this.left && this.left.search(t, e),
                    this.low <= t && this.high > t && e.push(this),
                    this.low > t ||
                      (null !== this.right && this.right.search(t, e)))
                }),
                (e.prototype.searchAfter = function (t, e) {
                  this.low >= t &&
                    (e.push(this),
                    null !== this.left && this.left.searchAfter(t, e)),
                    null !== this.right && this.right.searchAfter(t, e)
                }),
                (e.prototype.traverse = function (t) {
                  t(this),
                    null !== this.left && this.left.traverse(t),
                    null !== this.right && this.right.traverse(t)
                }),
                (e.prototype.updateHeight = function () {
                  null !== this.left && null !== this.right
                    ? (this.height =
                        Math.max(this.left.height, this.right.height) + 1)
                    : null !== this.right
                    ? (this.height = this.right.height + 1)
                    : null !== this.left
                    ? (this.height = this.left.height + 1)
                    : (this.height = 0)
                }),
                (e.prototype.updateMax = function () {
                  ;(this.max = this.high),
                    null !== this.left &&
                      (this.max = Math.max(this.max, this.left.max)),
                    null !== this.right &&
                      (this.max = Math.max(this.max, this.right.max))
                }),
                (e.prototype.getBalance = function () {
                  var t = 0
                  return (
                    null !== this.left && null !== this.right
                      ? (t = this.left.height - this.right.height)
                      : null !== this.left
                      ? (t = this.left.height + 1)
                      : null !== this.right && (t = -(this.right.height + 1)),
                    t
                  )
                }),
                (e.prototype.isLeftChild = function () {
                  return null !== this.parent && this.parent.left === this
                }),
                Object.defineProperty(e.prototype, "left", {
                  get: function () {
                    return this._left
                  },
                  set: function (t) {
                    ;(this._left = t),
                      null !== t && (t.parent = this),
                      this.updateHeight(),
                      this.updateMax()
                  },
                }),
                Object.defineProperty(e.prototype, "right", {
                  get: function () {
                    return this._right
                  },
                  set: function (t) {
                    ;(this._right = t),
                      null !== t && (t.parent = this),
                      this.updateHeight(),
                      this.updateMax()
                  },
                }),
                (e.prototype.dispose = function () {
                  ;(this.parent = null),
                    (this._left = null),
                    (this._right = null),
                    (this.event = null)
                }),
                t.IntervalTimeline
              )
            }),
            e(function (t) {
              return (
                (t.Ticks = function (e, i) {
                  if (!(this instanceof t.Ticks)) return new t.Ticks(e, i)
                  t.TransportTime.call(this, e, i)
                }),
                t.extend(t.Ticks, t.TransportTime),
                (t.Ticks.prototype._defaultUnits = "i"),
                (t.Ticks.prototype._now = function () {
                  return t.Transport.ticks
                }),
                (t.Ticks.prototype._beatsToUnits = function (t) {
                  return this._getPPQ() * t
                }),
                (t.Ticks.prototype._secondsToUnits = function (t) {
                  return (t / (60 / this._getBpm())) * this._getPPQ()
                }),
                (t.Ticks.prototype._ticksToUnits = function (t) {
                  return t
                }),
                (t.Ticks.prototype.toTicks = function () {
                  return this.valueOf()
                }),
                (t.Ticks.prototype.toSeconds = function () {
                  return (
                    (this.valueOf() / this._getPPQ()) * (60 / this._getBpm())
                  )
                }),
                t.Ticks
              )
            }),
            e(function (t) {
              return (
                (t.TransportEvent = function (e, i) {
                  ;(i = t.defaultArg(i, t.TransportEvent.defaults)),
                    t.call(this),
                    (this.Transport = e),
                    (this.id = t.TransportEvent._eventId++),
                    (this.time = t.Ticks(i.time)),
                    (this.callback = i.callback),
                    (this._once = i.once)
                }),
                t.extend(t.TransportEvent),
                (t.TransportEvent.defaults = { once: !1, callback: t.noOp }),
                (t.TransportEvent._eventId = 0),
                (t.TransportEvent.prototype.invoke = function (t) {
                  this.callback &&
                    (this.callback(t),
                    this._once &&
                      this.Transport &&
                      this.Transport.clear(this.id))
                }),
                (t.TransportEvent.prototype.dispose = function () {
                  return (
                    t.prototype.dispose.call(this),
                    (this.Transport = null),
                    (this.callback = null),
                    (this.time = null),
                    this
                  )
                }),
                t.TransportEvent
              )
            }),
            e(function (t) {
              return (
                (t.TransportRepeatEvent = function (e, i) {
                  t.TransportEvent.call(this, e, i),
                    (i = t.defaultArg(i, t.TransportRepeatEvent.defaults)),
                    (this.duration = t.Ticks(i.duration)),
                    (this._interval = t.Ticks(i.interval)),
                    (this._currentId = -1),
                    (this._nextId = -1),
                    (this._nextTick = this.time),
                    (this._boundRestart = this._restart.bind(this)),
                    this.Transport.on("start loopStart", this._boundRestart),
                    this._restart()
                }),
                t.extend(t.TransportRepeatEvent, t.TransportEvent),
                (t.TransportRepeatEvent.defaults = {
                  duration: 1 / 0,
                  interval: 1,
                }),
                (t.TransportRepeatEvent.prototype.invoke = function (e) {
                  this._createEvents(e),
                    t.TransportEvent.prototype.invoke.call(this, e)
                }),
                (t.TransportRepeatEvent.prototype._createEvents = function (e) {
                  var i = this.Transport.getTicksAtTime(e)
                  i >= this.time &&
                    i >= this._nextTick &&
                    this._nextTick + this._interval <
                      this.time + this.duration &&
                    ((this._nextTick += this._interval),
                    (this._currentId = this._nextId),
                    (this._nextId = this.Transport.scheduleOnce(
                      this.invoke.bind(this),
                      t.Ticks(this._nextTick),
                    )))
                }),
                (t.TransportRepeatEvent.prototype._restart = function (e) {
                  this.Transport.clear(this._currentId),
                    this.Transport.clear(this._nextId),
                    (this._nextTick = this.time)
                  var i = this.Transport.getTicksAtTime(e)
                  i > this.time &&
                    (this._nextTick =
                      this.time +
                      Math.ceil((i - this.time) / this._interval) *
                        this._interval),
                    (this._currentId = this.Transport.scheduleOnce(
                      this.invoke.bind(this),
                      t.Ticks(this._nextTick),
                    )),
                    (this._nextTick += this._interval),
                    (this._nextId = this.Transport.scheduleOnce(
                      this.invoke.bind(this),
                      t.Ticks(this._nextTick),
                    ))
                }),
                (t.TransportRepeatEvent.prototype.dispose = function () {
                  return (
                    this.Transport.clear(this._currentId),
                    this.Transport.clear(this._nextId),
                    this.Transport.off("start loopStart", this._boundRestart),
                    (this._boundCreateEvents = null),
                    t.TransportEvent.prototype.dispose.call(this),
                    (this.duration = null),
                    (this._interval = null),
                    this
                  )
                }),
                t.TransportRepeatEvent
              )
            }),
            e(function (t) {
              ;(t.Transport = function () {
                t.Emitter.call(this),
                  t.getContext(
                    function () {
                      ;(this.loop = !1),
                        (this._loopStart = 0),
                        (this._loopEnd = 0),
                        (this._ppq = e.defaults.PPQ),
                        (this._clock = new t.Clock({
                          callback: this._processTick.bind(this),
                          frequency: 0,
                        })),
                        this._bindClockEvents(),
                        (this.bpm = this._clock.frequency),
                        (this.bpm._toUnits = this._toUnits.bind(this)),
                        (this.bpm._fromUnits = this._fromUnits.bind(this)),
                        (this.bpm.units = t.Type.BPM),
                        (this.bpm.value = e.defaults.bpm),
                        this._readOnly("bpm"),
                        (this._timeSignature = e.defaults.timeSignature),
                        (this._scheduledEvents = {}),
                        (this._timeline = new t.Timeline()),
                        (this._repeatedEvents = new t.IntervalTimeline()),
                        (this._syncedSignals = []),
                        (this._swingTicks = e.defaults.PPQ / 2),
                        (this._swingAmount = 0)
                    }.bind(this),
                  )
              }),
                t.extend(t.Transport, t.Emitter),
                (t.Transport.defaults = {
                  bpm: 120,
                  swing: 0,
                  swingSubdivision: "8n",
                  timeSignature: 4,
                  loopStart: 0,
                  loopEnd: "4m",
                  PPQ: 192,
                }),
                (t.Transport.prototype._processTick = function (e, i) {
                  if (
                    this._swingAmount > 0 &&
                    i % this._ppq != 0 &&
                    i % (2 * this._swingTicks) != 0
                  ) {
                    var n =
                        (i % (2 * this._swingTicks)) / (2 * this._swingTicks),
                      s = Math.sin(n * Math.PI) * this._swingAmount
                    e += t.Ticks((2 * this._swingTicks) / 3).toSeconds() * s
                  }
                  this.loop &&
                    i >= this._loopEnd &&
                    (this.emit("loopEnd", e),
                    this._clock.setTicksAtTime(this._loopStart, e),
                    (i = this._loopStart),
                    this.emit("loopStart", e, this._clock.getSecondsAtTime(e)),
                    this.emit("loop", e)),
                    this._timeline.forEachAtTime(i, function (t) {
                      t.invoke(e)
                    })
                }),
                (t.Transport.prototype.schedule = function (e, i) {
                  var n = new t.TransportEvent(this, {
                    time: t.TransportTime(i),
                    callback: e,
                  })
                  return this._addEvent(n, this._timeline)
                }),
                (t.Transport.prototype.scheduleRepeat = function (e, i, n, s) {
                  var o = new t.TransportRepeatEvent(this, {
                    callback: e,
                    interval: t.Time(i),
                    time: t.TransportTime(n),
                    duration: t.Time(t.defaultArg(s, 1 / 0)),
                  })
                  return this._addEvent(o, this._repeatedEvents)
                }),
                (t.Transport.prototype.scheduleOnce = function (e, i) {
                  var n = new t.TransportEvent(this, {
                    time: t.TransportTime(i),
                    callback: e,
                    once: !0,
                  })
                  return this._addEvent(n, this._timeline)
                }),
                (t.Transport.prototype.clear = function (t) {
                  if (this._scheduledEvents.hasOwnProperty(t)) {
                    var e = this._scheduledEvents[t.toString()]
                    e.timeline.remove(e.event),
                      e.event.dispose(),
                      delete this._scheduledEvents[t.toString()]
                  }
                  return this
                }),
                (t.Transport.prototype._addEvent = function (t, e) {
                  return (
                    (this._scheduledEvents[t.id.toString()] = {
                      event: t,
                      timeline: e,
                    }),
                    e.add(t),
                    t.id
                  )
                }),
                (t.Transport.prototype.cancel = function (e) {
                  return (
                    (e = t.defaultArg(e, 0)),
                    (e = this.toTicks(e)),
                    this._timeline.forEachFrom(
                      e,
                      function (t) {
                        this.clear(t.id)
                      }.bind(this),
                    ),
                    this._repeatedEvents.forEachFrom(
                      e,
                      function (t) {
                        this.clear(t.id)
                      }.bind(this),
                    ),
                    this
                  )
                }),
                (t.Transport.prototype._bindClockEvents = function () {
                  this._clock.on(
                    "start",
                    function (e, i) {
                      ;(i = t.Ticks(i).toSeconds()), this.emit("start", e, i)
                    }.bind(this),
                  ),
                    this._clock.on(
                      "stop",
                      function (t) {
                        this.emit("stop", t)
                      }.bind(this),
                    ),
                    this._clock.on(
                      "pause",
                      function (t) {
                        this.emit("pause", t)
                      }.bind(this),
                    )
                }),
                Object.defineProperty(t.Transport.prototype, "state", {
                  get: function () {
                    return this._clock.getStateAtTime(this.now())
                  },
                }),
                (t.Transport.prototype.start = function (e, i) {
                  return (
                    t.isDefined(i) && (i = this.toTicks(i)),
                    this._clock.start(e, i),
                    this
                  )
                }),
                (t.Transport.prototype.stop = function (t) {
                  return this._clock.stop(t), this
                }),
                (t.Transport.prototype.pause = function (t) {
                  return this._clock.pause(t), this
                }),
                (t.Transport.prototype.toggle = function (e) {
                  return (
                    (e = this.toSeconds(e)),
                    this._clock.getStateAtTime(e) !== t.State.Started
                      ? this.start(e)
                      : this.stop(e),
                    this
                  )
                }),
                Object.defineProperty(t.Transport.prototype, "timeSignature", {
                  get: function () {
                    return this._timeSignature
                  },
                  set: function (e) {
                    t.isArray(e) && (e = (e[0] / e[1]) * 4),
                      (this._timeSignature = e)
                  },
                }),
                Object.defineProperty(t.Transport.prototype, "loopStart", {
                  get: function () {
                    return t.Ticks(this._loopStart).toSeconds()
                  },
                  set: function (t) {
                    this._loopStart = this.toTicks(t)
                  },
                }),
                Object.defineProperty(t.Transport.prototype, "loopEnd", {
                  get: function () {
                    return t.Ticks(this._loopEnd).toSeconds()
                  },
                  set: function (t) {
                    this._loopEnd = this.toTicks(t)
                  },
                }),
                (t.Transport.prototype.setLoopPoints = function (t, e) {
                  return (this.loopStart = t), (this.loopEnd = e), this
                }),
                Object.defineProperty(t.Transport.prototype, "swing", {
                  get: function () {
                    return this._swingAmount
                  },
                  set: function (t) {
                    this._swingAmount = t
                  },
                }),
                Object.defineProperty(
                  t.Transport.prototype,
                  "swingSubdivision",
                  {
                    get: function () {
                      return t.Ticks(this._swingTicks).toNotation()
                    },
                    set: function (t) {
                      this._swingTicks = this.toTicks(t)
                    },
                  },
                ),
                Object.defineProperty(t.Transport.prototype, "position", {
                  get: function () {
                    var e = this.now(),
                      i = this._clock.getTicksAtTime(e)
                    return t.Ticks(i).toBarsBeatsSixteenths()
                  },
                  set: function (t) {
                    var e = this.toTicks(t)
                    this.ticks = e
                  },
                }),
                Object.defineProperty(t.Transport.prototype, "seconds", {
                  get: function () {
                    return this._clock.seconds
                  },
                  set: function (t) {
                    var e = this.now(),
                      i = this.bpm.timeToTicks(t, e)
                    this.ticks = i
                  },
                }),
                Object.defineProperty(t.Transport.prototype, "progress", {
                  get: function () {
                    if (this.loop) {
                      var t = this.now()
                      return (
                        (this._clock.getTicksAtTime(t) - this._loopStart) /
                        (this._loopEnd - this._loopStart)
                      )
                    }
                    return 0
                  },
                }),
                Object.defineProperty(t.Transport.prototype, "ticks", {
                  get: function () {
                    return this._clock.ticks
                  },
                  set: function (e) {
                    if (this._clock.ticks !== e) {
                      var i = this.now()
                      this.state === t.State.Started
                        ? (this.emit("stop", i),
                          this._clock.setTicksAtTime(e, i),
                          this.emit("start", i, this.seconds))
                        : this._clock.setTicksAtTime(e, i)
                    }
                  },
                }),
                (t.Transport.prototype.getTicksAtTime = function (t) {
                  return Math.round(this._clock.getTicksAtTime(t))
                }),
                (t.Transport.prototype.getSecondsAtTime = function (t) {
                  return this._clock.getSecondsAtTime(t)
                }),
                Object.defineProperty(t.Transport.prototype, "PPQ", {
                  get: function () {
                    return this._ppq
                  },
                  set: function (t) {
                    var e = this.bpm.value
                    ;(this._ppq = t), (this.bpm.value = e)
                  },
                }),
                (t.Transport.prototype._fromUnits = function (t) {
                  return 1 / (60 / t / this.PPQ)
                }),
                (t.Transport.prototype._toUnits = function (t) {
                  return (t / this.PPQ) * 60
                }),
                (t.Transport.prototype.nextSubdivision = function (e) {
                  if (((e = this.toTicks(e)), this.state !== t.State.Started))
                    return 0
                  var i = this.now(),
                    n = e - (this.getTicksAtTime(i) % e)
                  return this._clock.nextTickTime(n, i)
                }),
                (t.Transport.prototype.syncSignal = function (e, i) {
                  if (!i) {
                    var n = this.now()
                    i =
                      0 !== e.getValueAtTime(n)
                        ? e.getValueAtTime(n) / this.bpm.getValueAtTime(n)
                        : 0
                  }
                  var s = new t.Gain(i)
                  return (
                    this.bpm.chain(s, e._param),
                    this._syncedSignals.push({
                      ratio: s,
                      signal: e,
                      initial: e.value,
                    }),
                    (e.value = 0),
                    this
                  )
                }),
                (t.Transport.prototype.unsyncSignal = function (t) {
                  for (var e = this._syncedSignals.length - 1; e >= 0; e--) {
                    var i = this._syncedSignals[e]
                    i.signal === t &&
                      (i.ratio.dispose(),
                      (i.signal.value = i.initial),
                      this._syncedSignals.splice(e, 1))
                  }
                  return this
                }),
                (t.Transport.prototype.dispose = function () {
                  return (
                    t.Emitter.prototype.dispose.call(this),
                    this._clock.dispose(),
                    (this._clock = null),
                    this._writable("bpm"),
                    (this.bpm = null),
                    this._timeline.dispose(),
                    (this._timeline = null),
                    this._repeatedEvents.dispose(),
                    (this._repeatedEvents = null),
                    this
                  )
                })
              var e = t.Transport
              return (
                (t.Transport = new e()),
                t.Context.on("init", function (i) {
                  i.Transport instanceof e
                    ? (t.Transport = i.Transport)
                    : (t.Transport = new e()),
                    (i.Transport = t.Transport)
                }),
                t.Context.on("close", function (t) {
                  t.Transport instanceof e && t.Transport.dispose()
                }),
                t.Transport
              )
            }),
            e(function (t) {
              return (
                (t.Volume = function () {
                  var e = t.defaults(arguments, ["volume"], t.Volume)
                  t.AudioNode.call(this),
                    (this.output = this.input =
                      new t.Gain(e.volume, t.Type.Decibels)),
                    (this._unmutedVolume = e.volume),
                    (this.volume = this.output.gain),
                    this._readOnly("volume"),
                    (this.mute = e.mute)
                }),
                t.extend(t.Volume, t.AudioNode),
                (t.Volume.defaults = { volume: 0, mute: !1 }),
                Object.defineProperty(t.Volume.prototype, "mute", {
                  get: function () {
                    return this.volume.value === -1 / 0
                  },
                  set: function (t) {
                    !this.mute && t
                      ? ((this._unmutedVolume = this.volume.value),
                        (this.volume.value = -1 / 0))
                      : this.mute &&
                        !t &&
                        (this.volume.value = this._unmutedVolume)
                  },
                }),
                (t.Volume.prototype.dispose = function () {
                  return (
                    this.input.dispose(),
                    t.AudioNode.prototype.dispose.call(this),
                    this._writable("volume"),
                    this.volume.dispose(),
                    (this.volume = null),
                    this
                  )
                }),
                t.Volume
              )
            }),
            e(function (t) {
              ;(t.Master = function () {
                t.AudioNode.call(this),
                  t.getContext(
                    function () {
                      this.createInsOuts(1, 0),
                        (this._volume = this.output = new t.Volume()),
                        (this.volume = this._volume.volume),
                        this._readOnly("volume"),
                        this.input.chain(this.output, this.context.destination)
                    }.bind(this),
                  )
              }),
                t.extend(t.Master, t.AudioNode),
                (t.Master.defaults = { volume: 0, mute: !1 }),
                Object.defineProperty(t.Master.prototype, "mute", {
                  get: function () {
                    return this._volume.mute
                  },
                  set: function (t) {
                    this._volume.mute = t
                  },
                }),
                (t.Master.prototype.chain = function () {
                  this.input.disconnect(),
                    this.input.chain.apply(this.input, arguments),
                    arguments[arguments.length - 1].connect(this.output)
                }),
                (t.Master.prototype.dispose = function () {
                  t.AudioNode.prototype.dispose.call(this),
                    this._writable("volume"),
                    this._volume.dispose(),
                    (this._volume = null),
                    (this.volume = null)
                }),
                (t.AudioNode.prototype.toMaster = function () {
                  return this.connect(t.Master), this
                }),
                window.AudioNode &&
                  (AudioNode.prototype.toMaster = function () {
                    return this.connect(t.Master), this
                  })
              var e = t.Master
              return (
                (t.Master = new e()),
                t.Context.on("init", function (i) {
                  i.Master instanceof e
                    ? (t.Master = i.Master)
                    : (t.Master = new e()),
                    (i.Master = t.Master)
                }),
                t.Context.on("close", function (t) {
                  t.Master instanceof e && t.Master.dispose()
                }),
                t.Master
              )
            }),
            e(function (t) {
              return (
                (t.Source = function (e) {
                  ;(e = t.defaultArg(e, t.Source.defaults)),
                    t.AudioNode.call(this),
                    (this._volume = this.output = new t.Volume(e.volume)),
                    (this.volume = this._volume.volume),
                    this._readOnly("volume"),
                    (this._state = new t.TimelineState(t.State.Stopped)),
                    (this._state.memory = 100),
                    (this._synced = !1),
                    (this._scheduled = []),
                    (this._volume.output.output.channelCount = 2),
                    (this._volume.output.output.channelCountMode = "explicit"),
                    (this.mute = e.mute)
                }),
                t.extend(t.Source, t.AudioNode),
                (t.Source.defaults = { volume: 0, mute: !1 }),
                Object.defineProperty(t.Source.prototype, "state", {
                  get: function () {
                    return this._synced
                      ? t.Transport.state === t.State.Started
                        ? this._state.getValueAtTime(t.Transport.seconds)
                        : t.State.Stopped
                      : this._state.getValueAtTime(this.now())
                  },
                }),
                Object.defineProperty(t.Source.prototype, "mute", {
                  get: function () {
                    return this._volume.mute
                  },
                  set: function (t) {
                    this._volume.mute = t
                  },
                }),
                (t.Source.prototype._start = t.noOp),
                (t.Source.prototype.restart = t.noOp),
                (t.Source.prototype._stop = t.noOp),
                (t.Source.prototype.start = function (e, i, n) {
                  if (
                    ((e =
                      t.isUndef(e) && this._synced
                        ? t.Transport.seconds
                        : this.toSeconds(e)),
                    this._state.getValueAtTime(e) === t.State.Started)
                  )
                    this._state.cancel(e),
                      this._state.setStateAtTime(t.State.Started, e),
                      this.restart(e, i, n)
                  else if (
                    (this._state.setStateAtTime(t.State.Started, e),
                    this._synced)
                  ) {
                    var s = this._state.get(e)
                    ;(s.offset = t.defaultArg(i, 0)), (s.duration = n)
                    var o = t.Transport.schedule(
                      function (t) {
                        this._start(t, i, n)
                      }.bind(this),
                      e,
                    )
                    this._scheduled.push(o),
                      t.Transport.state === t.State.Started &&
                        this._syncedStart(this.now(), t.Transport.seconds)
                  } else this._start.apply(this, arguments)
                  return this
                }),
                (t.Source.prototype.stop = function (e) {
                  if (
                    ((e =
                      t.isUndef(e) && this._synced
                        ? t.Transport.seconds
                        : this.toSeconds(e)),
                    this._synced)
                  ) {
                    var i = t.Transport.schedule(this._stop.bind(this), e)
                    this._scheduled.push(i)
                  } else this._stop.apply(this, arguments)
                  return (
                    this._state.cancel(e),
                    this._state.setStateAtTime(t.State.Stopped, e),
                    this
                  )
                }),
                (t.Source.prototype.sync = function () {
                  return (
                    (this._synced = !0),
                    (this._syncedStart = function (e, i) {
                      if (i > 0) {
                        var n = this._state.get(i)
                        if (n && n.state === t.State.Started && n.time !== i) {
                          var s,
                            o = i - this.toSeconds(n.time)
                          n.duration && (s = this.toSeconds(n.duration) - o),
                            this._start(e, this.toSeconds(n.offset) + o, s)
                        }
                      }
                    }.bind(this)),
                    (this._syncedStop = function (e) {
                      var i = t.Transport.getSecondsAtTime(
                        Math.max(e - this.sampleTime, 0),
                      )
                      this._state.getValueAtTime(i) === t.State.Started &&
                        this._stop(e)
                    }.bind(this)),
                    t.Transport.on("start loopStart", this._syncedStart),
                    t.Transport.on("stop pause loopEnd", this._syncedStop),
                    this
                  )
                }),
                (t.Source.prototype.unsync = function () {
                  this._synced &&
                    (t.Transport.off("stop pause loopEnd", this._syncedStop),
                    t.Transport.off("start loopStart", this._syncedStart)),
                    (this._synced = !1)
                  for (var e = 0; e < this._scheduled.length; e++) {
                    var i = this._scheduled[e]
                    t.Transport.clear(i)
                  }
                  return (this._scheduled = []), this._state.cancel(0), this
                }),
                (t.Source.prototype.dispose = function () {
                  t.AudioNode.prototype.dispose.call(this),
                    this.unsync(),
                    (this._scheduled = null),
                    this._writable("volume"),
                    this._volume.dispose(),
                    (this._volume = null),
                    (this.volume = null),
                    this._state.dispose(),
                    (this._state = null)
                }),
                t.Source
              )
            }),
            e(function (t) {
              t.supported &&
                (AudioBuffer.prototype.copyToChannel ||
                  ((AudioBuffer.prototype.copyToChannel = function (t, e, i) {
                    var n = this.getChannelData(e)
                    i = i || 0
                    for (var s = 0; s < n.length; s++) n[s + i] = t[s]
                  }),
                  (AudioBuffer.prototype.copyFromChannel = function (t, e, i) {
                    var n = this.getChannelData(e)
                    i = i || 0
                    for (var s = 0; s < t.length; s++) t[s] = n[s + i]
                  })))
            }),
            e(function (t) {
              return (
                (t.Buffer = function () {
                  var e = t.defaults(
                    arguments,
                    ["url", "onload", "onerror"],
                    t.Buffer,
                  )
                  t.call(this),
                    (this._buffer = null),
                    (this._reversed = e.reverse),
                    (this._xhr = null),
                    (this._onload = t.noOp),
                    e.url instanceof AudioBuffer || e.url instanceof t.Buffer
                      ? (this.set(e.url),
                        e.onload &&
                          (this.loaded
                            ? e.onload(this)
                            : (this._onload = e.onload)))
                      : t.isString(e.url) &&
                        this.load(e.url).then(e.onload).catch(e.onerror)
                }),
                t.extend(t.Buffer),
                (t.Buffer.defaults = {
                  url: void 0,
                  reverse: !1,
                  onload: t.noOp,
                  onerror: t.noOp,
                }),
                (t.Buffer.prototype.set = function (e) {
                  return (
                    e instanceof t.Buffer
                      ? e.loaded
                        ? (this._buffer = e.get())
                        : (e._onload = function () {
                            this.set(e), this._onload(this)
                          }.bind(this))
                      : (this._buffer = e),
                    this
                  )
                }),
                (t.Buffer.prototype.get = function () {
                  return this._buffer
                }),
                (t.Buffer.prototype.load = function (e, i, n) {
                  return new Promise(
                    function (s, o) {
                      this._xhr = t.Buffer.load(
                        e,
                        function (t) {
                          ;(this._xhr = null),
                            this.set(t),
                            s(this),
                            this._onload(this),
                            i && i(this)
                        }.bind(this),
                        function (t) {
                          ;(this._xhr = null), o(t), n && n(t)
                        }.bind(this),
                      )
                    }.bind(this),
                  )
                }),
                (t.Buffer.prototype.dispose = function () {
                  return (
                    t.prototype.dispose.call(this),
                    (this._buffer = null),
                    this._xhr &&
                      (t.Buffer._removeFromDownloadQueue(this._xhr),
                      this._xhr.abort(),
                      (this._xhr = null)),
                    this
                  )
                }),
                Object.defineProperty(t.Buffer.prototype, "loaded", {
                  get: function () {
                    return this.length > 0
                  },
                }),
                Object.defineProperty(t.Buffer.prototype, "duration", {
                  get: function () {
                    return this._buffer ? this._buffer.duration : 0
                  },
                }),
                Object.defineProperty(t.Buffer.prototype, "length", {
                  get: function () {
                    return this._buffer ? this._buffer.length : 0
                  },
                }),
                Object.defineProperty(t.Buffer.prototype, "numberOfChannels", {
                  get: function () {
                    return this._buffer ? this._buffer.numberOfChannels : 0
                  },
                }),
                (t.Buffer.prototype.fromArray = function (t) {
                  var e = t[0].length > 0,
                    i = e ? t.length : 1,
                    n = e ? t[0].length : t.length,
                    s = this.context.createBuffer(i, n, this.context.sampleRate)
                  e || 1 !== i || (t = [t])
                  for (var o = 0; o < i; o++) s.copyToChannel(t[o], o)
                  return (this._buffer = s), this
                }),
                (t.Buffer.prototype.toMono = function (e) {
                  if (t.isNumber(e)) this.fromArray(this.toArray(e))
                  else {
                    for (
                      var i = new Float32Array(this.length),
                        n = this.numberOfChannels,
                        s = 0;
                      s < n;
                      s++
                    )
                      for (var o = this.toArray(s), r = 0; r < o.length; r++)
                        i[r] += o[r]
                    ;(i = i.map(function (t) {
                      return t / n
                    })),
                      this.fromArray(i)
                  }
                  return this
                }),
                (t.Buffer.prototype.toArray = function (e) {
                  if (t.isNumber(e)) return this.getChannelData(e)
                  if (1 === this.numberOfChannels) return this.toArray(0)
                  for (var i = [], n = 0; n < this.numberOfChannels; n++)
                    i[n] = this.getChannelData(n)
                  return i
                }),
                (t.Buffer.prototype.getChannelData = function (t) {
                  return this._buffer.getChannelData(t)
                }),
                (t.Buffer.prototype.slice = function (e, i) {
                  i = t.defaultArg(i, this.duration)
                  for (
                    var n = Math.floor(
                        this.context.sampleRate * this.toSeconds(e),
                      ),
                      s = Math.floor(
                        this.context.sampleRate * this.toSeconds(i),
                      ),
                      o = [],
                      r = 0;
                    r < this.numberOfChannels;
                    r++
                  )
                    o[r] = this.toArray(r).slice(n, s)
                  return new t.Buffer().fromArray(o)
                }),
                (t.Buffer.prototype._reverse = function () {
                  if (this.loaded)
                    for (var t = 0; t < this.numberOfChannels; t++)
                      Array.prototype.reverse.call(this.getChannelData(t))
                  return this
                }),
                Object.defineProperty(t.Buffer.prototype, "reverse", {
                  get: function () {
                    return this._reversed
                  },
                  set: function (t) {
                    this._reversed !== t &&
                      ((this._reversed = t), this._reverse())
                  },
                }),
                t.Emitter.mixin(t.Buffer),
                (t.Buffer._downloadQueue = []),
                (t.Buffer.baseUrl = ""),
                (t.Buffer.fromArray = function (e) {
                  return new t.Buffer().fromArray(e)
                }),
                (t.Buffer.fromUrl = function (e) {
                  var i = new t.Buffer()
                  return i.load(e).then(function () {
                    return i
                  })
                }),
                (t.Buffer._removeFromDownloadQueue = function (e) {
                  var i = t.Buffer._downloadQueue.indexOf(e)
                  ;-1 !== i && t.Buffer._downloadQueue.splice(i, 1)
                }),
                (t.Buffer.load = function (e, i, n) {
                  i = t.defaultArg(i, t.noOp)
                  var s = e.match(/\[(.+\|?)+\]$/)
                  if (s) {
                    for (
                      var o = s[1].split("|"), r = o[0], a = 0;
                      a < o.length;
                      a++
                    )
                      if (t.Buffer.supportsType(o[a])) {
                        r = o[a]
                        break
                      }
                    e = e.replace(s[0], r)
                  }
                  function u(e) {
                    if (
                      (t.Buffer._removeFromDownloadQueue(h),
                      t.Buffer.emit("error", e),
                      !n)
                    )
                      throw e
                    n(e)
                  }
                  function l() {
                    for (
                      var e = 0, i = 0;
                      i < t.Buffer._downloadQueue.length;
                      i++
                    )
                      e += t.Buffer._downloadQueue[i].progress
                    t.Buffer.emit(
                      "progress",
                      e / t.Buffer._downloadQueue.length,
                    )
                  }
                  var h = new XMLHttpRequest()
                  return (
                    h.open("GET", t.Buffer.baseUrl + e, !0),
                    (h.responseType = "arraybuffer"),
                    (h.progress = 0),
                    t.Buffer._downloadQueue.push(h),
                    h.addEventListener("load", function () {
                      200 === h.status
                        ? t.context
                            .decodeAudioData(h.response)
                            .then(function (e) {
                              ;(h.progress = 1),
                                l(),
                                i(e),
                                t.Buffer._removeFromDownloadQueue(h),
                                0 === t.Buffer._downloadQueue.length &&
                                  t.Buffer.emit("load")
                            })
                            .catch(function () {
                              t.Buffer._removeFromDownloadQueue(h),
                                u(
                                  "Tone.Buffer: could not decode audio data: " +
                                    e,
                                )
                            })
                        : u("Tone.Buffer: could not locate file: " + e)
                    }),
                    h.addEventListener("error", u),
                    h.addEventListener("progress", function (t) {
                      t.lengthComputable &&
                        ((h.progress = (t.loaded / t.total) * 0.95), l())
                    }),
                    h.send(),
                    h
                  )
                }),
                (t.Buffer.cancelDownloads = function () {
                  return (
                    t.Buffer._downloadQueue.slice().forEach(function (e) {
                      t.Buffer._removeFromDownloadQueue(e), e.abort()
                    }),
                    t.Buffer
                  )
                }),
                (t.Buffer.supportsType = function (t) {
                  var e = t.split(".")
                  return (
                    (e = e[e.length - 1]),
                    "" !==
                      document.createElement("audio").canPlayType("audio/" + e)
                  )
                }),
                (t.loaded = function () {
                  var e, i
                  function n() {
                    t.Buffer.off("load", e), t.Buffer.off("error", i)
                  }
                  return new Promise(function (n, s) {
                    ;(e = function () {
                      n()
                    }),
                      (i = function () {
                        s()
                      }),
                      t.Buffer.on("load", e),
                      t.Buffer.on("error", i)
                  })
                    .then(n)
                    .catch(function (t) {
                      throw (n(), new Error(t))
                    })
                }),
                t.Buffer
              )
            }),
            e(function (t) {
              return (
                (t.OscillatorNode = function () {
                  var e = t.defaults(
                    arguments,
                    ["frequency", "type"],
                    t.OscillatorNode,
                  )
                  t.AudioNode.call(this, e),
                    (this.onended = e.onended),
                    (this._startTime = -1),
                    (this._stopTime = -1),
                    (this._gainNode = this.output = new t.Gain()),
                    this._gainNode.gain.setValueAtTime(
                      0,
                      this.context.currentTime,
                    ),
                    (this._oscillator = this.context.createOscillator()),
                    this._oscillator.connect(this._gainNode),
                    (this.type = e.type),
                    (this.frequency = new t.Param(
                      this._oscillator.frequency,
                      t.Type.Frequency,
                    )),
                    (this.frequency.value = e.frequency),
                    (this.detune = new t.Param(
                      this._oscillator.detune,
                      t.Type.Cents,
                    )),
                    (this.detune.value = e.detune),
                    (this._gain = 1)
                }),
                t.extend(t.OscillatorNode, t.AudioNode),
                (t.OscillatorNode.defaults = {
                  frequency: 440,
                  detune: 0,
                  type: "sine",
                  onended: t.noOp,
                }),
                Object.defineProperty(t.OscillatorNode.prototype, "state", {
                  get: function () {
                    return this.getStateAtTime(this.now())
                  },
                }),
                (t.OscillatorNode.prototype.getStateAtTime = function (e) {
                  return (
                    (e = this.toSeconds(e)),
                    -1 !== this._startTime &&
                    e >= this._startTime &&
                    (-1 === this._stopTime || e <= this._stopTime)
                      ? t.State.Started
                      : t.State.Stopped
                  )
                }),
                (t.OscillatorNode.prototype.start = function (t) {
                  if (-1 !== this._startTime)
                    throw new Error(
                      "cannot call OscillatorNode.start more than once",
                    )
                  ;(this._startTime = this.toSeconds(t)),
                    this._oscillator.start(this._startTime)
                  var e = this.context.currentTime
                  return (
                    this._gainNode.gain.cancelScheduledValues(e),
                    this._gainNode.gain.setValueAtTime(0, e),
                    this._gainNode.gain.setValueAtTime(1, this._startTime),
                    this
                  )
                }),
                (t.OscillatorNode.prototype.setPeriodicWave = function (t) {
                  return this._oscillator.setPeriodicWave(t), this
                }),
                (t.OscillatorNode.prototype.stop = function (t) {
                  return (
                    this.cancelStop(),
                    (this._stopTime = this.toSeconds(t)),
                    this._gainNode.gain.setValueAtTime(0, this._stopTime),
                    this.context.clearTimeout(this._timeout),
                    (this._timeout = this.context.setTimeout(
                      function () {
                        this._oscillator.stop(this.now()), this.onended()
                      }.bind(this),
                      this._stopTime - this.now(),
                    )),
                    this
                  )
                }),
                (t.OscillatorNode.prototype.cancelStop = function () {
                  return (
                    -1 !== this._startTime &&
                      (this._gainNode.gain.cancelScheduledValues(
                        this._startTime + this.sampleTime,
                      ),
                      this._gainNode.gain.setValueAtTime(
                        1,
                        Math.max(this.now(), this._startTime),
                      ),
                      this.context.clearTimeout(this._timeout),
                      (this._stopTime = -1)),
                    this
                  )
                }),
                Object.defineProperty(t.OscillatorNode.prototype, "type", {
                  get: function () {
                    return this._oscillator.type
                  },
                  set: function (t) {
                    this._oscillator.type = t
                  },
                }),
                (t.OscillatorNode.prototype.dispose = function () {
                  return (
                    this.context.clearTimeout(this._timeout),
                    t.AudioNode.prototype.dispose.call(this),
                    (this.onended = null),
                    this._oscillator.disconnect(),
                    (this._oscillator = null),
                    this._gainNode.dispose(),
                    (this._gainNode = null),
                    this.frequency.dispose(),
                    (this.frequency = null),
                    this.detune.dispose(),
                    (this.detune = null),
                    this
                  )
                }),
                t.OscillatorNode
              )
            }),
            e(function (t) {
              return (
                (t.Oscillator = function () {
                  var e = t.defaults(
                    arguments,
                    ["frequency", "type"],
                    t.Oscillator,
                  )
                  t.Source.call(this, e),
                    (this._oscillator = null),
                    (this.frequency = new t.Signal(
                      e.frequency,
                      t.Type.Frequency,
                    )),
                    (this.detune = new t.Signal(e.detune, t.Type.Cents)),
                    (this._wave = null),
                    (this._partials = t.defaultArg(e.partials, [1])),
                    (this._phase = e.phase),
                    (this._type = null),
                    (this.type = e.type),
                    (this.phase = this._phase),
                    this._readOnly(["frequency", "detune"])
                }),
                t.extend(t.Oscillator, t.Source),
                (t.Oscillator.defaults = {
                  type: "sine",
                  frequency: 440,
                  detune: 0,
                  phase: 0,
                  partials: [],
                }),
                (t.Oscillator.Type = {
                  Sine: "sine",
                  Triangle: "triangle",
                  Sawtooth: "sawtooth",
                  Square: "square",
                  Custom: "custom",
                }),
                (t.Oscillator.prototype._start = function (e) {
                  ;(this._oscillator = new t.OscillatorNode()),
                    this._wave
                      ? this._oscillator.setPeriodicWave(this._wave)
                      : (this._oscillator.type = this._type),
                    this._oscillator.connect(this.output),
                    this.frequency.connect(this._oscillator.frequency),
                    this.detune.connect(this._oscillator.detune),
                    (e = this.toSeconds(e)),
                    this._oscillator.start(e)
                }),
                (t.Oscillator.prototype._stop = function (t) {
                  return (
                    this._oscillator &&
                      ((t = this.toSeconds(t)), this._oscillator.stop(t)),
                    this
                  )
                }),
                (t.Oscillator.prototype.restart = function (t) {
                  return (
                    this._oscillator.cancelStop(),
                    this._state.cancel(this.toSeconds(t)),
                    this
                  )
                }),
                (t.Oscillator.prototype.syncFrequency = function () {
                  return t.Transport.syncSignal(this.frequency), this
                }),
                (t.Oscillator.prototype.unsyncFrequency = function () {
                  return t.Transport.unsyncSignal(this.frequency), this
                }),
                Object.defineProperty(t.Oscillator.prototype, "type", {
                  get: function () {
                    return this._type
                  },
                  set: function (e) {
                    var i = [
                      t.Oscillator.Type.Sine,
                      t.Oscillator.Type.Square,
                      t.Oscillator.Type.Triangle,
                      t.Oscillator.Type.Sawtooth,
                    ].includes(e)
                    if (0 === this._phase && i)
                      (this._wave = null),
                        null !== this._oscillator && this._oscillator.type
                    else {
                      var n = this._getRealImaginary(e, this._phase),
                        s = this.context.createPeriodicWave(n[0], n[1])
                      ;(this._wave = s),
                        null !== this._oscillator &&
                          this._oscillator.setPeriodicWave(this._wave)
                    }
                    this._type = e
                  },
                }),
                (t.Oscillator.prototype._getRealImaginary = function (e, i) {
                  var n = 2048,
                    s = new Float32Array(n),
                    o = new Float32Array(n),
                    r = 1
                  if (e === t.Oscillator.Type.Custom)
                    n = r = this._partials.length + 1
                  else {
                    var a = /^(sine|triangle|square|sawtooth)(\d+)$/.exec(e)
                    a &&
                      ((r = parseInt(a[2]) + 1),
                      (e = a[1]),
                      (n = r = Math.max(r, 2)))
                  }
                  for (var u = 1; u < n; ++u) {
                    var l,
                      h = 2 / (u * Math.PI)
                    switch (e) {
                      case t.Oscillator.Type.Sine:
                        l = u <= r ? 1 : 0
                        break
                      case t.Oscillator.Type.Square:
                        l = 1 & u ? 2 * h : 0
                        break
                      case t.Oscillator.Type.Sawtooth:
                        l = h * (1 & u ? 1 : -1)
                        break
                      case t.Oscillator.Type.Triangle:
                        l =
                          1 & u ? h * h * 2 * (((u - 1) >> 1) & 1 ? -1 : 1) : 0
                        break
                      case t.Oscillator.Type.Custom:
                        l = this._partials[u - 1]
                        break
                      default:
                        throw new TypeError(
                          "Tone.Oscillator: invalid type: " + e,
                        )
                    }
                    0 !== l
                      ? ((s[u] = -l * Math.sin(i * u)),
                        (o[u] = l * Math.cos(i * u)))
                      : ((s[u] = 0), (o[u] = 0))
                  }
                  return [s, o]
                }),
                (t.Oscillator.prototype._inverseFFT = function (t, e, i) {
                  for (var n = 0, s = t.length, o = 0; o < s; o++)
                    n += t[o] * Math.cos(o * i) + e[o] * Math.sin(o * i)
                  return n
                }),
                (t.Oscillator.prototype._getInitialValue = function () {
                  for (
                    var t = this._getRealImaginary(this._type, 0),
                      e = t[0],
                      i = t[1],
                      n = 0,
                      s = 2 * Math.PI,
                      o = 0;
                    o < 8;
                    o++
                  )
                    n = Math.max(this._inverseFFT(e, i, (o / 8) * s), n)
                  return -this._inverseFFT(e, i, this._phase) / n
                }),
                Object.defineProperty(t.Oscillator.prototype, "partials", {
                  get: function () {
                    return this._type !== t.Oscillator.Type.Custom
                      ? []
                      : this._partials
                  },
                  set: function (e) {
                    ;(this._partials = e),
                      (this.type = t.Oscillator.Type.Custom)
                  },
                }),
                Object.defineProperty(t.Oscillator.prototype, "phase", {
                  get: function () {
                    return this._phase * (180 / Math.PI)
                  },
                  set: function (t) {
                    ;(this._phase = (t * Math.PI) / 180),
                      (this.type = this._type)
                  },
                }),
                (t.Oscillator.prototype.dispose = function () {
                  return (
                    t.Source.prototype.dispose.call(this),
                    null !== this._oscillator &&
                      (this._oscillator.dispose(), (this._oscillator = null)),
                    (this._wave = null),
                    this._writable(["frequency", "detune"]),
                    this.frequency.dispose(),
                    (this.frequency = null),
                    this.detune.dispose(),
                    (this.detune = null),
                    (this._partials = null),
                    this
                  )
                }),
                t.Oscillator
              )
            }),
            e(function (t) {
              return (
                (t.AudioToGain = function () {
                  t.SignalBase.call(this),
                    (this._norm =
                      this.input =
                      this.output =
                        new t.WaveShaper(function (t) {
                          return (t + 1) / 2
                        }))
                }),
                t.extend(t.AudioToGain, t.SignalBase),
                (t.AudioToGain.prototype.dispose = function () {
                  return (
                    t.SignalBase.prototype.dispose.call(this),
                    this._norm.dispose(),
                    (this._norm = null),
                    this
                  )
                }),
                t.AudioToGain
              )
            }),
            e(function (t) {
              return (
                (t.Zero = function () {
                  t.SignalBase.call(this),
                    (this._gain = this.input = this.output = new t.Gain()),
                    this.context.getConstant(0).connect(this._gain)
                }),
                t.extend(t.Zero, t.SignalBase),
                (t.Zero.prototype.dispose = function () {
                  return (
                    t.SignalBase.prototype.dispose.call(this),
                    this._gain.dispose(),
                    (this._gain = null),
                    this
                  )
                }),
                t.Zero
              )
            }),
            e(function (t) {
              return (
                (t.LFO = function () {
                  var e = t.defaults(
                    arguments,
                    ["frequency", "min", "max"],
                    t.LFO,
                  )
                  t.AudioNode.call(this),
                    (this._oscillator = new t.Oscillator({
                      frequency: e.frequency,
                      type: e.type,
                    })),
                    (this.frequency = this._oscillator.frequency),
                    (this.amplitude = this._oscillator.volume),
                    (this.amplitude.units = t.Type.NormalRange),
                    (this.amplitude.value = e.amplitude),
                    (this._stoppedSignal = new t.Signal(0, t.Type.AudioRange)),
                    (this._zeros = new t.Zero()),
                    (this._stoppedValue = 0),
                    (this._a2g = new t.AudioToGain()),
                    (this._scaler = this.output = new t.Scale(e.min, e.max)),
                    (this._units = t.Type.Default),
                    (this.units = e.units),
                    this._oscillator.chain(this._a2g, this._scaler),
                    this._zeros.connect(this._a2g),
                    this._stoppedSignal.connect(this._a2g),
                    this._readOnly(["amplitude", "frequency"]),
                    (this.phase = e.phase)
                }),
                t.extend(t.LFO, t.AudioNode),
                (t.LFO.defaults = {
                  type: "sine",
                  min: 0,
                  max: 1,
                  phase: 0,
                  frequency: "4n",
                  amplitude: 1,
                  units: t.Type.Default,
                }),
                (t.LFO.prototype.start = function (t) {
                  return (
                    (t = this.toSeconds(t)),
                    this._stoppedSignal.setValueAtTime(0, t),
                    this._oscillator.start(t),
                    this
                  )
                }),
                (t.LFO.prototype.stop = function (t) {
                  return (
                    (t = this.toSeconds(t)),
                    this._stoppedSignal.setValueAtTime(this._stoppedValue, t),
                    this._oscillator.stop(t),
                    this
                  )
                }),
                (t.LFO.prototype.sync = function () {
                  return (
                    this._oscillator.sync(),
                    this._oscillator.syncFrequency(),
                    this
                  )
                }),
                (t.LFO.prototype.unsync = function () {
                  return (
                    this._oscillator.unsync(),
                    this._oscillator.unsyncFrequency(),
                    this
                  )
                }),
                Object.defineProperty(t.LFO.prototype, "min", {
                  get: function () {
                    return this._toUnits(this._scaler.min)
                  },
                  set: function (t) {
                    ;(t = this._fromUnits(t)), (this._scaler.min = t)
                  },
                }),
                Object.defineProperty(t.LFO.prototype, "max", {
                  get: function () {
                    return this._toUnits(this._scaler.max)
                  },
                  set: function (t) {
                    ;(t = this._fromUnits(t)), (this._scaler.max = t)
                  },
                }),
                Object.defineProperty(t.LFO.prototype, "type", {
                  get: function () {
                    return this._oscillator.type
                  },
                  set: function (t) {
                    ;(this._oscillator.type = t),
                      (this._stoppedValue =
                        this._oscillator._getInitialValue()),
                      (this._stoppedSignal.value = this._stoppedValue)
                  },
                }),
                Object.defineProperty(t.LFO.prototype, "phase", {
                  get: function () {
                    return this._oscillator.phase
                  },
                  set: function (t) {
                    ;(this._oscillator.phase = t),
                      (this._stoppedValue =
                        this._oscillator._getInitialValue()),
                      (this._stoppedSignal.value = this._stoppedValue)
                  },
                }),
                Object.defineProperty(t.LFO.prototype, "units", {
                  get: function () {
                    return this._units
                  },
                  set: function (t) {
                    var e = this.min,
                      i = this.max
                    ;(this._units = t), (this.min = e), (this.max = i)
                  },
                }),
                Object.defineProperty(t.LFO.prototype, "mute", {
                  get: function () {
                    return this._oscillator.mute
                  },
                  set: function (t) {
                    this._oscillator.mute = t
                  },
                }),
                Object.defineProperty(t.LFO.prototype, "state", {
                  get: function () {
                    return this._oscillator.state
                  },
                }),
                (t.LFO.prototype.connect = function (e) {
                  return (
                    (e.constructor !== t.Signal && e.constructor !== t.Param) ||
                      ((this.convert = e.convert), (this.units = e.units)),
                    t.SignalBase.prototype.connect.apply(this, arguments),
                    this
                  )
                }),
                (t.LFO.prototype._fromUnits = t.Param.prototype._fromUnits),
                (t.LFO.prototype._toUnits = t.Param.prototype._toUnits),
                (t.LFO.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._writable(["amplitude", "frequency"]),
                    this._oscillator.dispose(),
                    (this._oscillator = null),
                    this._stoppedSignal.dispose(),
                    (this._stoppedSignal = null),
                    this._zeros.dispose(),
                    (this._zeros = null),
                    this._scaler.dispose(),
                    (this._scaler = null),
                    this._a2g.dispose(),
                    (this._a2g = null),
                    (this.frequency = null),
                    (this.amplitude = null),
                    this
                  )
                }),
                t.LFO
              )
            }),
            e(function (t) {
              return (
                (t.Limiter = function () {
                  var e = t.defaults(arguments, ["threshold"], t.Limiter)
                  t.AudioNode.call(this),
                    (this._compressor =
                      this.input =
                      this.output =
                        new t.Compressor({
                          attack: 0.001,
                          decay: 0.001,
                          threshold: e.threshold,
                        })),
                    (this.threshold = this._compressor.threshold),
                    this._readOnly("threshold")
                }),
                t.extend(t.Limiter, t.AudioNode),
                (t.Limiter.defaults = { threshold: -12 }),
                (t.Limiter.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._compressor.dispose(),
                    (this._compressor = null),
                    this._writable("threshold"),
                    (this.threshold = null),
                    this
                  )
                }),
                t.Limiter
              )
            }),
            e(function (t) {
              return (
                (t.LowpassCombFilter = function () {
                  var e = t.defaults(
                    arguments,
                    ["delayTime", "resonance", "dampening"],
                    t.LowpassCombFilter,
                  )
                  t.AudioNode.call(this),
                    this.createInsOuts(1, 1),
                    (this._delay = this.input = new t.Delay(e.delayTime)),
                    (this.delayTime = this._delay.delayTime),
                    (this._lowpass = this.output =
                      this.context.createBiquadFilter()),
                    (this._lowpass.Q.value = -3.0102999566398125),
                    (this._lowpass.type = "lowpass"),
                    (this.dampening = new t.Param({
                      param: this._lowpass.frequency,
                      units: t.Type.Frequency,
                      value: e.dampening,
                    })),
                    (this._feedback = new t.Gain(
                      e.resonance,
                      t.Type.NormalRange,
                    )),
                    (this.resonance = this._feedback.gain),
                    this._delay.chain(
                      this._lowpass,
                      this._feedback,
                      this._delay,
                    ),
                    this._readOnly(["dampening", "resonance", "delayTime"])
                }),
                t.extend(t.LowpassCombFilter, t.AudioNode),
                (t.LowpassCombFilter.defaults = {
                  delayTime: 0.1,
                  resonance: 0.5,
                  dampening: 3e3,
                }),
                (t.LowpassCombFilter.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._writable(["dampening", "resonance", "delayTime"]),
                    this.dampening.dispose(),
                    (this.dampening = null),
                    this.resonance.dispose(),
                    (this.resonance = null),
                    this._delay.dispose(),
                    (this._delay = null),
                    (this.delayTime = null),
                    this._lowpass.disconnect(),
                    (this._lowpass = null),
                    this._feedback.disconnect(),
                    (this._feedback = null),
                    this
                  )
                }),
                t.LowpassCombFilter
              )
            }),
            e(function (t) {
              return (
                (t.Merge = function () {
                  t.AudioNode.call(this),
                    this.createInsOuts(2, 0),
                    (this.left = this.input[0] = new t.Gain()),
                    (this.right = this.input[1] = new t.Gain()),
                    (this._merger = this.output =
                      this.context.createChannelMerger(2)),
                    this.left.connect(this._merger, 0, 0),
                    this.right.connect(this._merger, 0, 1),
                    (this.left.channelCount = 1),
                    (this.right.channelCount = 1),
                    (this.left.channelCountMode = "explicit"),
                    (this.right.channelCountMode = "explicit")
                }),
                t.extend(t.Merge, t.AudioNode),
                (t.Merge.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this.left.dispose(),
                    (this.left = null),
                    this.right.dispose(),
                    (this.right = null),
                    this._merger.disconnect(),
                    (this._merger = null),
                    this
                  )
                }),
                t.Merge
              )
            }),
            e(function (t) {
              return (
                (t.Meter = function () {
                  var e = t.defaults(arguments, ["smoothing"], t.Meter)
                  t.AudioNode.call(this),
                    (this.input =
                      this.output =
                      this._analyser =
                        new t.Analyser("waveform", 1024)),
                    (this.smoothing = e.smoothing)
                }),
                t.extend(t.Meter, t.AudioNode),
                (t.Meter.defaults = { smoothing: 0.8 }),
                (t.Meter.prototype.getLevel = function () {
                  this._analyser.type = "fft"
                  var t = this._analyser.getValue()
                  return Math.max.apply(this, t) + 28
                }),
                (t.Meter.prototype.getValue = function () {
                  return (
                    (this._analyser.type = "waveform"),
                    this._analyser.getValue()[0]
                  )
                }),
                Object.defineProperty(t.Meter.prototype, "smoothing", {
                  get: function () {
                    return this._analyser.smoothing
                  },
                  set: function (t) {
                    this._analyser.smoothing = t
                  },
                }),
                (t.Meter.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._analyser.dispose(),
                    (this._analyser = null),
                    this
                  )
                }),
                t.Meter
              )
            }),
            e(function (t) {
              return (
                (t.Split = function () {
                  t.AudioNode.call(this),
                    this.createInsOuts(0, 2),
                    (this._splitter = this.input =
                      this.context.createChannelSplitter(2)),
                    (this.left = this.output[0] = new t.Gain()),
                    (this.right = this.output[1] = new t.Gain()),
                    this._splitter.connect(this.left, 0, 0),
                    this._splitter.connect(this.right, 1, 0)
                }),
                t.extend(t.Split, t.AudioNode),
                (t.Split.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._splitter.disconnect(),
                    this.left.dispose(),
                    (this.left = null),
                    this.right.dispose(),
                    (this.right = null),
                    (this._splitter = null),
                    this
                  )
                }),
                t.Split
              )
            }),
            e(function (t) {
              return (
                (t.MidSideSplit = function () {
                  t.AudioNode.call(this),
                    this.createInsOuts(0, 2),
                    (this._split = this.input = new t.Split()),
                    (this._midAdd = new t.Add()),
                    (this.mid = this.output[0] = new t.Multiply(Math.SQRT1_2)),
                    (this._sideSubtract = new t.Subtract()),
                    (this.side = this.output[1] = new t.Multiply(Math.SQRT1_2)),
                    this._split.connect(this._midAdd, 0, 0),
                    this._split.connect(this._midAdd, 1, 1),
                    this._split.connect(this._sideSubtract, 0, 0),
                    this._split.connect(this._sideSubtract, 1, 1),
                    this._midAdd.connect(this.mid),
                    this._sideSubtract.connect(this.side)
                }),
                t.extend(t.MidSideSplit, t.AudioNode),
                (t.MidSideSplit.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this.mid.dispose(),
                    (this.mid = null),
                    this.side.dispose(),
                    (this.side = null),
                    this._midAdd.dispose(),
                    (this._midAdd = null),
                    this._sideSubtract.dispose(),
                    (this._sideSubtract = null),
                    this._split.dispose(),
                    (this._split = null),
                    this
                  )
                }),
                t.MidSideSplit
              )
            }),
            e(function (t) {
              return (
                (t.MidSideMerge = function () {
                  t.AudioNode.call(this),
                    this.createInsOuts(2, 0),
                    (this.mid = this.input[0] = new t.Gain()),
                    (this._left = new t.Add()),
                    (this._timesTwoLeft = new t.Multiply(Math.SQRT1_2)),
                    (this.side = this.input[1] = new t.Gain()),
                    (this._right = new t.Subtract()),
                    (this._timesTwoRight = new t.Multiply(Math.SQRT1_2)),
                    (this._merge = this.output = new t.Merge()),
                    this.mid.connect(this._left, 0, 0),
                    this.side.connect(this._left, 0, 1),
                    this.mid.connect(this._right, 0, 0),
                    this.side.connect(this._right, 0, 1),
                    this._left.connect(this._timesTwoLeft),
                    this._right.connect(this._timesTwoRight),
                    this._timesTwoLeft.connect(this._merge, 0, 0),
                    this._timesTwoRight.connect(this._merge, 0, 1)
                }),
                t.extend(t.MidSideMerge, t.AudioNode),
                (t.MidSideMerge.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this.mid.dispose(),
                    (this.mid = null),
                    this.side.dispose(),
                    (this.side = null),
                    this._left.dispose(),
                    (this._left = null),
                    this._timesTwoLeft.dispose(),
                    (this._timesTwoLeft = null),
                    this._right.dispose(),
                    (this._right = null),
                    this._timesTwoRight.dispose(),
                    (this._timesTwoRight = null),
                    this._merge.dispose(),
                    (this._merge = null),
                    this
                  )
                }),
                t.MidSideMerge
              )
            }),
            e(function (t) {
              return (
                (t.MidSideCompressor = function (e) {
                  t.AudioNode.call(this),
                    (e = t.defaultArg(e, t.MidSideCompressor.defaults)),
                    (this._midSideSplit = this.input = new t.MidSideSplit()),
                    (this._midSideMerge = this.output = new t.MidSideMerge()),
                    (this.mid = new t.Compressor(e.mid)),
                    (this.side = new t.Compressor(e.side)),
                    this._midSideSplit.mid.chain(
                      this.mid,
                      this._midSideMerge.mid,
                    ),
                    this._midSideSplit.side.chain(
                      this.side,
                      this._midSideMerge.side,
                    ),
                    this._readOnly(["mid", "side"])
                }),
                t.extend(t.MidSideCompressor, t.AudioNode),
                (t.MidSideCompressor.defaults = {
                  mid: {
                    ratio: 3,
                    threshold: -24,
                    release: 0.03,
                    attack: 0.02,
                    knee: 16,
                  },
                  side: {
                    ratio: 6,
                    threshold: -30,
                    release: 0.25,
                    attack: 0.03,
                    knee: 10,
                  },
                }),
                (t.MidSideCompressor.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._writable(["mid", "side"]),
                    this.mid.dispose(),
                    (this.mid = null),
                    this.side.dispose(),
                    (this.side = null),
                    this._midSideSplit.dispose(),
                    (this._midSideSplit = null),
                    this._midSideMerge.dispose(),
                    (this._midSideMerge = null),
                    this
                  )
                }),
                t.MidSideCompressor
              )
            }),
            e(function (t) {
              return (
                (t.Mono = function () {
                  t.AudioNode.call(this),
                    this.createInsOuts(1, 0),
                    (this._merge = this.output = new t.Merge()),
                    this.input.connect(this._merge, 0, 0),
                    this.input.connect(this._merge, 0, 1)
                }),
                t.extend(t.Mono, t.AudioNode),
                (t.Mono.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._merge.dispose(),
                    (this._merge = null),
                    this
                  )
                }),
                t.Mono
              )
            }),
            e(function (t) {
              return (
                (t.MultibandCompressor = function (e) {
                  t.AudioNode.call(this),
                    (e = t.defaultArg(
                      arguments,
                      t.MultibandCompressor.defaults,
                    )),
                    (this._splitter = this.input =
                      new t.MultibandSplit({
                        lowFrequency: e.lowFrequency,
                        highFrequency: e.highFrequency,
                      })),
                    (this.lowFrequency = this._splitter.lowFrequency),
                    (this.highFrequency = this._splitter.highFrequency),
                    (this.output = new t.Gain()),
                    (this.low = new t.Compressor(e.low)),
                    (this.mid = new t.Compressor(e.mid)),
                    (this.high = new t.Compressor(e.high)),
                    this._splitter.low.chain(this.low, this.output),
                    this._splitter.mid.chain(this.mid, this.output),
                    this._splitter.high.chain(this.high, this.output),
                    this._readOnly([
                      "high",
                      "mid",
                      "low",
                      "highFrequency",
                      "lowFrequency",
                    ])
                }),
                t.extend(t.MultibandCompressor, t.AudioNode),
                (t.MultibandCompressor.defaults = {
                  low: t.Compressor.defaults,
                  mid: t.Compressor.defaults,
                  high: t.Compressor.defaults,
                  lowFrequency: 250,
                  highFrequency: 2e3,
                }),
                (t.MultibandCompressor.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._splitter.dispose(),
                    this._writable([
                      "high",
                      "mid",
                      "low",
                      "highFrequency",
                      "lowFrequency",
                    ]),
                    this.low.dispose(),
                    this.mid.dispose(),
                    this.high.dispose(),
                    (this._splitter = null),
                    (this.low = null),
                    (this.mid = null),
                    (this.high = null),
                    (this.lowFrequency = null),
                    (this.highFrequency = null),
                    this
                  )
                }),
                t.MultibandCompressor
              )
            }),
            e(function (t) {
              if (t.supported && !window.StereoPannerNode) {
                var e = function (e) {
                  ;(this.context = e),
                    (this.pan = new t.Signal(0, t.Type.AudioRange))
                  var i = new t.WaveShaper(function (e) {
                      return t.equalPowerScale((e + 1) / 2)
                    }, 4096),
                    n = new t.WaveShaper(function (e) {
                      return t.equalPowerScale(1 - (e + 1) / 2)
                    }, 4096),
                    s = new t.Gain(),
                    o = new t.Gain(),
                    r = (this.input = new t.Split())
                  new t.Zero().fan(i, n)
                  var a = (this.output = new t.Merge())
                  r.left.chain(s, a.left),
                    r.right.chain(o, a.right),
                    this.pan.chain(n, s.gain),
                    this.pan.chain(i, o.gain)
                }
                ;(e.prototype.disconnect = function () {
                  this.output.disconnect.apply(this.output, arguments)
                }),
                  (e.prototype.connect = function () {
                    this.output.connect.apply(this.output, arguments)
                  }),
                  (AudioContext.prototype.createStereoPanner = function () {
                    return new e(this)
                  }),
                  (t.Context.prototype.createStereoPanner = function () {
                    return new e(this)
                  })
              }
            }),
            e(function (t) {
              return (
                (t.Panner = function (e) {
                  t.AudioNode.call(this),
                    (this._panner =
                      this.input =
                      this.output =
                        this.context.createStereoPanner()),
                    (this.pan = this._panner.pan),
                    (this.pan.value = t.defaultArg(e, 0)),
                    this._readOnly("pan")
                }),
                t.extend(t.Panner, t.AudioNode),
                (t.Panner.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._writable("pan"),
                    this._panner.disconnect(),
                    (this._panner = null),
                    (this.pan = null),
                    this
                  )
                }),
                t.Panner
              )
            }),
            e(function (t) {
              return (
                (t.Panner3D = function () {
                  var e = t.defaults(
                    arguments,
                    ["positionX", "positionY", "positionZ"],
                    t.Panner3D,
                  )
                  t.AudioNode.call(this),
                    (this._panner =
                      this.input =
                      this.output =
                        this.context.createPanner()),
                    (this._panner.panningModel = e.panningModel),
                    (this._panner.maxDistance = e.maxDistance),
                    (this._panner.distanceModel = e.distanceModel),
                    (this._panner.coneOuterGain = e.coneOuterGain),
                    (this._panner.coneOuterAngle = e.coneOuterAngle),
                    (this._panner.coneInnerAngle = e.coneInnerAngle),
                    (this._panner.refDistance = e.refDistance),
                    (this._panner.rolloffFactor = e.rolloffFactor),
                    (this._orientation = [
                      e.orientationX,
                      e.orientationY,
                      e.orientationZ,
                    ]),
                    (this._position = [e.positionX, e.positionY, e.positionZ]),
                    (this.orientationX = e.orientationX),
                    (this.orientationY = e.orientationY),
                    (this.orientationZ = e.orientationZ),
                    (this.positionX = e.positionX),
                    (this.positionY = e.positionY),
                    (this.positionZ = e.positionZ)
                }),
                t.extend(t.Panner3D, t.AudioNode),
                (t.Panner3D.defaults = {
                  positionX: 0,
                  positionY: 0,
                  positionZ: 0,
                  orientationX: 0,
                  orientationY: 0,
                  orientationZ: 0,
                  panningModel: "equalpower",
                  maxDistance: 1e4,
                  distanceModel: "inverse",
                  coneOuterGain: 0,
                  coneOuterAngle: 360,
                  coneInnerAngle: 360,
                  refDistance: 1,
                  rolloffFactor: 1,
                }),
                (t.Panner3D.prototype._rampTimeConstant = 0.01),
                (t.Panner3D.prototype.setPosition = function (t, e, i) {
                  if (this._panner.positionX) {
                    var n = this.now()
                    this._panner.positionX.setTargetAtTime(
                      t,
                      n,
                      this._rampTimeConstant,
                    ),
                      this._panner.positionY.setTargetAtTime(
                        e,
                        n,
                        this._rampTimeConstant,
                      ),
                      this._panner.positionZ.setTargetAtTime(
                        i,
                        n,
                        this._rampTimeConstant,
                      )
                  } else this._panner.setPosition(t, e, i)
                  return (
                    (this._position = Array.prototype.slice.call(arguments)),
                    this
                  )
                }),
                (t.Panner3D.prototype.setOrientation = function (t, e, i) {
                  if (this._panner.orientationX) {
                    var n = this.now()
                    this._panner.orientationX.setTargetAtTime(
                      t,
                      n,
                      this._rampTimeConstant,
                    ),
                      this._panner.orientationY.setTargetAtTime(
                        e,
                        n,
                        this._rampTimeConstant,
                      ),
                      this._panner.orientationZ.setTargetAtTime(
                        i,
                        n,
                        this._rampTimeConstant,
                      )
                  } else this._panner.setOrientation(t, e, i)
                  return (
                    (this._orientation = Array.prototype.slice.call(arguments)),
                    this
                  )
                }),
                Object.defineProperty(t.Panner3D.prototype, "positionX", {
                  set: function (t) {
                    ;(this._position[0] = t),
                      this.setPosition.apply(this, this._position)
                  },
                  get: function () {
                    return this._position[0]
                  },
                }),
                Object.defineProperty(t.Panner3D.prototype, "positionY", {
                  set: function (t) {
                    ;(this._position[1] = t),
                      this.setPosition.apply(this, this._position)
                  },
                  get: function () {
                    return this._position[1]
                  },
                }),
                Object.defineProperty(t.Panner3D.prototype, "positionZ", {
                  set: function (t) {
                    ;(this._position[2] = t),
                      this.setPosition.apply(this, this._position)
                  },
                  get: function () {
                    return this._position[2]
                  },
                }),
                Object.defineProperty(t.Panner3D.prototype, "orientationX", {
                  set: function (t) {
                    ;(this._orientation[0] = t),
                      this.setOrientation.apply(this, this._orientation)
                  },
                  get: function () {
                    return this._orientation[0]
                  },
                }),
                Object.defineProperty(t.Panner3D.prototype, "orientationY", {
                  set: function (t) {
                    ;(this._orientation[1] = t),
                      this.setOrientation.apply(this, this._orientation)
                  },
                  get: function () {
                    return this._orientation[1]
                  },
                }),
                Object.defineProperty(t.Panner3D.prototype, "orientationZ", {
                  set: function (t) {
                    ;(this._orientation[2] = t),
                      this.setOrientation.apply(this, this._orientation)
                  },
                  get: function () {
                    return this._orientation[2]
                  },
                }),
                (t.Panner3D._aliasProperty = function (e) {
                  Object.defineProperty(t.Panner3D.prototype, e, {
                    set: function (t) {
                      this._panner[e] = t
                    },
                    get: function () {
                      return this._panner[e]
                    },
                  })
                }),
                t.Panner3D._aliasProperty("panningModel"),
                t.Panner3D._aliasProperty("refDistance"),
                t.Panner3D._aliasProperty("rolloffFactor"),
                t.Panner3D._aliasProperty("distanceModel"),
                t.Panner3D._aliasProperty("coneInnerAngle"),
                t.Panner3D._aliasProperty("coneOuterAngle"),
                t.Panner3D._aliasProperty("coneOuterGain"),
                t.Panner3D._aliasProperty("maxDistance"),
                (t.Panner3D.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._panner.disconnect(),
                    (this._panner = null),
                    (this._orientation = null),
                    (this._position = null),
                    this
                  )
                }),
                t.Panner3D
              )
            }),
            e(function (t) {
              return (
                (t.PanVol = function () {
                  var e = t.defaults(arguments, ["pan", "volume"], t.PanVol)
                  t.AudioNode.call(this),
                    (this._panner = this.input = new t.Panner(e.pan)),
                    (this.pan = this._panner.pan),
                    (this._volume = this.output = new t.Volume(e.volume)),
                    (this.volume = this._volume.volume),
                    this._panner.connect(this._volume),
                    (this.mute = e.mute),
                    this._readOnly(["pan", "volume"])
                }),
                t.extend(t.PanVol, t.AudioNode),
                (t.PanVol.defaults = { pan: 0, volume: 0, mute: !1 }),
                Object.defineProperty(t.PanVol.prototype, "mute", {
                  get: function () {
                    return this._volume.mute
                  },
                  set: function (t) {
                    this._volume.mute = t
                  },
                }),
                (t.PanVol.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._writable(["pan", "volume"]),
                    this._panner.dispose(),
                    (this._panner = null),
                    (this.pan = null),
                    this._volume.dispose(),
                    (this._volume = null),
                    (this.volume = null),
                    this
                  )
                }),
                t.PanVol
              )
            }),
            e(function (t) {
              return (
                (t.Solo = function () {
                  var e = t.defaults(arguments, ["solo"], t.Solo)
                  t.AudioNode.call(this),
                    (this.input = this.output = new t.Gain()),
                    (this._soloBind = this._soloed.bind(this)),
                    this.context.on("solo", this._soloBind),
                    (this.solo = e.solo)
                }),
                t.extend(t.Solo, t.AudioNode),
                (t.Solo.defaults = { solo: !1 }),
                Object.defineProperty(t.Solo.prototype, "solo", {
                  get: function () {
                    return this._isSoloed()
                  },
                  set: function (t) {
                    t ? this._addSolo() : this._removeSolo(),
                      this.context.emit("solo", this)
                  },
                }),
                Object.defineProperty(t.Solo.prototype, "muted", {
                  get: function () {
                    return 0 === this.input.gain.value
                  },
                }),
                (t.Solo.prototype._addSolo = function () {
                  t.isArray(this.context._currentSolo) ||
                    (this.context._currentSolo = []),
                    this._isSoloed() || this.context._currentSolo.push(this)
                }),
                (t.Solo.prototype._removeSolo = function () {
                  if (this._isSoloed()) {
                    var t = this.context._currentSolo.indexOf(this)
                    this.context._currentSolo.splice(t, 1)
                  }
                }),
                (t.Solo.prototype._isSoloed = function () {
                  return (
                    !!t.isArray(this.context._currentSolo) &&
                    0 !== this.context._currentSolo.length &&
                    -1 !== this.context._currentSolo.indexOf(this)
                  )
                }),
                (t.Solo.prototype._noSolos = function () {
                  return (
                    !t.isArray(this.context._currentSolo) ||
                    0 === this.context._currentSolo.length
                  )
                }),
                (t.Solo.prototype._soloed = function () {
                  this._isSoloed()
                    ? (this.input.gain.value = 1)
                    : this._noSolos()
                    ? (this.input.gain.value = 1)
                    : (this.input.gain.value = 0)
                }),
                (t.Solo.prototype.dispose = function () {
                  return (
                    this.context.off("solo", this._soloBind),
                    this._removeSolo(),
                    (this._soloBind = null),
                    t.AudioNode.prototype.dispose.call(this),
                    this
                  )
                }),
                t.Solo
              )
            }),
            e(function (t) {
              return (
                (t.Waveform = function () {
                  var e = t.defaults(arguments, ["size"], t.Waveform)
                  ;(e.type = t.Analyser.Type.Waveform),
                    t.AudioNode.call(this),
                    (this._analyser =
                      this.input =
                      this.output =
                        new t.Analyser(e))
                }),
                t.extend(t.Waveform, t.AudioNode),
                (t.Waveform.defaults = { size: 1024 }),
                (t.Waveform.prototype.getValue = function () {
                  return this._analyser.getValue()
                }),
                Object.defineProperty(t.Waveform.prototype, "size", {
                  get: function () {
                    return this._analyser.size
                  },
                  set: function (t) {
                    this._analyser.size = t
                  },
                }),
                (t.Waveform.prototype.dispose = function () {
                  t.AudioNode.prototype.dispose.call(this),
                    this._analyser.dispose(),
                    (this._analyser = null)
                }),
                t.Waveform
              )
            }),
            e(function (t) {
              return (
                (t.CtrlInterpolate = function () {
                  var e = t.defaults(
                    arguments,
                    ["values", "index"],
                    t.CtrlInterpolate,
                  )
                  t.call(this), (this.values = e.values), (this.index = e.index)
                }),
                t.extend(t.CtrlInterpolate),
                (t.CtrlInterpolate.defaults = { index: 0, values: [] }),
                Object.defineProperty(t.CtrlInterpolate.prototype, "value", {
                  get: function () {
                    var t = this.index
                    t = Math.min(t, this.values.length - 1)
                    var e = Math.floor(t),
                      i = this.values[e],
                      n = this.values[Math.ceil(t)]
                    return this._interpolate(t - e, i, n)
                  },
                }),
                (t.CtrlInterpolate.prototype._interpolate = function (e, i, n) {
                  if (t.isArray(i)) {
                    for (var s = [], o = 0; o < i.length; o++)
                      s[o] = this._interpolate(e, i[o], n[o])
                    return s
                  }
                  if (t.isObject(i)) {
                    var r = {}
                    for (var a in i) r[a] = this._interpolate(e, i[a], n[a])
                    return r
                  }
                  return (
                    (1 - e) * (i = this._toNumber(i)) +
                    e * (n = this._toNumber(n))
                  )
                }),
                (t.CtrlInterpolate.prototype._toNumber = function (e) {
                  return t.isNumber(e) ? e : this.toSeconds(e)
                }),
                (t.CtrlInterpolate.prototype.dispose = function () {
                  this.values = null
                }),
                t.CtrlInterpolate
              )
            }),
            e(function (t) {
              return (
                (t.CtrlMarkov = function (e, i) {
                  t.call(this),
                    (this.values = t.defaultArg(e, {})),
                    (this.value = t.defaultArg(i, Object.keys(this.values)[0]))
                }),
                t.extend(t.CtrlMarkov),
                (t.CtrlMarkov.prototype.next = function () {
                  if (this.values.hasOwnProperty(this.value)) {
                    var e = this.values[this.value]
                    if (t.isArray(e))
                      for (
                        var i = this._getProbDistribution(e),
                          n = Math.random(),
                          s = 0,
                          o = 0;
                        o < i.length;
                        o++
                      ) {
                        var r = i[o]
                        if (n > s && n < s + r) {
                          var a = e[o]
                          t.isObject(a)
                            ? (this.value = a.value)
                            : (this.value = a)
                        }
                        s += r
                      }
                    else this.value = e
                  }
                  return this.value
                }),
                (t.CtrlMarkov.prototype._getProbDistribution = function (e) {
                  for (var i = [], n = 0, s = !1, o = 0; o < e.length; o++) {
                    var r = e[o]
                    t.isObject(r)
                      ? ((s = !0), (i[o] = r.probability))
                      : (i[o] = 1 / e.length),
                      (n += i[o])
                  }
                  if (s) for (var a = 0; a < i.length; a++) i[a] = i[a] / n
                  return i
                }),
                (t.CtrlMarkov.prototype.dispose = function () {
                  this.values = null
                }),
                t.CtrlMarkov
              )
            }),
            e(function (t) {
              return (
                (t.CtrlPattern = function () {
                  var e = t.defaults(
                    arguments,
                    ["values", "type"],
                    t.CtrlPattern,
                  )
                  t.call(this),
                    (this.values = e.values),
                    (this.index = 0),
                    (this._type = null),
                    (this._shuffled = null),
                    (this._direction = null),
                    (this.type = e.type)
                }),
                t.extend(t.CtrlPattern),
                (t.CtrlPattern.Type = {
                  Up: "up",
                  Down: "down",
                  UpDown: "upDown",
                  DownUp: "downUp",
                  AlternateUp: "alternateUp",
                  AlternateDown: "alternateDown",
                  Random: "random",
                  RandomWalk: "randomWalk",
                  RandomOnce: "randomOnce",
                }),
                (t.CtrlPattern.defaults = {
                  type: t.CtrlPattern.Type.Up,
                  values: [],
                }),
                Object.defineProperty(t.CtrlPattern.prototype, "value", {
                  get: function () {
                    if (0 !== this.values.length) {
                      if (1 === this.values.length) return this.values[0]
                      this.index = Math.min(this.index, this.values.length - 1)
                      var e = this.values[this.index]
                      return (
                        this.type === t.CtrlPattern.Type.RandomOnce &&
                          (this.values.length !== this._shuffled.length &&
                            this._shuffleValues(),
                          (e = this.values[this._shuffled[this.index]])),
                        e
                      )
                    }
                  },
                }),
                Object.defineProperty(t.CtrlPattern.prototype, "type", {
                  get: function () {
                    return this._type
                  },
                  set: function (e) {
                    ;(this._type = e),
                      (this._shuffled = null),
                      this._type === t.CtrlPattern.Type.Up ||
                      this._type === t.CtrlPattern.Type.UpDown ||
                      this._type === t.CtrlPattern.Type.RandomOnce ||
                      this._type === t.CtrlPattern.Type.AlternateUp
                        ? (this.index = 0)
                        : (this._type !== t.CtrlPattern.Type.Down &&
                            this._type !== t.CtrlPattern.Type.DownUp &&
                            this._type !== t.CtrlPattern.Type.AlternateDown) ||
                          (this.index = this.values.length - 1),
                      this._type === t.CtrlPattern.Type.UpDown ||
                      this._type === t.CtrlPattern.Type.AlternateUp
                        ? (this._direction = t.CtrlPattern.Type.Up)
                        : (this._type !== t.CtrlPattern.Type.DownUp &&
                            this._type !== t.CtrlPattern.Type.AlternateDown) ||
                          (this._direction = t.CtrlPattern.Type.Down),
                      this._type === t.CtrlPattern.Type.RandomOnce
                        ? this._shuffleValues()
                        : this._type === t.CtrlPattern.Random &&
                          (this.index = Math.floor(
                            Math.random() * this.values.length,
                          ))
                  },
                }),
                (t.CtrlPattern.prototype.next = function () {
                  var e = this.type
                  return (
                    e === t.CtrlPattern.Type.Up
                      ? (this.index++,
                        this.index >= this.values.length && (this.index = 0))
                      : e === t.CtrlPattern.Type.Down
                      ? (this.index--,
                        this.index < 0 && (this.index = this.values.length - 1))
                      : e === t.CtrlPattern.Type.UpDown ||
                        e === t.CtrlPattern.Type.DownUp
                      ? (this._direction === t.CtrlPattern.Type.Up
                          ? this.index++
                          : this.index--,
                        this.index < 0
                          ? ((this.index = 1),
                            (this._direction = t.CtrlPattern.Type.Up))
                          : this.index >= this.values.length &&
                            ((this.index = this.values.length - 2),
                            (this._direction = t.CtrlPattern.Type.Down)))
                      : e === t.CtrlPattern.Type.Random
                      ? (this.index = Math.floor(
                          Math.random() * this.values.length,
                        ))
                      : e === t.CtrlPattern.Type.RandomWalk
                      ? Math.random() < 0.5
                        ? (this.index--, (this.index = Math.max(this.index, 0)))
                        : (this.index++,
                          (this.index = Math.min(
                            this.index,
                            this.values.length - 1,
                          )))
                      : e === t.CtrlPattern.Type.RandomOnce
                      ? (this.index++,
                        this.index >= this.values.length &&
                          ((this.index = 0), this._shuffleValues()))
                      : e === t.CtrlPattern.Type.AlternateUp
                      ? (this._direction === t.CtrlPattern.Type.Up
                          ? ((this.index += 2),
                            (this._direction = t.CtrlPattern.Type.Down))
                          : ((this.index -= 1),
                            (this._direction = t.CtrlPattern.Type.Up)),
                        this.index >= this.values.length &&
                          ((this.index = 0),
                          (this._direction = t.CtrlPattern.Type.Up)))
                      : e === t.CtrlPattern.Type.AlternateDown &&
                        (this._direction === t.CtrlPattern.Type.Up
                          ? ((this.index += 1),
                            (this._direction = t.CtrlPattern.Type.Down))
                          : ((this.index -= 2),
                            (this._direction = t.CtrlPattern.Type.Up)),
                        this.index < 0 &&
                          ((this.index = this.values.length - 1),
                          (this._direction = t.CtrlPattern.Type.Down))),
                    this.value
                  )
                }),
                (t.CtrlPattern.prototype._shuffleValues = function () {
                  var t = []
                  this._shuffled = []
                  for (var e = 0; e < this.values.length; e++) t[e] = e
                  for (; t.length > 0; ) {
                    var i = t.splice(Math.floor(t.length * Math.random()), 1)
                    this._shuffled.push(i[0])
                  }
                }),
                (t.CtrlPattern.prototype.dispose = function () {
                  ;(this._shuffled = null), (this.values = null)
                }),
                t.CtrlPattern
              )
            }),
            e(function (t) {
              return (
                (t.CtrlRandom = function () {
                  var e = t.defaults(arguments, ["min", "max"], t.CtrlRandom)
                  t.call(this),
                    (this.min = e.min),
                    (this.max = e.max),
                    (this.integer = e.integer)
                }),
                t.extend(t.CtrlRandom),
                (t.CtrlRandom.defaults = { min: 0, max: 1, integer: !1 }),
                Object.defineProperty(t.CtrlRandom.prototype, "value", {
                  get: function () {
                    var t = this.toSeconds(this.min),
                      e = this.toSeconds(this.max),
                      i = Math.random(),
                      n = i * t + (1 - i) * e
                    return this.integer && (n = Math.floor(n)), n
                  },
                }),
                t.CtrlRandom
              )
            }),
            e(function (t) {
              return (
                (t.Buffers = function (e) {
                  var i = Array.prototype.slice.call(arguments)
                  i.shift()
                  var n = t.defaults(i, ["onload", "baseUrl"], t.Buffers)
                  for (var s in (t.call(this),
                  (this._buffers = {}),
                  (this.baseUrl = n.baseUrl),
                  (this._loadingCount = 0),
                  e))
                    this._loadingCount++,
                      this.add(s, e[s], this._bufferLoaded.bind(this, n.onload))
                }),
                t.extend(t.Buffers),
                (t.Buffers.defaults = { onload: t.noOp, baseUrl: "" }),
                (t.Buffers.prototype.has = function (t) {
                  return this._buffers.hasOwnProperty(t)
                }),
                (t.Buffers.prototype.get = function (t) {
                  if (this.has(t)) return this._buffers[t]
                  throw new Error("Tone.Buffers: no buffer named " + t)
                }),
                (t.Buffers.prototype._bufferLoaded = function (t) {
                  this._loadingCount--, 0 === this._loadingCount && t && t(this)
                }),
                Object.defineProperty(t.Buffers.prototype, "loaded", {
                  get: function () {
                    var t = !0
                    for (var e in this._buffers) {
                      var i = this.get(e)
                      t = t && i.loaded
                    }
                    return t
                  },
                }),
                (t.Buffers.prototype.add = function (e, i, n) {
                  return (
                    (n = t.defaultArg(n, t.noOp)),
                    i instanceof t.Buffer
                      ? ((this._buffers[e] = i), n(this))
                      : i instanceof AudioBuffer
                      ? ((this._buffers[e] = new t.Buffer(i)), n(this))
                      : t.isString(i) &&
                        (this._buffers[e] = new t.Buffer(this.baseUrl + i, n)),
                    this
                  )
                }),
                (t.Buffers.prototype.dispose = function () {
                  for (var e in (t.prototype.dispose.call(this), this._buffers))
                    this._buffers[e].dispose()
                  return (this._buffers = null), this
                }),
                t.Buffers
              )
            }),
            e(function (t) {
              var e = {}
              return (
                (t.prototype.send = function (i, n) {
                  e.hasOwnProperty(i) || (e[i] = this.context.createGain()),
                    (n = t.defaultArg(n, 0))
                  var s = new t.Gain(n, t.Type.Decibels)
                  return this.connect(s), s.connect(e[i]), s
                }),
                (t.prototype.receive = function (t, i) {
                  return (
                    e.hasOwnProperty(t) || (e[t] = this.context.createGain()),
                    e[t].connect(this, 0, i),
                    this
                  )
                }),
                t.Context.on("init", function (t) {
                  t.Buses ? (e = t.Buses) : ((e = {}), (t.Buses = e))
                }),
                t
              )
            }),
            e(function (t) {
              return (
                (t.Draw = function () {
                  t.call(this),
                    (this._events = new t.Timeline()),
                    (this.expiration = 0.25),
                    (this.anticipation = 0.008),
                    (this._boundDrawLoop = this._drawLoop.bind(this))
                }),
                t.extend(t.Draw),
                (t.Draw.prototype.schedule = function (t, e) {
                  return (
                    this._events.add({ callback: t, time: this.toSeconds(e) }),
                    1 === this._events.length &&
                      requestAnimationFrame(this._boundDrawLoop),
                    this
                  )
                }),
                (t.Draw.prototype.cancel = function (t) {
                  return this._events.cancel(this.toSeconds(t)), this
                }),
                (t.Draw.prototype._drawLoop = function () {
                  for (
                    var e = t.now();
                    this._events.length &&
                    this._events.peek().time - this.anticipation <= e;

                  ) {
                    var i = this._events.shift()
                    e - i.time <= this.expiration && i.callback()
                  }
                  this._events.length > 0 &&
                    requestAnimationFrame(this._boundDrawLoop)
                }),
                (t.Draw = new t.Draw()),
                t.Draw
              )
            }),
            e(function (t) {
              ;(t.Listener = function () {
                t.call(this),
                  (this._orientation = [0, 0, 0, 0, 0, 0]),
                  (this._position = [0, 0, 0]),
                  t.getContext(
                    function () {
                      this.set(e.defaults)
                    }.bind(this),
                  )
              }),
                t.extend(t.Listener),
                (t.Listener.defaults = {
                  positionX: 0,
                  positionY: 0,
                  positionZ: 0,
                  forwardX: 0,
                  forwardY: 0,
                  forwardZ: 1,
                  upX: 0,
                  upY: 1,
                  upZ: 0,
                }),
                (t.Listener.prototype._rampTimeConstant = 0.01),
                (t.Listener.prototype.setPosition = function (t, e, i) {
                  if (this.context.listener.positionX) {
                    var n = this.now()
                    this.context.listener.positionX.setTargetAtTime(
                      t,
                      n,
                      this._rampTimeConstant,
                    ),
                      this.context.listener.positionY.setTargetAtTime(
                        e,
                        n,
                        this._rampTimeConstant,
                      ),
                      this.context.listener.positionZ.setTargetAtTime(
                        i,
                        n,
                        this._rampTimeConstant,
                      )
                  } else this.context.listener.setPosition(t, e, i)
                  return (
                    (this._position = Array.prototype.slice.call(arguments)),
                    this
                  )
                }),
                (t.Listener.prototype.setOrientation = function (
                  t,
                  e,
                  i,
                  n,
                  s,
                  o,
                ) {
                  if (this.context.listener.forwardX) {
                    var r = this.now()
                    this.context.listener.forwardX.setTargetAtTime(
                      t,
                      r,
                      this._rampTimeConstant,
                    ),
                      this.context.listener.forwardY.setTargetAtTime(
                        e,
                        r,
                        this._rampTimeConstant,
                      ),
                      this.context.listener.forwardZ.setTargetAtTime(
                        i,
                        r,
                        this._rampTimeConstant,
                      ),
                      this.context.listener.upX.setTargetAtTime(
                        n,
                        r,
                        this._rampTimeConstant,
                      ),
                      this.context.listener.upY.setTargetAtTime(
                        s,
                        r,
                        this._rampTimeConstant,
                      ),
                      this.context.listener.upZ.setTargetAtTime(
                        o,
                        r,
                        this._rampTimeConstant,
                      )
                  } else this.context.listener.setOrientation(t, e, i, n, s, o)
                  return (
                    (this._orientation = Array.prototype.slice.call(arguments)),
                    this
                  )
                }),
                Object.defineProperty(t.Listener.prototype, "positionX", {
                  set: function (t) {
                    ;(this._position[0] = t),
                      this.setPosition.apply(this, this._position)
                  },
                  get: function () {
                    return this._position[0]
                  },
                }),
                Object.defineProperty(t.Listener.prototype, "positionY", {
                  set: function (t) {
                    ;(this._position[1] = t),
                      this.setPosition.apply(this, this._position)
                  },
                  get: function () {
                    return this._position[1]
                  },
                }),
                Object.defineProperty(t.Listener.prototype, "positionZ", {
                  set: function (t) {
                    ;(this._position[2] = t),
                      this.setPosition.apply(this, this._position)
                  },
                  get: function () {
                    return this._position[2]
                  },
                }),
                Object.defineProperty(t.Listener.prototype, "forwardX", {
                  set: function (t) {
                    ;(this._orientation[0] = t),
                      this.setOrientation.apply(this, this._orientation)
                  },
                  get: function () {
                    return this._orientation[0]
                  },
                }),
                Object.defineProperty(t.Listener.prototype, "forwardY", {
                  set: function (t) {
                    ;(this._orientation[1] = t),
                      this.setOrientation.apply(this, this._orientation)
                  },
                  get: function () {
                    return this._orientation[1]
                  },
                }),
                Object.defineProperty(t.Listener.prototype, "forwardZ", {
                  set: function (t) {
                    ;(this._orientation[2] = t),
                      this.setOrientation.apply(this, this._orientation)
                  },
                  get: function () {
                    return this._orientation[2]
                  },
                }),
                Object.defineProperty(t.Listener.prototype, "upX", {
                  set: function (t) {
                    ;(this._orientation[3] = t),
                      this.setOrientation.apply(this, this._orientation)
                  },
                  get: function () {
                    return this._orientation[3]
                  },
                }),
                Object.defineProperty(t.Listener.prototype, "upY", {
                  set: function (t) {
                    ;(this._orientation[4] = t),
                      this.setOrientation.apply(this, this._orientation)
                  },
                  get: function () {
                    return this._orientation[4]
                  },
                }),
                Object.defineProperty(t.Listener.prototype, "upZ", {
                  set: function (t) {
                    ;(this._orientation[5] = t),
                      this.setOrientation.apply(this, this._orientation)
                  },
                  get: function () {
                    return this._orientation[5]
                  },
                }),
                (t.Listener.prototype.dispose = function () {
                  return (
                    (this._orientation = null), (this._position = null), this
                  )
                })
              var e = t.Listener
              return (
                (t.Listener = new e()),
                t.Context.on("init", function (i) {
                  i.Listener instanceof e
                    ? (t.Listener = i.Listener)
                    : (t.Listener = new e()),
                    (i.Listener = t.Listener)
                }),
                t.Listener
              )
            }),
            e(function (t) {
              return (
                (t.Offline = function (e, i) {
                  var n,
                    s = t.context.sampleRate,
                    o = t.context,
                    r = (function e(i, n, s, o) {
                      o = t.defaultArg(o, 0)
                      var r = new t.OfflineContext(2, n, s)
                      t.context = r
                      var a = i(t.Transport)
                      return r.currentTime > 0 && o < 1e3
                        ? e(i, n, s, ++o)
                        : { response: a, context: r }
                    })(e, i, s),
                    a = r.response,
                    u = r.context
                  return (
                    (n =
                      a instanceof Promise
                        ? a.then(function () {
                            return u.render()
                          })
                        : u.render()),
                    (t.context = o),
                    n.then(function (e) {
                      return new t.Buffer(e)
                    })
                  )
                }),
                t.Offline
              )
            }),
            e(function (t) {
              return (
                (t.Effect = function () {
                  var e = t.defaults(arguments, ["wet"], t.Effect)
                  t.AudioNode.call(this),
                    this.createInsOuts(1, 1),
                    (this._dryWet = new t.CrossFade(e.wet)),
                    (this.wet = this._dryWet.fade),
                    (this.effectSend = new t.Gain()),
                    (this.effectReturn = new t.Gain()),
                    this.input.connect(this._dryWet.a),
                    this.input.connect(this.effectSend),
                    this.effectReturn.connect(this._dryWet.b),
                    this._dryWet.connect(this.output),
                    this._readOnly(["wet"])
                }),
                t.extend(t.Effect, t.AudioNode),
                (t.Effect.defaults = { wet: 1 }),
                (t.Effect.prototype.connectEffect = function (t) {
                  return this.effectSend.chain(t, this.effectReturn), this
                }),
                (t.Effect.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._dryWet.dispose(),
                    (this._dryWet = null),
                    this.effectSend.dispose(),
                    (this.effectSend = null),
                    this.effectReturn.dispose(),
                    (this.effectReturn = null),
                    this._writable(["wet"]),
                    (this.wet = null),
                    this
                  )
                }),
                t.Effect
              )
            }),
            e(function (t) {
              return (
                (t.AutoFilter = function () {
                  var e = t.defaults(
                    arguments,
                    ["frequency", "baseFrequency", "octaves"],
                    t.AutoFilter,
                  )
                  t.Effect.call(this, e),
                    (this._lfo = new t.LFO({
                      frequency: e.frequency,
                      amplitude: e.depth,
                    })),
                    (this.depth = this._lfo.amplitude),
                    (this.frequency = this._lfo.frequency),
                    (this.filter = new t.Filter(e.filter)),
                    (this._octaves = 0),
                    this.connectEffect(this.filter),
                    this._lfo.connect(this.filter.frequency),
                    (this.type = e.type),
                    this._readOnly(["frequency", "depth"]),
                    (this.octaves = e.octaves),
                    (this.baseFrequency = e.baseFrequency)
                }),
                t.extend(t.AutoFilter, t.Effect),
                (t.AutoFilter.defaults = {
                  frequency: 1,
                  type: "sine",
                  depth: 1,
                  baseFrequency: 200,
                  octaves: 2.6,
                  filter: { type: "lowpass", rolloff: -12, Q: 1 },
                }),
                (t.AutoFilter.prototype.start = function (t) {
                  return this._lfo.start(t), this
                }),
                (t.AutoFilter.prototype.stop = function (t) {
                  return this._lfo.stop(t), this
                }),
                (t.AutoFilter.prototype.sync = function (t) {
                  return this._lfo.sync(t), this
                }),
                (t.AutoFilter.prototype.unsync = function () {
                  return this._lfo.unsync(), this
                }),
                Object.defineProperty(t.AutoFilter.prototype, "type", {
                  get: function () {
                    return this._lfo.type
                  },
                  set: function (t) {
                    this._lfo.type = t
                  },
                }),
                Object.defineProperty(t.AutoFilter.prototype, "baseFrequency", {
                  get: function () {
                    return this._lfo.min
                  },
                  set: function (t) {
                    ;(this._lfo.min = this.toFrequency(t)),
                      (this.octaves = this._octaves)
                  },
                }),
                Object.defineProperty(t.AutoFilter.prototype, "octaves", {
                  get: function () {
                    return this._octaves
                  },
                  set: function (t) {
                    ;(this._octaves = t),
                      (this._lfo.max = this.baseFrequency * Math.pow(2, t))
                  },
                }),
                (t.AutoFilter.prototype.dispose = function () {
                  return (
                    t.Effect.prototype.dispose.call(this),
                    this._lfo.dispose(),
                    (this._lfo = null),
                    this.filter.dispose(),
                    (this.filter = null),
                    this._writable(["frequency", "depth"]),
                    (this.frequency = null),
                    (this.depth = null),
                    this
                  )
                }),
                t.AutoFilter
              )
            }),
            e(function (t) {
              return (
                (t.AutoPanner = function () {
                  var e = t.defaults(arguments, ["frequency"], t.AutoPanner)
                  t.Effect.call(this, e),
                    (this._lfo = new t.LFO({
                      frequency: e.frequency,
                      amplitude: e.depth,
                      min: -1,
                      max: 1,
                    })),
                    (this.depth = this._lfo.amplitude),
                    (this._panner = new t.Panner()),
                    (this.frequency = this._lfo.frequency),
                    this.connectEffect(this._panner),
                    this._lfo.connect(this._panner.pan),
                    (this.type = e.type),
                    this._readOnly(["depth", "frequency"])
                }),
                t.extend(t.AutoPanner, t.Effect),
                (t.AutoPanner.defaults = {
                  frequency: 1,
                  type: "sine",
                  depth: 1,
                }),
                (t.AutoPanner.prototype.start = function (t) {
                  return this._lfo.start(t), this
                }),
                (t.AutoPanner.prototype.stop = function (t) {
                  return this._lfo.stop(t), this
                }),
                (t.AutoPanner.prototype.sync = function (t) {
                  return this._lfo.sync(t), this
                }),
                (t.AutoPanner.prototype.unsync = function () {
                  return this._lfo.unsync(), this
                }),
                Object.defineProperty(t.AutoPanner.prototype, "type", {
                  get: function () {
                    return this._lfo.type
                  },
                  set: function (t) {
                    this._lfo.type = t
                  },
                }),
                (t.AutoPanner.prototype.dispose = function () {
                  return (
                    t.Effect.prototype.dispose.call(this),
                    this._lfo.dispose(),
                    (this._lfo = null),
                    this._panner.dispose(),
                    (this._panner = null),
                    this._writable(["depth", "frequency"]),
                    (this.frequency = null),
                    (this.depth = null),
                    this
                  )
                }),
                t.AutoPanner
              )
            }),
            e(function (t) {
              return (
                (t.AutoWah = function () {
                  var e = t.defaults(
                    arguments,
                    ["baseFrequency", "octaves", "sensitivity"],
                    t.AutoWah,
                  )
                  t.Effect.call(this, e),
                    (this.follower = new t.Follower(e.follower)),
                    (this._sweepRange = new t.ScaleExp(0, 1, 0.5)),
                    (this._baseFrequency = e.baseFrequency),
                    (this._octaves = e.octaves),
                    (this._inputBoost = new t.Gain()),
                    (this._bandpass = new t.Filter({
                      rolloff: -48,
                      frequency: 0,
                      Q: e.Q,
                    })),
                    (this._peaking = new t.Filter(0, "peaking")),
                    (this._peaking.gain.value = e.gain),
                    (this.gain = this._peaking.gain),
                    (this.Q = this._bandpass.Q),
                    this.effectSend.chain(
                      this._inputBoost,
                      this.follower,
                      this._sweepRange,
                    ),
                    this._sweepRange.connect(this._bandpass.frequency),
                    this._sweepRange.connect(this._peaking.frequency),
                    this.effectSend.chain(
                      this._bandpass,
                      this._peaking,
                      this.effectReturn,
                    ),
                    this._setSweepRange(),
                    (this.sensitivity = e.sensitivity),
                    this._readOnly(["gain", "Q"])
                }),
                t.extend(t.AutoWah, t.Effect),
                (t.AutoWah.defaults = {
                  baseFrequency: 100,
                  octaves: 6,
                  sensitivity: 0,
                  Q: 2,
                  gain: 2,
                  follower: { attack: 0.3, release: 0.5 },
                }),
                Object.defineProperty(t.AutoWah.prototype, "octaves", {
                  get: function () {
                    return this._octaves
                  },
                  set: function (t) {
                    ;(this._octaves = t), this._setSweepRange()
                  },
                }),
                Object.defineProperty(t.AutoWah.prototype, "baseFrequency", {
                  get: function () {
                    return this._baseFrequency
                  },
                  set: function (t) {
                    ;(this._baseFrequency = t), this._setSweepRange()
                  },
                }),
                Object.defineProperty(t.AutoWah.prototype, "sensitivity", {
                  get: function () {
                    return t.gainToDb(1 / this._inputBoost.gain.value)
                  },
                  set: function (e) {
                    this._inputBoost.gain.value = 1 / t.dbToGain(e)
                  },
                }),
                (t.AutoWah.prototype._setSweepRange = function () {
                  ;(this._sweepRange.min = this._baseFrequency),
                    (this._sweepRange.max = Math.min(
                      this._baseFrequency * Math.pow(2, this._octaves),
                      this.context.sampleRate / 2,
                    ))
                }),
                (t.AutoWah.prototype.dispose = function () {
                  return (
                    t.Effect.prototype.dispose.call(this),
                    this.follower.dispose(),
                    (this.follower = null),
                    this._sweepRange.dispose(),
                    (this._sweepRange = null),
                    this._bandpass.dispose(),
                    (this._bandpass = null),
                    this._peaking.dispose(),
                    (this._peaking = null),
                    this._inputBoost.dispose(),
                    (this._inputBoost = null),
                    this._writable(["gain", "Q"]),
                    (this.gain = null),
                    (this.Q = null),
                    this
                  )
                }),
                t.AutoWah
              )
            }),
            e(function (t) {
              return (
                (t.Modulo = function (e) {
                  t.SignalBase.call(this),
                    this.createInsOuts(1, 0),
                    (this._shaper = new t.WaveShaper(Math.pow(2, 16))),
                    (this._multiply = new t.Multiply()),
                    (this._subtract = this.output = new t.Subtract()),
                    (this._modSignal = new t.Signal(e)),
                    this.input.fan(this._shaper, this._subtract),
                    this._modSignal.connect(this._multiply, 0, 0),
                    this._shaper.connect(this._multiply, 0, 1),
                    this._multiply.connect(this._subtract, 0, 1),
                    this._setWaveShaper(e)
                }),
                t.extend(t.Modulo, t.SignalBase),
                (t.Modulo.prototype._setWaveShaper = function (t) {
                  this._shaper.setMap(function (e) {
                    return Math.floor((e + 1e-4) / t)
                  })
                }),
                Object.defineProperty(t.Modulo.prototype, "value", {
                  get: function () {
                    return this._modSignal.value
                  },
                  set: function (t) {
                    ;(this._modSignal.value = t), this._setWaveShaper(t)
                  },
                }),
                (t.Modulo.prototype.dispose = function () {
                  return (
                    t.SignalBase.prototype.dispose.call(this),
                    this._shaper.dispose(),
                    (this._shaper = null),
                    this._multiply.dispose(),
                    (this._multiply = null),
                    this._subtract.dispose(),
                    (this._subtract = null),
                    this._modSignal.dispose(),
                    (this._modSignal = null),
                    this
                  )
                }),
                t.Modulo
              )
            }),
            e(function (t) {
              return (
                (t.BitCrusher = function () {
                  var e = t.defaults(arguments, ["bits"], t.BitCrusher)
                  t.Effect.call(this, e)
                  var i = 1 / Math.pow(2, e.bits - 1)
                  ;(this._subtract = new t.Subtract()),
                    (this._modulo = new t.Modulo(i)),
                    (this._bits = e.bits),
                    this.effectSend.fan(this._subtract, this._modulo),
                    this._modulo.connect(this._subtract, 0, 1),
                    this._subtract.connect(this.effectReturn)
                }),
                t.extend(t.BitCrusher, t.Effect),
                (t.BitCrusher.defaults = { bits: 4 }),
                Object.defineProperty(t.BitCrusher.prototype, "bits", {
                  get: function () {
                    return this._bits
                  },
                  set: function (t) {
                    this._bits = t
                    var e = 1 / Math.pow(2, t - 1)
                    this._modulo.value = e
                  },
                }),
                (t.BitCrusher.prototype.dispose = function () {
                  return (
                    t.Effect.prototype.dispose.call(this),
                    this._subtract.dispose(),
                    (this._subtract = null),
                    this._modulo.dispose(),
                    (this._modulo = null),
                    this
                  )
                }),
                t.BitCrusher
              )
            }),
            e(function (t) {
              return (
                (t.Chebyshev = function () {
                  var e = t.defaults(arguments, ["order"], t.Chebyshev)
                  t.Effect.call(this, e),
                    (this._shaper = new t.WaveShaper(4096)),
                    (this._order = e.order),
                    this.connectEffect(this._shaper),
                    (this.order = e.order),
                    (this.oversample = e.oversample)
                }),
                t.extend(t.Chebyshev, t.Effect),
                (t.Chebyshev.defaults = { order: 1, oversample: "none" }),
                (t.Chebyshev.prototype._getCoefficient = function (t, e, i) {
                  return i.hasOwnProperty(e)
                    ? i[e]
                    : ((i[e] =
                        0 === e
                          ? 0
                          : 1 === e
                          ? t
                          : 2 * t * this._getCoefficient(t, e - 1, i) -
                            this._getCoefficient(t, e - 2, i)),
                      i[e])
                }),
                Object.defineProperty(t.Chebyshev.prototype, "order", {
                  get: function () {
                    return this._order
                  },
                  set: function (t) {
                    this._order = t
                    for (
                      var e = new Array(4096), i = e.length, n = 0;
                      n < i;
                      ++n
                    ) {
                      var s = (2 * n) / i - 1
                      e[n] = 0 === s ? 0 : this._getCoefficient(s, t, {})
                    }
                    this._shaper.curve = e
                  },
                }),
                Object.defineProperty(t.Chebyshev.prototype, "oversample", {
                  get: function () {
                    return this._shaper.oversample
                  },
                  set: function (t) {
                    this._shaper.oversample = t
                  },
                }),
                (t.Chebyshev.prototype.dispose = function () {
                  return (
                    t.Effect.prototype.dispose.call(this),
                    this._shaper.dispose(),
                    (this._shaper = null),
                    this
                  )
                }),
                t.Chebyshev
              )
            }),
            e(function (t) {
              return (
                (t.StereoEffect = function () {
                  t.AudioNode.call(this)
                  var e = t.defaults(arguments, ["wet"], t.Effect)
                  this.createInsOuts(1, 1),
                    (this._dryWet = new t.CrossFade(e.wet)),
                    (this.wet = this._dryWet.fade),
                    (this._split = new t.Split()),
                    (this.effectSendL = this._split.left),
                    (this.effectSendR = this._split.right),
                    (this._merge = new t.Merge()),
                    (this.effectReturnL = this._merge.left),
                    (this.effectReturnR = this._merge.right),
                    this.input.connect(this._split),
                    this.input.connect(this._dryWet, 0, 0),
                    this._merge.connect(this._dryWet, 0, 1),
                    this._dryWet.connect(this.output),
                    this._readOnly(["wet"])
                }),
                t.extend(t.StereoEffect, t.Effect),
                (t.StereoEffect.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._dryWet.dispose(),
                    (this._dryWet = null),
                    this._split.dispose(),
                    (this._split = null),
                    this._merge.dispose(),
                    (this._merge = null),
                    (this.effectSendL = null),
                    (this.effectSendR = null),
                    (this.effectReturnL = null),
                    (this.effectReturnR = null),
                    this._writable(["wet"]),
                    (this.wet = null),
                    this
                  )
                }),
                t.StereoEffect
              )
            }),
            e(function (t) {
              return (
                (t.Chorus = function () {
                  var e = t.defaults(
                    arguments,
                    ["frequency", "delayTime", "depth"],
                    t.Chorus,
                  )
                  t.StereoEffect.call(this, e),
                    (this._depth = e.depth),
                    (this._delayTime = e.delayTime / 1e3),
                    (this._lfoL = new t.LFO({
                      frequency: e.frequency,
                      min: 0,
                      max: 1,
                    })),
                    (this._lfoR = new t.LFO({
                      frequency: e.frequency,
                      min: 0,
                      max: 1,
                      phase: 180,
                    })),
                    (this._delayNodeL = new t.Delay()),
                    (this._delayNodeR = new t.Delay()),
                    (this.frequency = this._lfoL.frequency),
                    this.effectSendL.chain(
                      this._delayNodeL,
                      this.effectReturnL,
                    ),
                    this.effectSendR.chain(
                      this._delayNodeR,
                      this.effectReturnR,
                    ),
                    this.effectSendL.connect(this.effectReturnL),
                    this.effectSendR.connect(this.effectReturnR),
                    this._lfoL.connect(this._delayNodeL.delayTime),
                    this._lfoR.connect(this._delayNodeR.delayTime),
                    this._lfoL.start(),
                    this._lfoR.start(),
                    this._lfoL.frequency.connect(this._lfoR.frequency),
                    (this.depth = this._depth),
                    (this.frequency.value = e.frequency),
                    (this.type = e.type),
                    this._readOnly(["frequency"]),
                    (this.spread = e.spread)
                }),
                t.extend(t.Chorus, t.StereoEffect),
                (t.Chorus.defaults = {
                  frequency: 1.5,
                  delayTime: 3.5,
                  depth: 0.7,
                  type: "sine",
                  spread: 180,
                }),
                Object.defineProperty(t.Chorus.prototype, "depth", {
                  get: function () {
                    return this._depth
                  },
                  set: function (t) {
                    this._depth = t
                    var e = this._delayTime * t
                    ;(this._lfoL.min = Math.max(this._delayTime - e, 0)),
                      (this._lfoL.max = this._delayTime + e),
                      (this._lfoR.min = Math.max(this._delayTime - e, 0)),
                      (this._lfoR.max = this._delayTime + e)
                  },
                }),
                Object.defineProperty(t.Chorus.prototype, "delayTime", {
                  get: function () {
                    return 1e3 * this._delayTime
                  },
                  set: function (t) {
                    ;(this._delayTime = t / 1e3), (this.depth = this._depth)
                  },
                }),
                Object.defineProperty(t.Chorus.prototype, "type", {
                  get: function () {
                    return this._lfoL.type
                  },
                  set: function (t) {
                    ;(this._lfoL.type = t), (this._lfoR.type = t)
                  },
                }),
                Object.defineProperty(t.Chorus.prototype, "spread", {
                  get: function () {
                    return this._lfoR.phase - this._lfoL.phase
                  },
                  set: function (t) {
                    ;(this._lfoL.phase = 90 - t / 2),
                      (this._lfoR.phase = t / 2 + 90)
                  },
                }),
                (t.Chorus.prototype.dispose = function () {
                  return (
                    t.StereoEffect.prototype.dispose.call(this),
                    this._lfoL.dispose(),
                    (this._lfoL = null),
                    this._lfoR.dispose(),
                    (this._lfoR = null),
                    this._delayNodeL.dispose(),
                    (this._delayNodeL = null),
                    this._delayNodeR.dispose(),
                    (this._delayNodeR = null),
                    this._writable("frequency"),
                    (this.frequency = null),
                    this
                  )
                }),
                t.Chorus
              )
            }),
            e(function (t) {
              return (
                (t.Convolver = function () {
                  var e = t.defaults(arguments, ["url", "onload"], t.Convolver)
                  t.Effect.call(this, e),
                    (this._convolver = this.context.createConvolver()),
                    (this._buffer = new t.Buffer(
                      e.url,
                      function (t) {
                        ;(this._convolver.buffer = t.get()), e.onload()
                      }.bind(this),
                    )),
                    this.connectEffect(this._convolver)
                }),
                t.extend(t.Convolver, t.Effect),
                (t.Convolver.defaults = { onload: t.noOp }),
                Object.defineProperty(t.Convolver.prototype, "buffer", {
                  get: function () {
                    return this._buffer.get()
                  },
                  set: function (t) {
                    this._buffer.set(t),
                      (this._convolver.buffer = this._buffer.get())
                  },
                }),
                (t.Convolver.prototype.load = function (t, e) {
                  return this._buffer.load(
                    t,
                    function (t) {
                      ;(this.buffer = t), e && e()
                    }.bind(this),
                  )
                }),
                (t.Convolver.prototype.dispose = function () {
                  return (
                    t.Effect.prototype.dispose.call(this),
                    this._convolver.disconnect(),
                    (this._convolver = null),
                    this._buffer.dispose(),
                    (this._buffer = null),
                    this
                  )
                }),
                t.Convolver
              )
            }),
            e(function (t) {
              return (
                (t.Distortion = function () {
                  var e = t.defaults(arguments, ["distortion"], t.Distortion)
                  t.Effect.call(this, e),
                    (this._shaper = new t.WaveShaper(4096)),
                    (this._distortion = e.distortion),
                    this.connectEffect(this._shaper),
                    (this.distortion = e.distortion),
                    (this.oversample = e.oversample)
                }),
                t.extend(t.Distortion, t.Effect),
                (t.Distortion.defaults = {
                  distortion: 0.4,
                  oversample: "none",
                }),
                Object.defineProperty(t.Distortion.prototype, "distortion", {
                  get: function () {
                    return this._distortion
                  },
                  set: function (t) {
                    this._distortion = t
                    var e = 100 * t,
                      i = Math.PI / 180
                    this._shaper.setMap(function (t) {
                      return Math.abs(t) < 0.001
                        ? 0
                        : ((3 + e) * t * 20 * i) / (Math.PI + e * Math.abs(t))
                    })
                  },
                }),
                Object.defineProperty(t.Distortion.prototype, "oversample", {
                  get: function () {
                    return this._shaper.oversample
                  },
                  set: function (t) {
                    this._shaper.oversample = t
                  },
                }),
                (t.Distortion.prototype.dispose = function () {
                  return (
                    t.Effect.prototype.dispose.call(this),
                    this._shaper.dispose(),
                    (this._shaper = null),
                    this
                  )
                }),
                t.Distortion
              )
            }),
            e(function (t) {
              return (
                (t.FeedbackEffect = function () {
                  var e = t.defaults(arguments, ["feedback"], t.FeedbackEffect)
                  t.Effect.call(this, e),
                    (this._feedbackGain = new t.Gain(
                      e.feedback,
                      t.Type.NormalRange,
                    )),
                    (this.feedback = this._feedbackGain.gain),
                    this.effectReturn.chain(
                      this._feedbackGain,
                      this.effectSend,
                    ),
                    this._readOnly(["feedback"])
                }),
                t.extend(t.FeedbackEffect, t.Effect),
                (t.FeedbackEffect.defaults = { feedback: 0.125 }),
                (t.FeedbackEffect.prototype.dispose = function () {
                  return (
                    t.Effect.prototype.dispose.call(this),
                    this._writable(["feedback"]),
                    this._feedbackGain.dispose(),
                    (this._feedbackGain = null),
                    (this.feedback = null),
                    this
                  )
                }),
                t.FeedbackEffect
              )
            }),
            e(function (t) {
              return (
                (t.FeedbackDelay = function () {
                  var e = t.defaults(
                    arguments,
                    ["delayTime", "feedback"],
                    t.FeedbackDelay,
                  )
                  t.FeedbackEffect.call(this, e),
                    (this._delayNode = new t.Delay(e.delayTime, e.maxDelay)),
                    (this.delayTime = this._delayNode.delayTime),
                    this.connectEffect(this._delayNode),
                    this._readOnly(["delayTime"])
                }),
                t.extend(t.FeedbackDelay, t.FeedbackEffect),
                (t.FeedbackDelay.defaults = { delayTime: 0.25, maxDelay: 1 }),
                (t.FeedbackDelay.prototype.dispose = function () {
                  return (
                    t.FeedbackEffect.prototype.dispose.call(this),
                    this._delayNode.dispose(),
                    (this._delayNode = null),
                    this._writable(["delayTime"]),
                    (this.delayTime = null),
                    this
                  )
                }),
                t.FeedbackDelay
              )
            }),
            e(function (t) {
              var e = [
                  1557 / 44100,
                  1617 / 44100,
                  1491 / 44100,
                  1422 / 44100,
                  1277 / 44100,
                  1356 / 44100,
                  1188 / 44100,
                  1116 / 44100,
                ],
                i = [225, 556, 441, 341]
              return (
                (t.Freeverb = function () {
                  var n = t.defaults(
                    arguments,
                    ["roomSize", "dampening"],
                    t.Freeverb,
                  )
                  t.StereoEffect.call(this, n),
                    (this.roomSize = new t.Signal(
                      n.roomSize,
                      t.Type.NormalRange,
                    )),
                    (this.dampening = new t.Signal(
                      n.dampening,
                      t.Type.Frequency,
                    )),
                    (this._combFilters = []),
                    (this._allpassFiltersL = []),
                    (this._allpassFiltersR = [])
                  for (var s = 0; s < i.length; s++) {
                    var o = this.context.createBiquadFilter()
                    ;(o.type = "allpass"),
                      (o.frequency.value = i[s]),
                      this._allpassFiltersL.push(o)
                  }
                  for (var r = 0; r < i.length; r++) {
                    var a = this.context.createBiquadFilter()
                    ;(a.type = "allpass"),
                      (a.frequency.value = i[r]),
                      this._allpassFiltersR.push(a)
                  }
                  for (var u = 0; u < e.length; u++) {
                    var l = new t.LowpassCombFilter(e[u])
                    u < e.length / 2
                      ? this.effectSendL.chain(l, this._allpassFiltersL[0])
                      : this.effectSendR.chain(l, this._allpassFiltersR[0]),
                      this.roomSize.connect(l.resonance),
                      this.dampening.connect(l.dampening),
                      this._combFilters.push(l)
                  }
                  t.connectSeries.apply(t, this._allpassFiltersL),
                    t.connectSeries.apply(t, this._allpassFiltersR),
                    this._allpassFiltersL[
                      this._allpassFiltersL.length - 1
                    ].connect(this.effectReturnL),
                    this._allpassFiltersR[
                      this._allpassFiltersR.length - 1
                    ].connect(this.effectReturnR),
                    this._readOnly(["roomSize", "dampening"])
                }),
                t.extend(t.Freeverb, t.StereoEffect),
                (t.Freeverb.defaults = { roomSize: 0.7, dampening: 3e3 }),
                (t.Freeverb.prototype.dispose = function () {
                  t.StereoEffect.prototype.dispose.call(this)
                  for (var e = 0; e < this._allpassFiltersL.length; e++)
                    this._allpassFiltersL[e].disconnect(),
                      (this._allpassFiltersL[e] = null)
                  this._allpassFiltersL = null
                  for (var i = 0; i < this._allpassFiltersR.length; i++)
                    this._allpassFiltersR[i].disconnect(),
                      (this._allpassFiltersR[i] = null)
                  this._allpassFiltersR = null
                  for (var n = 0; n < this._combFilters.length; n++)
                    this._combFilters[n].dispose(),
                      (this._combFilters[n] = null)
                  return (
                    (this._combFilters = null),
                    this._writable(["roomSize", "dampening"]),
                    this.roomSize.dispose(),
                    (this.roomSize = null),
                    this.dampening.dispose(),
                    (this.dampening = null),
                    this
                  )
                }),
                t.Freeverb
              )
            }),
            e(function (t) {
              var e = [0.06748, 0.06404, 0.08212, 0.09004],
                i = [0.773, 0.802, 0.753, 0.733],
                n = [347, 113, 37]
              return (
                (t.JCReverb = function () {
                  var s = t.defaults(arguments, ["roomSize"], t.JCReverb)
                  t.StereoEffect.call(this, s),
                    (this.roomSize = new t.Signal(
                      s.roomSize,
                      t.Type.NormalRange,
                    )),
                    (this._scaleRoomSize = new t.Scale(-0.733, 0.197)),
                    (this._allpassFilters = []),
                    (this._feedbackCombFilters = [])
                  for (var o = 0; o < n.length; o++) {
                    var r = this.context.createBiquadFilter()
                    ;(r.type = "allpass"),
                      (r.frequency.value = n[o]),
                      this._allpassFilters.push(r)
                  }
                  for (var a = 0; a < e.length; a++) {
                    var u = new t.FeedbackCombFilter(e[a], 0.1)
                    this._scaleRoomSize.connect(u.resonance),
                      (u.resonance.value = i[a]),
                      this._allpassFilters[
                        this._allpassFilters.length - 1
                      ].connect(u),
                      a < e.length / 2
                        ? u.connect(this.effectReturnL)
                        : u.connect(this.effectReturnR),
                      this._feedbackCombFilters.push(u)
                  }
                  this.roomSize.connect(this._scaleRoomSize),
                    t.connectSeries.apply(t, this._allpassFilters),
                    this.effectSendL.connect(this._allpassFilters[0]),
                    this.effectSendR.connect(this._allpassFilters[0]),
                    this._readOnly(["roomSize"])
                }),
                t.extend(t.JCReverb, t.StereoEffect),
                (t.JCReverb.defaults = { roomSize: 0.5 }),
                (t.JCReverb.prototype.dispose = function () {
                  t.StereoEffect.prototype.dispose.call(this)
                  for (var e = 0; e < this._allpassFilters.length; e++)
                    this._allpassFilters[e].disconnect(),
                      (this._allpassFilters[e] = null)
                  this._allpassFilters = null
                  for (var i = 0; i < this._feedbackCombFilters.length; i++)
                    this._feedbackCombFilters[i].dispose(),
                      (this._feedbackCombFilters[i] = null)
                  return (
                    (this._feedbackCombFilters = null),
                    this._writable(["roomSize"]),
                    this.roomSize.dispose(),
                    (this.roomSize = null),
                    this._scaleRoomSize.dispose(),
                    (this._scaleRoomSize = null),
                    this
                  )
                }),
                t.JCReverb
              )
            }),
            e(function (t) {
              return (
                (t.MidSideEffect = function () {
                  t.Effect.apply(this, arguments),
                    (this._midSideSplit = new t.MidSideSplit()),
                    (this._midSideMerge = new t.MidSideMerge()),
                    (this.midSend = this._midSideSplit.mid),
                    (this.sideSend = this._midSideSplit.side),
                    (this.midReturn = this._midSideMerge.mid),
                    (this.sideReturn = this._midSideMerge.side),
                    this.effectSend.connect(this._midSideSplit),
                    this._midSideMerge.connect(this.effectReturn)
                }),
                t.extend(t.MidSideEffect, t.Effect),
                (t.MidSideEffect.prototype.dispose = function () {
                  return (
                    t.Effect.prototype.dispose.call(this),
                    this._midSideSplit.dispose(),
                    (this._midSideSplit = null),
                    this._midSideMerge.dispose(),
                    (this._midSideMerge = null),
                    (this.midSend = null),
                    (this.sideSend = null),
                    (this.midReturn = null),
                    (this.sideReturn = null),
                    this
                  )
                }),
                t.MidSideEffect
              )
            }),
            e(function (t) {
              return (
                (t.Phaser = function () {
                  var e = t.defaults(
                    arguments,
                    ["frequency", "octaves", "baseFrequency"],
                    t.Phaser,
                  )
                  t.StereoEffect.call(this, e),
                    (this._lfoL = new t.LFO(e.frequency, 0, 1)),
                    (this._lfoR = new t.LFO(e.frequency, 0, 1)),
                    (this._lfoR.phase = 180),
                    (this._baseFrequency = e.baseFrequency),
                    (this._octaves = e.octaves),
                    (this.Q = new t.Signal(e.Q, t.Type.Positive)),
                    (this._filtersL = this._makeFilters(
                      e.stages,
                      this._lfoL,
                      this.Q,
                    )),
                    (this._filtersR = this._makeFilters(
                      e.stages,
                      this._lfoR,
                      this.Q,
                    )),
                    (this.frequency = this._lfoL.frequency),
                    (this.frequency.value = e.frequency),
                    this.effectSendL.connect(this._filtersL[0]),
                    this.effectSendR.connect(this._filtersR[0]),
                    this._filtersL[e.stages - 1].connect(this.effectReturnL),
                    this._filtersR[e.stages - 1].connect(this.effectReturnR),
                    this._lfoL.frequency.connect(this._lfoR.frequency),
                    (this.baseFrequency = e.baseFrequency),
                    (this.octaves = e.octaves),
                    this._lfoL.start(),
                    this._lfoR.start(),
                    this._readOnly(["frequency", "Q"])
                }),
                t.extend(t.Phaser, t.StereoEffect),
                (t.Phaser.defaults = {
                  frequency: 0.5,
                  octaves: 3,
                  stages: 10,
                  Q: 10,
                  baseFrequency: 350,
                }),
                (t.Phaser.prototype._makeFilters = function (e, i, n) {
                  for (var s = new Array(e), o = 0; o < e; o++) {
                    var r = this.context.createBiquadFilter()
                    ;(r.type = "allpass"),
                      n.connect(r.Q),
                      i.connect(r.frequency),
                      (s[o] = r)
                  }
                  return t.connectSeries.apply(t, s), s
                }),
                Object.defineProperty(t.Phaser.prototype, "octaves", {
                  get: function () {
                    return this._octaves
                  },
                  set: function (t) {
                    this._octaves = t
                    var e = this._baseFrequency * Math.pow(2, t)
                    ;(this._lfoL.max = e), (this._lfoR.max = e)
                  },
                }),
                Object.defineProperty(t.Phaser.prototype, "baseFrequency", {
                  get: function () {
                    return this._baseFrequency
                  },
                  set: function (t) {
                    ;(this._baseFrequency = t),
                      (this._lfoL.min = t),
                      (this._lfoR.min = t),
                      (this.octaves = this._octaves)
                  },
                }),
                (t.Phaser.prototype.dispose = function () {
                  t.StereoEffect.prototype.dispose.call(this),
                    this._writable(["frequency", "Q"]),
                    this.Q.dispose(),
                    (this.Q = null),
                    this._lfoL.dispose(),
                    (this._lfoL = null),
                    this._lfoR.dispose(),
                    (this._lfoR = null)
                  for (var e = 0; e < this._filtersL.length; e++)
                    this._filtersL[e].disconnect(), (this._filtersL[e] = null)
                  this._filtersL = null
                  for (var i = 0; i < this._filtersR.length; i++)
                    this._filtersR[i].disconnect(), (this._filtersR[i] = null)
                  return (this._filtersR = null), (this.frequency = null), this
                }),
                t.Phaser
              )
            }),
            e(function (t) {
              return (
                (t.StereoXFeedbackEffect = function () {
                  var e = t.defaults(arguments, ["feedback"], t.FeedbackEffect)
                  t.StereoEffect.call(this, e),
                    (this.feedback = new t.Signal(
                      e.feedback,
                      t.Type.NormalRange,
                    )),
                    (this._feedbackLR = new t.Gain()),
                    (this._feedbackRL = new t.Gain()),
                    this.effectReturnL.chain(
                      this._feedbackLR,
                      this.effectSendR,
                    ),
                    this.effectReturnR.chain(
                      this._feedbackRL,
                      this.effectSendL,
                    ),
                    this.feedback.fan(
                      this._feedbackLR.gain,
                      this._feedbackRL.gain,
                    ),
                    this._readOnly(["feedback"])
                }),
                t.extend(t.StereoXFeedbackEffect, t.StereoEffect),
                (t.StereoXFeedbackEffect.prototype.dispose = function () {
                  return (
                    t.StereoEffect.prototype.dispose.call(this),
                    this._writable(["feedback"]),
                    this.feedback.dispose(),
                    (this.feedback = null),
                    this._feedbackLR.dispose(),
                    (this._feedbackLR = null),
                    this._feedbackRL.dispose(),
                    (this._feedbackRL = null),
                    this
                  )
                }),
                t.StereoXFeedbackEffect
              )
            }),
            e(function (t) {
              return (
                (t.PingPongDelay = function () {
                  var e = t.defaults(
                    arguments,
                    ["delayTime", "feedback"],
                    t.PingPongDelay,
                  )
                  t.StereoXFeedbackEffect.call(this, e),
                    (this._leftDelay = new t.Delay(0, e.maxDelayTime)),
                    (this._rightDelay = new t.Delay(0, e.maxDelayTime)),
                    (this._rightPreDelay = new t.Delay(0, e.maxDelayTime)),
                    (this.delayTime = new t.Signal(e.delayTime, t.Type.Time)),
                    this.effectSendL.chain(this._leftDelay, this.effectReturnL),
                    this.effectSendR.chain(
                      this._rightPreDelay,
                      this._rightDelay,
                      this.effectReturnR,
                    ),
                    this.delayTime.fan(
                      this._leftDelay.delayTime,
                      this._rightDelay.delayTime,
                      this._rightPreDelay.delayTime,
                    ),
                    this._feedbackLR.disconnect(),
                    this._feedbackLR.connect(this._rightDelay),
                    this._readOnly(["delayTime"])
                }),
                t.extend(t.PingPongDelay, t.StereoXFeedbackEffect),
                (t.PingPongDelay.defaults = {
                  delayTime: 0.25,
                  maxDelayTime: 1,
                }),
                (t.PingPongDelay.prototype.dispose = function () {
                  return (
                    t.StereoXFeedbackEffect.prototype.dispose.call(this),
                    this._leftDelay.dispose(),
                    (this._leftDelay = null),
                    this._rightDelay.dispose(),
                    (this._rightDelay = null),
                    this._rightPreDelay.dispose(),
                    (this._rightPreDelay = null),
                    this._writable(["delayTime"]),
                    this.delayTime.dispose(),
                    (this.delayTime = null),
                    this
                  )
                }),
                t.PingPongDelay
              )
            }),
            e(function (t) {
              return (
                (t.PitchShift = function () {
                  var e = t.defaults(arguments, ["pitch"], t.PitchShift)
                  t.FeedbackEffect.call(this, e),
                    (this._frequency = new t.Signal(0)),
                    (this._delayA = new t.Delay(0, 1)),
                    (this._lfoA = new t.LFO({
                      min: 0,
                      max: 0.1,
                      type: "sawtooth",
                    }).connect(this._delayA.delayTime)),
                    (this._delayB = new t.Delay(0, 1)),
                    (this._lfoB = new t.LFO({
                      min: 0,
                      max: 0.1,
                      type: "sawtooth",
                      phase: 180,
                    }).connect(this._delayB.delayTime)),
                    (this._crossFade = new t.CrossFade()),
                    (this._crossFadeLFO = new t.LFO({
                      min: 0,
                      max: 1,
                      type: "triangle",
                      phase: 90,
                    }).connect(this._crossFade.fade)),
                    (this._feedbackDelay = new t.Delay(e.delayTime)),
                    (this.delayTime = this._feedbackDelay.delayTime),
                    this._readOnly("delayTime"),
                    (this._pitch = e.pitch),
                    (this._windowSize = e.windowSize),
                    this._delayA.connect(this._crossFade.a),
                    this._delayB.connect(this._crossFade.b),
                    this._frequency.fan(
                      this._lfoA.frequency,
                      this._lfoB.frequency,
                      this._crossFadeLFO.frequency,
                    ),
                    this.effectSend.fan(this._delayA, this._delayB),
                    this._crossFade.chain(
                      this._feedbackDelay,
                      this.effectReturn,
                    )
                  var i = this.now()
                  this._lfoA.start(i),
                    this._lfoB.start(i),
                    this._crossFadeLFO.start(i),
                    (this.windowSize = this._windowSize)
                }),
                t.extend(t.PitchShift, t.FeedbackEffect),
                (t.PitchShift.defaults = {
                  pitch: 0,
                  windowSize: 0.1,
                  delayTime: 0,
                  feedback: 0,
                }),
                Object.defineProperty(t.PitchShift.prototype, "pitch", {
                  get: function () {
                    return this._pitch
                  },
                  set: function (e) {
                    this._pitch = e
                    var i = 0
                    e < 0
                      ? ((this._lfoA.min = 0),
                        (this._lfoA.max = this._windowSize),
                        (this._lfoB.min = 0),
                        (this._lfoB.max = this._windowSize),
                        (i = t.intervalToFrequencyRatio(e - 1) + 1))
                      : ((this._lfoA.min = this._windowSize),
                        (this._lfoA.max = 0),
                        (this._lfoB.min = this._windowSize),
                        (this._lfoB.max = 0),
                        (i = t.intervalToFrequencyRatio(e) - 1)),
                      (this._frequency.value = i * (1.2 / this._windowSize))
                  },
                }),
                Object.defineProperty(t.PitchShift.prototype, "windowSize", {
                  get: function () {
                    return this._windowSize
                  },
                  set: function (t) {
                    ;(this._windowSize = this.toSeconds(t)),
                      (this.pitch = this._pitch)
                  },
                }),
                (t.PitchShift.prototype.dispose = function () {
                  return (
                    t.FeedbackEffect.prototype.dispose.call(this),
                    this._frequency.dispose(),
                    (this._frequency = null),
                    this._delayA.disconnect(),
                    (this._delayA = null),
                    this._delayB.disconnect(),
                    (this._delayB = null),
                    this._lfoA.dispose(),
                    (this._lfoA = null),
                    this._lfoB.dispose(),
                    (this._lfoB = null),
                    this._crossFade.dispose(),
                    (this._crossFade = null),
                    this._crossFadeLFO.dispose(),
                    (this._crossFadeLFO = null),
                    this._writable("delayTime"),
                    this._feedbackDelay.dispose(),
                    (this._feedbackDelay = null),
                    (this.delayTime = null),
                    this
                  )
                }),
                t.PitchShift
              )
            }),
            e(function (t) {
              return (
                (t.BufferSource = function () {
                  var e = t.defaults(
                    arguments,
                    ["buffer", "onload"],
                    t.BufferSource,
                  )
                  t.AudioNode.call(this, e),
                    (this.onended = e.onended),
                    (this._startTime = -1),
                    (this._sourceStarted = !1),
                    (this._sourceStopped = !1),
                    (this._stopTime = -1),
                    (this._gainNode = this.output = new t.Gain()),
                    (this._source = this.context.createBufferSource()),
                    this._source.connect(this._gainNode),
                    (this._source.onended = this._onended.bind(this)),
                    (this._buffer = new t.Buffer(e.buffer, e.onload)),
                    (this.playbackRate = new t.Param(
                      this._source.playbackRate,
                      t.Type.Positive,
                    )),
                    (this.fadeIn = e.fadeIn),
                    (this.fadeOut = e.fadeOut),
                    (this.curve = e.curve),
                    (this._gain = 1),
                    (this._onendedTimeout = -1),
                    (this.loop = e.loop),
                    (this.loopStart = e.loopStart),
                    (this.loopEnd = e.loopEnd),
                    (this.playbackRate.value = e.playbackRate)
                }),
                t.extend(t.BufferSource, t.AudioNode),
                (t.BufferSource.defaults = {
                  onended: t.noOp,
                  onload: t.noOp,
                  loop: !1,
                  loopStart: 0,
                  loopEnd: 0,
                  fadeIn: 0,
                  fadeOut: 0,
                  curve: "linear",
                  playbackRate: 1,
                }),
                Object.defineProperty(t.BufferSource.prototype, "state", {
                  get: function () {
                    return this.getStateAtTime(this.now())
                  },
                }),
                (t.BufferSource.prototype.getStateAtTime = function (e) {
                  return (
                    (e = this.toSeconds(e)),
                    -1 !== this._startTime &&
                    e >= this._startTime &&
                    !this._sourceStopped
                      ? t.State.Started
                      : t.State.Stopped
                  )
                }),
                (t.BufferSource.prototype.start = function (e, i, n, s, o) {
                  if (-1 !== this._startTime)
                    throw new Error(
                      "Tone.BufferSource can only be started once.",
                    )
                  if (!this.buffer.loaded)
                    throw new Error(
                      "Tone.BufferSource: buffer is either not set or not loaded.",
                    )
                  ;(e = this.toSeconds(e)),
                    (i = this.loop
                      ? t.defaultArg(i, this.loopStart)
                      : t.defaultArg(i, 0)),
                    (i = this.toSeconds(i)),
                    (s = t.defaultArg(s, 1)),
                    (this._gain = s),
                    (o = this.toSeconds(t.defaultArg(o, this.fadeIn))),
                    (this.fadeIn = o),
                    o > 0
                      ? (this._gainNode.gain.setValueAtTime(0, e),
                        "linear" === this.curve
                          ? this._gainNode.gain.linearRampToValueAtTime(
                              this._gain,
                              e + o,
                            )
                          : this._gainNode.gain.exponentialApproachValueAtTime(
                              this._gain,
                              e,
                              o,
                            ))
                      : this._gainNode.gain.setValueAtTime(s, e),
                    (this._startTime = e)
                  var r = this.toSeconds(
                    t.defaultArg(
                      n,
                      this.buffer.duration - (i % this.buffer.duration),
                    ),
                  )
                  if (
                    ((r = Math.max(r, 0)),
                    t.isDefined(n) &&
                      (this.loop ||
                        (r = Math.min(
                          r,
                          this.buffer.duration - (i % this.buffer.duration),
                        )),
                      this.stop(e + r, this.fadeOut)),
                    this.loop)
                  ) {
                    var a = this.loopEnd || this.buffer.duration,
                      u = this.loopStart
                    i >= a && (i = ((i - u) % (a - u)) + u)
                  }
                  return (
                    (this._source.buffer = this.buffer.get()),
                    (this._source.loopEnd =
                      this.loopEnd || this.buffer.duration),
                    i < this.buffer.duration &&
                      ((this._sourceStarted = !0), this._source.start(e, i)),
                    this
                  )
                }),
                (t.BufferSource.prototype.stop = function (e, i) {
                  if (!this.buffer.loaded)
                    throw new Error(
                      "Tone.BufferSource: buffer is either not set or not loaded.",
                    )
                  if (!this._sourceStopped) {
                    if (
                      ((e = this.toSeconds(e)),
                      -1 !== this._stopTime && this.cancelStop(),
                      e <= this._startTime)
                    )
                      return (
                        this._gainNode.gain.cancelScheduledValues(e),
                        (this._gainNode.gain.value = 0),
                        this
                      )
                    ;(e = Math.max(
                      this._startTime + this.fadeIn + this.sampleTime,
                      e,
                    )),
                      this._gainNode.gain.cancelScheduledValues(e),
                      (this._stopTime = e),
                      (i = this.toSeconds(t.defaultArg(i, this.fadeOut)))
                    var n = e - this._startTime - this.fadeIn - this.sampleTime
                    this.loop || (n = Math.min(n, this.buffer.duration))
                    var s = e - (i = Math.min(n, i))
                    return (
                      i > this.sampleTime
                        ? (this._gainNode.gain.setValueAtTime(this._gain, s),
                          "linear" === this.curve
                            ? this._gainNode.gain.linearRampToValueAtTime(0, e)
                            : this._gainNode.gain.exponentialApproachValueAtTime(
                                0,
                                s,
                                i,
                              ))
                        : this._gainNode.gain.setValueAtTime(0, e),
                      t.context.clearTimeout(this._onendedTimeout),
                      (this._onendedTimeout = t.context.setTimeout(
                        this._onended.bind(this),
                        this._stopTime - this.now(),
                      )),
                      this
                    )
                  }
                }),
                (t.BufferSource.prototype.cancelStop = function () {
                  if (-1 !== this._startTime && !this._sourceStopped) {
                    var t = this.toSeconds(this.fadeIn)
                    this._gainNode.gain.cancelScheduledValues(
                      this._startTime + t + this.sampleTime,
                    ),
                      this._gainNode.gain.setValueAtTime(
                        1,
                        Math.max(
                          this.now(),
                          this._startTime + t + this.sampleTime,
                        ),
                      ),
                      this.context.clearTimeout(this._onendedTimeout),
                      (this._stopTime = -1)
                  }
                  return this
                }),
                (t.BufferSource.prototype._onended = function () {
                  if (!this._sourceStopped) {
                    this._sourceStopped = !0
                    var t = "exponential" === this.curve ? 2 * this.fadeOut : 0
                    this._sourceStarted &&
                      -1 !== this._stopTime &&
                      this._source.stop(this._stopTime + t),
                      this.onended(this)
                  }
                }),
                Object.defineProperty(t.BufferSource.prototype, "loopStart", {
                  get: function () {
                    return this._source.loopStart
                  },
                  set: function (t) {
                    this._source.loopStart = this.toSeconds(t)
                  },
                }),
                Object.defineProperty(t.BufferSource.prototype, "loopEnd", {
                  get: function () {
                    return this._source.loopEnd
                  },
                  set: function (t) {
                    this._source.loopEnd = this.toSeconds(t)
                  },
                }),
                Object.defineProperty(t.BufferSource.prototype, "buffer", {
                  get: function () {
                    return this._buffer
                  },
                  set: function (t) {
                    this._buffer.set(t)
                  },
                }),
                Object.defineProperty(t.BufferSource.prototype, "loop", {
                  get: function () {
                    return this._source.loop
                  },
                  set: function (t) {
                    ;(this._source.loop = t), this.cancelStop()
                  },
                }),
                (t.BufferSource.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    (this.onended = null),
                    (this._source.onended = null),
                    this._source.disconnect(),
                    (this._source = null),
                    this._gainNode.dispose(),
                    (this._gainNode = null),
                    this._buffer.dispose(),
                    (this._buffer = null),
                    (this._startTime = -1),
                    (this.playbackRate = null),
                    t.context.clearTimeout(this._onendedTimeout),
                    this
                  )
                }),
                t.BufferSource
              )
            }),
            e(function (t) {
              ;(t.Noise = function () {
                var e = t.defaults(arguments, ["type"], t.Noise)
                t.Source.call(this, e),
                  (this._source = null),
                  (this._type = e.type),
                  (this._playbackRate = e.playbackRate)
              }),
                t.extend(t.Noise, t.Source),
                (t.Noise.defaults = { type: "white", playbackRate: 1 }),
                Object.defineProperty(t.Noise.prototype, "type", {
                  get: function () {
                    return this._type
                  },
                  set: function (e) {
                    if (this._type !== e) {
                      if (!(e in i))
                        throw new TypeError("Tone.Noise: invalid type: " + e)
                      if (((this._type = e), this.state === t.State.Started)) {
                        var n = this.now()
                        this._stop(n), this._start(n)
                      }
                    }
                  },
                }),
                Object.defineProperty(t.Noise.prototype, "playbackRate", {
                  get: function () {
                    return this._playbackRate
                  },
                  set: function (t) {
                    ;(this._playbackRate = t),
                      this._source && (this._source.playbackRate.value = t)
                  },
                }),
                (t.Noise.prototype._start = function (e) {
                  var n = i[this._type]
                  ;(this._source = new t.BufferSource(n).connect(this.output)),
                    (this._source.loop = !0),
                    (this._source.playbackRate.value = this._playbackRate),
                    this._source.start(
                      this.toSeconds(e),
                      Math.random() * (n.duration - 0.001),
                    )
                }),
                (t.Noise.prototype._stop = function (t) {
                  this._source &&
                    (this._source.stop(this.toSeconds(t)),
                    (this._source = null))
                }),
                (t.Noise.prototype.restart = function (t) {
                  this._stop(t), this._start(t)
                }),
                (t.Noise.prototype.dispose = function () {
                  return (
                    t.Source.prototype.dispose.call(this),
                    null !== this._source &&
                      (this._source.disconnect(), (this._source = null)),
                    (this._buffer = null),
                    this
                  )
                })
              var e = {
                  pink: (function () {
                    for (var t = [], e = 0; e < 2; e++) {
                      var i,
                        n,
                        s,
                        o,
                        r,
                        a,
                        u,
                        l = new Float32Array(220500)
                      ;(t[e] = l), (i = n = s = o = r = a = u = 0)
                      for (var h = 0; h < 220500; h++) {
                        var c = 2 * Math.random() - 1
                        ;(i = 0.99886 * i + 0.0555179 * c),
                          (n = 0.99332 * n + 0.0750759 * c),
                          (s = 0.969 * s + 0.153852 * c),
                          (o = 0.8665 * o + 0.3104856 * c),
                          (r = 0.55 * r + 0.5329522 * c),
                          (a = -0.7616 * a - 0.016898 * c),
                          (l[h] = i + n + s + o + r + a + u + 0.5362 * c),
                          (l[h] *= 0.11),
                          (u = 0.115926 * c)
                      }
                    }
                    return t
                  })(),
                  brown: (function () {
                    for (var t = [], e = 0; e < 2; e++) {
                      var i = new Float32Array(220500)
                      t[e] = i
                      for (var n = 0, s = 0; s < 220500; s++) {
                        var o = 2 * Math.random() - 1
                        ;(i[s] = (n + 0.02 * o) / 1.02),
                          (n = i[s]),
                          (i[s] *= 3.5)
                      }
                    }
                    return t
                  })(),
                  white: (function () {
                    for (var t = [], e = 0; e < 2; e++) {
                      var i = new Float32Array(220500)
                      t[e] = i
                      for (var n = 0; n < 220500; n++)
                        i[n] = 2 * Math.random() - 1
                    }
                    return t
                  })(),
                },
                i = {}
              function n() {
                for (var n in e) i[n] = new t.Buffer().fromArray(e[n])
              }
              return t.getContext(n), t.Context.on("init", n), t.Noise
            }),
            e(function (t) {
              return (
                (t.Reverb = function () {
                  var e = t.defaults(arguments, ["decay"], t.Reverb)
                  t.Effect.call(this, e),
                    (this._convolver = this.context.createConvolver()),
                    (this.decay = e.decay),
                    (this.preDelay = e.preDelay),
                    this.connectEffect(this._convolver)
                }),
                t.extend(t.Reverb, t.Effect),
                (t.Reverb.defaults = { decay: 1.5, preDelay: 0.01 }),
                (t.Reverb.prototype.generate = function () {
                  return t
                    .Offline(
                      function () {
                        var e = new t.Noise(),
                          i = new t.Noise(),
                          n = new t.Merge()
                        e.connect(n.left), i.connect(n.right)
                        var s = new t.Gain().toMaster()
                        n.connect(s),
                          e.start(0),
                          i.start(0),
                          s.gain.setValueAtTime(0, 0),
                          s.gain.linearRampToValueAtTime(1, this.preDelay),
                          s.gain.exponentialApproachValueAtTime(
                            0,
                            this.preDelay,
                            this.decay - this.preDelay,
                          )
                      }.bind(this),
                      this.decay,
                    )
                    .then(
                      function (t) {
                        return (this._convolver.buffer = t.get()), this
                      }.bind(this),
                    )
                }),
                (t.Reverb.prototype.dispose = function () {
                  return (
                    t.Effect.prototype.dispose.call(this),
                    this._convolver.disconnect(),
                    (this._convolver = null),
                    this
                  )
                }),
                t.Reverb
              )
            }),
            e(function (t) {
              return (
                (t.StereoFeedbackEffect = function () {
                  var e = t.defaults(arguments, ["feedback"], t.FeedbackEffect)
                  t.StereoEffect.call(this, e),
                    (this.feedback = new t.Signal(
                      e.feedback,
                      t.Type.NormalRange,
                    )),
                    (this._feedbackL = new t.Gain()),
                    (this._feedbackR = new t.Gain()),
                    this.effectReturnL.chain(this._feedbackL, this.effectSendL),
                    this.effectReturnR.chain(this._feedbackR, this.effectSendR),
                    this.feedback.fan(
                      this._feedbackL.gain,
                      this._feedbackR.gain,
                    ),
                    this._readOnly(["feedback"])
                }),
                t.extend(t.StereoFeedbackEffect, t.StereoEffect),
                (t.StereoFeedbackEffect.prototype.dispose = function () {
                  return (
                    t.StereoEffect.prototype.dispose.call(this),
                    this._writable(["feedback"]),
                    this.feedback.dispose(),
                    (this.feedback = null),
                    this._feedbackL.dispose(),
                    (this._feedbackL = null),
                    this._feedbackR.dispose(),
                    (this._feedbackR = null),
                    this
                  )
                }),
                t.StereoFeedbackEffect
              )
            }),
            e(function (t) {
              return (
                (t.StereoWidener = function () {
                  var e = t.defaults(arguments, ["width"], t.StereoWidener)
                  t.MidSideEffect.call(this, e),
                    (this.width = new t.Signal(e.width, t.Type.NormalRange)),
                    this._readOnly(["width"]),
                    (this._twoTimesWidthMid = new t.Multiply(2)),
                    (this._twoTimesWidthSide = new t.Multiply(2)),
                    (this._midMult = new t.Multiply()),
                    this._twoTimesWidthMid.connect(this._midMult, 0, 1),
                    this.midSend.chain(this._midMult, this.midReturn),
                    (this._oneMinusWidth = new t.Subtract()),
                    this._oneMinusWidth.connect(this._twoTimesWidthMid),
                    this.context
                      .getConstant(1)
                      .connect(this._oneMinusWidth, 0, 0),
                    this.width.connect(this._oneMinusWidth, 0, 1),
                    (this._sideMult = new t.Multiply()),
                    this.width.connect(this._twoTimesWidthSide),
                    this._twoTimesWidthSide.connect(this._sideMult, 0, 1),
                    this.sideSend.chain(this._sideMult, this.sideReturn)
                }),
                t.extend(t.StereoWidener, t.MidSideEffect),
                (t.StereoWidener.defaults = { width: 0.5 }),
                (t.StereoWidener.prototype.dispose = function () {
                  return (
                    t.MidSideEffect.prototype.dispose.call(this),
                    this._writable(["width"]),
                    this.width.dispose(),
                    (this.width = null),
                    this._midMult.dispose(),
                    (this._midMult = null),
                    this._sideMult.dispose(),
                    (this._sideMult = null),
                    this._twoTimesWidthMid.dispose(),
                    (this._twoTimesWidthMid = null),
                    this._twoTimesWidthSide.dispose(),
                    (this._twoTimesWidthSide = null),
                    this._oneMinusWidth.dispose(),
                    (this._oneMinusWidth = null),
                    this
                  )
                }),
                t.StereoWidener
              )
            }),
            e(function (t) {
              return (
                (t.Tremolo = function () {
                  var e = t.defaults(
                    arguments,
                    ["frequency", "depth"],
                    t.Tremolo,
                  )
                  t.StereoEffect.call(this, e),
                    (this._lfoL = new t.LFO({
                      phase: e.spread,
                      min: 1,
                      max: 0,
                    })),
                    (this._lfoR = new t.LFO({
                      phase: e.spread,
                      min: 1,
                      max: 0,
                    })),
                    (this._amplitudeL = new t.Gain()),
                    (this._amplitudeR = new t.Gain()),
                    (this.frequency = new t.Signal(
                      e.frequency,
                      t.Type.Frequency,
                    )),
                    (this.depth = new t.Signal(e.depth, t.Type.NormalRange)),
                    this._readOnly(["frequency", "depth"]),
                    this.effectSendL.chain(
                      this._amplitudeL,
                      this.effectReturnL,
                    ),
                    this.effectSendR.chain(
                      this._amplitudeR,
                      this.effectReturnR,
                    ),
                    this._lfoL.connect(this._amplitudeL.gain),
                    this._lfoR.connect(this._amplitudeR.gain),
                    this.frequency.fan(
                      this._lfoL.frequency,
                      this._lfoR.frequency,
                    ),
                    this.depth.fan(this._lfoR.amplitude, this._lfoL.amplitude),
                    (this.type = e.type),
                    (this.spread = e.spread)
                }),
                t.extend(t.Tremolo, t.StereoEffect),
                (t.Tremolo.defaults = {
                  frequency: 10,
                  type: "sine",
                  depth: 0.5,
                  spread: 180,
                }),
                (t.Tremolo.prototype.start = function (t) {
                  return this._lfoL.start(t), this._lfoR.start(t), this
                }),
                (t.Tremolo.prototype.stop = function (t) {
                  return this._lfoL.stop(t), this._lfoR.stop(t), this
                }),
                (t.Tremolo.prototype.sync = function (e) {
                  return (
                    this._lfoL.sync(e),
                    this._lfoR.sync(e),
                    t.Transport.syncSignal(this.frequency),
                    this
                  )
                }),
                (t.Tremolo.prototype.unsync = function () {
                  return (
                    this._lfoL.unsync(),
                    this._lfoR.unsync(),
                    t.Transport.unsyncSignal(this.frequency),
                    this
                  )
                }),
                Object.defineProperty(t.Tremolo.prototype, "type", {
                  get: function () {
                    return this._lfoL.type
                  },
                  set: function (t) {
                    ;(this._lfoL.type = t), (this._lfoR.type = t)
                  },
                }),
                Object.defineProperty(t.Tremolo.prototype, "spread", {
                  get: function () {
                    return this._lfoR.phase - this._lfoL.phase
                  },
                  set: function (t) {
                    ;(this._lfoL.phase = 90 - t / 2),
                      (this._lfoR.phase = t / 2 + 90)
                  },
                }),
                (t.Tremolo.prototype.dispose = function () {
                  return (
                    t.StereoEffect.prototype.dispose.call(this),
                    this._writable(["frequency", "depth"]),
                    this._lfoL.dispose(),
                    (this._lfoL = null),
                    this._lfoR.dispose(),
                    (this._lfoR = null),
                    this._amplitudeL.dispose(),
                    (this._amplitudeL = null),
                    this._amplitudeR.dispose(),
                    (this._amplitudeR = null),
                    (this.frequency = null),
                    (this.depth = null),
                    this
                  )
                }),
                t.Tremolo
              )
            }),
            e(function (t) {
              return (
                (t.Vibrato = function () {
                  var e = t.defaults(
                    arguments,
                    ["frequency", "depth"],
                    t.Vibrato,
                  )
                  t.Effect.call(this, e),
                    (this._delayNode = new t.Delay(0, e.maxDelay)),
                    (this._lfo = new t.LFO({
                      type: e.type,
                      min: 0,
                      max: e.maxDelay,
                      frequency: e.frequency,
                      phase: -90,
                    })
                      .start()
                      .connect(this._delayNode.delayTime)),
                    (this.frequency = this._lfo.frequency),
                    (this.depth = this._lfo.amplitude),
                    (this.depth.value = e.depth),
                    this._readOnly(["frequency", "depth"]),
                    this.effectSend.chain(this._delayNode, this.effectReturn)
                }),
                t.extend(t.Vibrato, t.Effect),
                (t.Vibrato.defaults = {
                  maxDelay: 0.005,
                  frequency: 5,
                  depth: 0.1,
                  type: "sine",
                }),
                Object.defineProperty(t.Vibrato.prototype, "type", {
                  get: function () {
                    return this._lfo.type
                  },
                  set: function (t) {
                    this._lfo.type = t
                  },
                }),
                (t.Vibrato.prototype.dispose = function () {
                  t.Effect.prototype.dispose.call(this),
                    this._delayNode.dispose(),
                    (this._delayNode = null),
                    this._lfo.dispose(),
                    (this._lfo = null),
                    this._writable(["frequency", "depth"]),
                    (this.frequency = null),
                    (this.depth = null)
                }),
                t.Vibrato
              )
            }),
            e(function (t) {
              return (
                (t.Event = function () {
                  var e = t.defaults(arguments, ["callback", "value"], t.Event)
                  t.call(this),
                    (this._loop = e.loop),
                    (this.callback = e.callback),
                    (this.value = e.value),
                    (this._loopStart = this.toTicks(e.loopStart)),
                    (this._loopEnd = this.toTicks(e.loopEnd)),
                    (this._state = new t.TimelineState(t.State.Stopped)),
                    (this._playbackRate = 1),
                    (this._startOffset = 0),
                    (this._probability = e.probability),
                    (this._humanize = e.humanize),
                    (this.mute = e.mute),
                    (this.playbackRate = e.playbackRate)
                }),
                t.extend(t.Event),
                (t.Event.defaults = {
                  callback: t.noOp,
                  loop: !1,
                  loopEnd: "1m",
                  loopStart: 0,
                  playbackRate: 1,
                  value: null,
                  probability: 1,
                  mute: !1,
                  humanize: !1,
                }),
                (t.Event.prototype._rescheduleEvents = function (e) {
                  return (
                    (e = t.defaultArg(e, -1)),
                    this._state.forEachFrom(
                      e,
                      function (e) {
                        var i
                        if (e.state === t.State.Started) {
                          t.isDefined(e.id) && t.Transport.clear(e.id)
                          var n =
                            e.time +
                            Math.round(this.startOffset / this._playbackRate)
                          if (this._loop) {
                            ;(i = 1 / 0),
                              t.isNumber(this._loop) &&
                                (i = this._loop * this._getLoopDuration())
                            var s = this._state.getAfter(n)
                            null !== s && (i = Math.min(i, s.time - n)),
                              i !== 1 / 0 &&
                                (this._state.setStateAtTime(
                                  t.State.Stopped,
                                  n + i + 1,
                                ),
                                (i = t.Ticks(i)))
                            var o = t.Ticks(this._getLoopDuration())
                            e.id = t.Transport.scheduleRepeat(
                              this._tick.bind(this),
                              o,
                              t.Ticks(n),
                              i,
                            )
                          } else
                            e.id = t.Transport.schedule(
                              this._tick.bind(this),
                              t.Ticks(n),
                            )
                        }
                      }.bind(this),
                    ),
                    this
                  )
                }),
                Object.defineProperty(t.Event.prototype, "state", {
                  get: function () {
                    return this._state.getValueAtTime(t.Transport.ticks)
                  },
                }),
                Object.defineProperty(t.Event.prototype, "startOffset", {
                  get: function () {
                    return this._startOffset
                  },
                  set: function (t) {
                    this._startOffset = t
                  },
                }),
                Object.defineProperty(t.Event.prototype, "probability", {
                  get: function () {
                    return this._probability
                  },
                  set: function (t) {
                    this._probability = t
                  },
                }),
                Object.defineProperty(t.Event.prototype, "humanize", {
                  get: function () {
                    return this._humanize
                  },
                  set: function (t) {
                    this._humanize = t
                  },
                }),
                (t.Event.prototype.start = function (e) {
                  return (
                    (e = this.toTicks(e)),
                    this._state.getValueAtTime(e) === t.State.Stopped &&
                      (this._state.add({
                        state: t.State.Started,
                        time: e,
                        id: void 0,
                      }),
                      this._rescheduleEvents(e)),
                    this
                  )
                }),
                (t.Event.prototype.stop = function (e) {
                  if (
                    (this.cancel(e),
                    (e = this.toTicks(e)),
                    this._state.getValueAtTime(e) === t.State.Started)
                  ) {
                    this._state.setStateAtTime(t.State.Stopped, e)
                    var i = this._state.getBefore(e),
                      n = e
                    null !== i && (n = i.time), this._rescheduleEvents(n)
                  }
                  return this
                }),
                (t.Event.prototype.cancel = function (e) {
                  return (
                    (e = t.defaultArg(e, -1 / 0)),
                    (e = this.toTicks(e)),
                    this._state.forEachFrom(e, function (e) {
                      t.Transport.clear(e.id)
                    }),
                    this._state.cancel(e),
                    this
                  )
                }),
                (t.Event.prototype._tick = function (e) {
                  var i = t.Transport.getTicksAtTime(e)
                  if (
                    !this.mute &&
                    this._state.getValueAtTime(i) === t.State.Started
                  ) {
                    if (
                      this.probability < 1 &&
                      Math.random() > this.probability
                    )
                      return
                    if (this.humanize) {
                      var n = 0.02
                      t.isBoolean(this.humanize) ||
                        (n = this.toSeconds(this.humanize)),
                        (e += (2 * Math.random() - 1) * n)
                    }
                    this.callback(e, this.value)
                  }
                }),
                (t.Event.prototype._getLoopDuration = function () {
                  return Math.round(
                    (this._loopEnd - this._loopStart) / this._playbackRate,
                  )
                }),
                Object.defineProperty(t.Event.prototype, "loop", {
                  get: function () {
                    return this._loop
                  },
                  set: function (t) {
                    ;(this._loop = t), this._rescheduleEvents()
                  },
                }),
                Object.defineProperty(t.Event.prototype, "playbackRate", {
                  get: function () {
                    return this._playbackRate
                  },
                  set: function (t) {
                    ;(this._playbackRate = t), this._rescheduleEvents()
                  },
                }),
                Object.defineProperty(t.Event.prototype, "loopEnd", {
                  get: function () {
                    return t.Ticks(this._loopEnd).toSeconds()
                  },
                  set: function (t) {
                    ;(this._loopEnd = this.toTicks(t)),
                      this._loop && this._rescheduleEvents()
                  },
                }),
                Object.defineProperty(t.Event.prototype, "loopStart", {
                  get: function () {
                    return t.Ticks(this._loopStart).toSeconds()
                  },
                  set: function (t) {
                    ;(this._loopStart = this.toTicks(t)),
                      this._loop && this._rescheduleEvents()
                  },
                }),
                Object.defineProperty(t.Event.prototype, "progress", {
                  get: function () {
                    if (this._loop) {
                      var e = t.Transport.ticks,
                        i = this._state.get(e)
                      if (null !== i && i.state === t.State.Started) {
                        var n = this._getLoopDuration()
                        return ((e - i.time) % n) / n
                      }
                      return 0
                    }
                    return 0
                  },
                }),
                (t.Event.prototype.dispose = function () {
                  this.cancel(),
                    this._state.dispose(),
                    (this._state = null),
                    (this.callback = null),
                    (this.value = null)
                }),
                t.Event
              )
            }),
            e(function (t) {
              return (
                (t.Loop = function () {
                  var e = t.defaults(
                    arguments,
                    ["callback", "interval"],
                    t.Loop,
                  )
                  t.call(this),
                    (this._event = new t.Event({
                      callback: this._tick.bind(this),
                      loop: !0,
                      loopEnd: e.interval,
                      playbackRate: e.playbackRate,
                      probability: e.probability,
                    })),
                    (this.callback = e.callback),
                    (this.iterations = e.iterations)
                }),
                t.extend(t.Loop),
                (t.Loop.defaults = {
                  interval: "4n",
                  callback: t.noOp,
                  playbackRate: 1,
                  iterations: 1 / 0,
                  probability: !0,
                  mute: !1,
                }),
                (t.Loop.prototype.start = function (t) {
                  return this._event.start(t), this
                }),
                (t.Loop.prototype.stop = function (t) {
                  return this._event.stop(t), this
                }),
                (t.Loop.prototype.cancel = function (t) {
                  return this._event.cancel(t), this
                }),
                (t.Loop.prototype._tick = function (t) {
                  this.callback(t)
                }),
                Object.defineProperty(t.Loop.prototype, "state", {
                  get: function () {
                    return this._event.state
                  },
                }),
                Object.defineProperty(t.Loop.prototype, "progress", {
                  get: function () {
                    return this._event.progress
                  },
                }),
                Object.defineProperty(t.Loop.prototype, "interval", {
                  get: function () {
                    return this._event.loopEnd
                  },
                  set: function (t) {
                    this._event.loopEnd = t
                  },
                }),
                Object.defineProperty(t.Loop.prototype, "playbackRate", {
                  get: function () {
                    return this._event.playbackRate
                  },
                  set: function (t) {
                    this._event.playbackRate = t
                  },
                }),
                Object.defineProperty(t.Loop.prototype, "humanize", {
                  get: function () {
                    return this._event.humanize
                  },
                  set: function (t) {
                    this._event.humanize = t
                  },
                }),
                Object.defineProperty(t.Loop.prototype, "probability", {
                  get: function () {
                    return this._event.probability
                  },
                  set: function (t) {
                    this._event.probability = t
                  },
                }),
                Object.defineProperty(t.Loop.prototype, "mute", {
                  get: function () {
                    return this._event.mute
                  },
                  set: function (t) {
                    this._event.mute = t
                  },
                }),
                Object.defineProperty(t.Loop.prototype, "iterations", {
                  get: function () {
                    return !0 === this._event.loop ? 1 / 0 : this._event.loop
                  },
                  set: function (t) {
                    this._event.loop = t === 1 / 0 || t
                  },
                }),
                (t.Loop.prototype.dispose = function () {
                  this._event.dispose(),
                    (this._event = null),
                    (this.callback = null)
                }),
                t.Loop
              )
            }),
            e(function (t) {
              return (
                (t.Part = function () {
                  var e = t.defaults(arguments, ["callback", "events"], t.Part)
                  t.Event.call(this, e), (this._events = [])
                  for (var i = 0; i < e.events.length; i++)
                    Array.isArray(e.events[i])
                      ? this.add(e.events[i][0], e.events[i][1])
                      : this.add(e.events[i])
                }),
                t.extend(t.Part, t.Event),
                (t.Part.defaults = {
                  callback: t.noOp,
                  loop: !1,
                  loopEnd: "1m",
                  loopStart: 0,
                  playbackRate: 1,
                  probability: 1,
                  humanize: !1,
                  mute: !1,
                  events: [],
                }),
                (t.Part.prototype.start = function (e, i) {
                  var n = this.toTicks(e)
                  return (
                    this._state.getValueAtTime(n) !== t.State.Started &&
                      ((i = this._loop
                        ? t.defaultArg(i, this._loopStart)
                        : t.defaultArg(i, 0)),
                      (i = this.toTicks(i)),
                      this._state.add({
                        state: t.State.Started,
                        time: n,
                        offset: i,
                      }),
                      this._forEach(function (t) {
                        this._startNote(t, n, i)
                      })),
                    this
                  )
                }),
                (t.Part.prototype._startNote = function (e, i, n) {
                  ;(i -= n),
                    this._loop
                      ? e.startOffset >= this._loopStart &&
                        e.startOffset < this._loopEnd
                        ? (e.startOffset < n && (i += this._getLoopDuration()),
                          e.start(t.Ticks(i)))
                        : e.startOffset < this._loopStart &&
                          e.startOffset >= n &&
                          ((e.loop = !1), e.start(t.Ticks(i)))
                      : e.startOffset >= n && e.start(t.Ticks(i))
                }),
                Object.defineProperty(t.Part.prototype, "startOffset", {
                  get: function () {
                    return this._startOffset
                  },
                  set: function (t) {
                    ;(this._startOffset = t),
                      this._forEach(function (t) {
                        t.startOffset += this._startOffset
                      })
                  },
                }),
                (t.Part.prototype.stop = function (e) {
                  var i = this.toTicks(e)
                  return (
                    this._state.cancel(i),
                    this._state.setStateAtTime(t.State.Stopped, i),
                    this._forEach(function (t) {
                      t.stop(e)
                    }),
                    this
                  )
                }),
                (t.Part.prototype.at = function (e, i) {
                  e = t.TransportTime(e)
                  for (
                    var n = t.Ticks(1).toSeconds(), s = 0;
                    s < this._events.length;
                    s++
                  ) {
                    var o = this._events[s]
                    if (Math.abs(e.toTicks() - o.startOffset) < n)
                      return t.isDefined(i) && (o.value = i), o
                  }
                  return t.isDefined(i)
                    ? (this.add(e, i), this._events[this._events.length - 1])
                    : null
                }),
                (t.Part.prototype.add = function (e, i) {
                  var n
                  return (
                    e.hasOwnProperty("time") && (e = (i = e).time),
                    (e = this.toTicks(e)),
                    i instanceof t.Event
                      ? ((n = i).callback = this._tick.bind(this))
                      : (n = new t.Event({
                          callback: this._tick.bind(this),
                          value: i,
                        })),
                    (n.startOffset = e),
                    n.set({
                      loopEnd: this.loopEnd,
                      loopStart: this.loopStart,
                      loop: this.loop,
                      humanize: this.humanize,
                      playbackRate: this.playbackRate,
                      probability: this.probability,
                    }),
                    this._events.push(n),
                    this._restartEvent(n),
                    this
                  )
                }),
                (t.Part.prototype._restartEvent = function (e) {
                  this._state.forEach(
                    function (i) {
                      i.state === t.State.Started
                        ? this._startNote(e, i.time, i.offset)
                        : e.stop(t.Ticks(i.time))
                    }.bind(this),
                  )
                }),
                (t.Part.prototype.remove = function (e, i) {
                  e.hasOwnProperty("time") && (e = (i = e).time),
                    (e = this.toTicks(e))
                  for (var n = this._events.length - 1; n >= 0; n--) {
                    var s = this._events[n]
                    s instanceof t.Part
                      ? s.remove(e, i)
                      : s.startOffset === e &&
                        (t.isUndef(i) || (t.isDefined(i) && s.value === i)) &&
                        (this._events.splice(n, 1), s.dispose())
                  }
                  return this
                }),
                (t.Part.prototype.removeAll = function () {
                  return (
                    this._forEach(function (t) {
                      t.dispose()
                    }),
                    (this._events = []),
                    this
                  )
                }),
                (t.Part.prototype.cancel = function (t) {
                  return (
                    this._forEach(function (e) {
                      e.cancel(t)
                    }),
                    this._state.cancel(this.toTicks(t)),
                    this
                  )
                }),
                (t.Part.prototype._forEach = function (e, i) {
                  if (this._events) {
                    i = t.defaultArg(i, this)
                    for (var n = this._events.length - 1; n >= 0; n--) {
                      var s = this._events[n]
                      s instanceof t.Part ? s._forEach(e, i) : e.call(i, s)
                    }
                  }
                  return this
                }),
                (t.Part.prototype._setAll = function (t, e) {
                  this._forEach(function (i) {
                    i[t] = e
                  })
                }),
                (t.Part.prototype._tick = function (t, e) {
                  this.mute || this.callback(t, e)
                }),
                (t.Part.prototype._testLoopBoundries = function (e) {
                  e.startOffset < this._loopStart ||
                  e.startOffset >= this._loopEnd
                    ? e.cancel(0)
                    : e.state === t.State.Stopped && this._restartEvent(e)
                }),
                Object.defineProperty(t.Part.prototype, "probability", {
                  get: function () {
                    return this._probability
                  },
                  set: function (t) {
                    ;(this._probability = t), this._setAll("probability", t)
                  },
                }),
                Object.defineProperty(t.Part.prototype, "humanize", {
                  get: function () {
                    return this._humanize
                  },
                  set: function (t) {
                    ;(this._humanize = t), this._setAll("humanize", t)
                  },
                }),
                Object.defineProperty(t.Part.prototype, "loop", {
                  get: function () {
                    return this._loop
                  },
                  set: function (t) {
                    ;(this._loop = t),
                      this._forEach(function (e) {
                        ;(e._loopStart = this._loopStart),
                          (e._loopEnd = this._loopEnd),
                          (e.loop = t),
                          this._testLoopBoundries(e)
                      })
                  },
                }),
                Object.defineProperty(t.Part.prototype, "loopEnd", {
                  get: function () {
                    return t.Ticks(this._loopEnd).toSeconds()
                  },
                  set: function (t) {
                    ;(this._loopEnd = this.toTicks(t)),
                      this._loop &&
                        this._forEach(function (e) {
                          ;(e.loopEnd = t), this._testLoopBoundries(e)
                        })
                  },
                }),
                Object.defineProperty(t.Part.prototype, "loopStart", {
                  get: function () {
                    return t.Ticks(this._loopStart).toSeconds()
                  },
                  set: function (t) {
                    ;(this._loopStart = this.toTicks(t)),
                      this._loop &&
                        this._forEach(function (t) {
                          ;(t.loopStart = this.loopStart),
                            this._testLoopBoundries(t)
                        })
                  },
                }),
                Object.defineProperty(t.Part.prototype, "playbackRate", {
                  get: function () {
                    return this._playbackRate
                  },
                  set: function (t) {
                    ;(this._playbackRate = t), this._setAll("playbackRate", t)
                  },
                }),
                Object.defineProperty(t.Part.prototype, "length", {
                  get: function () {
                    return this._events.length
                  },
                }),
                (t.Part.prototype.dispose = function () {
                  return (
                    this.removeAll(),
                    this._state.dispose(),
                    (this._state = null),
                    (this.callback = null),
                    (this._events = null),
                    this
                  )
                }),
                t.Part
              )
            }),
            e(function (t) {
              return (
                (t.Pattern = function () {
                  var e = t.defaults(
                    arguments,
                    ["callback", "values", "pattern"],
                    t.Pattern,
                  )
                  t.Loop.call(this, e),
                    (this._pattern = new t.CtrlPattern({
                      values: e.values,
                      type: e.pattern,
                      index: e.index,
                    }))
                }),
                t.extend(t.Pattern, t.Loop),
                (t.Pattern.defaults = {
                  pattern: t.CtrlPattern.Type.Up,
                  callback: t.noOp,
                  values: [],
                }),
                (t.Pattern.prototype._tick = function (t) {
                  this.callback(t, this._pattern.value), this._pattern.next()
                }),
                Object.defineProperty(t.Pattern.prototype, "index", {
                  get: function () {
                    return this._pattern.index
                  },
                  set: function (t) {
                    this._pattern.index = t
                  },
                }),
                Object.defineProperty(t.Pattern.prototype, "values", {
                  get: function () {
                    return this._pattern.values
                  },
                  set: function (t) {
                    this._pattern.values = t
                  },
                }),
                Object.defineProperty(t.Pattern.prototype, "value", {
                  get: function () {
                    return this._pattern.value
                  },
                }),
                Object.defineProperty(t.Pattern.prototype, "pattern", {
                  get: function () {
                    return this._pattern.type
                  },
                  set: function (t) {
                    this._pattern.type = t
                  },
                }),
                (t.Pattern.prototype.dispose = function () {
                  t.Loop.prototype.dispose.call(this),
                    this._pattern.dispose(),
                    (this._pattern = null)
                }),
                t.Pattern
              )
            }),
            e(function (t) {
              return (
                (t.Sequence = function () {
                  var e = t.defaults(
                      arguments,
                      ["callback", "events", "subdivision"],
                      t.Sequence,
                    ),
                    i = e.events
                  if (
                    (delete e.events,
                    t.Part.call(this, e),
                    (this._subdivision = this.toTicks(e.subdivision)),
                    t.isUndef(e.loopEnd) &&
                      t.isDefined(i) &&
                      (this._loopEnd = i.length * this._subdivision),
                    (this._loop = !0),
                    t.isDefined(i))
                  )
                    for (var n = 0; n < i.length; n++) this.add(n, i[n])
                }),
                t.extend(t.Sequence, t.Part),
                (t.Sequence.defaults = { subdivision: "4n" }),
                Object.defineProperty(t.Sequence.prototype, "subdivision", {
                  get: function () {
                    return t.Ticks(this._subdivision).toSeconds()
                  },
                }),
                (t.Sequence.prototype.at = function (e, i) {
                  return (
                    t.isArray(i) && this.remove(e),
                    t.Part.prototype.at.call(this, this._indexTime(e), i)
                  )
                }),
                (t.Sequence.prototype.add = function (e, i) {
                  if (null === i) return this
                  if (t.isArray(i)) {
                    var n = Math.round(this._subdivision / i.length)
                    i = new t.Sequence(this._tick.bind(this), i, t.Ticks(n))
                  }
                  return (
                    t.Part.prototype.add.call(this, this._indexTime(e), i), this
                  )
                }),
                (t.Sequence.prototype.remove = function (e, i) {
                  return (
                    t.Part.prototype.remove.call(this, this._indexTime(e), i),
                    this
                  )
                }),
                (t.Sequence.prototype._indexTime = function (e) {
                  return e instanceof t.TransportTime
                    ? e
                    : t
                        .Ticks(e * this._subdivision + this.startOffset)
                        .toSeconds()
                }),
                (t.Sequence.prototype.dispose = function () {
                  return t.Part.prototype.dispose.call(this), this
                }),
                t.Sequence
              )
            }),
            e(function (t) {
              return (
                (t.PulseOscillator = function () {
                  var e = t.defaults(
                    arguments,
                    ["frequency", "width"],
                    t.Oscillator,
                  )
                  t.Source.call(this, e),
                    (this.width = new t.Signal(e.width, t.Type.NormalRange)),
                    (this._widthGate = new t.Gain()),
                    (this._sawtooth = new t.Oscillator({
                      frequency: e.frequency,
                      detune: e.detune,
                      type: "sawtooth",
                      phase: e.phase,
                    })),
                    (this.frequency = this._sawtooth.frequency),
                    (this.detune = this._sawtooth.detune),
                    (this._thresh = new t.WaveShaper(function (t) {
                      return t < 0 ? -1 : 1
                    })),
                    this._sawtooth.chain(this._thresh, this.output),
                    this.width.chain(this._widthGate, this._thresh),
                    this._readOnly(["width", "frequency", "detune"])
                }),
                t.extend(t.PulseOscillator, t.Source),
                (t.PulseOscillator.defaults = {
                  frequency: 440,
                  detune: 0,
                  phase: 0,
                  width: 0.2,
                }),
                (t.PulseOscillator.prototype._start = function (t) {
                  ;(t = this.toSeconds(t)),
                    this._sawtooth.start(t),
                    this._widthGate.gain.setValueAtTime(1, t)
                }),
                (t.PulseOscillator.prototype._stop = function (t) {
                  ;(t = this.toSeconds(t)),
                    this._sawtooth.stop(t),
                    this._widthGate.gain.setValueAtTime(0, t)
                }),
                (t.PulseOscillator.prototype.restart = function (t) {
                  this._sawtooth.restart(t)
                }),
                Object.defineProperty(t.PulseOscillator.prototype, "phase", {
                  get: function () {
                    return this._sawtooth.phase
                  },
                  set: function (t) {
                    this._sawtooth.phase = t
                  },
                }),
                Object.defineProperty(t.PulseOscillator.prototype, "type", {
                  get: function () {
                    return "pulse"
                  },
                }),
                Object.defineProperty(t.PulseOscillator.prototype, "partials", {
                  get: function () {
                    return []
                  },
                }),
                (t.PulseOscillator.prototype.dispose = function () {
                  return (
                    t.Source.prototype.dispose.call(this),
                    this._sawtooth.dispose(),
                    (this._sawtooth = null),
                    this._writable(["width", "frequency", "detune"]),
                    this.width.dispose(),
                    (this.width = null),
                    this._widthGate.dispose(),
                    (this._widthGate = null),
                    this._thresh.dispose(),
                    (this._thresh = null),
                    (this.frequency = null),
                    (this.detune = null),
                    this
                  )
                }),
                t.PulseOscillator
              )
            }),
            e(function (t) {
              return (
                (t.PWMOscillator = function () {
                  var e = t.defaults(
                    arguments,
                    ["frequency", "modulationFrequency"],
                    t.PWMOscillator,
                  )
                  t.Source.call(this, e),
                    (this._pulse = new t.PulseOscillator(
                      e.modulationFrequency,
                    )),
                    (this._pulse._sawtooth.type = "sine"),
                    (this._modulator = new t.Oscillator({
                      frequency: e.frequency,
                      detune: e.detune,
                      phase: e.phase,
                    })),
                    (this._scale = new t.Multiply(2)),
                    (this.frequency = this._modulator.frequency),
                    (this.detune = this._modulator.detune),
                    (this.modulationFrequency = this._pulse.frequency),
                    this._modulator.chain(this._scale, this._pulse.width),
                    this._pulse.connect(this.output),
                    this._readOnly([
                      "modulationFrequency",
                      "frequency",
                      "detune",
                    ])
                }),
                t.extend(t.PWMOscillator, t.Source),
                (t.PWMOscillator.defaults = {
                  frequency: 440,
                  detune: 0,
                  phase: 0,
                  modulationFrequency: 0.4,
                }),
                (t.PWMOscillator.prototype._start = function (t) {
                  ;(t = this.toSeconds(t)),
                    this._modulator.start(t),
                    this._pulse.start(t)
                }),
                (t.PWMOscillator.prototype._stop = function (t) {
                  ;(t = this.toSeconds(t)),
                    this._modulator.stop(t),
                    this._pulse.stop(t)
                }),
                (t.PWMOscillator.prototype.restart = function (t) {
                  this._modulator.restart(t), this._pulse.restart(t)
                }),
                Object.defineProperty(t.PWMOscillator.prototype, "type", {
                  get: function () {
                    return "pwm"
                  },
                }),
                Object.defineProperty(t.PWMOscillator.prototype, "partials", {
                  get: function () {
                    return []
                  },
                }),
                Object.defineProperty(t.PWMOscillator.prototype, "phase", {
                  get: function () {
                    return this._modulator.phase
                  },
                  set: function (t) {
                    this._modulator.phase = t
                  },
                }),
                (t.PWMOscillator.prototype.dispose = function () {
                  return (
                    t.Source.prototype.dispose.call(this),
                    this._pulse.dispose(),
                    (this._pulse = null),
                    this._scale.dispose(),
                    (this._scale = null),
                    this._modulator.dispose(),
                    (this._modulator = null),
                    this._writable([
                      "modulationFrequency",
                      "frequency",
                      "detune",
                    ]),
                    (this.frequency = null),
                    (this.detune = null),
                    (this.modulationFrequency = null),
                    this
                  )
                }),
                t.PWMOscillator
              )
            }),
            e(function (t) {
              return (
                (t.FMOscillator = function () {
                  var e = t.defaults(
                    arguments,
                    ["frequency", "type", "modulationType"],
                    t.FMOscillator,
                  )
                  t.Source.call(this, e),
                    (this._carrier = new t.Oscillator(e.frequency, e.type)),
                    (this.frequency = new t.Signal(
                      e.frequency,
                      t.Type.Frequency,
                    )),
                    (this.detune = this._carrier.detune),
                    (this.detune.value = e.detune),
                    (this.modulationIndex = new t.Multiply(e.modulationIndex)),
                    (this.modulationIndex.units = t.Type.Positive),
                    (this._modulator = new t.Oscillator(
                      e.frequency,
                      e.modulationType,
                    )),
                    (this.harmonicity = new t.Multiply(e.harmonicity)),
                    (this.harmonicity.units = t.Type.Positive),
                    (this._modulationNode = new t.Gain(0)),
                    this.frequency.connect(this._carrier.frequency),
                    this.frequency.chain(
                      this.harmonicity,
                      this._modulator.frequency,
                    ),
                    this.frequency.chain(
                      this.modulationIndex,
                      this._modulationNode,
                    ),
                    this._modulator.connect(this._modulationNode.gain),
                    this._modulationNode.connect(this._carrier.frequency),
                    this._carrier.connect(this.output),
                    this.detune.connect(this._modulator.detune),
                    (this.phase = e.phase),
                    this._readOnly([
                      "modulationIndex",
                      "frequency",
                      "detune",
                      "harmonicity",
                    ])
                }),
                t.extend(t.FMOscillator, t.Source),
                (t.FMOscillator.defaults = {
                  frequency: 440,
                  detune: 0,
                  phase: 0,
                  modulationIndex: 2,
                  modulationType: "square",
                  harmonicity: 1,
                }),
                (t.FMOscillator.prototype._start = function (t) {
                  this._modulator.start(t), this._carrier.start(t)
                }),
                (t.FMOscillator.prototype._stop = function (t) {
                  this._modulator.stop(t), this._carrier.stop(t)
                }),
                (t.FMOscillator.prototype.restart = function (t) {
                  this._modulator.restart(t), this._carrier.restart(t)
                }),
                Object.defineProperty(t.FMOscillator.prototype, "type", {
                  get: function () {
                    return this._carrier.type
                  },
                  set: function (t) {
                    this._carrier.type = t
                  },
                }),
                Object.defineProperty(
                  t.FMOscillator.prototype,
                  "modulationType",
                  {
                    get: function () {
                      return this._modulator.type
                    },
                    set: function (t) {
                      this._modulator.type = t
                    },
                  },
                ),
                Object.defineProperty(t.FMOscillator.prototype, "phase", {
                  get: function () {
                    return this._carrier.phase
                  },
                  set: function (t) {
                    ;(this._carrier.phase = t), (this._modulator.phase = t)
                  },
                }),
                Object.defineProperty(t.FMOscillator.prototype, "partials", {
                  get: function () {
                    return this._carrier.partials
                  },
                  set: function (t) {
                    this._carrier.partials = t
                  },
                }),
                (t.FMOscillator.prototype.dispose = function () {
                  return (
                    t.Source.prototype.dispose.call(this),
                    this._writable([
                      "modulationIndex",
                      "frequency",
                      "detune",
                      "harmonicity",
                    ]),
                    this.frequency.dispose(),
                    (this.frequency = null),
                    (this.detune = null),
                    this.harmonicity.dispose(),
                    (this.harmonicity = null),
                    this._carrier.dispose(),
                    (this._carrier = null),
                    this._modulator.dispose(),
                    (this._modulator = null),
                    this._modulationNode.dispose(),
                    (this._modulationNode = null),
                    this.modulationIndex.dispose(),
                    (this.modulationIndex = null),
                    this
                  )
                }),
                t.FMOscillator
              )
            }),
            e(function (t) {
              return (
                (t.AMOscillator = function () {
                  var e = t.defaults(
                    arguments,
                    ["frequency", "type", "modulationType"],
                    t.AMOscillator,
                  )
                  t.Source.call(this, e),
                    (this._carrier = new t.Oscillator(e.frequency, e.type)),
                    (this.frequency = this._carrier.frequency),
                    (this.detune = this._carrier.detune),
                    (this.detune.value = e.detune),
                    (this._modulator = new t.Oscillator(
                      e.frequency,
                      e.modulationType,
                    )),
                    (this._modulationScale = new t.AudioToGain()),
                    (this.harmonicity = new t.Multiply(e.harmonicity)),
                    (this.harmonicity.units = t.Type.Positive),
                    (this._modulationNode = new t.Gain(0)),
                    this.frequency.chain(
                      this.harmonicity,
                      this._modulator.frequency,
                    ),
                    this.detune.connect(this._modulator.detune),
                    this._modulator.chain(
                      this._modulationScale,
                      this._modulationNode.gain,
                    ),
                    this._carrier.chain(this._modulationNode, this.output),
                    (this.phase = e.phase),
                    this._readOnly(["frequency", "detune", "harmonicity"])
                }),
                t.extend(t.AMOscillator, t.Oscillator),
                (t.AMOscillator.defaults = {
                  frequency: 440,
                  detune: 0,
                  phase: 0,
                  modulationType: "square",
                  harmonicity: 1,
                }),
                (t.AMOscillator.prototype._start = function (t) {
                  this._modulator.start(t), this._carrier.start(t)
                }),
                (t.AMOscillator.prototype._stop = function (t) {
                  this._modulator.stop(t), this._carrier.stop(t)
                }),
                (t.AMOscillator.prototype.restart = function (t) {
                  this._modulator.restart(t), this._carrier.restart(t)
                }),
                Object.defineProperty(t.AMOscillator.prototype, "type", {
                  get: function () {
                    return this._carrier.type
                  },
                  set: function (t) {
                    this._carrier.type = t
                  },
                }),
                Object.defineProperty(
                  t.AMOscillator.prototype,
                  "modulationType",
                  {
                    get: function () {
                      return this._modulator.type
                    },
                    set: function (t) {
                      this._modulator.type = t
                    },
                  },
                ),
                Object.defineProperty(t.AMOscillator.prototype, "phase", {
                  get: function () {
                    return this._carrier.phase
                  },
                  set: function (t) {
                    ;(this._carrier.phase = t), (this._modulator.phase = t)
                  },
                }),
                Object.defineProperty(t.AMOscillator.prototype, "partials", {
                  get: function () {
                    return this._carrier.partials
                  },
                  set: function (t) {
                    this._carrier.partials = t
                  },
                }),
                (t.AMOscillator.prototype.dispose = function () {
                  return (
                    t.Source.prototype.dispose.call(this),
                    this._writable(["frequency", "detune", "harmonicity"]),
                    (this.frequency = null),
                    (this.detune = null),
                    this.harmonicity.dispose(),
                    (this.harmonicity = null),
                    this._carrier.dispose(),
                    (this._carrier = null),
                    this._modulator.dispose(),
                    (this._modulator = null),
                    this._modulationNode.dispose(),
                    (this._modulationNode = null),
                    this._modulationScale.dispose(),
                    (this._modulationScale = null),
                    this
                  )
                }),
                t.AMOscillator
              )
            }),
            e(function (t) {
              return (
                (t.FatOscillator = function () {
                  var e = t.defaults(
                    arguments,
                    ["frequency", "type", "spread"],
                    t.FatOscillator,
                  )
                  t.Source.call(this, e),
                    (this.frequency = new t.Signal(
                      e.frequency,
                      t.Type.Frequency,
                    )),
                    (this.detune = new t.Signal(e.detune, t.Type.Cents)),
                    (this._oscillators = []),
                    (this._spread = e.spread),
                    (this._type = e.type),
                    (this._phase = e.phase),
                    (this._partials = t.defaultArg(e.partials, [])),
                    (this.count = e.count),
                    this._readOnly(["frequency", "detune"])
                }),
                t.extend(t.FatOscillator, t.Source),
                (t.FatOscillator.defaults = {
                  frequency: 440,
                  detune: 0,
                  phase: 0,
                  spread: 20,
                  count: 3,
                  type: "sawtooth",
                }),
                (t.FatOscillator.prototype._start = function (t) {
                  ;(t = this.toSeconds(t)),
                    this._forEach(function (e) {
                      e.start(t)
                    })
                }),
                (t.FatOscillator.prototype._stop = function (t) {
                  ;(t = this.toSeconds(t)),
                    this._forEach(function (e) {
                      e.stop(t)
                    })
                }),
                (t.FatOscillator.prototype.restart = function (t) {
                  ;(t = this.toSeconds(t)),
                    this._forEach(function (e) {
                      e.restart(t)
                    })
                }),
                (t.FatOscillator.prototype._forEach = function (t) {
                  for (var e = 0; e < this._oscillators.length; e++)
                    t.call(this, this._oscillators[e], e)
                }),
                Object.defineProperty(t.FatOscillator.prototype, "type", {
                  get: function () {
                    return this._type
                  },
                  set: function (t) {
                    ;(this._type = t),
                      this._forEach(function (e) {
                        e.type = t
                      })
                  },
                }),
                Object.defineProperty(t.FatOscillator.prototype, "spread", {
                  get: function () {
                    return this._spread
                  },
                  set: function (t) {
                    if (((this._spread = t), this._oscillators.length > 1)) {
                      var e = -t / 2,
                        i = t / (this._oscillators.length - 1)
                      this._forEach(function (t, n) {
                        t.detune.value = e + i * n
                      })
                    }
                  },
                }),
                Object.defineProperty(t.FatOscillator.prototype, "count", {
                  get: function () {
                    return this._oscillators.length
                  },
                  set: function (e) {
                    if (
                      ((e = Math.max(e, 1)), this._oscillators.length !== e)
                    ) {
                      this._forEach(function (t) {
                        t.dispose()
                      }),
                        (this._oscillators = [])
                      for (var i = 0; i < e; i++) {
                        var n = new t.Oscillator()
                        this.type === t.Oscillator.Type.Custom
                          ? (n.partials = this._partials)
                          : (n.type = this._type),
                          (n.phase = this._phase),
                          (n.volume.value = -6 - 1.1 * e),
                          this.frequency.connect(n.frequency),
                          this.detune.connect(n.detune),
                          n.connect(this.output),
                          (this._oscillators[i] = n)
                      }
                      ;(this.spread = this._spread),
                        this.state === t.State.Started &&
                          this._forEach(function (t) {
                            t.start()
                          })
                    }
                  },
                }),
                Object.defineProperty(t.FatOscillator.prototype, "phase", {
                  get: function () {
                    return this._phase
                  },
                  set: function (t) {
                    ;(this._phase = t),
                      this._forEach(function (e) {
                        e.phase = t
                      })
                  },
                }),
                Object.defineProperty(t.FatOscillator.prototype, "partials", {
                  get: function () {
                    return this._partials
                  },
                  set: function (e) {
                    ;(this._partials = e),
                      (this._type = t.Oscillator.Type.Custom),
                      this._forEach(function (t) {
                        t.partials = e
                      })
                  },
                }),
                (t.FatOscillator.prototype.dispose = function () {
                  return (
                    t.Source.prototype.dispose.call(this),
                    this._writable(["frequency", "detune"]),
                    this.frequency.dispose(),
                    (this.frequency = null),
                    this.detune.dispose(),
                    (this.detune = null),
                    this._forEach(function (t) {
                      t.dispose()
                    }),
                    (this._oscillators = null),
                    (this._partials = null),
                    this
                  )
                }),
                t.FatOscillator
              )
            }),
            e(function (t) {
              ;(t.OmniOscillator = function () {
                var e = t.defaults(
                  arguments,
                  ["frequency", "type"],
                  t.OmniOscillator,
                )
                t.Source.call(this, e),
                  (this.frequency = new t.Signal(
                    e.frequency,
                    t.Type.Frequency,
                  )),
                  (this.detune = new t.Signal(e.detune, t.Type.Cents)),
                  (this._sourceType = void 0),
                  (this._oscillator = null),
                  (this.type = e.type),
                  this._readOnly(["frequency", "detune"]),
                  this.set(e)
              }),
                t.extend(t.OmniOscillator, t.Source),
                (t.OmniOscillator.defaults = {
                  frequency: 440,
                  detune: 0,
                  type: "sine",
                  phase: 0,
                })
              var e = "PulseOscillator",
                i = "PWMOscillator",
                n = "Oscillator",
                s = "FMOscillator",
                o = "AMOscillator",
                r = "FatOscillator"
              return (
                (t.OmniOscillator.prototype._start = function (t) {
                  this._oscillator.start(t)
                }),
                (t.OmniOscillator.prototype._stop = function (t) {
                  this._oscillator.stop(t)
                }),
                (t.OmniOscillator.prototype.restart = function (t) {
                  this._oscillator.restart(t)
                }),
                Object.defineProperty(t.OmniOscillator.prototype, "type", {
                  get: function () {
                    var t = ""
                    return (
                      this._sourceType === s
                        ? (t = "fm")
                        : this._sourceType === o
                        ? (t = "am")
                        : this._sourceType === r && (t = "fat"),
                      t + this._oscillator.type
                    )
                  },
                  set: function (t) {
                    "fm" === t.substr(0, 2)
                      ? (this._createNewOscillator(s),
                        (this._oscillator.type = t.substr(2)))
                      : "am" === t.substr(0, 2)
                      ? (this._createNewOscillator(o),
                        (this._oscillator.type = t.substr(2)))
                      : "fat" === t.substr(0, 3)
                      ? (this._createNewOscillator(r),
                        (this._oscillator.type = t.substr(3)))
                      : "pwm" === t
                      ? this._createNewOscillator(i)
                      : "pulse" === t
                      ? this._createNewOscillator(e)
                      : (this._createNewOscillator(n),
                        (this._oscillator.type = t))
                  },
                }),
                Object.defineProperty(t.OmniOscillator.prototype, "partials", {
                  get: function () {
                    return this._oscillator.partials
                  },
                  set: function (t) {
                    this._oscillator.partials = t
                  },
                }),
                (t.OmniOscillator.prototype.set = function (e, i) {
                  return (
                    "type" === e
                      ? (this.type = i)
                      : t.isObject(e) &&
                        e.hasOwnProperty("type") &&
                        (this.type = e.type),
                    t.prototype.set.apply(this, arguments),
                    this
                  )
                }),
                (t.OmniOscillator.prototype._createNewOscillator = function (
                  e,
                ) {
                  if (e !== this._sourceType) {
                    this._sourceType = e
                    var i = t[e],
                      n = this.now()
                    if (null !== this._oscillator) {
                      var s = this._oscillator
                      s.stop(n),
                        this.context.setTimeout(function () {
                          s.dispose(), (s = null)
                        }, this.blockTime)
                    }
                    ;(this._oscillator = new i()),
                      this.frequency.connect(this._oscillator.frequency),
                      this.detune.connect(this._oscillator.detune),
                      this._oscillator.connect(this.output),
                      this.state === t.State.Started &&
                        this._oscillator.start(n)
                  }
                }),
                Object.defineProperty(t.OmniOscillator.prototype, "phase", {
                  get: function () {
                    return this._oscillator.phase
                  },
                  set: function (t) {
                    this._oscillator.phase = t
                  },
                }),
                Object.defineProperty(t.OmniOscillator.prototype, "width", {
                  get: function () {
                    if (this._sourceType === e) return this._oscillator.width
                  },
                }),
                Object.defineProperty(t.OmniOscillator.prototype, "count", {
                  get: function () {
                    if (this._sourceType === r) return this._oscillator.count
                  },
                  set: function (t) {
                    this._sourceType === r && (this._oscillator.count = t)
                  },
                }),
                Object.defineProperty(t.OmniOscillator.prototype, "spread", {
                  get: function () {
                    if (this._sourceType === r) return this._oscillator.spread
                  },
                  set: function (t) {
                    this._sourceType === r && (this._oscillator.spread = t)
                  },
                }),
                Object.defineProperty(
                  t.OmniOscillator.prototype,
                  "modulationType",
                  {
                    get: function () {
                      if (this._sourceType === s || this._sourceType === o)
                        return this._oscillator.modulationType
                    },
                    set: function (t) {
                      ;(this._sourceType !== s && this._sourceType !== o) ||
                        (this._oscillator.modulationType = t)
                    },
                  },
                ),
                Object.defineProperty(
                  t.OmniOscillator.prototype,
                  "modulationIndex",
                  {
                    get: function () {
                      if (this._sourceType === s)
                        return this._oscillator.modulationIndex
                    },
                  },
                ),
                Object.defineProperty(
                  t.OmniOscillator.prototype,
                  "harmonicity",
                  {
                    get: function () {
                      if (this._sourceType === s || this._sourceType === o)
                        return this._oscillator.harmonicity
                    },
                  },
                ),
                Object.defineProperty(
                  t.OmniOscillator.prototype,
                  "modulationFrequency",
                  {
                    get: function () {
                      if (this._sourceType === i)
                        return this._oscillator.modulationFrequency
                    },
                  },
                ),
                (t.OmniOscillator.prototype.dispose = function () {
                  return (
                    t.Source.prototype.dispose.call(this),
                    this._writable(["frequency", "detune"]),
                    this.detune.dispose(),
                    (this.detune = null),
                    this.frequency.dispose(),
                    (this.frequency = null),
                    this._oscillator.dispose(),
                    (this._oscillator = null),
                    (this._sourceType = null),
                    this
                  )
                }),
                t.OmniOscillator
              )
            }),
            e(function (t) {
              return (
                (t.Instrument = function (e) {
                  ;(e = t.defaultArg(e, t.Instrument.defaults)),
                    t.AudioNode.call(this),
                    (this._volume = this.output = new t.Volume(e.volume)),
                    (this.volume = this._volume.volume),
                    this._readOnly("volume"),
                    (this._scheduledEvents = [])
                }),
                t.extend(t.Instrument, t.AudioNode),
                (t.Instrument.defaults = { volume: 0 }),
                (t.Instrument.prototype.triggerAttack = t.noOp),
                (t.Instrument.prototype.triggerRelease = t.noOp),
                (t.Instrument.prototype.sync = function () {
                  return (
                    this._syncMethod("triggerAttack", 1),
                    this._syncMethod("triggerRelease", 0),
                    this
                  )
                }),
                (t.Instrument.prototype._syncMethod = function (e, i) {
                  var n = (this["_original_" + e] = this[e])
                  this[e] = function () {
                    var e = Array.prototype.slice.call(arguments),
                      s = e[i],
                      o = t.Transport.schedule(
                        function (t) {
                          ;(e[i] = t), n.apply(this, e)
                        }.bind(this),
                        s,
                      )
                    this._scheduledEvents.push(o)
                  }.bind(this)
                }),
                (t.Instrument.prototype.unsync = function () {
                  return (
                    this._scheduledEvents.forEach(function (e) {
                      t.Transport.clear(e)
                    }),
                    (this._scheduledEvents = []),
                    this._original_triggerAttack &&
                      ((this.triggerAttack = this._original_triggerAttack),
                      (this.triggerRelease = this._original_triggerRelease)),
                    this
                  )
                }),
                (t.Instrument.prototype.triggerAttackRelease = function (
                  t,
                  e,
                  i,
                  n,
                ) {
                  return (
                    (i = this.toSeconds(i)),
                    (e = this.toSeconds(e)),
                    this.triggerAttack(t, i, n),
                    this.triggerRelease(i + e),
                    this
                  )
                }),
                (t.Instrument.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._volume.dispose(),
                    (this._volume = null),
                    this._writable(["volume"]),
                    (this.volume = null),
                    this.unsync(),
                    (this._scheduledEvents = null),
                    this
                  )
                }),
                t.Instrument
              )
            }),
            e(function (t) {
              return (
                (t.Monophonic = function (e) {
                  ;(e = t.defaultArg(e, t.Monophonic.defaults)),
                    t.Instrument.call(this, e),
                    (this.portamento = e.portamento)
                }),
                t.extend(t.Monophonic, t.Instrument),
                (t.Monophonic.defaults = { portamento: 0 }),
                (t.Monophonic.prototype.triggerAttack = function (t, e, i) {
                  return (
                    (e = this.toSeconds(e)),
                    this._triggerEnvelopeAttack(e, i),
                    this.setNote(t, e),
                    this
                  )
                }),
                (t.Monophonic.prototype.triggerRelease = function (t) {
                  return (
                    (t = this.toSeconds(t)),
                    this._triggerEnvelopeRelease(t),
                    this
                  )
                }),
                (t.Monophonic.prototype._triggerEnvelopeAttack =
                  function () {}),
                (t.Monophonic.prototype._triggerEnvelopeRelease =
                  function () {}),
                (t.Monophonic.prototype.getLevelAtTime = function (t) {
                  return (
                    (t = this.toSeconds(t)), this.envelope.getValueAtTime(t)
                  )
                }),
                (t.Monophonic.prototype.setNote = function (t, e) {
                  if (
                    ((e = this.toSeconds(e)),
                    this.portamento > 0 && this.getLevelAtTime(e) > 0.05)
                  ) {
                    var i = this.toSeconds(this.portamento)
                    this.frequency.exponentialRampTo(t, i, e)
                  } else this.frequency.setValueAtTime(t, e)
                  return this
                }),
                t.Monophonic
              )
            }),
            e(function (t) {
              return (
                (t.Synth = function (e) {
                  ;(e = t.defaultArg(e, t.Synth.defaults)),
                    t.Monophonic.call(this, e),
                    (this.oscillator = new t.OmniOscillator(e.oscillator)),
                    (this.frequency = this.oscillator.frequency),
                    (this.detune = this.oscillator.detune),
                    (this.envelope = new t.AmplitudeEnvelope(e.envelope)),
                    this.oscillator.chain(this.envelope, this.output),
                    this._readOnly([
                      "oscillator",
                      "frequency",
                      "detune",
                      "envelope",
                    ])
                }),
                t.extend(t.Synth, t.Monophonic),
                (t.Synth.defaults = {
                  oscillator: { type: "triangle" },
                  envelope: {
                    attack: 0.005,
                    decay: 0.1,
                    sustain: 0.3,
                    release: 1,
                  },
                }),
                (t.Synth.prototype._triggerEnvelopeAttack = function (t, e) {
                  return (
                    this.envelope.triggerAttack(t, e),
                    this.oscillator.start(t),
                    0 === this.envelope.sustain &&
                      this.oscillator.stop(
                        t + this.envelope.attack + this.envelope.decay,
                      ),
                    this
                  )
                }),
                (t.Synth.prototype._triggerEnvelopeRelease = function (t) {
                  return (
                    (t = this.toSeconds(t)),
                    this.envelope.triggerRelease(t),
                    this.oscillator.stop(t + this.envelope.release),
                    this
                  )
                }),
                (t.Synth.prototype.dispose = function () {
                  return (
                    t.Monophonic.prototype.dispose.call(this),
                    this._writable([
                      "oscillator",
                      "frequency",
                      "detune",
                      "envelope",
                    ]),
                    this.oscillator.dispose(),
                    (this.oscillator = null),
                    this.envelope.dispose(),
                    (this.envelope = null),
                    (this.frequency = null),
                    (this.detune = null),
                    this
                  )
                }),
                t.Synth
              )
            }),
            e(function (t) {
              return (
                (t.AMSynth = function (e) {
                  ;(e = t.defaultArg(e, t.AMSynth.defaults)),
                    t.Monophonic.call(this, e),
                    (this._carrier = new t.Synth()),
                    (this._carrier.volume.value = -10),
                    (this.oscillator = this._carrier.oscillator),
                    (this.envelope = this._carrier.envelope.set(e.envelope)),
                    (this._modulator = new t.Synth()),
                    (this._modulator.volume.value = -10),
                    (this.modulation = this._modulator.oscillator.set(
                      e.modulation,
                    )),
                    (this.modulationEnvelope = this._modulator.envelope.set(
                      e.modulationEnvelope,
                    )),
                    (this.frequency = new t.Signal(440, t.Type.Frequency)),
                    (this.detune = new t.Signal(e.detune, t.Type.Cents)),
                    (this.harmonicity = new t.Multiply(e.harmonicity)),
                    (this.harmonicity.units = t.Type.Positive),
                    (this._modulationScale = new t.AudioToGain()),
                    (this._modulationNode = new t.Gain()),
                    this.frequency.connect(this._carrier.frequency),
                    this.frequency.chain(
                      this.harmonicity,
                      this._modulator.frequency,
                    ),
                    this.detune.fan(
                      this._carrier.detune,
                      this._modulator.detune,
                    ),
                    this._modulator.chain(
                      this._modulationScale,
                      this._modulationNode.gain,
                    ),
                    this._carrier.chain(this._modulationNode, this.output),
                    this._readOnly([
                      "frequency",
                      "harmonicity",
                      "oscillator",
                      "envelope",
                      "modulation",
                      "modulationEnvelope",
                      "detune",
                    ])
                }),
                t.extend(t.AMSynth, t.Monophonic),
                (t.AMSynth.defaults = {
                  harmonicity: 3,
                  detune: 0,
                  oscillator: { type: "sine" },
                  envelope: {
                    attack: 0.01,
                    decay: 0.01,
                    sustain: 1,
                    release: 0.5,
                  },
                  modulation: { type: "square" },
                  modulationEnvelope: {
                    attack: 0.5,
                    decay: 0,
                    sustain: 1,
                    release: 0.5,
                  },
                }),
                (t.AMSynth.prototype._triggerEnvelopeAttack = function (t, e) {
                  return (
                    (t = this.toSeconds(t)),
                    this._carrier._triggerEnvelopeAttack(t, e),
                    this._modulator._triggerEnvelopeAttack(t),
                    this
                  )
                }),
                (t.AMSynth.prototype._triggerEnvelopeRelease = function (t) {
                  return (
                    this._carrier._triggerEnvelopeRelease(t),
                    this._modulator._triggerEnvelopeRelease(t),
                    this
                  )
                }),
                (t.AMSynth.prototype.dispose = function () {
                  return (
                    t.Monophonic.prototype.dispose.call(this),
                    this._writable([
                      "frequency",
                      "harmonicity",
                      "oscillator",
                      "envelope",
                      "modulation",
                      "modulationEnvelope",
                      "detune",
                    ]),
                    this._carrier.dispose(),
                    (this._carrier = null),
                    this._modulator.dispose(),
                    (this._modulator = null),
                    this.frequency.dispose(),
                    (this.frequency = null),
                    this.detune.dispose(),
                    (this.detune = null),
                    this.harmonicity.dispose(),
                    (this.harmonicity = null),
                    this._modulationScale.dispose(),
                    (this._modulationScale = null),
                    this._modulationNode.dispose(),
                    (this._modulationNode = null),
                    (this.oscillator = null),
                    (this.envelope = null),
                    (this.modulationEnvelope = null),
                    (this.modulation = null),
                    this
                  )
                }),
                t.AMSynth
              )
            }),
            e(function (t) {
              return (
                (t.MonoSynth = function (e) {
                  ;(e = t.defaultArg(e, t.MonoSynth.defaults)),
                    t.Monophonic.call(this, e),
                    (this.oscillator = new t.OmniOscillator(e.oscillator)),
                    (this.frequency = this.oscillator.frequency),
                    (this.detune = this.oscillator.detune),
                    (this.filter = new t.Filter(e.filter)),
                    (this.filterEnvelope = new t.FrequencyEnvelope(
                      e.filterEnvelope,
                    )),
                    (this.envelope = new t.AmplitudeEnvelope(e.envelope)),
                    this.oscillator.chain(
                      this.filter,
                      this.envelope,
                      this.output,
                    ),
                    this.filterEnvelope.connect(this.filter.frequency),
                    this._readOnly([
                      "oscillator",
                      "frequency",
                      "detune",
                      "filter",
                      "filterEnvelope",
                      "envelope",
                    ])
                }),
                t.extend(t.MonoSynth, t.Monophonic),
                (t.MonoSynth.defaults = {
                  frequency: "C4",
                  detune: 0,
                  oscillator: { type: "square" },
                  filter: { Q: 6, type: "lowpass", rolloff: -24 },
                  envelope: {
                    attack: 0.005,
                    decay: 0.1,
                    sustain: 0.9,
                    release: 1,
                  },
                  filterEnvelope: {
                    attack: 0.06,
                    decay: 0.2,
                    sustain: 0.5,
                    release: 2,
                    baseFrequency: 200,
                    octaves: 7,
                    exponent: 2,
                  },
                }),
                (t.MonoSynth.prototype._triggerEnvelopeAttack = function (
                  t,
                  e,
                ) {
                  return (
                    (t = this.toSeconds(t)),
                    this.envelope.triggerAttack(t, e),
                    this.filterEnvelope.triggerAttack(t),
                    this.oscillator.start(t),
                    0 === this.envelope.sustain &&
                      this.oscillator.stop(
                        t + this.envelope.attack + this.envelope.decay,
                      ),
                    this
                  )
                }),
                (t.MonoSynth.prototype._triggerEnvelopeRelease = function (t) {
                  return (
                    this.envelope.triggerRelease(t),
                    this.filterEnvelope.triggerRelease(t),
                    this.oscillator.stop(t + this.envelope.release),
                    this
                  )
                }),
                (t.MonoSynth.prototype.dispose = function () {
                  return (
                    t.Monophonic.prototype.dispose.call(this),
                    this._writable([
                      "oscillator",
                      "frequency",
                      "detune",
                      "filter",
                      "filterEnvelope",
                      "envelope",
                    ]),
                    this.oscillator.dispose(),
                    (this.oscillator = null),
                    this.envelope.dispose(),
                    (this.envelope = null),
                    this.filterEnvelope.dispose(),
                    (this.filterEnvelope = null),
                    this.filter.dispose(),
                    (this.filter = null),
                    (this.frequency = null),
                    (this.detune = null),
                    this
                  )
                }),
                t.MonoSynth
              )
            }),
            e(function (t) {
              return (
                (t.DuoSynth = function (e) {
                  ;(e = t.defaultArg(e, t.DuoSynth.defaults)),
                    t.Monophonic.call(this, e),
                    (this.voice0 = new t.MonoSynth(e.voice0)),
                    (this.voice0.volume.value = -10),
                    (this.voice1 = new t.MonoSynth(e.voice1)),
                    (this.voice1.volume.value = -10),
                    (this._vibrato = new t.LFO(e.vibratoRate, -50, 50)),
                    this._vibrato.start(),
                    (this.vibratoRate = this._vibrato.frequency),
                    (this._vibratoGain = new t.Gain(
                      e.vibratoAmount,
                      t.Type.Positive,
                    )),
                    (this.vibratoAmount = this._vibratoGain.gain),
                    (this.frequency = new t.Signal(440, t.Type.Frequency)),
                    (this.harmonicity = new t.Multiply(e.harmonicity)),
                    (this.harmonicity.units = t.Type.Positive),
                    this.frequency.connect(this.voice0.frequency),
                    this.frequency.chain(
                      this.harmonicity,
                      this.voice1.frequency,
                    ),
                    this._vibrato.connect(this._vibratoGain),
                    this._vibratoGain.fan(
                      this.voice0.detune,
                      this.voice1.detune,
                    ),
                    this.voice0.connect(this.output),
                    this.voice1.connect(this.output),
                    this._readOnly([
                      "voice0",
                      "voice1",
                      "frequency",
                      "vibratoAmount",
                      "vibratoRate",
                    ])
                }),
                t.extend(t.DuoSynth, t.Monophonic),
                (t.DuoSynth.defaults = {
                  vibratoAmount: 0.5,
                  vibratoRate: 5,
                  harmonicity: 1.5,
                  voice0: {
                    volume: -10,
                    portamento: 0,
                    oscillator: { type: "sine" },
                    filterEnvelope: {
                      attack: 0.01,
                      decay: 0,
                      sustain: 1,
                      release: 0.5,
                    },
                    envelope: {
                      attack: 0.01,
                      decay: 0,
                      sustain: 1,
                      release: 0.5,
                    },
                  },
                  voice1: {
                    volume: -10,
                    portamento: 0,
                    oscillator: { type: "sine" },
                    filterEnvelope: {
                      attack: 0.01,
                      decay: 0,
                      sustain: 1,
                      release: 0.5,
                    },
                    envelope: {
                      attack: 0.01,
                      decay: 0,
                      sustain: 1,
                      release: 0.5,
                    },
                  },
                }),
                (t.DuoSynth.prototype._triggerEnvelopeAttack = function (t, e) {
                  return (
                    (t = this.toSeconds(t)),
                    this.voice0._triggerEnvelopeAttack(t, e),
                    this.voice1._triggerEnvelopeAttack(t, e),
                    this
                  )
                }),
                (t.DuoSynth.prototype._triggerEnvelopeRelease = function (t) {
                  return (
                    this.voice0._triggerEnvelopeRelease(t),
                    this.voice1._triggerEnvelopeRelease(t),
                    this
                  )
                }),
                (t.DuoSynth.prototype.getLevelAtTime = function (t) {
                  return (
                    (this.voice0.getLevelAtTime(t) +
                      this.voice1.getLevelAtTime(t)) /
                    2
                  )
                }),
                (t.DuoSynth.prototype.dispose = function () {
                  return (
                    t.Monophonic.prototype.dispose.call(this),
                    this._writable([
                      "voice0",
                      "voice1",
                      "frequency",
                      "vibratoAmount",
                      "vibratoRate",
                    ]),
                    this.voice0.dispose(),
                    (this.voice0 = null),
                    this.voice1.dispose(),
                    (this.voice1 = null),
                    this.frequency.dispose(),
                    (this.frequency = null),
                    this._vibratoGain.dispose(),
                    (this._vibratoGain = null),
                    (this._vibrato = null),
                    this.harmonicity.dispose(),
                    (this.harmonicity = null),
                    this.vibratoAmount.dispose(),
                    (this.vibratoAmount = null),
                    (this.vibratoRate = null),
                    this
                  )
                }),
                t.DuoSynth
              )
            }),
            e(function (t) {
              return (
                (t.FMSynth = function (e) {
                  ;(e = t.defaultArg(e, t.FMSynth.defaults)),
                    t.Monophonic.call(this, e),
                    (this._carrier = new t.Synth(e.carrier)),
                    (this._carrier.volume.value = -10),
                    (this.oscillator = this._carrier.oscillator),
                    (this.envelope = this._carrier.envelope.set(e.envelope)),
                    (this._modulator = new t.Synth(e.modulator)),
                    (this._modulator.volume.value = -10),
                    (this.modulation = this._modulator.oscillator.set(
                      e.modulation,
                    )),
                    (this.modulationEnvelope = this._modulator.envelope.set(
                      e.modulationEnvelope,
                    )),
                    (this.frequency = new t.Signal(440, t.Type.Frequency)),
                    (this.detune = new t.Signal(e.detune, t.Type.Cents)),
                    (this.harmonicity = new t.Multiply(e.harmonicity)),
                    (this.harmonicity.units = t.Type.Positive),
                    (this.modulationIndex = new t.Multiply(e.modulationIndex)),
                    (this.modulationIndex.units = t.Type.Positive),
                    (this._modulationNode = new t.Gain(0)),
                    this.frequency.connect(this._carrier.frequency),
                    this.frequency.chain(
                      this.harmonicity,
                      this._modulator.frequency,
                    ),
                    this.frequency.chain(
                      this.modulationIndex,
                      this._modulationNode,
                    ),
                    this.detune.fan(
                      this._carrier.detune,
                      this._modulator.detune,
                    ),
                    this._modulator.connect(this._modulationNode.gain),
                    this._modulationNode.connect(this._carrier.frequency),
                    this._carrier.connect(this.output),
                    this._readOnly([
                      "frequency",
                      "harmonicity",
                      "modulationIndex",
                      "oscillator",
                      "envelope",
                      "modulation",
                      "modulationEnvelope",
                      "detune",
                    ])
                }),
                t.extend(t.FMSynth, t.Monophonic),
                (t.FMSynth.defaults = {
                  harmonicity: 3,
                  modulationIndex: 10,
                  detune: 0,
                  oscillator: { type: "sine" },
                  envelope: {
                    attack: 0.01,
                    decay: 0.01,
                    sustain: 1,
                    release: 0.5,
                  },
                  modulation: { type: "square" },
                  modulationEnvelope: {
                    attack: 0.5,
                    decay: 0,
                    sustain: 1,
                    release: 0.5,
                  },
                }),
                (t.FMSynth.prototype._triggerEnvelopeAttack = function (t, e) {
                  return (
                    (t = this.toSeconds(t)),
                    this._carrier._triggerEnvelopeAttack(t, e),
                    this._modulator._triggerEnvelopeAttack(t),
                    this
                  )
                }),
                (t.FMSynth.prototype._triggerEnvelopeRelease = function (t) {
                  return (
                    (t = this.toSeconds(t)),
                    this._carrier._triggerEnvelopeRelease(t),
                    this._modulator._triggerEnvelopeRelease(t),
                    this
                  )
                }),
                (t.FMSynth.prototype.dispose = function () {
                  return (
                    t.Monophonic.prototype.dispose.call(this),
                    this._writable([
                      "frequency",
                      "harmonicity",
                      "modulationIndex",
                      "oscillator",
                      "envelope",
                      "modulation",
                      "modulationEnvelope",
                      "detune",
                    ]),
                    this._carrier.dispose(),
                    (this._carrier = null),
                    this._modulator.dispose(),
                    (this._modulator = null),
                    this.frequency.dispose(),
                    (this.frequency = null),
                    this.detune.dispose(),
                    (this.detune = null),
                    this.modulationIndex.dispose(),
                    (this.modulationIndex = null),
                    this.harmonicity.dispose(),
                    (this.harmonicity = null),
                    this._modulationNode.dispose(),
                    (this._modulationNode = null),
                    (this.oscillator = null),
                    (this.envelope = null),
                    (this.modulationEnvelope = null),
                    (this.modulation = null),
                    this
                  )
                }),
                t.FMSynth
              )
            }),
            e(function (t) {
              return (
                (t.MembraneSynth = function (e) {
                  ;(e = t.defaultArg(e, t.MembraneSynth.defaults)),
                    t.Instrument.call(this, e),
                    (this.oscillator = new t.OmniOscillator(e.oscillator)),
                    (this.envelope = new t.AmplitudeEnvelope(e.envelope)),
                    (this.octaves = e.octaves),
                    (this.pitchDecay = e.pitchDecay),
                    this.oscillator.chain(this.envelope, this.output),
                    this._readOnly(["oscillator", "envelope"])
                }),
                t.extend(t.MembraneSynth, t.Instrument),
                (t.MembraneSynth.defaults = {
                  pitchDecay: 0.05,
                  octaves: 10,
                  oscillator: { type: "sine" },
                  envelope: {
                    attack: 0.001,
                    decay: 0.4,
                    sustain: 0.01,
                    release: 1.4,
                    attackCurve: "exponential",
                  },
                }),
                (t.MembraneSynth.prototype.triggerAttack = function (t, e, i) {
                  e = this.toSeconds(e)
                  var n = (t = this.toFrequency(t)) * this.octaves
                  return (
                    this.oscillator.frequency.setValueAtTime(n, e),
                    this.oscillator.frequency.exponentialRampToValueAtTime(
                      t,
                      e + this.toSeconds(this.pitchDecay),
                    ),
                    this.envelope.triggerAttack(e, i),
                    this.oscillator.start(e),
                    this
                  )
                }),
                (t.MembraneSynth.prototype.triggerRelease = function (t) {
                  return (
                    (t = this.toSeconds(t)),
                    this.envelope.triggerRelease(t),
                    this.oscillator.stop(t + this.envelope.release),
                    this
                  )
                }),
                (t.MembraneSynth.prototype.dispose = function () {
                  return (
                    t.Instrument.prototype.dispose.call(this),
                    this._writable(["oscillator", "envelope"]),
                    this.oscillator.dispose(),
                    (this.oscillator = null),
                    this.envelope.dispose(),
                    (this.envelope = null),
                    this
                  )
                }),
                t.MembraneSynth
              )
            }),
            e(function (t) {
              var e = [1, 1.483, 1.932, 2.546, 2.63, 3.897]
              return (
                (t.MetalSynth = function (i) {
                  ;(i = t.defaultArg(i, t.MetalSynth.defaults)),
                    t.Instrument.call(this, i),
                    (this.frequency = new t.Signal(
                      i.frequency,
                      t.Type.Frequency,
                    )),
                    (this._oscillators = []),
                    (this._freqMultipliers = []),
                    (this._amplitue = new t.Gain(0).connect(this.output)),
                    (this._highpass = new t.Filter({
                      type: "highpass",
                      Q: -3.0102999566398125,
                    }).connect(this._amplitue)),
                    (this._octaves = i.octaves),
                    (this._filterFreqScaler = new t.Scale(i.resonance, 7e3)),
                    (this.envelope = new t.Envelope({
                      attack: i.envelope.attack,
                      attackCurve: "linear",
                      decay: i.envelope.decay,
                      sustain: 0,
                      release: i.envelope.release,
                    }).chain(this._filterFreqScaler, this._highpass.frequency)),
                    this.envelope.connect(this._amplitue.gain)
                  for (var n = 0; n < e.length; n++) {
                    var s = new t.FMOscillator({
                      type: "square",
                      modulationType: "square",
                      harmonicity: i.harmonicity,
                      modulationIndex: i.modulationIndex,
                    })
                    s.connect(this._highpass), (this._oscillators[n] = s)
                    var o = new t.Multiply(e[n])
                    ;(this._freqMultipliers[n] = o),
                      this.frequency.chain(o, s.frequency)
                  }
                  this.octaves = i.octaves
                }),
                t.extend(t.MetalSynth, t.Instrument),
                (t.MetalSynth.defaults = {
                  frequency: 200,
                  envelope: { attack: 0.001, decay: 1.4, release: 0.2 },
                  harmonicity: 5.1,
                  modulationIndex: 32,
                  resonance: 4e3,
                  octaves: 1.5,
                }),
                (t.MetalSynth.prototype.triggerAttack = function (e, i) {
                  return (
                    (e = this.toSeconds(e)),
                    (i = t.defaultArg(i, 1)),
                    this.envelope.triggerAttack(e, i),
                    this._oscillators.forEach(function (t) {
                      t.start(e)
                    }),
                    0 === this.envelope.sustain &&
                      this._oscillators.forEach(
                        function (t) {
                          t.stop(e + this.envelope.attack + this.envelope.decay)
                        }.bind(this),
                      ),
                    this
                  )
                }),
                (t.MetalSynth.prototype.triggerRelease = function (t) {
                  return (
                    (t = this.toSeconds(t)),
                    this.envelope.triggerRelease(t),
                    this._oscillators.forEach(
                      function (e) {
                        e.stop(t + this.envelope.release)
                      }.bind(this),
                    ),
                    this
                  )
                }),
                (t.MetalSynth.prototype.sync = function () {
                  return (
                    this._syncMethod("triggerAttack", 0),
                    this._syncMethod("triggerRelease", 0),
                    this
                  )
                }),
                (t.MetalSynth.prototype.triggerAttackRelease = function (
                  t,
                  e,
                  i,
                ) {
                  return (
                    (e = this.toSeconds(e)),
                    (t = this.toSeconds(t)),
                    this.triggerAttack(e, i),
                    this.triggerRelease(e + t),
                    this
                  )
                }),
                Object.defineProperty(
                  t.MetalSynth.prototype,
                  "modulationIndex",
                  {
                    get: function () {
                      return this._oscillators[0].modulationIndex.value
                    },
                    set: function (t) {
                      for (var e = 0; e < this._oscillators.length; e++)
                        this._oscillators[e].modulationIndex.value = t
                    },
                  },
                ),
                Object.defineProperty(t.MetalSynth.prototype, "harmonicity", {
                  get: function () {
                    return this._oscillators[0].harmonicity.value
                  },
                  set: function (t) {
                    for (var e = 0; e < this._oscillators.length; e++)
                      this._oscillators[e].harmonicity.value = t
                  },
                }),
                Object.defineProperty(t.MetalSynth.prototype, "resonance", {
                  get: function () {
                    return this._filterFreqScaler.min
                  },
                  set: function (t) {
                    ;(this._filterFreqScaler.min = t),
                      (this.octaves = this._octaves)
                  },
                }),
                Object.defineProperty(t.MetalSynth.prototype, "octaves", {
                  get: function () {
                    return this._octaves
                  },
                  set: function (t) {
                    ;(this._octaves = t),
                      (this._filterFreqScaler.max =
                        this._filterFreqScaler.min * Math.pow(2, t))
                  },
                }),
                (t.MetalSynth.prototype.dispose = function () {
                  t.Instrument.prototype.dispose.call(this)
                  for (var e = 0; e < this._oscillators.length; e++)
                    this._oscillators[e].dispose(),
                      this._freqMultipliers[e].dispose()
                  ;(this._oscillators = null),
                    (this._freqMultipliers = null),
                    this.frequency.dispose(),
                    (this.frequency = null),
                    this._filterFreqScaler.dispose(),
                    (this._filterFreqScaler = null),
                    this._amplitue.dispose(),
                    (this._amplitue = null),
                    this.envelope.dispose(),
                    (this.envelope = null),
                    this._highpass.dispose(),
                    (this._highpass = null)
                }),
                t.MetalSynth
              )
            }),
            e(function (t) {
              return (
                (t.NoiseSynth = function (e) {
                  ;(e = t.defaultArg(e, t.NoiseSynth.defaults)),
                    t.Instrument.call(this, e),
                    (this.noise = new t.Noise()),
                    (this.envelope = new t.AmplitudeEnvelope(e.envelope)),
                    this.noise.chain(this.envelope, this.output),
                    this._readOnly(["noise", "envelope"])
                }),
                t.extend(t.NoiseSynth, t.Instrument),
                (t.NoiseSynth.defaults = {
                  noise: { type: "white" },
                  envelope: { attack: 0.005, decay: 0.1, sustain: 0 },
                }),
                (t.NoiseSynth.prototype.triggerAttack = function (t, e) {
                  return (
                    this.envelope.triggerAttack(t, e),
                    this.noise.start(t),
                    0 === this.envelope.sustain &&
                      this.noise.stop(
                        (t = this.envelope.attack + this.envelope.decay),
                      ),
                    this
                  )
                }),
                (t.NoiseSynth.prototype.triggerRelease = function (t) {
                  return (
                    this.envelope.triggerRelease(t),
                    this.noise.stop(t + this.envelope.release),
                    this
                  )
                }),
                (t.NoiseSynth.prototype.sync = function () {
                  return (
                    this._syncMethod("triggerAttack", 0),
                    this._syncMethod("triggerRelease", 0),
                    this
                  )
                }),
                (t.NoiseSynth.prototype.triggerAttackRelease = function (
                  t,
                  e,
                  i,
                ) {
                  return (
                    (e = this.toSeconds(e)),
                    (t = this.toSeconds(t)),
                    this.triggerAttack(e, i),
                    this.triggerRelease(e + t),
                    this
                  )
                }),
                (t.NoiseSynth.prototype.dispose = function () {
                  return (
                    t.Instrument.prototype.dispose.call(this),
                    this._writable(["noise", "envelope"]),
                    this.noise.dispose(),
                    (this.noise = null),
                    this.envelope.dispose(),
                    (this.envelope = null),
                    this
                  )
                }),
                t.NoiseSynth
              )
            }),
            e(function (t) {
              return (
                (t.PluckSynth = function (e) {
                  ;(e = t.defaultArg(e, t.PluckSynth.defaults)),
                    t.Instrument.call(this, e),
                    (this._noise = new t.Noise("pink")),
                    (this.attackNoise = e.attackNoise),
                    (this._lfcf = new t.LowpassCombFilter({
                      resonance: e.resonance,
                      dampening: e.dampening,
                    })),
                    (this.resonance = this._lfcf.resonance),
                    (this.dampening = this._lfcf.dampening),
                    this._noise.connect(this._lfcf),
                    this._lfcf.connect(this.output),
                    this._readOnly(["resonance", "dampening"])
                }),
                t.extend(t.PluckSynth, t.Instrument),
                (t.PluckSynth.defaults = {
                  attackNoise: 1,
                  dampening: 4e3,
                  resonance: 0.7,
                }),
                (t.PluckSynth.prototype.triggerAttack = function (t, e) {
                  ;(t = this.toFrequency(t)), (e = this.toSeconds(e))
                  var i = 1 / t
                  return (
                    this._lfcf.delayTime.setValueAtTime(i, e),
                    this._noise.start(e),
                    this._noise.stop(e + i * this.attackNoise),
                    this
                  )
                }),
                (t.PluckSynth.prototype.dispose = function () {
                  return (
                    t.Instrument.prototype.dispose.call(this),
                    this._noise.dispose(),
                    this._lfcf.dispose(),
                    (this._noise = null),
                    (this._lfcf = null),
                    this._writable(["resonance", "dampening"]),
                    (this.dampening = null),
                    (this.resonance = null),
                    this
                  )
                }),
                t.PluckSynth
              )
            }),
            e(function (t) {
              return (
                (t.PolySynth = function () {
                  var e = t.defaults(
                    arguments,
                    ["polyphony", "voice"],
                    t.PolySynth,
                  )
                  t.Instrument.call(this, e),
                    ((e = t.defaultArg(e, t.Instrument.defaults)).polyphony =
                      Math.min(t.PolySynth.MAX_POLYPHONY, e.polyphony)),
                    (this.voices = new Array(e.polyphony)),
                    (this._triggers = new Array(e.polyphony)),
                    (this.detune = new t.Signal(e.detune, t.Type.Cents)),
                    this._readOnly("detune")
                  for (var i = 0; i < e.polyphony; i++) {
                    var n = new e.voice(arguments[2], arguments[3])
                    if (!(n instanceof t.Monophonic))
                      throw new Error(
                        "Synth constructor must be instance of Tone.Monophonic",
                      )
                    ;(this.voices[i] = n),
                      n.connect(this.output),
                      n.hasOwnProperty("detune") &&
                        this.detune.connect(n.detune),
                      (this._triggers[i] = {
                        release: -1,
                        note: null,
                        voice: n,
                      })
                  }
                }),
                t.extend(t.PolySynth, t.Instrument),
                (t.PolySynth.defaults = {
                  polyphony: 4,
                  volume: 0,
                  detune: 0,
                  voice: t.Synth,
                }),
                (t.PolySynth.prototype.triggerAttack = function (t, e, i) {
                  Array.isArray(t) || (t = [t]), (e = this.toSeconds(e))
                  for (var n = 0; n < t.length; n++) {
                    for (
                      var s = t[n], o = this._triggers[0], r = 1;
                      r < this._triggers.length;
                      r++
                    )
                      this._triggers[r].release < o.release &&
                        (o = this._triggers[r])
                    ;(o.release = 1 / 0),
                      (o.note = JSON.stringify(s)),
                      o.voice.triggerAttack(s, e, i)
                  }
                  return this
                }),
                (t.PolySynth.prototype.triggerAttackRelease = function (
                  e,
                  i,
                  n,
                  s,
                ) {
                  if (
                    ((n = this.toSeconds(n)),
                    this.triggerAttack(e, n, s),
                    t.isArray(i) && t.isArray(e))
                  )
                    for (var o = 0; o < e.length; o++) {
                      var r = i[Math.min(o, i.length - 1)]
                      this.triggerRelease(e[o], n + this.toSeconds(r))
                    }
                  else this.triggerRelease(e, n + this.toSeconds(i))
                  return this
                }),
                (t.PolySynth.prototype.triggerRelease = function (t, e) {
                  Array.isArray(t) || (t = [t]), (e = this.toSeconds(e))
                  for (var i = 0; i < t.length; i++)
                    for (
                      var n = JSON.stringify(t[i]), s = 0;
                      s < this._triggers.length;
                      s++
                    ) {
                      var o = this._triggers[s]
                      o.note === n &&
                        o.release > e &&
                        (o.voice.triggerRelease(e), (o.release = e))
                    }
                  return this
                }),
                (t.PolySynth.prototype.sync = function () {
                  return (
                    this._syncMethod("triggerAttack", 1),
                    this._syncMethod("triggerRelease", 1),
                    this
                  )
                }),
                (t.PolySynth.prototype.set = function (t, e, i) {
                  for (var n = 0; n < this.voices.length; n++)
                    this.voices[n].set(t, e, i)
                  return this
                }),
                (t.PolySynth.prototype.get = function (t) {
                  return this.voices[0].get(t)
                }),
                (t.PolySynth.prototype.releaseAll = function (t) {
                  t = this.toSeconds(t)
                  for (var e = 0; e < this._triggers.length; e++) {
                    var i = this._triggers[e]
                    i.release > t &&
                      ((i.release = t), i.voice.triggerRelease(t))
                  }
                  return this
                }),
                (t.PolySynth.prototype.dispose = function () {
                  t.Instrument.prototype.dispose.call(this)
                  for (var e = 0; e < this.voices.length; e++)
                    this.voices[e].dispose(), (this.voices[e] = null)
                  return (
                    this._writable("detune"),
                    this.detune.dispose(),
                    (this.detune = null),
                    (this.voices = null),
                    (this._triggers = null),
                    this
                  )
                }),
                (t.PolySynth.MAX_POLYPHONY = 20),
                t.PolySynth
              )
            }),
            e(function (t) {
              return (
                (t.Sampler = function (e) {
                  var i = Array.prototype.slice.call(arguments)
                  i.shift()
                  var n = t.defaults(i, ["onload", "baseUrl"], t.Sampler)
                  t.Instrument.call(this, n)
                  var s = {}
                  for (var o in e)
                    if (t.isNote(o)) s[t.Frequency(o).toMidi()] = e[o]
                    else {
                      if (isNaN(parseFloat(o)))
                        throw new Error(
                          "Tone.Sampler: url keys must be the note's pitch",
                        )
                      s[o] = e[o]
                    }
                  ;(this._buffers = new t.Buffers(s, n.onload, n.baseUrl)),
                    (this._activeSources = {}),
                    (this.attack = n.attack),
                    (this.release = n.release)
                }),
                t.extend(t.Sampler, t.Instrument),
                (t.Sampler.defaults = {
                  attack: 0,
                  release: 0.1,
                  onload: t.noOp,
                  baseUrl: "",
                }),
                (t.Sampler.prototype._findClosest = function (t) {
                  for (var e = 0; e < 96; ) {
                    if (this._buffers.has(t + e)) return -e
                    if (this._buffers.has(t - e)) return e
                    e++
                  }
                  return null
                }),
                (t.Sampler.prototype.triggerAttack = function (e, i, n) {
                  var s = t.Frequency(e).toMidi(),
                    o = this._findClosest(s)
                  if (null !== o) {
                    var r = s - o,
                      a = this._buffers.get(r),
                      u = new t.BufferSource({
                        buffer: a,
                        playbackRate: t.intervalToFrequencyRatio(o),
                        fadeIn: this.attack,
                        fadeOut: this.release,
                        curve: "exponential",
                      }).connect(this.output)
                    u.start(i, 0, a.duration, n),
                      t.isArray(this._activeSources[s]) ||
                        (this._activeSources[s] = []),
                      this._activeSources[s].push({ note: s, source: u })
                  }
                  return this
                }),
                (t.Sampler.prototype.triggerRelease = function (e, i) {
                  var n = t.Frequency(e).toMidi()
                  if (this._activeSources[n] && this._activeSources[n].length) {
                    var s = this._activeSources[n].shift().source
                    ;(i = this.toSeconds(i)),
                      s.stop(i + this.release, this.release)
                  }
                  return this
                }),
                (t.Sampler.prototype.releaseAll = function (t) {
                  for (var e in ((t = this.toSeconds(t)), this._activeSources))
                    for (var i = this._activeSources[e]; i.length; )
                      i.shift().source.stop(t + this.release, this.release)
                  return this
                }),
                (t.Sampler.prototype.sync = function () {
                  return (
                    this._syncMethod("triggerAttack", 1),
                    this._syncMethod("triggerRelease", 1),
                    this
                  )
                }),
                (t.Sampler.prototype.triggerAttackRelease = function (
                  t,
                  e,
                  i,
                  n,
                ) {
                  return (
                    (i = this.toSeconds(i)),
                    (e = this.toSeconds(e)),
                    this.triggerAttack(t, i, n),
                    this.triggerRelease(t, i + e),
                    this
                  )
                }),
                (t.Sampler.prototype.add = function (e, i, n) {
                  if (t.isNote(e)) {
                    var s = t.Frequency(e).toMidi()
                    this._buffers.add(s, i, n)
                  } else {
                    if (isNaN(parseFloat(e)))
                      throw new Error(
                        "Tone.Sampler: note must be the note's pitch. Instead got " +
                          e,
                      )
                    this._buffers.add(e, i, n)
                  }
                }),
                Object.defineProperty(t.Sampler.prototype, "loaded", {
                  get: function () {
                    return this._buffers.loaded
                  },
                }),
                (t.Sampler.prototype.dispose = function () {
                  for (var e in (t.Instrument.prototype.dispose.call(this),
                  this._buffers.dispose(),
                  (this._buffers = null),
                  this._activeSources))
                    this._activeSources[e].forEach(function (t) {
                      t.source.dispose()
                    })
                  return (this._activeSources = null), this
                }),
                t.Sampler
              )
            }),
            e(function (t) {
              t.supported &&
                (OscillatorNode.prototype.setPeriodicWave ||
                  (OscillatorNode.prototype.setPeriodicWave =
                    OscillatorNode.prototype.setWaveTable),
                AudioContext.prototype.createPeriodicWave ||
                  (AudioContext.prototype.createPeriodicWave =
                    AudioContext.prototype.createWaveTable))
            }),
            e(function (t) {
              return (
                (t.GainToAudio = function () {
                  t.SignalBase.call(this),
                    (this._norm =
                      this.input =
                      this.output =
                        new t.WaveShaper(function (t) {
                          return 2 * Math.abs(t) - 1
                        }))
                }),
                t.extend(t.GainToAudio, t.SignalBase),
                (t.GainToAudio.prototype.dispose = function () {
                  return (
                    t.SignalBase.prototype.dispose.call(this),
                    this._norm.dispose(),
                    (this._norm = null),
                    this
                  )
                }),
                t.GainToAudio
              )
            }),
            e(function (t) {
              return (
                (t.Normalize = function (e, i) {
                  t.SignalBase.call(this),
                    (this._inputMin = t.defaultArg(e, 0)),
                    (this._inputMax = t.defaultArg(i, 1)),
                    (this._sub = this.input = new t.Add(0)),
                    (this._div = this.output = new t.Multiply(1)),
                    this._sub.connect(this._div),
                    this._setRange()
                }),
                t.extend(t.Normalize, t.SignalBase),
                Object.defineProperty(t.Normalize.prototype, "min", {
                  get: function () {
                    return this._inputMin
                  },
                  set: function (t) {
                    ;(this._inputMin = t), this._setRange()
                  },
                }),
                Object.defineProperty(t.Normalize.prototype, "max", {
                  get: function () {
                    return this._inputMax
                  },
                  set: function (t) {
                    ;(this._inputMax = t), this._setRange()
                  },
                }),
                (t.Normalize.prototype._setRange = function () {
                  ;(this._sub.value = -this._inputMin),
                    (this._div.value = 1 / (this._inputMax - this._inputMin))
                }),
                (t.Normalize.prototype.dispose = function () {
                  return (
                    t.SignalBase.prototype.dispose.call(this),
                    this._sub.dispose(),
                    (this._sub = null),
                    this._div.dispose(),
                    (this._div = null),
                    this
                  )
                }),
                t.Normalize
              )
            }),
            e(function (t) {
              return (
                (t.TransportTimelineSignal = function () {
                  t.Signal.apply(this, arguments),
                    (this.output = this._outputSig =
                      new t.Signal(this._initialValue)),
                    (this._lastVal = this.value),
                    (this._synced = t.Transport.scheduleRepeat(
                      this._onTick.bind(this),
                      "1i",
                    )),
                    (this._bindAnchorValue = this._anchorValue.bind(this)),
                    t.Transport.on("start stop pause", this._bindAnchorValue),
                    (this._events.memory = 1 / 0)
                }),
                t.extend(t.TransportTimelineSignal, t.Signal),
                (t.TransportTimelineSignal.prototype._onTick = function (e) {
                  var i = this.getValueAtTime(t.Transport.seconds)
                  this._lastVal !== i &&
                    ((this._lastVal = i),
                    this._outputSig.linearRampToValueAtTime(i, e))
                }),
                (t.TransportTimelineSignal.prototype._anchorValue = function (
                  e,
                ) {
                  var i = this.getValueAtTime(t.Transport.seconds)
                  return (
                    (this._lastVal = i),
                    this._outputSig.cancelScheduledValues(e),
                    this._outputSig.setValueAtTime(i, e),
                    this
                  )
                }),
                (t.TransportTimelineSignal.prototype.getValueAtTime = function (
                  e,
                ) {
                  return (
                    (e = t.TransportTime(e)),
                    t.Signal.prototype.getValueAtTime.call(this, e)
                  )
                }),
                (t.TransportTimelineSignal.prototype.setValueAtTime = function (
                  e,
                  i,
                ) {
                  return (
                    (i = t.TransportTime(i)),
                    t.Signal.prototype.setValueAtTime.call(this, e, i),
                    this
                  )
                }),
                (t.TransportTimelineSignal.prototype.linearRampToValueAtTime =
                  function (e, i) {
                    return (
                      (i = t.TransportTime(i)),
                      t.Signal.prototype.linearRampToValueAtTime.call(
                        this,
                        e,
                        i,
                      ),
                      this
                    )
                  }),
                (t.TransportTimelineSignal.prototype.exponentialRampToValueAtTime =
                  function (e, i) {
                    return (
                      (i = t.TransportTime(i)),
                      t.Signal.prototype.exponentialRampToValueAtTime.call(
                        this,
                        e,
                        i,
                      ),
                      this
                    )
                  }),
                (t.TransportTimelineSignal.prototype.setTargetAtTime =
                  function (e, i, n) {
                    return (
                      (i = t.TransportTime(i)),
                      t.Signal.prototype.setTargetAtTime.call(this, e, i, n),
                      this
                    )
                  }),
                (t.TransportTimelineSignal.prototype.cancelScheduledValues =
                  function (e) {
                    return (
                      (e = t.TransportTime(e)),
                      t.Signal.prototype.cancelScheduledValues.call(this, e),
                      this
                    )
                  }),
                (t.TransportTimelineSignal.prototype.setValueCurveAtTime =
                  function (e, i, n, s) {
                    return (
                      (i = t.TransportTime(i)),
                      (n = t.TransportTime(n)),
                      t.Signal.prototype.setValueCurveAtTime.call(
                        this,
                        e,
                        i,
                        n,
                        s,
                      ),
                      this
                    )
                  }),
                (t.TransportTimelineSignal.prototype.cancelAndHoldAtTime =
                  function (e) {
                    return t.Signal.prototype.cancelAndHoldAtTime.call(
                      this,
                      t.TransportTime(e),
                    )
                  }),
                (t.TransportTimelineSignal.prototype.dispose = function () {
                  t.Transport.clear(this._synced),
                    t.Transport.off("start stop pause", this._syncedCallback),
                    this._events.cancel(0),
                    t.Signal.prototype.dispose.call(this),
                    this._outputSig.dispose(),
                    (this._outputSig = null)
                }),
                t.TransportTimelineSignal
              )
            }),
            e(function (t) {
              return (
                (t.GrainPlayer = function () {
                  var e = t.defaults(
                    arguments,
                    ["url", "onload"],
                    t.GrainPlayer,
                  )
                  t.Source.call(this, e),
                    (this.buffer = new t.Buffer(e.url, e.onload)),
                    (this._clock = new t.Clock(
                      this._tick.bind(this),
                      e.grainSize,
                    )),
                    (this._loopStart = 0),
                    (this._loopEnd = 0),
                    (this._activeSources = []),
                    (this._playbackRate = e.playbackRate),
                    (this._grainSize = e.grainSize),
                    (this._overlap = e.overlap),
                    (this.detune = e.detune),
                    (this.overlap = e.overlap),
                    (this.loop = e.loop),
                    (this.playbackRate = e.playbackRate),
                    (this.grainSize = e.grainSize),
                    (this.loopStart = e.loopStart),
                    (this.loopEnd = e.loopEnd),
                    (this.reverse = e.reverse),
                    this._clock.on("stop", this._onstop.bind(this))
                }),
                t.extend(t.GrainPlayer, t.Source),
                (t.GrainPlayer.defaults = {
                  onload: t.noOp,
                  overlap: 0.1,
                  grainSize: 0.2,
                  playbackRate: 1,
                  detune: 0,
                  loop: !1,
                  loopStart: 0,
                  loopEnd: 0,
                  reverse: !1,
                }),
                (t.GrainPlayer.prototype._start = function (e, i, n) {
                  ;(i = t.defaultArg(i, 0)),
                    (i = this.toSeconds(i)),
                    (e = this.toSeconds(e)),
                    (this._offset = i),
                    this._clock.start(e),
                    n && this.stop(e + this.toSeconds(n))
                }),
                (t.GrainPlayer.prototype._stop = function (t) {
                  this._clock.stop(t)
                }),
                (t.GrainPlayer.prototype._onstop = function (t) {
                  this._activeSources.forEach(function (e) {
                    e.stop(t, 0)
                  })
                }),
                (t.GrainPlayer.prototype._tick = function (e) {
                  var i = this._offset < this._overlap ? 0 : this._overlap,
                    n = new t.BufferSource({
                      buffer: this.buffer,
                      fadeIn: i,
                      fadeOut: this._overlap,
                      loop: this.loop,
                      loopStart: this._loopStart,
                      loopEnd: this._loopEnd,
                      playbackRate: t.intervalToFrequencyRatio(
                        this.detune / 100,
                      ),
                    }).connect(this.output)
                  n.start(e, this._offset),
                    (this._offset += this.grainSize),
                    n.stop(e + this.grainSize),
                    this._activeSources.push(n),
                    (n.onended = function () {
                      var t = this._activeSources.indexOf(n)
                      ;-1 !== t && this._activeSources.splice(t, 1)
                    }.bind(this))
                }),
                (t.GrainPlayer.prototype.seek = function (t, e) {
                  return (
                    (this._offset = this.toSeconds(t)),
                    this._tick(this.toSeconds(e)),
                    this
                  )
                }),
                Object.defineProperty(t.GrainPlayer.prototype, "playbackRate", {
                  get: function () {
                    return this._playbackRate
                  },
                  set: function (t) {
                    ;(this._playbackRate = t),
                      (this.grainSize = this._grainSize)
                  },
                }),
                Object.defineProperty(t.GrainPlayer.prototype, "loopStart", {
                  get: function () {
                    return this._loopStart
                  },
                  set: function (t) {
                    this._loopStart = this.toSeconds(t)
                  },
                }),
                Object.defineProperty(t.GrainPlayer.prototype, "loopEnd", {
                  get: function () {
                    return this._loopEnd
                  },
                  set: function (t) {
                    this._loopEnd = this.toSeconds(t)
                  },
                }),
                Object.defineProperty(t.GrainPlayer.prototype, "reverse", {
                  get: function () {
                    return this.buffer.reverse
                  },
                  set: function (t) {
                    this.buffer.reverse = t
                  },
                }),
                Object.defineProperty(t.GrainPlayer.prototype, "grainSize", {
                  get: function () {
                    return this._grainSize
                  },
                  set: function (t) {
                    ;(this._grainSize = this.toSeconds(t)),
                      (this._clock.frequency.value =
                        this._playbackRate / this._grainSize)
                  },
                }),
                Object.defineProperty(t.GrainPlayer.prototype, "overlap", {
                  get: function () {
                    return this._overlap
                  },
                  set: function (t) {
                    this._overlap = this.toSeconds(t)
                  },
                }),
                (t.GrainPlayer.prototype.dispose = function () {
                  return (
                    t.Source.prototype.dispose.call(this),
                    this.buffer.dispose(),
                    (this.buffer = null),
                    this._clock.dispose(),
                    (this._clock = null),
                    this._activeSources.forEach(function (t) {
                      t.dispose()
                    }),
                    (this._activeSources = null),
                    this
                  )
                }),
                t.GrainPlayer
              )
            }),
            e(function (t) {
              return (
                (t.Player = function (e) {
                  var i
                  e instanceof t.Buffer && e.loaded
                    ? ((e = e.get()), (i = t.Player.defaults))
                    : (i = t.defaults(arguments, ["url", "onload"], t.Player)),
                    t.Source.call(this, i),
                    (this.autostart = i.autostart),
                    (this._buffer = new t.Buffer({
                      url: i.url,
                      onload: this._onload.bind(this, i.onload),
                      reverse: i.reverse,
                    })),
                    e instanceof AudioBuffer && this._buffer.set(e),
                    (this._loop = i.loop),
                    (this._loopStart = i.loopStart),
                    (this._loopEnd = i.loopEnd),
                    (this._playbackRate = i.playbackRate),
                    (this._activeSources = []),
                    (this._elapsedTime = new t.TickSource(i.playbackRate)),
                    (this.fadeIn = i.fadeIn),
                    (this.fadeOut = i.fadeOut)
                }),
                t.extend(t.Player, t.Source),
                (t.Player.defaults = {
                  onload: t.noOp,
                  playbackRate: 1,
                  loop: !1,
                  autostart: !1,
                  loopStart: 0,
                  loopEnd: 0,
                  retrigger: !1,
                  reverse: !1,
                  fadeIn: 0,
                  fadeOut: 0,
                }),
                (t.Player.prototype.load = function (t, e) {
                  return this._buffer.load(t, this._onload.bind(this, e))
                }),
                (t.Player.prototype._onload = function (e) {
                  ;(e = t.defaultArg(e, t.noOp))(this),
                    this.autostart && this.start()
                }),
                (t.Player.prototype._onSourceEnd = function (t) {
                  var e = this._activeSources.indexOf(t)
                  this._activeSources.splice(e, 1)
                }),
                (t.Player.prototype._start = function (e, i, n) {
                  ;(i = this._loop
                    ? t.defaultArg(i, this._loopStart)
                    : t.defaultArg(i, 0)),
                    (i = this.toSeconds(i))
                  var s = t.defaultArg(
                    n,
                    Math.max(this._buffer.duration - i, 0),
                  )
                  ;(s = this.toSeconds(s)),
                    (e = this.toSeconds(e)),
                    this._elapsedTime.start(e, i)
                  var o = new t.BufferSource({
                    buffer: this._buffer,
                    loop: this._loop,
                    loopStart: this._loopStart,
                    loopEnd: this._loopEnd,
                    onended: this._onSourceEnd.bind(this),
                    playbackRate: this._playbackRate,
                    fadeIn: this.fadeIn,
                    fadeOut: this.fadeOut,
                  }).connect(this.output)
                  return (
                    this._loop ||
                      this._synced ||
                      this._state.setStateAtTime(
                        t.State.Stopped,
                        e + s / this._playbackRate,
                      ),
                    this._activeSources.push(o),
                    this._loop && t.isUndef(n)
                      ? o.start(e, i)
                      : o.start(e, i, s),
                    this
                  )
                }),
                (t.Player.prototype._stop = function (t) {
                  return (
                    (t = this.toSeconds(t)),
                    this._elapsedTime.stop(t),
                    this._activeSources.forEach(function (e) {
                      e.stop(t)
                    }),
                    this
                  )
                }),
                (t.Player.prototype.restart = function (t, e, i) {
                  return this._stop(t), this._start(t, e, i), this
                }),
                (t.Player.prototype.seek = function (e, i) {
                  return (
                    (i = this.toSeconds(i)),
                    this._state.getValueAtTime(i) === t.State.Started &&
                      ((e = this.toSeconds(e)),
                      this._stop(i),
                      this._start(i, e)),
                    this
                  )
                }),
                (t.Player.prototype.setLoopPoints = function (t, e) {
                  return (this.loopStart = t), (this.loopEnd = e), this
                }),
                Object.defineProperty(t.Player.prototype, "loopStart", {
                  get: function () {
                    return this._loopStart
                  },
                  set: function (t) {
                    ;(this._loopStart = t),
                      this._activeSources.forEach(function (e) {
                        e.loopStart = t
                      })
                  },
                }),
                Object.defineProperty(t.Player.prototype, "loopEnd", {
                  get: function () {
                    return this._loopEnd
                  },
                  set: function (t) {
                    ;(this._loopEnd = t),
                      this._activeSources.forEach(function (e) {
                        e.loopEnd = t
                      })
                  },
                }),
                Object.defineProperty(t.Player.prototype, "buffer", {
                  get: function () {
                    return this._buffer
                  },
                  set: function (t) {
                    this._buffer.set(t)
                  },
                }),
                Object.defineProperty(t.Player.prototype, "loop", {
                  get: function () {
                    return this._loop
                  },
                  set: function (e) {
                    if (this._loop !== e) {
                      this._loop = e
                      var i = this.now()
                      if (e) {
                        var n = this._state.getNextState(t.State.Stopped, i)
                        n &&
                          (this._activeSources.forEach(function (t) {
                            t.loop = e
                          }),
                          this._state.cancel(n.time),
                          this._elapsedTime.cancel(n.time))
                      } else this._stopAtNextIteration(i)
                    }
                  },
                }),
                (t.Player.prototype._stopAtNextIteration = function (e) {
                  if (this._state.getValueAtTime(e) === t.State.Started) {
                    var i = this._state.getNextState(t.State.Stopped, e),
                      n = this._elapsedTime.getTicksAtTime(e),
                      s = Math.max(Math.ceil(n / this.buffer.duration), 1),
                      o = this._elapsedTime.getTimeOfTick(
                        s * this.buffer.duration,
                        i ? i.time - this.sampleTime : 1 / 0,
                      )
                    this.stop(o)
                  }
                }),
                Object.defineProperty(t.Player.prototype, "playbackRate", {
                  get: function () {
                    return this._playbackRate
                  },
                  set: function (t) {
                    this._playbackRate = t
                    var e = this.now()
                    this._elapsedTime.frequency.setValueAtTime(t, e),
                      this._loop || this._stopAtNextIteration(e),
                      this._activeSources.forEach(function (i) {
                        i.playbackRate.setValueAtTime(t, e)
                      })
                  },
                }),
                Object.defineProperty(t.Player.prototype, "position", {
                  get: function () {
                    var e = this.now()
                    if (
                      this._state.getValueAtTime(e) === t.State.Started &&
                      this.loaded
                    ) {
                      var i = this.buffer.duration
                      return this._elapsedTime.getTicksAtTime(e) % i
                    }
                    return 0
                  },
                }),
                Object.defineProperty(t.Player.prototype, "reverse", {
                  get: function () {
                    return this._buffer.reverse
                  },
                  set: function (t) {
                    this._buffer.reverse = t
                  },
                }),
                Object.defineProperty(t.Player.prototype, "loaded", {
                  get: function () {
                    return this._buffer.loaded
                  },
                }),
                (t.Player.prototype.dispose = function () {
                  return (
                    this._activeSources.forEach(function (t) {
                      t.dispose()
                    }),
                    (this._activeSources = null),
                    t.Source.prototype.dispose.call(this),
                    this._buffer.dispose(),
                    (this._buffer = null),
                    this._elapsedTime.dispose(),
                    (this._elapsedTime = null),
                    this
                  )
                }),
                t.Player
              )
            }),
            e(function (t) {
              return (
                (t.Players = function (e) {
                  var i = Array.prototype.slice.call(arguments)
                  i.shift()
                  var n = t.defaults(i, ["onload"], t.Players)
                  for (var s in (t.call(this),
                  (this._volume = this.output = new t.Volume(n.volume)),
                  (this.volume = this._volume.volume),
                  this._readOnly("volume"),
                  (this._volume.output.output.channelCount = 2),
                  (this._volume.output.output.channelCountMode = "explicit"),
                  (this.mute = n.mute),
                  (this._players = {}),
                  (this._loadingCount = 0),
                  (this._fadeIn = n.fadeIn),
                  (this._fadeOut = n.fadeOut),
                  e))
                    this._loadingCount++,
                      this.add(s, e[s], this._bufferLoaded.bind(this, n.onload))
                }),
                t.extend(t.Players, t.AudioNode),
                (t.Players.defaults = {
                  volume: 0,
                  mute: !1,
                  onload: t.noOp,
                  fadeIn: 0,
                  fadeOut: 0,
                }),
                (t.Players.prototype._bufferLoaded = function (t) {
                  this._loadingCount--, 0 === this._loadingCount && t && t(this)
                }),
                Object.defineProperty(t.Players.prototype, "mute", {
                  get: function () {
                    return this._volume.mute
                  },
                  set: function (t) {
                    this._volume.mute = t
                  },
                }),
                Object.defineProperty(t.Players.prototype, "fadeIn", {
                  get: function () {
                    return this._fadeIn
                  },
                  set: function (t) {
                    ;(this._fadeIn = t),
                      this._forEach(function (e) {
                        e.fadeIn = t
                      })
                  },
                }),
                Object.defineProperty(t.Players.prototype, "fadeOut", {
                  get: function () {
                    return this._fadeOut
                  },
                  set: function (t) {
                    ;(this._fadeOut = t),
                      this._forEach(function (e) {
                        e.fadeOut = t
                      })
                  },
                }),
                Object.defineProperty(t.Players.prototype, "state", {
                  get: function () {
                    var e = !1
                    return (
                      this._forEach(function (i) {
                        e = e || i.state === t.State.Started
                      }),
                      e ? t.State.Started : t.State.Stopped
                    )
                  },
                }),
                (t.Players.prototype.has = function (t) {
                  return this._players.hasOwnProperty(t)
                }),
                (t.Players.prototype.get = function (t) {
                  if (this.has(t)) return this._players[t]
                  throw new Error("Tone.Players: no player named " + t)
                }),
                (t.Players.prototype._forEach = function (t) {
                  for (var e in this._players) t(this._players[e], e)
                  return this
                }),
                Object.defineProperty(t.Players.prototype, "loaded", {
                  get: function () {
                    var t = !0
                    return (
                      this._forEach(function (e) {
                        t = t && e.loaded
                      }),
                      t
                    )
                  },
                }),
                (t.Players.prototype.add = function (e, i, n) {
                  return (
                    (this._players[e] = new t.Player(i, n).connect(
                      this.output,
                    )),
                    (this._players[e].fadeIn = this._fadeIn),
                    (this._players[e].fadeOut = this._fadeOut),
                    this
                  )
                }),
                (t.Players.prototype.stopAll = function (t) {
                  this._forEach(function (e) {
                    e.stop(t)
                  })
                }),
                (t.Players.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this._volume.dispose(),
                    (this._volume = null),
                    this._writable("volume"),
                    (this.volume = null),
                    (this.output = null),
                    this._forEach(function (t) {
                      t.dispose()
                    }),
                    (this._players = null),
                    this
                  )
                }),
                t.Players
              )
            }),
            e(function (t) {
              return (
                (t.UserMedia = function () {
                  var e = t.defaults(arguments, ["volume"], t.UserMedia)
                  t.AudioNode.call(this),
                    (this._mediaStream = null),
                    (this._stream = null),
                    (this._device = null),
                    (this._volume = this.output = new t.Volume(e.volume)),
                    (this.volume = this._volume.volume),
                    this._readOnly("volume"),
                    (this.mute = e.mute)
                }),
                t.extend(t.UserMedia, t.AudioNode),
                (t.UserMedia.defaults = { volume: 0, mute: !1 }),
                (t.UserMedia.prototype.open = function (e) {
                  return t.UserMedia.enumerateDevices().then(
                    function (i) {
                      var n
                      if (t.isNumber(e)) n = i[e]
                      else if (
                        !(n = i.find(function (t) {
                          return t.label === e || t.deviceId === e
                        })) &&
                        i.length > 0
                      )
                        n = i[0]
                      else if (!n && t.isDefined(e))
                        throw new Error(
                          "Tone.UserMedia: no matching device: " + e,
                        )
                      this._device = n
                      var s = {
                        audio: {
                          echoCancellation: !1,
                          sampleRate: this.context.sampleRate,
                        },
                      }
                      return (
                        n && (s.audio.deviceId = n.deviceId),
                        navigator.mediaDevices.getUserMedia(s).then(
                          function (t) {
                            return (
                              this._stream ||
                                ((this._stream = t),
                                (this._mediaStream =
                                  this.context.createMediaStreamSource(t)),
                                this._mediaStream.connect(this.output)),
                              this
                            )
                          }.bind(this),
                        )
                      )
                    }.bind(this),
                  )
                }),
                (t.UserMedia.prototype.close = function () {
                  return (
                    this._stream &&
                      (this._stream.getAudioTracks().forEach(function (t) {
                        t.stop()
                      }),
                      (this._stream = null),
                      this._mediaStream.disconnect(),
                      (this._mediaStream = null)),
                    (this._device = null),
                    this
                  )
                }),
                (t.UserMedia.enumerateDevices = function () {
                  return navigator.mediaDevices
                    .enumerateDevices()
                    .then(function (t) {
                      return t.filter(function (t) {
                        return "audioinput" === t.kind
                      })
                    })
                }),
                Object.defineProperty(t.UserMedia.prototype, "state", {
                  get: function () {
                    return this._stream && this._stream.active
                      ? t.State.Started
                      : t.State.Stopped
                  },
                }),
                Object.defineProperty(t.UserMedia.prototype, "deviceId", {
                  get: function () {
                    if (this._device) return this._device.deviceId
                  },
                }),
                Object.defineProperty(t.UserMedia.prototype, "groupId", {
                  get: function () {
                    if (this._device) return this._device.groupId
                  },
                }),
                Object.defineProperty(t.UserMedia.prototype, "label", {
                  get: function () {
                    if (this._device) return this._device.label
                  },
                }),
                Object.defineProperty(t.UserMedia.prototype, "mute", {
                  get: function () {
                    return this._volume.mute
                  },
                  set: function (t) {
                    this._volume.mute = t
                  },
                }),
                (t.UserMedia.prototype.dispose = function () {
                  return (
                    t.AudioNode.prototype.dispose.call(this),
                    this.close(),
                    this._writable("volume"),
                    this._volume.dispose(),
                    (this._volume = null),
                    (this.volume = null),
                    this
                  )
                }),
                Object.defineProperty(t.UserMedia, "supported", {
                  get: function () {
                    return (
                      t.isDefined(navigator.mediaDevices) &&
                      t.isFunction(navigator.mediaDevices.getUserMedia)
                    )
                  },
                }),
                t.UserMedia
              )
            }),
            e(function (t) {
              return (
                (t.Midi = function (e, i) {
                  if (!(this instanceof t.Midi)) return new t.Midi(e, i)
                  t.Frequency.call(this, e, i)
                }),
                t.extend(t.Midi, t.Frequency),
                (t.Midi.prototype._defaultUnits = "midi"),
                (t.Midi.prototype._frequencyToUnits = function (e) {
                  return t.Frequency.ftom(
                    t.Frequency.prototype._frequencyToUnits.call(this, e),
                  )
                }),
                (t.Midi.prototype._ticksToUnits = function (e) {
                  return t.Frequency.ftom(
                    t.Frequency.prototype._ticksToUnits.call(this, e),
                  )
                }),
                (t.Midi.prototype._beatsToUnits = function (e) {
                  return t.Frequency.ftom(
                    t.Frequency.prototype._beatsToUnits.call(this, e),
                  )
                }),
                (t.Midi.prototype._secondsToUnits = function (e) {
                  return t.Frequency.ftom(
                    t.Frequency.prototype._secondsToUnits.call(this, e),
                  )
                }),
                (t.Midi.prototype.toMidi = function () {
                  return this.valueOf()
                }),
                (t.Midi.prototype.toFrequency = function () {
                  return t.Frequency.mtof(this.toMidi())
                }),
                (t.Midi.prototype.transpose = function (t) {
                  return new this.constructor(this.toMidi() + t)
                }),
                t.Midi
              )
            }),
            t
          )
        })()
      }.call(e, i, e, t)) || (t.exports = n)
  },
  function (t, e, i) {
    "use strict"
    var n = i(6),
      s = i(16),
      o = Object.prototype.toString
    function r(t) {
      return "[object Array]" === o.call(t)
    }
    function a(t) {
      return null !== t && "object" == typeof t
    }
    function u(t) {
      return "[object Function]" === o.call(t)
    }
    function l(t, e) {
      if (null !== t && void 0 !== t)
        if (("object" != typeof t && (t = [t]), r(t)))
          for (var i = 0, n = t.length; i < n; i++) e.call(null, t[i], i, t)
        else
          for (var s in t)
            Object.prototype.hasOwnProperty.call(t, s) &&
              e.call(null, t[s], s, t)
    }
    t.exports = {
      isArray: r,
      isArrayBuffer: function (t) {
        return "[object ArrayBuffer]" === o.call(t)
      },
      isBuffer: s,
      isFormData: function (t) {
        return "undefined" != typeof FormData && t instanceof FormData
      },
      isArrayBufferView: function (t) {
        return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
          ? ArrayBuffer.isView(t)
          : t && t.buffer && t.buffer instanceof ArrayBuffer
      },
      isString: function (t) {
        return "string" == typeof t
      },
      isNumber: function (t) {
        return "number" == typeof t
      },
      isObject: a,
      isUndefined: function (t) {
        return void 0 === t
      },
      isDate: function (t) {
        return "[object Date]" === o.call(t)
      },
      isFile: function (t) {
        return "[object File]" === o.call(t)
      },
      isBlob: function (t) {
        return "[object Blob]" === o.call(t)
      },
      isFunction: u,
      isStream: function (t) {
        return a(t) && u(t.pipe)
      },
      isURLSearchParams: function (t) {
        return (
          "undefined" != typeof URLSearchParams && t instanceof URLSearchParams
        )
      },
      isStandardBrowserEnv: function () {
        return (
          ("undefined" == typeof navigator ||
            "ReactNative" !== navigator.product) &&
          "undefined" != typeof window &&
          "undefined" != typeof document
        )
      },
      forEach: l,
      merge: function t() {
        var e = {}
        function i(i, n) {
          "object" == typeof e[n] && "object" == typeof i
            ? (e[n] = t(e[n], i))
            : (e[n] = i)
        }
        for (var n = 0, s = arguments.length; n < s; n++) l(arguments[n], i)
        return e
      },
      extend: function (t, e, i) {
        return (
          l(e, function (e, s) {
            t[s] = i && "function" == typeof e ? n(e, i) : e
          }),
          t
        )
      },
      trim: function (t) {
        return t.replace(/^\s*/, "").replace(/\s*$/, "")
      },
    }
  },
  function (t, e, i) {
    t.exports = i(15)
  },
  function (t, e, i) {
    "use strict"
    ;(function (e) {
      var n = i(1),
        s = i(19),
        o = { "Content-Type": "application/x-www-form-urlencoded" }
      function r(t, e) {
        !n.isUndefined(t) &&
          n.isUndefined(t["Content-Type"]) &&
          (t["Content-Type"] = e)
      }
      var a = {
        adapter: (function () {
          var t
          return (
            "undefined" != typeof XMLHttpRequest
              ? (t = i(7))
              : void 0 !== e && (t = i(7)),
            t
          )
        })(),
        transformRequest: [
          function (t, e) {
            return (
              s(e, "Content-Type"),
              n.isFormData(t) ||
              n.isArrayBuffer(t) ||
              n.isBuffer(t) ||
              n.isStream(t) ||
              n.isFile(t) ||
              n.isBlob(t)
                ? t
                : n.isArrayBufferView(t)
                ? t.buffer
                : n.isURLSearchParams(t)
                ? (r(e, "application/x-www-form-urlencoded;charset=utf-8"),
                  t.toString())
                : n.isObject(t)
                ? (r(e, "application/json;charset=utf-8"), JSON.stringify(t))
                : t
            )
          },
        ],
        transformResponse: [
          function (t) {
            if ("string" == typeof t)
              try {
                t = JSON.parse(t)
              } catch (t) {}
            return t
          },
        ],
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        validateStatus: function (t) {
          return t >= 200 && t < 300
        },
        headers: { common: { Accept: "application/json, text/plain, */*" } },
      }
      n.forEach(["delete", "get", "head"], function (t) {
        a.headers[t] = {}
      }),
        n.forEach(["post", "put", "patch"], function (t) {
          a.headers[t] = n.merge(o)
        }),
        (t.exports = a)
    }).call(this, i(18))
  },
  function (t, e, i) {
    "use strict"
    var n = i(0),
      s = i.n(n),
      o = i(11),
      r = i.n(o),
      a = i(5),
      u = i.n(a),
      l = i(12),
      h = i.n(l),
      c = i(2),
      p = i.n(c)
    "undefined" != typeof window &&
      void 0 === window.Tone &&
      (window.Tone = s.a)
    var f = function (t) {
      var e = this
      ;(e.apiURL = (t && t.apiURL) || "https://api.mubert.com/"),
        (e.statistic = {}),
        (e.compressor = new s.a.MidSideCompressor().toMaster()),
        (e.limiter = new s.a.Limiter(0).toMaster()),
        (e.noSleep = u.a ? new u.a() : null),
        (e.state = e.states.STOPED),
        (e.src = null),
        (e.listenersMap = {}),
        (e.listeners = []),
        window.Audio &&
          ((e.audio = new Audio()),
          e.audio.addEventListener("loadstart", function () {
            this.src === e.stream && e._callback({ name: "loading" })
          }),
          e.audio.addEventListener("loadeddata", function () {
            ;(e.state = e.states.STARTED), e._callback({ name: "loaded" })
          }),
          e.audio.addEventListener("canplay", function () {
            e._callback({ name: "play" })
          }))
      var i = e.Cookies.get("mubert-player-volume")
      e.setVolume(t && (isFinite(t.volume), 1) ? +t.volume : 80, !0),
        null != i && (i ? e.setVolume(+i) : e.mute()),
        (e.samplesCache = {
          limit: 50,
          samples: [],
          samplesMap: {},
          add: function (t) {
            t &&
              t.url &&
              t.blobURL &&
              (this.samplesMap[t.url] ||
                (this.samples.length === this.limit &&
                  (this.shift() || this.limit++),
                this.samples.push(t.url),
                (this.samplesMap[t.url] = t),
                (t.used = !0)))
          },
          shift: function () {
            for (var t = this.samples, e = 0; e < t.length; e++) {
              var i = this.samplesMap[t[e]]
              if (!i.used)
                return (
                  URL.revokeObjectURL(i.blobURL),
                  delete this.samplesMap[t[e]],
                  t.splice(e, 1),
                  !0
                )
            }
            return !1
          },
          get: function (t) {
            var e = this.samplesMap[t]
            return e ? ((e.used = !0), e.blobURL) : null
          },
          clear: function () {
            for (var t = this.samples, e = 0; e < t.length; e++)
              URL.revokeObjectURL(this.samplesMap[t[e]])
            ;(this.samples = []), (this.samplesMap = {})
          },
          clearUsed: function () {
            for (
              var t = this.samples, e = this.samplesMap, i = 0;
              i < t.length;
              i++
            ) {
              var n = e[t[i]]
              n.used && (n.used = null)
            }
          },
        }),
        (e.playersCache = {
          limit: 20,
          players: [],
          map: {},
          get: function (t) {
            return this.map[t]
          },
          use: function (t) {
            var e = this.map[t]
            return e && (e.mubertUsed = !0), e
          },
          add: function (t, e) {
            this.players.length === this.limit &&
              (this.shift() || this.limit++),
              this.players.push(t),
              (e.mubertEvents = 0),
              (e.mubertUsed = !0),
              (this.map[t] = e)
          },
          shift: function () {
            for (var t = this.players, e = 0; e < t.length; e++) {
              var i = this.map[t[e]]
              if (!i.mubertUsed && !i.mubertEvents)
                return (
                  delete this.map[t[e]],
                  t.splice(e, 1),
                  i.stop(),
                  i.dispose(),
                  !0
                )
            }
            return !1
          },
          clear: function () {
            for (var t = this.players, e = 0; e < t.length; e++) {
              var i = this.map[t[e]]
              i.stop(), i.dispose()
            }
            ;(this.players = []), (this.map = {})
          },
          clearUsed: function () {
            for (var t = this.players, e = this.map, i = 0; i < t.length; i++) {
              var n = e[t[i]]
              n.mubertUsed && (n.mubertUsed = null)
            }
          },
          check: function () {
            for (var t = this.players, e = this.map, i = 0; i < t.length; i++) {
              var n = e[t[i]]
              if (!n._buffer || !n._buffer.loaded) return !1
            }
            return this.clearUsed(), !0
          },
        })
      var n = JSON.parse(e.Cookies.get("mubert-player-statistic"))
      if (n) {
        var o = {}
        n.gid && n.likes && (o.likes = { gid: n.gid, count: n.likes }),
          n.sid && n.sec && (o.listening = { sid: n.sid, sec: n.sec }),
          o.likes &&
            p.a.post(
              e.apiURL,
              JSON.stringify({ method: "SetLikes", params: o.likes }),
              { withCredentials: !0 },
            ),
          o.listening &&
            p.a.post(
              e.apiURL,
              JSON.stringify({ method: "SetListening", params: o.listening }),
              { withCredentials: !0 },
            ),
          e.Cookies.clear("mubert-player-statistic")
      }
      window &&
        window.addEventListener("beforeunload", function () {
          var t = e.statistic
          ;(t.sec = 0 ^ s.a.Transport.seconds),
            t &&
              ((t.sid && t.sec) || (t.gid && t.likes)) &&
              e.Cookies.set("mubert-player-statistic", JSON.stringify(t)),
            e.samplesCache.clear(),
            s.a.Transport.context &&
              (s.a.Transport.context._worker &&
                s.a.Transport.context._worker.terminate(),
              s.a.Transport.context._workerBlob &&
                URL.revokeObjectURL(s.a.Transport.context._workerBlob))
        }),
        this.audioContextStarted ||
          ((this.__proto__.audioContextStarted = !0), h()(s.a.context))
    }
    ;(f.prototype.version = "2.2.2"),
      (f.prototype.audioContextStarted = !1),
      (f.prototype.Tone = s.a),
      (f.prototype.getVersion = function () {
        return this.version
      }),
      (f.prototype.Cookies = {
        get: function (t) {
          var e,
            i,
            n = document.cookie.split("; ")
          for (i = 0; i < n.length; i++)
            if ((e = n[i].split("="))[0] === t) return e[1] || ""
          return null
        },
        set: function (t, e, i, n, s, o) {
          if (arguments.length < 2) return !1
          var r = t + "=" + e
          return (
            i &&
              i.constructor === Date &&
              (r += "; expires=" + i.toUTCString()),
            n && (r += "; path=" + n),
            s && (r += "; domain=" + s),
            !0 === o && (r += "; secure"),
            (document.cookie = r),
            !0
          )
        },
        clear: function (t, e) {
          return (
            !!this.get(t) &&
            ((e = e || "/"),
            (document.cookie =
              t + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=" + e),
            !0)
          )
        },
      }),
      (f.prototype.types = { JS: 1, SERVER: 2 }),
      (f.prototype.states = { STOPED: 0, STARTING: 1, STARTED: 2 }),
      (f.prototype.partStates = { ERROR: -1, LOADING: 0, LOADED: 1 }),
      (f.prototype.isPlaying = function () {
        return this.state !== this.states.STOPED
      }),
      (f.prototype._init = function (t) {
        if ("number" == typeof t) {
          if (!isFinite(t)) return !1
          ;(this.playerType = this.types.JS),
            (this.state = this.states.STARTING),
            (this.partId = 0),
            this._callback({ name: "loading", value: s.a.Transport.seconds }),
            (this.httpRequests = p.a.CancelToken.source()),
            this.noSleep && this.noSleep.enable()
          try {
            ;(this.nextTime = 0),
              (this.part = new s.a.Part(this._playPart.bind(this), [])),
              this._scheduleNextStream2(0)
          } catch (t) {
            return (
              p.a.isCancel(t) ? console.warn(t.message) : console.error(t), !1
            )
          }
          return !0
        }
        if (this.audio)
          return (
            (this.playerType = this.types.SERVER),
            (this.state = this.states.STARTING),
            (this.audio.src = t),
            this.audio.play(),
            !0
          )
      }),
      (f.prototype.getRandomStream = function () {
        var t = this.streams
        if (!t) return null
        if (1 === t.length) return t[0]
        var e = -1
        return (
          null != this.stream && (e = t.indexOf(this.stream)),
          -1 !== e && (t = t.slice()).splice(e, 1),
          t[Math.round(Math.random() * (t.length - 1))]
        )
      }),
      (f.prototype.play = function (t, e) {
        if (null != t || null != this.stream) {
          if ((this.state > this.states.STOPED && this.stop(), null != t)) {
            var i = this.parseStreams(t)
            if (!i) return
            ;(this.streams = i),
              (this.stream = null),
              (this.stream = this.getRandomStream())
          }
          return this._init(this.stream)
        }
      }),
      (f.prototype.setStream = function (t) {
        if (null != t) {
          var e = this.parseStreams(t)
          e &&
            ((this.streams = e),
            (this.stream = null),
            (this.stream = this.getRandomStream()))
        }
      }),
      (f.prototype.parseStreams = function (t) {
        if (null == t) return !1
        Array.isArray(t) || (t = [t])
        for (var e = [], i = 0; i < t.length; i++) {
          var n = t[i]
          "number" == typeof n
            ? e.push(n)
            : "string" == typeof n &&
              (n == +n ? e.push(+n) : -1 !== n.indexOf("http") && e.push(n))
        }
        return !!e.length && e
      }),
      (f.prototype.stop = function (t) {
        if (this.playerType === this.types.SERVER)
          return (
            (this.state = this.states.STOPED),
            this.audio.pause(),
            this._callback({ name: "stop" }),
            void (this.audio.src = "")
          )
        ;(this.state = this.states.STOPED),
          (this.nextTime = 0),
          this.part &&
            (this.part.stop(),
            this.part.removeAll(),
            this.part.dispose(),
            (this.part = null)),
          this.playersCache.clear(),
          (this.stream_params = null),
          (this.gen_params = null),
          (this.statistic.sec = 0 ^ s.a.Transport.seconds),
          s.a.Transport.stop(),
          s.a.Transport.cancel(),
          null != this.scheduleCheckID &&
            (s.a.Transport.clear(this.scheduleCheckID),
            (this.scheduleCheckID = null)),
          null != this.scheduleID &&
            (s.a.Transport.clear(this.scheduleID), (this.scheduleID = null)),
          this.httpRequests && this.httpRequests.cancel(),
          !this.noSleep || (t && t.skipSleepDisable) || this.noSleep.disable(),
          this._callback({ name: "stop", value: s.a.Transport.seconds })
      }),
      (f.prototype.refresh = function () {
        null != this.stream && this.streams && this.play()
      }),
      (f.prototype.like = function () {}),
      (f.prototype._playPart = function (t, e) {
        var i = this.playersCache.get(e.loopId)
        i && i.start(t, 0, e.duration)
      }),
      (f.prototype._scheduleNextStream2 = function (t) {
        console.dir(`next time = ${this.nextTime} (duration: ${t})`),
          this._preloadData()
      }),
      (f.prototype._preloadData = function () {
        var t = this,
          e = t.getStatistic(),
          i = {
            method: "MusicStream4",
            params: { sid: t.stream, source_type: "mp3" },
          }
        e && ((i.statistic = e), e.listening && t.clearListeningStatistic()),
          t.initStatistic(t.stream),
          (t.nextPartState = t.partStates.LOADING),
          t.stream_params &&
            t.gen_params &&
            ((i.stream_params = JSON.stringify(t.stream_params).replace(
              /"/g,
              "'",
            )),
            (i.gen_params = t.gen_params)),
          p.a
            .post(t.apiURL, JSON.stringify(i), {
              withCredentials: !0,
              cancelToken: t.httpRequests.token,
            })
            .then(
              function (e) {
                if (t.state !== t.states.STOPED) {
                  if (
                    (console.dir(e),
                    200 !== e.status ||
                      !e.data ||
                      !e.data.data ||
                      !e.data.data.midi)
                  )
                    return (
                      (t.nextPartState = t.partStates.ERROR),
                      t.state === t.states.STARTING &&
                        (t.state = t.states.STOPED),
                      !1
                    )
                  var i = e.data.data
                  ;(t.nextMusicData = i), t._preloadSamples(i.samples)
                }
              },
              function (e) {
                console.dir(e),
                  e && e.message && (t.nextPartState = t.partStates.ERROR)
              },
            )
      }),
      (f.prototype._preloadSamples = function (t) {
        if (!t) return this.stop()
        var e,
          i,
          n = (this.loadingSamples = {})
        for (i in ((this.samplesHash = 0), (this.loadingHash = 0), t))
          (e = t[i]),
            (n[i] = {
              id: +i,
              note: e.n,
              url: e.s,
              blobURL: null,
              countLoadings: 0,
            }),
            (this.samplesHash += +i)
        for (i in n) this._loadSample(n[i])
        this._checkSamples() && this._createPlayers()
      }),
      (f.prototype._loadSample = function (t) {
        var e = this,
          i = e.samplesCache.get(t.id)
        i
          ? ((t.blobURL = i), (e.loadingHash += t.id))
          : (t.countLoadings++,
            p.a
              .get(t.url, {
                responseType: "blob",
                cancelToken: e.httpRequests.token,
              })
              .then(
                function (i) {
                  if (i && 200 === i.status) {
                    var n = i.data,
                      s = URL.createObjectURL(n)
                    e.samplesCache.add({ url: i.config.url, blobURL: s }),
                      (t.blobURL = s),
                      (e.loadingHash += t.id),
                      e._checkSamples() && e._createPlayers()
                  }
                },
                function () {
                  console.dir("не смог загрузить семпл"),
                    console.dir(arguments),
                    (e.nextPartState = e.partStates.ERROR)
                },
              ))
      }),
      (f.prototype._checkSamples = function () {
        return (
          this.samplesHash === this.loadingHash &&
          (this.samplesCache.clearUsed(), !0)
        )
      }),
      (f.prototype._createPlayers = function () {
        var t,
          e = this,
          i = e.loadingSamples
        for (t in i) {
          var n = i[t]
          if (!e.playersCache.use(t)) {
            var o = new s.a.Player(n.blobURL, function (t) {
              t.connect(e.compressor, e.limiter),
                e.playersCache.check() && e._samplesLoaded()
            })
            e.playersCache.add(t, o)
          }
        }
        e.playersCache.check() && e._samplesLoaded()
      }),
      (f.prototype._samplesLoaded = function () {
        console.dir("samples loaded")
        if (this.state !== this.states.STOPED) {
          ;(this.nextPartState = this.partStates.LOADED),
            (this.loadedSamples = this.loadingSamples),
            this.scheduleCheckID &&
              (s.a.Transport.clear(this.scheduleCheckID),
              (this.scheduleCheckID = null))
          var t = this.nextMusicData
          ;(this.midiData = r.a.parse(atob(t.midi))),
            t.stream_params &&
              ((s.a.Transport.bpm.value = this._getBpm(t.stream_params)),
              (this.stream_params = t.stream_params)),
            t.gen_params && (this.gen_params = t.gen_params),
            this._scheduleEvents(),
            this.state === this.states.STARTING &&
              (this._callback({ name: "loaded", value: s.a.Transport.seconds }),
              this._startStream())
        } else console.dir("_samplesLoaded!!!!!!!!!!")
      }),
      (f.prototype._scheduleEvents = function (t) {
        var e = this
        e._appendPartEvents(),
          t ||
            (e.scheduleID = s.a.Transport.scheduleOnce(() => {
              e.state !== e.states.STOPED
                ? ((e.scheduleID = null),
                  e._callback({ name: "nextStream", value: e.nextTime }),
                  e._scheduleNextStream2())
                : console.dir("scheduleID!!!!!!!!!!")
            }, e.nextTime)),
          (e.nextTime += e.midiData.duration),
          (e.scheduleCheckID = s.a.Transport.scheduleOnce(() => {
            e.state !== e.states.STOPED
              ? (console.dir(
                  `check loading samples: ${
                    e.nextPartState < e.partStates.LOADED ? "loop" : "ok"
                  }`,
                ),
                (e.scheduleCheckID = null),
                e.nextPartState === e.partStates.LOADING &&
                  e._scheduleEvents(!0),
                e.nextPartState === e.partStates.ERROR &&
                  (null != e.scheduleID &&
                    (s.a.Transport.clear(e.scheduleID), (e.scheduleID = null)),
                  e._scheduleEvents()))
              : console.dir("scheduleCheckID!!!!!!!!!!")
          }, e.nextTime - 1))
      }),
      (f.prototype._appendPartEvents = function () {
        var t = this.part
        if (!t) return this.stop()
        var e,
          i,
          n,
          s = this.midiData.tracks[1].notes,
          o = this.loadedSamples,
          r = {}
        for (i in o) r[o[i].note] = i
        if (this.partId >= 2) {
          console.time("remove events")
          var a = this.partId - 2,
            u = t._events
          for (n = 0; n < u.length && !(u[n].value.partId > a); n++) {
            ;(h = this.playersCache.get(u[n].value.loopId)) &&
              h.mubertEvents &&
              h.mubertEvents--
          }
          if (n) {
            var l = t._events.splice(0, n)
            for (n = 0; n < l.length; n++) l[n].dispose()
          }
          console.timeEnd("remove events"),
            console.dir("remove " + n + " events")
        }
        for (n = 0; n < s.length; n++) {
          e = s[n]
          var h,
            c = { partId: this.partId, duration: e.duration, loopId: r[e.midi] }
          ;(h = this.playersCache.get(c.loopId)) && h.mubertEvents++,
            t.add(this.nextTime + e.time, c)
        }
        this.partId++
      }),
      (f.prototype._startStream = function () {
        this.state !== this.states.STOPED &&
          (console.dir("start stream"),
          (this.state = this.states.STARTED),
          s.a.Transport.start(),
          this.part.start(),
          this._callback({ name: "play", value: s.a.Transport.seconds }))
      }),
      (f.prototype._getBpm = function (t) {
        return (t[1] && t[1][0]) || 120
      }),
      (f.prototype._callback = function (t) {
        if (this.listeners.length) {
          null != this.stream &&
            (this.playerType === this.types.JS
              ? (t.sid = this.stream)
              : (t.src = this.stream))
          for (var e = 0; e < this.listeners.length; e++) this.listeners[e](t)
        }
      }),
      (f.prototype._scaleVolume = function (t, e = 0, i = 100, n = -30, s = 0) {
        return ((t - e) * (s - n)) / (i - e) + n
      }),
      (f.prototype.setVolume = function (t, e) {
        if (!Number.isFinite(t)) return !1
        ;(t ^= 0) > 100 && (t = 100),
          (this.volumeMute || this.volume !== t) &&
            (t <= 0
              ? this.mute()
              : (console.dir(t),
                e ||
                  ((this.volume = t),
                  this.Cookies.set("mubert-player-volume", t)),
                (s.a.Master.volume.value = this._scaleVolume(t)),
                (this.audio.volume = +(t / 100).toFixed(2)),
                this.unmute()),
            this._callback({ name: "setVolume", value: t }))
      }),
      (f.prototype.mute = function () {
        this.volumeMute ||
          ((this.volumeMute = !0),
          (s.a.Master.mute = !0),
          (this.audio.muted = !0),
          this.Cookies.set("mubert-player-volume", 0),
          this._callback({ name: "mute" }))
      }),
      (f.prototype.unmute = function () {
        this.volumeMute &&
          ((this.volumeMute = !1),
          (s.a.Master.mute = !1),
          (this.audio.muted = !1),
          this._callback({ name: "unmute", value: this.volume }))
      }),
      (f.prototype.toggleVolume = function () {
        s.a.Master.mute ? this.unmute() : this.mute()
      }),
      (f.prototype.initStatistic = function (t) {
        if ("number" != typeof t) return !1
        var e = this.statistic
        return (
          e || (e = this.statistic = {}),
          e.sid !== t ? ((e.sec = 0), (e.sid = t), !0) : void 0
        )
      }),
      (f.prototype.getStatistic = function () {
        var t = this.statistic,
          e = null
        return (
          isFinite(t.sid) &&
            t.sec &&
            (e || (e = {}), (e.listening = { sid: t.sid, sec: t.sec })),
          isFinite(t.gid) &&
            t.likes &&
            (e || (e = {}), (e.likes = { gid: t.gid, count: t.likes })),
          e
        )
      }),
      (f.prototype.clearListeningStatistic = function () {
        this.statistic.sec = 0
      }),
      (f.prototype.addListener = function (t, e) {
        t && "string" == typeof t && "function" == typeof e
          ? this.listenersMap[t]
            ? console.error(`Слушатель событий "${t}" уже существует.`)
            : ((this.listenersMap[t] = e), this.listeners.push(e))
          : console.error("Ошибка при добавлении слушателя событий в плеер.")
      }),
      (e.a = f)
  },
  function (t, e, i) {
    /*! NoSleep.js v0.7.0 - git.io/vfn01 - Rich Tibbett - MIT license */
    !(function (e, i) {
      t.exports = i()
    })(0, function () {
      return (function (t) {
        var e = {}
        function i(n) {
          if (e[n]) return e[n].exports
          var s = (e[n] = { i: n, l: !1, exports: {} })
          return t[n].call(s.exports, s, s.exports, i), (s.l = !0), s.exports
        }
        return (
          (i.m = t),
          (i.c = e),
          (i.d = function (t, e, n) {
            i.o(t, e) ||
              Object.defineProperty(t, e, {
                configurable: !1,
                enumerable: !0,
                get: n,
              })
          }),
          (i.n = function (t) {
            var e =
              t && t.__esModule
                ? function () {
                    return t.default
                  }
                : function () {
                    return t
                  }
            return i.d(e, "a", e), e
          }),
          (i.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
          }),
          (i.p = ""),
          i((i.s = 0))
        )
      })([
        function (t, e, i) {
          "use strict"
          var n = (function () {
            function t(t, e) {
              for (var i = 0; i < e.length; i++) {
                var n = e[i]
                ;(n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  "value" in n && (n.writable = !0),
                  Object.defineProperty(t, n.key, n)
              }
            }
            return function (e, i, n) {
              return i && t(e.prototype, i), n && t(e, n), e
            }
          })()
          var s = i(1),
            o =
              "undefined" != typeof navigator &&
              parseFloat(
                (
                  "" +
                  (/CPU.*OS ([0-9_]{3,4})[0-9_]{0,1}|(CPU like).*AppleWebKit.*Mobile/i.exec(
                    navigator.userAgent,
                  ) || [0, ""])[1]
                )
                  .replace("undefined", "3_2")
                  .replace("_", ".")
                  .replace("_", ""),
              ) < 10 &&
              !window.MSStream,
            r = function (t, e, i) {
              ;(e = e || ""), (i = i || 512)
              for (var n = atob(t), s = [], o = 0; o < n.length; o += i) {
                for (
                  var r = n.slice(o, o + i), a = new Array(r.length), u = 0;
                  u < r.length;
                  u++
                )
                  a[u] = r.charCodeAt(u)
                var l = new Uint8Array(a)
                s.push(l)
              }
              return new Blob(s, { type: e })
            },
            a = (function () {
              function t() {
                if (
                  ((function (t, e) {
                    if (!(t instanceof e))
                      throw new TypeError("Cannot call a class as a function")
                  })(this, t),
                  o)
                )
                  this.noSleepTimer = null
                else {
                  var e = r(s.substring(s.indexOf(",") + 1), "video/mp4"),
                    i = URL.createObjectURL(e)
                  ;(this.noSleepVideo = document.createElement("video")),
                    this.noSleepVideo.setAttribute("playsinline", ""),
                    this.noSleepVideo.setAttribute("src", i),
                    this.noSleepVideo.addEventListener(
                      "timeupdate",
                      function (t) {
                        this.noSleepVideo.currentTime > 0.5 &&
                          (this.noSleepVideo.currentTime = Math.random())
                      }.bind(this),
                    )
                }
              }
              return (
                n(t, [
                  {
                    key: "enable",
                    value: function () {
                      o
                        ? (this.disable(),
                          (this.noSleepTimer = window.setInterval(function () {
                            ;(window.location.href = "/"),
                              window.setTimeout(window.stop, 0)
                          }, 15e3)))
                        : this.noSleepVideo.play()
                    },
                  },
                  {
                    key: "disable",
                    value: function () {
                      o
                        ? this.noSleepTimer &&
                          (window.clearInterval(this.noSleepTimer),
                          (this.noSleepTimer = null))
                        : this.noSleepVideo.pause()
                    },
                  },
                  {
                    key: "setTitle",
                    value: function (t) {
                      o || (this.noSleepVideo.title = (t || "").toUpperCase())
                    },
                  },
                ]),
                t
              )
            })()
          t.exports = a
        },
        function (t, e, i) {
          "use strict"
          t.exports =
            "data:video/mp4;base64,AAAAIGZ0eXBtcDQyAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC8wYF///v3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0MiByMjQ3OSBkZDc5YTYxIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNCAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTEgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MToweDExMSBtZT1oZXggc3VibWU9MiBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0wIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MCA4eDhkY3Q9MCBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0wIHRocmVhZHM9NiBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgY29uc3RyYWluZWRfaW50cmE9MCBiZnJhbWVzPTMgYl9weXJhbWlkPTIgYl9hZGFwdD0xIGJfYmlhcz0wIGRpcmVjdD0xIHdlaWdodGI9MSBvcGVuX2dvcD0wIHdlaWdodHA9MSBrZXlpbnQ9MzAwIGtleWludF9taW49MzAgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD0xMCByYz1jcmYgbWJ0cmVlPTEgY3JmPTIwLjAgcWNvbXA9MC42MCBxcG1pbj0wIHFwbWF4PTY5IHFwc3RlcD00IHZidl9tYXhyYXRlPTIwMDAwIHZidl9idWZzaXplPTI1MDAwIGNyZl9tYXg9MC4wIG5hbF9ocmQ9bm9uZSBmaWxsZXI9MCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAOWWIhAA3//p+C7v8tDDSTjf97w55i3SbRPO4ZY+hkjD5hbkAkL3zpJ6h/LR1CAABzgB1kqqzUorlhQAAAAxBmiQYhn/+qZYADLgAAAAJQZ5CQhX/AAj5IQADQGgcIQADQGgcAAAACQGeYUQn/wALKCEAA0BoHAAAAAkBnmNEJ/8ACykhAANAaBwhAANAaBwAAAANQZpoNExDP/6plgAMuSEAA0BoHAAAAAtBnoZFESwr/wAI+SEAA0BoHCEAA0BoHAAAAAkBnqVEJ/8ACykhAANAaBwAAAAJAZ6nRCf/AAsoIQADQGgcIQADQGgcAAAADUGarDRMQz/+qZYADLghAANAaBwAAAALQZ7KRRUsK/8ACPkhAANAaBwAAAAJAZ7pRCf/AAsoIQADQGgcIQADQGgcAAAACQGe60Qn/wALKCEAA0BoHAAAAA1BmvA0TEM//qmWAAy5IQADQGgcIQADQGgcAAAAC0GfDkUVLCv/AAj5IQADQGgcAAAACQGfLUQn/wALKSEAA0BoHCEAA0BoHAAAAAkBny9EJ/8ACyghAANAaBwAAAANQZs0NExDP/6plgAMuCEAA0BoHAAAAAtBn1JFFSwr/wAI+SEAA0BoHCEAA0BoHAAAAAkBn3FEJ/8ACyghAANAaBwAAAAJAZ9zRCf/AAsoIQADQGgcIQADQGgcAAAADUGbeDRMQz/+qZYADLkhAANAaBwAAAALQZ+WRRUsK/8ACPghAANAaBwhAANAaBwAAAAJAZ+1RCf/AAspIQADQGgcAAAACQGft0Qn/wALKSEAA0BoHCEAA0BoHAAAAA1Bm7w0TEM//qmWAAy4IQADQGgcAAAAC0Gf2kUVLCv/AAj5IQADQGgcAAAACQGf+UQn/wALKCEAA0BoHCEAA0BoHAAAAAkBn/tEJ/8ACykhAANAaBwAAAANQZvgNExDP/6plgAMuSEAA0BoHCEAA0BoHAAAAAtBnh5FFSwr/wAI+CEAA0BoHAAAAAkBnj1EJ/8ACyghAANAaBwhAANAaBwAAAAJAZ4/RCf/AAspIQADQGgcAAAADUGaJDRMQz/+qZYADLghAANAaBwAAAALQZ5CRRUsK/8ACPkhAANAaBwhAANAaBwAAAAJAZ5hRCf/AAsoIQADQGgcAAAACQGeY0Qn/wALKSEAA0BoHCEAA0BoHAAAAA1Bmmg0TEM//qmWAAy5IQADQGgcAAAAC0GehkUVLCv/AAj5IQADQGgcIQADQGgcAAAACQGepUQn/wALKSEAA0BoHAAAAAkBnqdEJ/8ACyghAANAaBwAAAANQZqsNExDP/6plgAMuCEAA0BoHCEAA0BoHAAAAAtBnspFFSwr/wAI+SEAA0BoHAAAAAkBnulEJ/8ACyghAANAaBwhAANAaBwAAAAJAZ7rRCf/AAsoIQADQGgcAAAADUGa8DRMQz/+qZYADLkhAANAaBwhAANAaBwAAAALQZ8ORRUsK/8ACPkhAANAaBwAAAAJAZ8tRCf/AAspIQADQGgcIQADQGgcAAAACQGfL0Qn/wALKCEAA0BoHAAAAA1BmzQ0TEM//qmWAAy4IQADQGgcAAAAC0GfUkUVLCv/AAj5IQADQGgcIQADQGgcAAAACQGfcUQn/wALKCEAA0BoHAAAAAkBn3NEJ/8ACyghAANAaBwhAANAaBwAAAANQZt4NExC//6plgAMuSEAA0BoHAAAAAtBn5ZFFSwr/wAI+CEAA0BoHCEAA0BoHAAAAAkBn7VEJ/8ACykhAANAaBwAAAAJAZ+3RCf/AAspIQADQGgcAAAADUGbuzRMQn/+nhAAYsAhAANAaBwhAANAaBwAAAAJQZ/aQhP/AAspIQADQGgcAAAACQGf+UQn/wALKCEAA0BoHCEAA0BoHCEAA0BoHCEAA0BoHCEAA0BoHCEAA0BoHAAACiFtb292AAAAbG12aGQAAAAA1YCCX9WAgl8AAAPoAAAH/AABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAGGlvZHMAAAAAEICAgAcAT////v7/AAAF+XRyYWsAAABcdGtoZAAAAAPVgIJf1YCCXwAAAAEAAAAAAAAH0AAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAygAAAMoAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAB9AAABdwAAEAAAAABXFtZGlhAAAAIG1kaGQAAAAA1YCCX9WAgl8AAV+QAAK/IFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAUcbWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAE3HN0YmwAAACYc3RzZAAAAAAAAAABAAAAiGF2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAygDKAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAyYXZjQwFNQCj/4QAbZ01AKOyho3ySTUBAQFAAAAMAEAAr8gDxgxlgAQAEaO+G8gAAABhzdHRzAAAAAAAAAAEAAAA8AAALuAAAABRzdHNzAAAAAAAAAAEAAAABAAAB8GN0dHMAAAAAAAAAPAAAAAEAABdwAAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAADqYAAAAAQAAF3AAAAABAAAAAAAAAAEAAAu4AAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAADqYAAAAAQAAF3AAAAABAAAAAAAAAAEAAAu4AAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAADqYAAAAAQAAF3AAAAABAAAAAAAAAAEAAAu4AAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAADqYAAAAAQAAF3AAAAABAAAAAAAAAAEAAAu4AAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAAC7gAAAAAQAAF3AAAAABAAAAAAAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAEEc3RzegAAAAAAAAAAAAAAPAAAAzQAAAAQAAAADQAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAAPAAAADQAAAA0AAAARAAAADwAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAAPAAAADQAAAA0AAAARAAAADwAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAAPAAAADQAAAA0AAAARAAAADwAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAAPAAAADQAAAA0AAAARAAAADwAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAANAAAADQAAAQBzdGNvAAAAAAAAADwAAAAwAAADZAAAA3QAAAONAAADoAAAA7kAAAPQAAAD6wAAA/4AAAQXAAAELgAABEMAAARcAAAEbwAABIwAAAShAAAEugAABM0AAATkAAAE/wAABRIAAAUrAAAFQgAABV0AAAVwAAAFiQAABaAAAAW1AAAFzgAABeEAAAX+AAAGEwAABiwAAAY/AAAGVgAABnEAAAaEAAAGnQAABrQAAAbPAAAG4gAABvUAAAcSAAAHJwAAB0AAAAdTAAAHcAAAB4UAAAeeAAAHsQAAB8gAAAfjAAAH9gAACA8AAAgmAAAIQQAACFQAAAhnAAAIhAAACJcAAAMsdHJhawAAAFx0a2hkAAAAA9WAgl/VgIJfAAAAAgAAAAAAAAf8AAAAAAAAAAAAAAABAQAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAACsm1kaWEAAAAgbWRoZAAAAADVgIJf1YCCXwAArEQAAWAAVcQAAAAAACdoZGxyAAAAAAAAAABzb3VuAAAAAAAAAAAAAAAAU3RlcmVvAAAAAmNtaW5mAAAAEHNtaGQAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAidzdGJsAAAAZ3N0c2QAAAAAAAAAAQAAAFdtcDRhAAAAAAAAAAEAAAAAAAAAAAACABAAAAAArEQAAAAAADNlc2RzAAAAAAOAgIAiAAIABICAgBRAFQAAAAADDUAAAAAABYCAgAISEAaAgIABAgAAABhzdHRzAAAAAAAAAAEAAABYAAAEAAAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAUc3RzegAAAAAAAAAGAAAAWAAAAXBzdGNvAAAAAAAAAFgAAAOBAAADhwAAA5oAAAOtAAADswAAA8oAAAPfAAAD5QAAA/gAAAQLAAAEEQAABCgAAAQ9AAAEUAAABFYAAARpAAAEgAAABIYAAASbAAAErgAABLQAAATHAAAE3gAABPMAAAT5AAAFDAAABR8AAAUlAAAFPAAABVEAAAVXAAAFagAABX0AAAWDAAAFmgAABa8AAAXCAAAFyAAABdsAAAXyAAAF+AAABg0AAAYgAAAGJgAABjkAAAZQAAAGZQAABmsAAAZ+AAAGkQAABpcAAAauAAAGwwAABskAAAbcAAAG7wAABwYAAAcMAAAHIQAABzQAAAc6AAAHTQAAB2QAAAdqAAAHfwAAB5IAAAeYAAAHqwAAB8IAAAfXAAAH3QAAB/AAAAgDAAAICQAACCAAAAg1AAAIOwAACE4AAAhhAAAIeAAACH4AAAiRAAAIpAAACKoAAAiwAAAItgAACLwAAAjCAAAAFnVkdGEAAAAObmFtZVN0ZXJlbwAAAHB1ZHRhAAAAaG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAAO2lsc3QAAAAzqXRvbwAAACtkYXRhAAAAAQAAAABIYW5kQnJha2UgMC4xMC4yIDIwMTUwNjExMDA="
        },
      ])
    })
  },
  function (t, e, i) {
    "use strict"
    t.exports = function (t, e) {
      return function () {
        for (var i = new Array(arguments.length), n = 0; n < i.length; n++)
          i[n] = arguments[n]
        return t.apply(e, i)
      }
    }
  },
  function (t, e, i) {
    "use strict"
    var n = i(1),
      s = i(20),
      o = i(22),
      r = i(23),
      a = i(24),
      u = i(8),
      l =
        ("undefined" != typeof window &&
          window.btoa &&
          window.btoa.bind(window)) ||
        i(25)
    t.exports = function (t) {
      return new Promise(function (e, h) {
        var c = t.data,
          p = t.headers
        n.isFormData(c) && delete p["Content-Type"]
        var f = new XMLHttpRequest(),
          d = "onreadystatechange",
          y = !1
        if (
          ("undefined" == typeof window ||
            !window.XDomainRequest ||
            "withCredentials" in f ||
            a(t.url) ||
            ((f = new window.XDomainRequest()),
            (d = "onload"),
            (y = !0),
            (f.onprogress = function () {}),
            (f.ontimeout = function () {})),
          t.auth)
        ) {
          var A = t.auth.username || "",
            _ = t.auth.password || ""
          p.Authorization = "Basic " + l(A + ":" + _)
        }
        if (
          (f.open(
            t.method.toUpperCase(),
            o(t.url, t.params, t.paramsSerializer),
            !0,
          ),
          (f.timeout = t.timeout),
          (f[d] = function () {
            if (
              f &&
              (4 === f.readyState || y) &&
              (0 !== f.status ||
                (f.responseURL && 0 === f.responseURL.indexOf("file:")))
            ) {
              var i =
                  "getAllResponseHeaders" in f
                    ? r(f.getAllResponseHeaders())
                    : null,
                n = {
                  data:
                    t.responseType && "text" !== t.responseType
                      ? f.response
                      : f.responseText,
                  status: 1223 === f.status ? 204 : f.status,
                  statusText: 1223 === f.status ? "No Content" : f.statusText,
                  headers: i,
                  config: t,
                  request: f,
                }
              s(e, h, n), (f = null)
            }
          }),
          (f.onerror = function () {
            h(u("Network Error", t, null, f)), (f = null)
          }),
          (f.ontimeout = function () {
            h(
              u(
                "timeout of " + t.timeout + "ms exceeded",
                t,
                "ECONNABORTED",
                f,
              ),
            ),
              (f = null)
          }),
          n.isStandardBrowserEnv())
        ) {
          var m = i(26),
            v =
              (t.withCredentials || a(t.url)) && t.xsrfCookieName
                ? m.read(t.xsrfCookieName)
                : void 0
          v && (p[t.xsrfHeaderName] = v)
        }
        if (
          ("setRequestHeader" in f &&
            n.forEach(p, function (t, e) {
              void 0 === c && "content-type" === e.toLowerCase()
                ? delete p[e]
                : f.setRequestHeader(e, t)
            }),
          t.withCredentials && (f.withCredentials = !0),
          t.responseType)
        )
          try {
            f.responseType = t.responseType
          } catch (e) {
            if ("json" !== t.responseType) throw e
          }
        "function" == typeof t.onDownloadProgress &&
          f.addEventListener("progress", t.onDownloadProgress),
          "function" == typeof t.onUploadProgress &&
            f.upload &&
            f.upload.addEventListener("progress", t.onUploadProgress),
          t.cancelToken &&
            t.cancelToken.promise.then(function (t) {
              f && (f.abort(), h(t), (f = null))
            }),
          void 0 === c && (c = null),
          f.send(c)
      })
    }
  },
  function (t, e, i) {
    "use strict"
    var n = i(21)
    t.exports = function (t, e, i, s, o) {
      var r = new Error(t)
      return n(r, e, i, s, o)
    }
  },
  function (t, e, i) {
    "use strict"
    t.exports = function (t) {
      return !(!t || !t.__CANCEL__)
    }
  },
  function (t, e, i) {
    "use strict"
    function n(t) {
      this.message = t
    }
    ;(n.prototype.toString = function () {
      return "Cancel" + (this.message ? ": " + this.message : "")
    }),
      (n.prototype.__CANCEL__ = !0),
      (t.exports = n)
  },
  function (t, e, i) {
    t.exports = (function (t) {
      function e(n) {
        if (i[n]) return i[n].exports
        var s = (i[n] = { exports: {}, id: n, loaded: !1 })
        return t[n].call(s.exports, s, s.exports, e), (s.loaded = !0), s.exports
      }
      var i = {}
      return (e.m = t), (e.c = i), (e.p = ""), e(0)
    })([
      function (t, e, i) {
        "use strict"
        Object.defineProperty(e, "__esModule", { value: !0 })
        var n = i(7),
          s = i(2),
          o = {
            instrumentByPatchID: s.instrumentByPatchID,
            instrumentFamilyByID: s.instrumentFamilyByID,
            parse: function (t) {
              return new n.Midi().decode(t)
            },
            load: function (t, e) {
              var i = new n.Midi().load(t)
              return e && i.then(e), i
            },
            create: function () {
              return new n.Midi()
            },
          }
        ;(e.default = o), (t.exports = o)
      },
      function (t, e) {
        "use strict"
        function i(t) {
          return "string" == typeof t
        }
        var n = (function () {
            var t = /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i
            return function (e) {
              return i(e) && t.test(e)
            }
          })(),
          s = (function () {
            var t = /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i,
              e = {
                cbb: -2,
                cb: -1,
                c: 0,
                "c#": 1,
                cx: 2,
                dbb: 0,
                db: 1,
                d: 2,
                "d#": 3,
                dx: 4,
                ebb: 2,
                eb: 3,
                e: 4,
                "e#": 5,
                ex: 6,
                fbb: 3,
                fb: 4,
                f: 5,
                "f#": 6,
                fx: 7,
                gbb: 5,
                gb: 6,
                g: 7,
                "g#": 8,
                gx: 9,
                abb: 7,
                ab: 8,
                a: 9,
                "a#": 10,
                ax: 11,
                bbb: 9,
                bb: 10,
                b: 11,
                "b#": 12,
                bx: 13,
              }
            return function (i) {
              var n = t.exec(i),
                s = n[1],
                o = n[2],
                r = e[s.toLowerCase()]
              return r + 12 * (parseInt(o) + 1)
            }
          })()
        t.exports = {
          cleanName: function (t) {
            return t.replace(/\u0000/g, "")
          },
          ticksToSeconds: function (t, e) {
            return (60 / e.bpm) * (t / e.PPQ)
          },
          isString: i,
          isNumber: function (t) {
            return "number" == typeof t
          },
          isPitch: n,
          midiToPitch: function (t) {
            var e = Math.floor(t / 12) - 1
            return (
              ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][
                t % 12
              ] + e
            )
          },
          pitchToMidi: s,
        }
      },
      function (t, e) {
        "use strict"
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.instrumentByPatchID = [
            "acoustic grand piano",
            "bright acoustic piano",
            "electric grand piano",
            "honky-tonk piano",
            "electric piano 1",
            "electric piano 2",
            "harpsichord",
            "clavi",
            "celesta",
            "glockenspiel",
            "music box",
            "vibraphone",
            "marimba",
            "xylophone",
            "tubular bells",
            "dulcimer",
            "drawbar organ",
            "percussive organ",
            "rock organ",
            "church organ",
            "reed organ",
            "accordion",
            "harmonica",
            "tango accordion",
            "acoustic guitar (nylon)",
            "acoustic guitar (steel)",
            "electric guitar (jazz)",
            "electric guitar (clean)",
            "electric guitar (muted)",
            "overdriven guitar",
            "distortion guitar",
            "guitar harmonics",
            "acoustic bass",
            "electric bass (finger)",
            "electric bass (pick)",
            "fretless bass",
            "slap bass 1",
            "slap bass 2",
            "synth bass 1",
            "synth bass 2",
            "violin",
            "viola",
            "cello",
            "contrabass",
            "tremolo strings",
            "pizzicato strings",
            "orchestral harp",
            "timpani",
            "string ensemble 1",
            "string ensemble 2",
            "synthstrings 1",
            "synthstrings 2",
            "choir aahs",
            "voice oohs",
            "synth voice",
            "orchestra hit",
            "trumpet",
            "trombone",
            "tuba",
            "muted trumpet",
            "french horn",
            "brass section",
            "synthbrass 1",
            "synthbrass 2",
            "soprano sax",
            "alto sax",
            "tenor sax",
            "baritone sax",
            "oboe",
            "english horn",
            "bassoon",
            "clarinet",
            "piccolo",
            "flute",
            "recorder",
            "pan flute",
            "blown bottle",
            "shakuhachi",
            "whistle",
            "ocarina",
            "lead 1 (square)",
            "lead 2 (sawtooth)",
            "lead 3 (calliope)",
            "lead 4 (chiff)",
            "lead 5 (charang)",
            "lead 6 (voice)",
            "lead 7 (fifths)",
            "lead 8 (bass + lead)",
            "pad 1 (new age)",
            "pad 2 (warm)",
            "pad 3 (polysynth)",
            "pad 4 (choir)",
            "pad 5 (bowed)",
            "pad 6 (metallic)",
            "pad 7 (halo)",
            "pad 8 (sweep)",
            "fx 1 (rain)",
            "fx 2 (soundtrack)",
            "fx 3 (crystal)",
            "fx 4 (atmosphere)",
            "fx 5 (brightness)",
            "fx 6 (goblins)",
            "fx 7 (echoes)",
            "fx 8 (sci-fi)",
            "sitar",
            "banjo",
            "shamisen",
            "koto",
            "kalimba",
            "bag pipe",
            "fiddle",
            "shanai",
            "tinkle bell",
            "agogo",
            "steel drums",
            "woodblock",
            "taiko drum",
            "melodic tom",
            "synth drum",
            "reverse cymbal",
            "guitar fret noise",
            "breath noise",
            "seashore",
            "bird tweet",
            "telephone ring",
            "helicopter",
            "applause",
            "gunshot",
          ]),
          (e.instrumentFamilyByID = [
            "piano",
            "chromatic percussion",
            "organ",
            "guitar",
            "bass",
            "strings",
            "ensemble",
            "brass",
            "reed",
            "pipe",
            "synth lead",
            "synth pad",
            "synth effects",
            "ethnic",
            "percussive",
            "sound effects",
          ])
      },
      function (t, e) {
        "use strict"
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.BinaryInsert = function (t, e) {
            if (t.length) {
              var i = (function (t, e) {
                var i = 0,
                  n = t.length,
                  s = n
                if (n > 0 && t[n - 1].time <= e) return n - 1
                for (; s > i; ) {
                  var o = Math.floor(i + (s - i) / 2),
                    r = t[o],
                    a = t[o + 1]
                  if (r.time === e) {
                    for (var u = o; u < t.length; u++) {
                      var l = t[u]
                      l.time === e && (o = u)
                    }
                    return o
                  }
                  if (r.time < e && a.time > e) return o
                  r.time > e ? (s = o) : r.time < e && (i = o + 1)
                }
                return -1
              })(t, e.time)
              t.splice(i + 1, 0, e)
            } else t.push(e)
          })
      },
      function (t, e) {
        "use strict"
        Object.defineProperty(e, "__esModule", { value: !0 })
        var i = (function () {
            function t(t, e) {
              for (var i = 0; i < e.length; i++) {
                var n = e[i]
                ;(n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  "value" in n && (n.writable = !0),
                  Object.defineProperty(t, n.key, n)
              }
            }
            return function (e, i, n) {
              return i && t(e.prototype, i), n && t(e, n), e
            }
          })(),
          n = {
            1: "modulationWheel",
            2: "breath",
            4: "footController",
            5: "portamentoTime",
            7: "volume",
            8: "balance",
            10: "pan",
            64: "sustain",
            65: "portamentoTime",
            66: "sostenuto",
            67: "softPedal",
            68: "legatoFootswitch",
            84: "portamentoContro",
          },
          s = (function () {
            function t(e, i, n) {
              ;(function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function")
              })(this, t),
                (this.number = e),
                (this.time = i),
                (this.value = n)
            }
            return (
              i(t, [
                {
                  key: "name",
                  get: function () {
                    return n.hasOwnProperty(this.number)
                      ? n[this.number]
                      : void 0
                  },
                },
              ]),
              t
            )
          })()
        e.Control = s
      },
      function (t, e) {
        "use strict"
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.parseHeader = function (t) {
            for (
              var e = { PPQ: t.header.ticksPerBeat }, i = 0;
              i < t.tracks.length;
              i++
            )
              for (var n = t.tracks[i], s = 0; s < n.length; s++) {
                var o = n[s]
                "meta" === o.type &&
                  ("timeSignature" === o.subtype
                    ? (e.timeSignature = [o.numerator, o.denominator])
                    : "setTempo" === o.subtype &&
                      (e.bpm || (e.bpm = 6e7 / o.microsecondsPerBeat)))
              }
            return (e.bpm = e.bpm || 120), e
          })
      },
      function (t, e) {
        "use strict"
        function i(t, e) {
          for (var i = 0; i < t.length; i++) {
            var n = t[i],
              s = e[i]
            if (n.length > s) return !0
          }
          return !1
        }
        function n(t, e, i) {
          for (var n = 0, s = 1 / 0, o = 0; o < t.length; o++) {
            var r = t[o],
              a = e[o]
            r[a] && r[a].time < s && ((n = o), (s = r[a].time))
          }
          i[n](t[n][e[n]]), (e[n] += 1)
        }
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.Merge = function () {
            for (var t = arguments.length, e = Array(t), s = 0; t > s; s++)
              e[s] = arguments[s]
            for (
              var o = e.filter(function (t, e) {
                  return e % 2 == 0
                }),
                r = new Uint32Array(o.length),
                a = e.filter(function (t, e) {
                  return e % 2 == 1
                });
              i(o, r);

            )
              n(o, r, a)
          })
      },
      function (t, e, i) {
        "use strict"
        function n(t) {
          return t && t.__esModule ? t : { default: t }
        }
        Object.defineProperty(e, "__esModule", { value: !0 }), (e.Midi = void 0)
        var s = (function () {
            function t(t, e) {
              for (var i = 0; i < e.length; i++) {
                var n = e[i]
                ;(n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  "value" in n && (n.writable = !0),
                  Object.defineProperty(t, n.key, n)
              }
            }
            return function (e, i, n) {
              return i && t(e.prototype, i), n && t(e, n), e
            }
          })(),
          o = i(11),
          r = n(o),
          a = i(10),
          u = n(a),
          l = i(1),
          h = n(l),
          c = i(9),
          p = i(5),
          f = (function () {
            function t() {
              ;(function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function")
              })(this, t),
                (this.header = { bpm: 120, timeSignature: [4, 4], PPQ: 480 }),
                (this.tracks = [])
            }
            return (
              s(t, [
                {
                  key: "load",
                  value: function (t) {
                    var e = this,
                      i =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : null,
                      n =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : "GET"
                    return new Promise(function (s, o) {
                      var r = new XMLHttpRequest()
                      r.open(n, t),
                        (r.responseType = "arraybuffer"),
                        r.addEventListener("load", function () {
                          4 === r.readyState && 200 === r.status
                            ? s(e.decode(r.response))
                            : o(r.status)
                        }),
                        r.addEventListener("error", o),
                        r.send(i)
                    })
                  },
                },
                {
                  key: "decode",
                  value: function (t) {
                    var e = this
                    if (t instanceof ArrayBuffer) {
                      var i = new Uint8Array(t)
                      t = String.fromCharCode.apply(null, i)
                    }
                    var n = (0, r.default)(t)
                    return (
                      (this.header = (0, p.parseHeader)(n)),
                      (this.tracks = []),
                      n.tracks.forEach(function (t) {
                        var i = new c.Track()
                        e.tracks.push(i)
                        var n = 0
                        t.forEach(function (t) {
                          ;(n += h.default.ticksToSeconds(
                            t.deltaTime,
                            e.header,
                          )),
                            "meta" === t.type && "trackName" === t.subtype
                              ? (i.name = h.default.cleanName(t.text))
                              : "noteOn" === t.subtype
                              ? i.noteOn(t.noteNumber, n, t.velocity / 127)
                              : "noteOff" === t.subtype
                              ? i.noteOff(t.noteNumber, n)
                              : "controller" === t.subtype && t.controllerType
                              ? i.cc(t.controllerType, n, t.value / 127)
                              : "meta" === t.type &&
                                "instrumentName" === t.subtype
                              ? (i.instrument = t.text)
                              : "channel" === t.type &&
                                "programChange" === t.subtype &&
                                i.patch(t.programNumber)
                        })
                      }),
                      this
                    )
                  },
                },
                {
                  key: "encode",
                  value: function () {
                    var t = this,
                      e = new u.default.File({ ticks: this.header.PPQ })
                    return (
                      this.tracks.forEach(function (i, n) {
                        var s = e.addTrack()
                        s.setTempo(t.bpm), i.encode(s, t.header)
                      }),
                      e.toBytes()
                    )
                  },
                },
                {
                  key: "toArray",
                  value: function () {
                    for (
                      var t = this.encode(), e = new Array(t.length), i = 0;
                      i < t.length;
                      i++
                    )
                      e[i] = t.charCodeAt(i)
                    return e
                  },
                },
                {
                  key: "track",
                  value: function (t) {
                    var e = new c.Track(t)
                    return this.tracks.push(e), e
                  },
                },
                {
                  key: "get",
                  value: function (t) {
                    return h.default.isNumber(t)
                      ? this.tracks[t]
                      : this.tracks.find(function (e) {
                          return e.name === t
                        })
                  },
                },
                {
                  key: "slice",
                  value: function () {
                    var e =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : 0,
                      i =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : this.duration,
                      n = new t()
                    return (
                      (n.header = this.header),
                      (n.tracks = this.tracks.map(function (t) {
                        return t.slice(e, i)
                      })),
                      n
                    )
                  },
                },
                {
                  key: "startTime",
                  get: function () {
                    var t = this.tracks.map(function (t) {
                      return t.startTime
                    })
                    return Math.min.apply(Math, t)
                  },
                },
                {
                  key: "bpm",
                  get: function () {
                    return this.header.bpm
                  },
                  set: function (t) {
                    var e = this.header.bpm
                    this.header.bpm = t
                    var i = e / t
                    this.tracks.forEach(function (t) {
                      return t.scale(i)
                    })
                  },
                },
                {
                  key: "timeSignature",
                  get: function () {
                    return this.header.timeSignature
                  },
                  set: function (t) {
                    this.header.timeSignature = timeSignature
                  },
                },
                {
                  key: "duration",
                  get: function () {
                    var t = this.tracks.map(function (t) {
                      return t.duration
                    })
                    return Math.max.apply(Math, t)
                  },
                },
              ]),
              t
            )
          })()
        e.Midi = f
      },
      function (t, e, i) {
        "use strict"
        Object.defineProperty(e, "__esModule", { value: !0 }), (e.Note = void 0)
        var n = (function () {
            function t(t, e) {
              for (var i = 0; i < e.length; i++) {
                var n = e[i]
                ;(n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  "value" in n && (n.writable = !0),
                  Object.defineProperty(t, n.key, n)
              }
            }
            return function (e, i, n) {
              return i && t(e.prototype, i), n && t(e, n), e
            }
          })(),
          s = i(1),
          o = (function (t) {
            return t && t.__esModule ? t : { default: t }
          })(s),
          r = (function () {
            function t(e, i) {
              var n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : 0,
                s =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : 1
              if (
                ((function (t, e) {
                  if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function")
                })(this, t),
                this.midi,
                o.default.isNumber(e))
              )
                this.midi = e
              else {
                if (!o.default.isPitch(e))
                  throw new Error(
                    "the midi value must either be in Pitch Notation (e.g. C#4) or a midi value",
                  )
                this.name = e
              }
              ;(this.time = i), (this.duration = n), (this.velocity = s)
            }
            return (
              n(t, [
                {
                  key: "match",
                  value: function (t) {
                    return o.default.isNumber(t)
                      ? this.midi === t
                      : o.default.isPitch(t)
                      ? this.name.toLowerCase() === t.toLowerCase()
                      : void 0
                  },
                },
                {
                  key: "toJSON",
                  value: function () {
                    return {
                      name: this.name,
                      midi: this.midi,
                      time: this.time,
                      velocity: this.velocity,
                      duration: this.duration,
                    }
                  },
                },
                {
                  key: "name",
                  get: function () {
                    return o.default.midiToPitch(this.midi)
                  },
                  set: function (t) {
                    this.midi = o.default.pitchToMidi(t)
                  },
                },
                {
                  key: "noteOn",
                  get: function () {
                    return this.time
                  },
                  set: function (t) {
                    this.time = t
                  },
                },
                {
                  key: "noteOff",
                  get: function () {
                    return this.time + this.duration
                  },
                  set: function (t) {
                    this.duration = t - this.time
                  },
                },
              ]),
              t
            )
          })()
        e.Note = r
      },
      function (t, e, i) {
        "use strict"
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.Track = void 0)
        var n = (function () {
            function t(t, e) {
              for (var i = 0; i < e.length; i++) {
                var n = e[i]
                ;(n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  "value" in n && (n.writable = !0),
                  Object.defineProperty(t, n.key, n)
              }
            }
            return function (e, i, n) {
              return i && t(e.prototype, i), n && t(e, n), e
            }
          })(),
          s = i(3),
          o = i(4),
          r = i(6),
          a = i(8),
          u = i(2),
          l = (function () {
            function t() {
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : "",
                i =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : -1
              ;(function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function")
              })(this, t),
                (this.name = e),
                (this.notes = []),
                (this.controlChanges = {}),
                (this.instrumentNumber = i)
            }
            return (
              n(t, [
                {
                  key: "note",
                  value: function (t, e) {
                    var i =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : 0,
                      n =
                        arguments.length > 3 && void 0 !== arguments[3]
                          ? arguments[3]
                          : 1,
                      o = new a.Note(t, e, i, n)
                    return (0, s.BinaryInsert)(this.notes, o), this
                  },
                },
                {
                  key: "noteOn",
                  value: function (t, e) {
                    var i =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : 1,
                      n = new a.Note(t, e, 0, i)
                    return (0, s.BinaryInsert)(this.notes, n), this
                  },
                },
                {
                  key: "noteOff",
                  value: function (t, e) {
                    for (var i = 0; i < this.notes.length; i++) {
                      var n = this.notes[i]
                      if (n.match(t) && 0 === n.duration) {
                        n.noteOff = e
                        break
                      }
                    }
                    return this
                  },
                },
                {
                  key: "cc",
                  value: function (t, e, i) {
                    this.controlChanges.hasOwnProperty(t) ||
                      (this.controlChanges[t] = [])
                    var n = new o.Control(t, e, i)
                    return (0, s.BinaryInsert)(this.controlChanges[t], n), this
                  },
                },
                {
                  key: "patch",
                  value: function (t) {
                    return (this.instrumentNumber = t), this
                  },
                },
                {
                  key: "scale",
                  value: function (t) {
                    return (
                      this.notes.forEach(function (e) {
                        ;(e.time *= t), (e.duration *= t)
                      }),
                      this
                    )
                  },
                },
                {
                  key: "slice",
                  value: function () {
                    var e =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : 0,
                      i =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : this.duration,
                      n = Math.max(
                        this.notes.findIndex(function (t) {
                          return t.time >= e
                        }),
                        0,
                      ),
                      s =
                        this.notes.findIndex(function (t) {
                          return t.noteOff >= i
                        }) + 1,
                      o = new t(this.name)
                    return (
                      (o.notes = this.notes.slice(n, s)),
                      o.notes.forEach(function (t) {
                        return (t.time = t.time - e)
                      }),
                      o
                    )
                  },
                },
                {
                  key: "encode",
                  value: function (t, e) {
                    function i(t) {
                      var e = Math.floor(n * t),
                        i = Math.max(e - s, 0)
                      return (s = e), i
                    }
                    var n = e.PPQ / (60 / e.bpm),
                      s = 0
                    ;-1 !== this.instrumentNumber &&
                      t.instrument(0, this.instrumentNumber),
                      (0, r.Merge)(
                        this.noteOns,
                        function (e) {
                          t.addNoteOn(
                            0,
                            e.name,
                            i(e.time),
                            Math.floor(127 * e.velocity),
                          )
                        },
                        this.noteOffs,
                        function (e) {
                          t.addNoteOff(0, e.name, i(e.time))
                        },
                      )
                  },
                },
                {
                  key: "noteOns",
                  get: function () {
                    var t = []
                    return (
                      this.notes.forEach(function (e) {
                        t.push({
                          time: e.noteOn,
                          midi: e.midi,
                          name: e.name,
                          velocity: e.velocity,
                        })
                      }),
                      t
                    )
                  },
                },
                {
                  key: "noteOffs",
                  get: function () {
                    var t = []
                    return (
                      this.notes.forEach(function (e) {
                        t.push({ time: e.noteOff, midi: e.midi, name: e.name })
                      }),
                      t
                    )
                  },
                },
                {
                  key: "length",
                  get: function () {
                    return this.notes.length
                  },
                },
                {
                  key: "startTime",
                  get: function () {
                    if (this.notes.length) {
                      var t = this.notes[0]
                      return t.noteOn
                    }
                    return 0
                  },
                },
                {
                  key: "duration",
                  get: function () {
                    if (this.notes.length) {
                      var t = this.notes[this.notes.length - 1]
                      return t.noteOff
                    }
                    return 0
                  },
                },
                {
                  key: "instrument",
                  get: function () {
                    return u.instrumentByPatchID[this.instrumentNumber]
                  },
                  set: function (t) {
                    var e = u.instrumentByPatchID.indexOf(t)
                    ;-1 !== e && (this.instrumentNumber = e)
                  },
                },
                {
                  key: "instrumentFamily",
                  get: function () {
                    return u.instrumentFamilyByID[
                      Math.floor(this.instrumentNumber / 8)
                    ]
                  },
                },
              ]),
              t
            )
          })()
        e.Track = l
      },
      function (t, e, i) {
        ;(function (t) {
          var i = {}
          !(function (t) {
            var e = (t.DEFAULT_VOLUME = 90),
              i =
                ((t.DEFAULT_DURATION = 128),
                (t.DEFAULT_CHANNEL = 0),
                {
                  midi_letter_pitches: {
                    a: 21,
                    b: 23,
                    c: 12,
                    d: 14,
                    e: 16,
                    f: 17,
                    g: 19,
                  },
                  midiPitchFromNote: function (t) {
                    var e = /([a-g])(#+|b+)?([0-9]+)$/i.exec(t),
                      n = e[1].toLowerCase(),
                      s = e[2] || "",
                      o = parseInt(e[3], 10)
                    return (
                      12 * o +
                      i.midi_letter_pitches[n] +
                      ("#" == s.substr(0, 1) ? 1 : -1) * s.length
                    )
                  },
                  ensureMidiPitch: function (t) {
                    return "number" != typeof t && /[^0-9]/.test(t)
                      ? i.midiPitchFromNote(t)
                      : parseInt(t, 10)
                  },
                  midi_pitches_letter: {
                    12: "c",
                    13: "c#",
                    14: "d",
                    15: "d#",
                    16: "e",
                    17: "f",
                    18: "f#",
                    19: "g",
                    20: "g#",
                    21: "a",
                    22: "a#",
                    23: "b",
                  },
                  midi_flattened_notes: {
                    "a#": "bb",
                    "c#": "db",
                    "d#": "eb",
                    "f#": "gb",
                    "g#": "ab",
                  },
                  noteFromMidiPitch: function (t, e) {
                    var n,
                      s = 0,
                      o = t,
                      e = e || !1
                    return (
                      t > 23 &&
                        ((s = Math.floor(t / 12) - 1), (o = t - 12 * s)),
                      (n = i.midi_pitches_letter[o]),
                      e &&
                        n.indexOf("#") > 0 &&
                        (n = i.midi_flattened_notes[n]),
                      n + s
                    )
                  },
                  mpqnFromBpm: function (t) {
                    var e = Math.floor(6e7 / t),
                      i = []
                    do {
                      i.unshift(255 & e), (e >>= 8)
                    } while (e)
                    for (; i.length < 3; ) i.push(0)
                    return i
                  },
                  bpmFromMpqn: function (t) {
                    if (void 0 !== t[0])
                      for (var e = 0, i = t.length - 1; i >= 0; ++e, --i) t[e]
                    return Math.floor(6e7 / t)
                  },
                  codes2Str: function (t) {
                    return String.fromCharCode.apply(null, t)
                  },
                  str2Bytes: function (t, e) {
                    if (e) for (; t.length / 2 < e; ) t = "0" + t
                    for (var i = [], n = t.length - 1; n >= 0; n -= 2) {
                      var s = 0 === n ? t[n] : t[n - 1] + t[n]
                      i.unshift(parseInt(s, 16))
                    }
                    return i
                  },
                  translateTickTime: function (t) {
                    for (var e = 127 & t; (t >>= 7); )
                      (e <<= 8), (e |= (127 & t) | 128)
                    for (var i = []; i.push(255 & e), 128 & e; ) e >>= 8
                    return i
                  },
                }),
              n = function (t) {
                return this
                  ? void (
                      !t ||
                      (null === t.type && void 0 === t.type) ||
                      (null === t.channel && void 0 === t.channel) ||
                      (null === t.param1 && void 0 === t.param1) ||
                      (this.setTime(t.time),
                      this.setType(t.type),
                      this.setChannel(t.channel),
                      this.setParam1(t.param1),
                      this.setParam2(t.param2))
                    )
                  : new n(t)
              }
            ;(n.NOTE_OFF = 128),
              (n.NOTE_ON = 144),
              (n.AFTER_TOUCH = 160),
              (n.CONTROLLER = 176),
              (n.PROGRAM_CHANGE = 192),
              (n.CHANNEL_AFTERTOUCH = 208),
              (n.PITCH_BEND = 224),
              (n.prototype.setTime = function (t) {
                this.time = i.translateTickTime(t || 0)
              }),
              (n.prototype.setType = function (t) {
                if (t < n.NOTE_OFF || t > n.PITCH_BEND)
                  throw new Error("Trying to set an unknown event: " + t)
                this.type = t
              }),
              (n.prototype.setChannel = function (t) {
                if (0 > t || t > 15)
                  throw new Error("Channel is out of bounds.")
                this.channel = t
              }),
              (n.prototype.setParam1 = function (t) {
                this.param1 = t
              }),
              (n.prototype.setParam2 = function (t) {
                this.param2 = t
              }),
              (n.prototype.toBytes = function () {
                var t = [],
                  e = this.type | (15 & this.channel)
                return (
                  t.push.apply(t, this.time),
                  t.push(e),
                  t.push(this.param1),
                  void 0 !== this.param2 &&
                    null !== this.param2 &&
                    t.push(this.param2),
                  t
                )
              })
            var s = function (t) {
              if (!this) return new s(t)
              this.setTime(t.time), this.setType(t.type), this.setData(t.data)
            }
            ;(s.SEQUENCE = 0),
              (s.TEXT = 1),
              (s.COPYRIGHT = 2),
              (s.TRACK_NAME = 3),
              (s.INSTRUMENT = 4),
              (s.LYRIC = 5),
              (s.MARKER = 6),
              (s.CUE_POINT = 7),
              (s.CHANNEL_PREFIX = 32),
              (s.END_OF_TRACK = 47),
              (s.TEMPO = 81),
              (s.SMPTE = 84),
              (s.TIME_SIG = 88),
              (s.KEY_SIG = 89),
              (s.SEQ_EVENT = 127),
              (s.prototype.setTime = function (t) {
                this.time = i.translateTickTime(t || 0)
              }),
              (s.prototype.setType = function (t) {
                this.type = t
              }),
              (s.prototype.setData = function (t) {
                this.data = t
              }),
              (s.prototype.toBytes = function () {
                if (!this.type)
                  throw new Error("Type for meta-event not specified.")
                var t = []
                if (
                  (t.push.apply(t, this.time),
                  t.push(255, this.type),
                  Array.isArray(this.data))
                )
                  t.push(this.data.length), t.push.apply(t, this.data)
                else if ("number" == typeof this.data) t.push(1, this.data)
                else if (null !== this.data && void 0 !== this.data) {
                  t.push(this.data.length)
                  var e = this.data.split("").map(function (t) {
                    return t.charCodeAt(0)
                  })
                  t.push.apply(t, e)
                } else t.push(0)
                return t
              })
            var o = function (t) {
              if (!this) return new o(t)
              var e = t || {}
              this.events = e.events || []
            }
            ;(o.START_BYTES = [77, 84, 114, 107]),
              (o.END_BYTES = [0, 255, 47, 0]),
              (o.prototype.addEvent = function (t) {
                return this.events.push(t), this
              }),
              (o.prototype.addNoteOn = o.prototype.noteOn =
                function (t, s, o, r) {
                  return (
                    this.events.push(
                      new n({
                        type: n.NOTE_ON,
                        channel: t,
                        param1: i.ensureMidiPitch(s),
                        param2: r || e,
                        time: o || 0,
                      }),
                    ),
                    this
                  )
                }),
              (o.prototype.addNoteOff = o.prototype.noteOff =
                function (t, s, o, r) {
                  return (
                    this.events.push(
                      new n({
                        type: n.NOTE_OFF,
                        channel: t,
                        param1: i.ensureMidiPitch(s),
                        param2: r || e,
                        time: o || 0,
                      }),
                    ),
                    this
                  )
                }),
              (o.prototype.addNote = o.prototype.note =
                function (t, e, i, n, s) {
                  return (
                    this.noteOn(t, e, n, s), i && this.noteOff(t, e, i, s), this
                  )
                }),
              (o.prototype.addChord = o.prototype.chord =
                function (t, e, i, n) {
                  if (!Array.isArray(e) && !e.length)
                    throw new Error("Chord must be an array of pitches")
                  return (
                    e.forEach(function (e) {
                      this.noteOn(t, e, 0, n)
                    }, this),
                    e.forEach(function (e, n) {
                      0 === n ? this.noteOff(t, e, i) : this.noteOff(t, e)
                    }, this),
                    this
                  )
                }),
              (o.prototype.setInstrument = o.prototype.instrument =
                function (t, e, i) {
                  return (
                    this.events.push(
                      new n({
                        type: n.PROGRAM_CHANGE,
                        channel: t,
                        param1: e,
                        time: i || 0,
                      }),
                    ),
                    this
                  )
                }),
              (o.prototype.setTempo = o.prototype.tempo =
                function (t, e) {
                  return (
                    this.events.push(
                      new s({
                        type: s.TEMPO,
                        data: i.mpqnFromBpm(t),
                        time: e || 0,
                      }),
                    ),
                    this
                  )
                }),
              (o.prototype.toBytes = function () {
                var t = 0,
                  e = [],
                  n = o.START_BYTES,
                  s = o.END_BYTES
                this.events.forEach(function (i) {
                  var n = i.toBytes()
                  ;(t += n.length), e.push.apply(e, n)
                }),
                  (t += s.length)
                var r = i.str2Bytes(t.toString(16), 4)
                return n.concat(r, e, s)
              })
            var r = function (t) {
              if (!this) return new r(t)
              var e = t || {}
              if (e.ticks) {
                if ("number" != typeof e.ticks)
                  throw new Error("Ticks per beat must be a number!")
                if (e.ticks <= 0 || e.ticks >= 32768 || e.ticks % 1 != 0)
                  throw new Error(
                    "Ticks per beat must be an integer between 1 and 32767!",
                  )
              }
              ;(this.ticks = e.ticks || 128), (this.tracks = e.tracks || [])
            }
            ;(r.HDR_CHUNKID = "MThd"),
              (r.HDR_CHUNK_SIZE = "\0\0\0"),
              (r.HDR_TYPE0 = "\0\0"),
              (r.HDR_TYPE1 = "\0"),
              (r.prototype.addTrack = function (t) {
                return t
                  ? (this.tracks.push(t), this)
                  : ((t = new o()), this.tracks.push(t), t)
              }),
              (r.prototype.toBytes = function () {
                var t = this.tracks.length.toString(16),
                  e = r.HDR_CHUNKID + r.HDR_CHUNK_SIZE
                return (
                  (e += parseInt(t, 16) > 1 ? r.HDR_TYPE1 : r.HDR_TYPE0),
                  (e += i.codes2Str(i.str2Bytes(t, 2))),
                  (e += String.fromCharCode(
                    this.ticks / 256,
                    this.ticks % 256,
                  )),
                  this.tracks.forEach(function (t) {
                    e += i.codes2Str(t.toBytes())
                  }),
                  e
                )
              }),
              (t.Util = i),
              (t.File = r),
              (t.Track = o),
              (t.Event = n),
              (t.MetaEvent = s)
          })(i),
            void 0 !== t && null !== t
              ? (t.exports = i)
              : void 0 !== e && null !== e
              ? (e = i)
              : (this.Midi = i)
        }).call(e, i(12)(t))
      },
      function (t, e) {
        function i(t) {
          function e(e) {
            var n = t.charCodeAt(i)
            return e && n > 127 && (n -= 256), (i += 1), n
          }
          var i = 0
          return {
            eof: function () {
              return i >= t.length
            },
            read: function (e) {
              var n = t.substr(i, e)
              return (i += e), n
            },
            readInt32: function () {
              var e =
                (t.charCodeAt(i) << 24) +
                (t.charCodeAt(i + 1) << 16) +
                (t.charCodeAt(i + 2) << 8) +
                t.charCodeAt(i + 3)
              return (i += 4), e
            },
            readInt16: function () {
              var e = (t.charCodeAt(i) << 8) + t.charCodeAt(i + 1)
              return (i += 2), e
            },
            readInt8: e,
            readVarInt: function () {
              for (var t = 0; ; ) {
                var i = e()
                if (!(128 & i)) return t + i
                ;(t += 127 & i), (t <<= 7)
              }
            },
          }
        }
        t.exports = function (t) {
          return (function (t) {
            function e(t) {
              var e = t.read(4),
                i = t.readInt32()
              return { id: e, length: i, data: t.read(i) }
            }
            function n(t) {
              var e = {}
              e.deltaTime = t.readVarInt()
              var i,
                n = t.readInt8()
              if (240 == (240 & n)) {
                if (255 == n) {
                  e.type = "meta"
                  var o = t.readInt8(),
                    r = t.readVarInt()
                  switch (o) {
                    case 0:
                      if (((e.subtype = "sequenceNumber"), 2 != r))
                        throw (
                          "Expected length for sequenceNumber event is 2, got " +
                          r
                        )
                      return (e.number = t.readInt16()), e
                    case 1:
                      return (e.subtype = "text"), (e.text = t.read(r)), e
                    case 2:
                      return (
                        (e.subtype = "copyrightNotice"), (e.text = t.read(r)), e
                      )
                    case 3:
                      return (e.subtype = "trackName"), (e.text = t.read(r)), e
                    case 4:
                      return (
                        (e.subtype = "instrumentName"), (e.text = t.read(r)), e
                      )
                    case 5:
                      return (e.subtype = "lyrics"), (e.text = t.read(r)), e
                    case 6:
                      return (e.subtype = "marker"), (e.text = t.read(r)), e
                    case 7:
                      return (e.subtype = "cuePoint"), (e.text = t.read(r)), e
                    case 32:
                      if (((e.subtype = "midiChannelPrefix"), 1 != r))
                        throw (
                          "Expected length for midiChannelPrefix event is 1, got " +
                          r
                        )
                      return (e.channel = t.readInt8()), e
                    case 47:
                      if (((e.subtype = "endOfTrack"), 0 != r))
                        throw (
                          "Expected length for endOfTrack event is 0, got " + r
                        )
                      return e
                    case 81:
                      if (((e.subtype = "setTempo"), 3 != r))
                        throw (
                          "Expected length for setTempo event is 3, got " + r
                        )
                      return (
                        (e.microsecondsPerBeat =
                          (t.readInt8() << 16) +
                          (t.readInt8() << 8) +
                          t.readInt8()),
                        e
                      )
                    case 84:
                      if (((e.subtype = "smpteOffset"), 5 != r))
                        throw (
                          "Expected length for smpteOffset event is 5, got " + r
                        )
                      var a = t.readInt8()
                      return (
                        (e.frameRate = { 0: 24, 32: 25, 64: 29, 96: 30 }[
                          96 & a
                        ]),
                        (e.hour = 31 & a),
                        (e.min = t.readInt8()),
                        (e.sec = t.readInt8()),
                        (e.frame = t.readInt8()),
                        (e.subframe = t.readInt8()),
                        e
                      )
                    case 88:
                      if (((e.subtype = "timeSignature"), 4 != r))
                        throw (
                          "Expected length for timeSignature event is 4, got " +
                          r
                        )
                      return (
                        (e.numerator = t.readInt8()),
                        (e.denominator = Math.pow(2, t.readInt8())),
                        (e.metronome = t.readInt8()),
                        (e.thirtyseconds = t.readInt8()),
                        e
                      )
                    case 89:
                      if (((e.subtype = "keySignature"), 2 != r))
                        throw (
                          "Expected length for keySignature event is 2, got " +
                          r
                        )
                      return (
                        (e.key = t.readInt8(!0)), (e.scale = t.readInt8()), e
                      )
                    case 127:
                      return (
                        (e.subtype = "sequencerSpecific"),
                        (e.data = t.read(r)),
                        e
                      )
                    default:
                      return (e.subtype = "unknown"), (e.data = t.read(r)), e
                  }
                  return (e.data = t.read(r)), e
                }
                if (240 == n) {
                  e.type = "sysEx"
                  var r = t.readVarInt()
                  return (e.data = t.read(r)), e
                }
                if (247 == n) {
                  e.type = "dividedSysEx"
                  var r = t.readVarInt()
                  return (e.data = t.read(r)), e
                }
                throw "Unrecognised MIDI event type byte: " + n
              }
              0 == (128 & n)
                ? ((i = n), (n = s))
                : ((i = t.readInt8()), (s = n))
              var u = n >> 4
              switch (((e.channel = 15 & n), (e.type = "channel"), u)) {
                case 8:
                  return (
                    (e.subtype = "noteOff"),
                    (e.noteNumber = i),
                    (e.velocity = t.readInt8()),
                    e
                  )
                case 9:
                  return (
                    (e.noteNumber = i),
                    (e.velocity = t.readInt8()),
                    0 == e.velocity
                      ? (e.subtype = "noteOff")
                      : (e.subtype = "noteOn"),
                    e
                  )
                case 10:
                  return (
                    (e.subtype = "noteAftertouch"),
                    (e.noteNumber = i),
                    (e.amount = t.readInt8()),
                    e
                  )
                case 11:
                  return (
                    (e.subtype = "controller"),
                    (e.controllerType = i),
                    (e.value = t.readInt8()),
                    e
                  )
                case 12:
                  return (e.subtype = "programChange"), (e.programNumber = i), e
                case 13:
                  return (e.subtype = "channelAftertouch"), (e.amount = i), e
                case 14:
                  return (
                    (e.subtype = "pitchBend"),
                    (e.value = i + (t.readInt8() << 7)),
                    e
                  )
                default:
                  throw "Unrecognised MIDI event type: " + u
              }
            }
            var s
            stream = i(t)
            var o = e(stream)
            if ("MThd" != o.id || 6 != o.length)
              throw "Bad .mid file - header not found"
            var r = i(o.data),
              a = r.readInt16(),
              u = r.readInt16(),
              l = r.readInt16()
            if (32768 & l)
              throw "Expressing time division in SMTPE frames is not supported yet"
            ticksPerBeat = l
            for (
              var h = {
                  formatType: a,
                  trackCount: u,
                  ticksPerBeat: ticksPerBeat,
                },
                c = [],
                p = 0;
              p < h.trackCount;
              p++
            ) {
              c[p] = []
              var f = e(stream)
              if ("MTrk" != f.id)
                throw "Unexpected chunk - expected MTrk, got " + f.id
              for (var d = i(f.data); !d.eof(); ) {
                var y = n(d)
                c[p].push(y)
              }
            }
            return { header: h, tracks: c }
          })(t)
        }
      },
      function (t, e) {
        t.exports = function (t) {
          return (
            t.webpackPolyfill ||
              ((t.deprecate = function () {}),
              (t.paths = []),
              (t.children = []),
              (t.webpackPolyfill = 1)),
            t
          )
        }
      },
    ])
  },
  function (t, e, i) {
    var n,
      s,
      o
      /**
       *  StartAudioContext.js
       *  @author Yotam Mann
       *  @license http://opensource.org/licenses/MIT MIT License
       *  @copyright 2016 Yotam Mann
       */
    ;(s = []),
      void 0 ===
        (o =
          "function" ==
          typeof (n = function () {
            var t = function (t, e) {
              ;(this._dragged = !1),
                (this._element = t),
                (this._bindedMove = this._moved.bind(this)),
                (this._bindedEnd = this._ended.bind(this, e)),
                t.addEventListener("touchstart", this._bindedEnd),
                t.addEventListener("touchmove", this._bindedMove),
                t.addEventListener("touchend", this._bindedEnd),
                t.addEventListener("mouseup", this._bindedEnd)
            }
            function e(t) {
              return "running" === t.state
            }
            return (
              (t.prototype._moved = function (t) {
                this._dragged = !0
              }),
              (t.prototype._ended = function (t) {
                this._dragged ||
                  (function (t) {
                    var e = t.createBuffer(1, 1, t.sampleRate),
                      i = t.createBufferSource()
                    ;(i.buffer = e),
                      i.connect(t.destination),
                      i.start(0),
                      t.resume && t.resume()
                  })(t),
                  (this._dragged = !1)
              }),
              (t.prototype.dispose = function () {
                this._element.removeEventListener(
                  "touchstart",
                  this._bindedEnd,
                ),
                  this._element.removeEventListener(
                    "touchmove",
                    this._bindedMove,
                  ),
                  this._element.removeEventListener(
                    "touchend",
                    this._bindedEnd,
                  ),
                  this._element.removeEventListener("mouseup", this._bindedEnd),
                  (this._bindedMove = null),
                  (this._bindedEnd = null),
                  (this._element = null)
              }),
              function (i, n, s) {
                var o = new Promise(function (t) {
                    !(function (t, i) {
                      e(t)
                        ? i()
                        : (function n() {
                            e(t)
                              ? i()
                              : (requestAnimationFrame(n),
                                t.resume && t.resume())
                          })()
                    })(i, t)
                  }),
                  r = []
                return (
                  n || (n = document.body),
                  (function e(i, n, s) {
                    if (Array.isArray(i) || (NodeList && i instanceof NodeList))
                      for (var o = 0; o < i.length; o++) e(i[o], n, s)
                    else if ("string" == typeof i)
                      e(document.querySelectorAll(i), n, s)
                    else if (i.jquery && "function" == typeof i.toArray)
                      e(i.toArray(), n, s)
                    else if (Element && i instanceof Element) {
                      var r = new t(i, s)
                      n.push(r)
                    }
                  })(n, r, i),
                  o.then(function () {
                    for (var t = 0; t < r.length; t++) r[t].dispose()
                    ;(r = null), s && s()
                  }),
                  o
                )
              }
            )
          })
            ? n.apply(e, s)
            : n) || (t.exports = o)
  },
  function (t, e, i) {
    "use strict"
    i.r(e),
      function (t) {
        var e = i(4)
        "object" == typeof exports && "object" == typeof t
          ? (t.exports = factory())
          : "function" == typeof define && i(34)
          ? define([], factory)
          : "object" == typeof exports
          ? (exports.MubertPlayer = e.a)
          : (window.MubertPlayer = e.a)
      }.call(this, i(14)(t))
  },
  function (t, e) {
    t.exports = function (t) {
      if (!t.webpackPolyfill) {
        var e = Object.create(t)
        e.children || (e.children = []),
          Object.defineProperty(e, "loaded", {
            enumerable: !0,
            get: function () {
              return e.l
            },
          }),
          Object.defineProperty(e, "id", {
            enumerable: !0,
            get: function () {
              return e.i
            },
          }),
          Object.defineProperty(e, "exports", { enumerable: !0 }),
          (e.webpackPolyfill = 1)
      }
      return e
    }
  },
  function (t, e, i) {
    "use strict"
    var n = i(1),
      s = i(6),
      o = i(17),
      r = i(3)
    function a(t) {
      var e = new o(t),
        i = s(o.prototype.request, e)
      return n.extend(i, o.prototype, e), n.extend(i, e), i
    }
    var u = a(r)
    ;(u.Axios = o),
      (u.create = function (t) {
        return a(n.merge(r, t))
      }),
      (u.Cancel = i(10)),
      (u.CancelToken = i(32)),
      (u.isCancel = i(9)),
      (u.all = function (t) {
        return Promise.all(t)
      }),
      (u.spread = i(33)),
      (t.exports = u),
      (t.exports.default = u)
  },
  function (t, e) {
    function i(t) {
      return (
        !!t.constructor &&
        "function" == typeof t.constructor.isBuffer &&
        t.constructor.isBuffer(t)
      )
    }
    /*!
     * Determine if an object is a Buffer
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */
    t.exports = function (t) {
      return (
        null != t &&
        (i(t) ||
          (function (t) {
            return (
              "function" == typeof t.readFloatLE &&
              "function" == typeof t.slice &&
              i(t.slice(0, 0))
            )
          })(t) ||
          !!t._isBuffer)
      )
    }
  },
  function (t, e, i) {
    "use strict"
    var n = i(3),
      s = i(1),
      o = i(27),
      r = i(28)
    function a(t) {
      ;(this.defaults = t),
        (this.interceptors = { request: new o(), response: new o() })
    }
    ;(a.prototype.request = function (t) {
      "string" == typeof t &&
        (t = s.merge({ url: arguments[0] }, arguments[1])),
        ((t = s.merge(n, { method: "get" }, this.defaults, t)).method =
          t.method.toLowerCase())
      var e = [r, void 0],
        i = Promise.resolve(t)
      for (
        this.interceptors.request.forEach(function (t) {
          e.unshift(t.fulfilled, t.rejected)
        }),
          this.interceptors.response.forEach(function (t) {
            e.push(t.fulfilled, t.rejected)
          });
        e.length;

      )
        i = i.then(e.shift(), e.shift())
      return i
    }),
      s.forEach(["delete", "get", "head", "options"], function (t) {
        a.prototype[t] = function (e, i) {
          return this.request(s.merge(i || {}, { method: t, url: e }))
        }
      }),
      s.forEach(["post", "put", "patch"], function (t) {
        a.prototype[t] = function (e, i, n) {
          return this.request(s.merge(n || {}, { method: t, url: e, data: i }))
        }
      }),
      (t.exports = a)
  },
  function (t, e) {
    var i,
      n,
      s = (t.exports = {})
    function o() {
      throw new Error("setTimeout has not been defined")
    }
    function r() {
      throw new Error("clearTimeout has not been defined")
    }
    function a(t) {
      if (i === setTimeout) return setTimeout(t, 0)
      if ((i === o || !i) && setTimeout)
        return (i = setTimeout), setTimeout(t, 0)
      try {
        return i(t, 0)
      } catch (e) {
        try {
          return i.call(null, t, 0)
        } catch (e) {
          return i.call(this, t, 0)
        }
      }
    }
    !(function () {
      try {
        i = "function" == typeof setTimeout ? setTimeout : o
      } catch (t) {
        i = o
      }
      try {
        n = "function" == typeof clearTimeout ? clearTimeout : r
      } catch (t) {
        n = r
      }
    })()
    var u,
      l = [],
      h = !1,
      c = -1
    function p() {
      h &&
        u &&
        ((h = !1), u.length ? (l = u.concat(l)) : (c = -1), l.length && f())
    }
    function f() {
      if (!h) {
        var t = a(p)
        h = !0
        for (var e = l.length; e; ) {
          for (u = l, l = []; ++c < e; ) u && u[c].run()
          ;(c = -1), (e = l.length)
        }
        ;(u = null),
          (h = !1),
          (function (t) {
            if (n === clearTimeout) return clearTimeout(t)
            if ((n === r || !n) && clearTimeout)
              return (n = clearTimeout), clearTimeout(t)
            try {
              n(t)
            } catch (e) {
              try {
                return n.call(null, t)
              } catch (e) {
                return n.call(this, t)
              }
            }
          })(t)
      }
    }
    function d(t, e) {
      ;(this.fun = t), (this.array = e)
    }
    function y() {}
    ;(s.nextTick = function (t) {
      var e = new Array(arguments.length - 1)
      if (arguments.length > 1)
        for (var i = 1; i < arguments.length; i++) e[i - 1] = arguments[i]
      l.push(new d(t, e)), 1 !== l.length || h || a(f)
    }),
      (d.prototype.run = function () {
        this.fun.apply(null, this.array)
      }),
      (s.title = "browser"),
      (s.browser = !0),
      (s.env = {}),
      (s.argv = []),
      (s.version = ""),
      (s.versions = {}),
      (s.on = y),
      (s.addListener = y),
      (s.once = y),
      (s.off = y),
      (s.removeListener = y),
      (s.removeAllListeners = y),
      (s.emit = y),
      (s.prependListener = y),
      (s.prependOnceListener = y),
      (s.listeners = function (t) {
        return []
      }),
      (s.binding = function (t) {
        throw new Error("process.binding is not supported")
      }),
      (s.cwd = function () {
        return "/"
      }),
      (s.chdir = function (t) {
        throw new Error("process.chdir is not supported")
      }),
      (s.umask = function () {
        return 0
      })
  },
  function (t, e, i) {
    "use strict"
    var n = i(1)
    t.exports = function (t, e) {
      n.forEach(t, function (i, n) {
        n !== e &&
          n.toUpperCase() === e.toUpperCase() &&
          ((t[e] = i), delete t[n])
      })
    }
  },
  function (t, e, i) {
    "use strict"
    var n = i(8)
    t.exports = function (t, e, i) {
      var s = i.config.validateStatus
      i.status && s && !s(i.status)
        ? e(
            n(
              "Request failed with status code " + i.status,
              i.config,
              null,
              i.request,
              i,
            ),
          )
        : t(i)
    }
  },
  function (t, e, i) {
    "use strict"
    t.exports = function (t, e, i, n, s) {
      return (
        (t.config = e), i && (t.code = i), (t.request = n), (t.response = s), t
      )
    }
  },
  function (t, e, i) {
    "use strict"
    var n = i(1)
    function s(t) {
      return encodeURIComponent(t)
        .replace(/%40/gi, "@")
        .replace(/%3A/gi, ":")
        .replace(/%24/g, "$")
        .replace(/%2C/gi, ",")
        .replace(/%20/g, "+")
        .replace(/%5B/gi, "[")
        .replace(/%5D/gi, "]")
    }
    t.exports = function (t, e, i) {
      if (!e) return t
      var o
      if (i) o = i(e)
      else if (n.isURLSearchParams(e)) o = e.toString()
      else {
        var r = []
        n.forEach(e, function (t, e) {
          null !== t &&
            void 0 !== t &&
            (n.isArray(t) ? (e += "[]") : (t = [t]),
            n.forEach(t, function (t) {
              n.isDate(t)
                ? (t = t.toISOString())
                : n.isObject(t) && (t = JSON.stringify(t)),
                r.push(s(e) + "=" + s(t))
            }))
        }),
          (o = r.join("&"))
      }
      return o && (t += (-1 === t.indexOf("?") ? "?" : "&") + o), t
    }
  },
  function (t, e, i) {
    "use strict"
    var n = i(1),
      s = [
        "age",
        "authorization",
        "content-length",
        "content-type",
        "etag",
        "expires",
        "from",
        "host",
        "if-modified-since",
        "if-unmodified-since",
        "last-modified",
        "location",
        "max-forwards",
        "proxy-authorization",
        "referer",
        "retry-after",
        "user-agent",
      ]
    t.exports = function (t) {
      var e,
        i,
        o,
        r = {}
      return t
        ? (n.forEach(t.split("\n"), function (t) {
            if (
              ((o = t.indexOf(":")),
              (e = n.trim(t.substr(0, o)).toLowerCase()),
              (i = n.trim(t.substr(o + 1))),
              e)
            ) {
              if (r[e] && s.indexOf(e) >= 0) return
              r[e] =
                "set-cookie" === e
                  ? (r[e] ? r[e] : []).concat([i])
                  : r[e]
                  ? r[e] + ", " + i
                  : i
            }
          }),
          r)
        : r
    }
  },
  function (t, e, i) {
    "use strict"
    var n = i(1)
    t.exports = n.isStandardBrowserEnv()
      ? (function () {
          var t,
            e = /(msie|trident)/i.test(navigator.userAgent),
            i = document.createElement("a")
          function s(t) {
            var n = t
            return (
              e && (i.setAttribute("href", n), (n = i.href)),
              i.setAttribute("href", n),
              {
                href: i.href,
                protocol: i.protocol ? i.protocol.replace(/:$/, "") : "",
                host: i.host,
                search: i.search ? i.search.replace(/^\?/, "") : "",
                hash: i.hash ? i.hash.replace(/^#/, "") : "",
                hostname: i.hostname,
                port: i.port,
                pathname:
                  "/" === i.pathname.charAt(0) ? i.pathname : "/" + i.pathname,
              }
            )
          }
          return (
            (t = s(window.location.href)),
            function (e) {
              var i = n.isString(e) ? s(e) : e
              return i.protocol === t.protocol && i.host === t.host
            }
          )
        })()
      : function () {
          return !0
        }
  },
  function (t, e, i) {
    "use strict"
    var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    function s() {
      this.message = "String contains an invalid character"
    }
    ;(s.prototype = new Error()),
      (s.prototype.code = 5),
      (s.prototype.name = "InvalidCharacterError"),
      (t.exports = function (t) {
        for (
          var e, i, o = String(t), r = "", a = 0, u = n;
          o.charAt(0 | a) || ((u = "="), a % 1);
          r += u.charAt(63 & (e >> (8 - (a % 1) * 8)))
        ) {
          if ((i = o.charCodeAt((a += 0.75))) > 255) throw new s()
          e = (e << 8) | i
        }
        return r
      })
  },
  function (t, e, i) {
    "use strict"
    var n = i(1)
    t.exports = n.isStandardBrowserEnv()
      ? {
          write: function (t, e, i, s, o, r) {
            var a = []
            a.push(t + "=" + encodeURIComponent(e)),
              n.isNumber(i) && a.push("expires=" + new Date(i).toGMTString()),
              n.isString(s) && a.push("path=" + s),
              n.isString(o) && a.push("domain=" + o),
              !0 === r && a.push("secure"),
              (document.cookie = a.join("; "))
          },
          read: function (t) {
            var e = document.cookie.match(
              new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"),
            )
            return e ? decodeURIComponent(e[3]) : null
          },
          remove: function (t) {
            this.write(t, "", Date.now() - 864e5)
          },
        }
      : {
          write: function () {},
          read: function () {
            return null
          },
          remove: function () {},
        }
  },
  function (t, e, i) {
    "use strict"
    var n = i(1)
    function s() {
      this.handlers = []
    }
    ;(s.prototype.use = function (t, e) {
      return (
        this.handlers.push({ fulfilled: t, rejected: e }),
        this.handlers.length - 1
      )
    }),
      (s.prototype.eject = function (t) {
        this.handlers[t] && (this.handlers[t] = null)
      }),
      (s.prototype.forEach = function (t) {
        n.forEach(this.handlers, function (e) {
          null !== e && t(e)
        })
      }),
      (t.exports = s)
  },
  function (t, e, i) {
    "use strict"
    var n = i(1),
      s = i(29),
      o = i(9),
      r = i(3),
      a = i(30),
      u = i(31)
    function l(t) {
      t.cancelToken && t.cancelToken.throwIfRequested()
    }
    t.exports = function (t) {
      return (
        l(t),
        t.baseURL && !a(t.url) && (t.url = u(t.baseURL, t.url)),
        (t.headers = t.headers || {}),
        (t.data = s(t.data, t.headers, t.transformRequest)),
        (t.headers = n.merge(
          t.headers.common || {},
          t.headers[t.method] || {},
          t.headers || {},
        )),
        n.forEach(
          ["delete", "get", "head", "post", "put", "patch", "common"],
          function (e) {
            delete t.headers[e]
          },
        ),
        (t.adapter || r.adapter)(t).then(
          function (e) {
            return l(t), (e.data = s(e.data, e.headers, t.transformResponse)), e
          },
          function (e) {
            return (
              o(e) ||
                (l(t),
                e &&
                  e.response &&
                  (e.response.data = s(
                    e.response.data,
                    e.response.headers,
                    t.transformResponse,
                  ))),
              Promise.reject(e)
            )
          },
        )
      )
    }
  },
  function (t, e, i) {
    "use strict"
    var n = i(1)
    t.exports = function (t, e, i) {
      return (
        n.forEach(i, function (i) {
          t = i(t, e)
        }),
        t
      )
    }
  },
  function (t, e, i) {
    "use strict"
    t.exports = function (t) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)
    }
  },
  function (t, e, i) {
    "use strict"
    t.exports = function (t, e) {
      return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t
    }
  },
  function (t, e, i) {
    "use strict"
    var n = i(10)
    function s(t) {
      if ("function" != typeof t)
        throw new TypeError("executor must be a function.")
      var e
      this.promise = new Promise(function (t) {
        e = t
      })
      var i = this
      t(function (t) {
        i.reason || ((i.reason = new n(t)), e(i.reason))
      })
    }
    ;(s.prototype.throwIfRequested = function () {
      if (this.reason) throw this.reason
    }),
      (s.source = function () {
        var t
        return {
          token: new s(function (e) {
            t = e
          }),
          cancel: t,
        }
      }),
      (t.exports = s)
  },
  function (t, e, i) {
    "use strict"
    t.exports = function (t) {
      return function (e) {
        return t.apply(null, e)
      }
    }
  },
  function (t, e) {
    ;(function (e) {
      t.exports = e
    }).call(this, {})
  },
])
