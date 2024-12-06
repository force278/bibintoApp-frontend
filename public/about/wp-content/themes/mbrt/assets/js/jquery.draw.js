class YinYan {
  constructor({
    c,
    ctx,
    last,
    current,
    drawing,
    isMirror,
    cx,
    cy,
    r,
    angle,
    _2PI,
    s,
  }) {
    var drw = this

    drw.c = document.getElementById("canvas")
    drw.ctx = this.c.getContext("2d")
    drw.last = { x: null, y: null }
    drw.current = { x: null, y: null }
    drw.drawing = false
    drw.isMirror = true
    drw.cx = 0
    drw.cy = 0
    drw.r = 0
    drw.angle = 0
    drw._2PI = 2 * Math.PI
    drw.s = {
      sectors: 15,
      "line width": 1,
      background: "#131313",
      brush: "#777777",
      mirror: false,
      clear: function () {
        resize()
      },
      save: function () {
        link.click()
      },
    }
  }
  DrawRender() {
    var drw = this

    var Muse = document.createElement("img")
    Muse.src = document.getElementById("Muse").src
    Muse.onload = function () {
      drw.resize()
    }

    drw.drawing = true

    document.getElementById("Muse").addEventListener("mousemove", function (e) {
      drw.draw(e)
    })
    document.getElementById("Muse").addEventListener("mousedown", function () {
      drw.resize()
    })

    window.addEventListener(
      "devicemotion",
      function (e) {
        drw.draw(e)
      },
      false,
    )

    window.addEventListener("resize", function () {
      drw.resize()
    })
  }
  resize() {
    var drw = this

    drw.isMirror = drw.isMirror ? false : true

    var w = (drw.c.width = $("#Nimbus").width())
    var h = (drw.c.height = $("#Nimbus").outerHeight())
    var h2 = $("#Muse").height()

    drw.cx = w / 2
    drw.cy = h - h2 + h2 / 2

    drw.r = Math.min(drw.cx, drw.cy) - 4

    if (window.devicePixelRatio > 1) {
      var canvasWidth = drw.c.width
      var canvasHeight = drw.c.height

      drw.c.width = canvasWidth * window.devicePixelRatio
      drw.c.height = canvasHeight * window.devicePixelRatio
      drw.c.style.width = canvasWidth
      drw.c.style.height = canvasHeight
      drw.ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    drw.angle = drw._2PI / drw.s.sectors
    drw.drawSectors()
    drw.ctx.translate(drw.cx, drw.cy)
  }
  drawSectors() {
    var drw = this

    drw.ctx.fillStyle = drw.s.background
    drw.ctx.arc(drw.cx, drw.cy, drw.r * 2, 0, drw._2PI)
    drw.ctx.fill()
    for (var i = 0; i < drw._2PI; i += drw.angle) {
      drw.ctx.beginPath()
      drw.ctx.lineWidth = 0
      drw.ctx.strokeStyle = "rgba(255, 255, 255, .0)"
      drw.ctx.moveTo(drw.cx, drw.cy)
      drw.ctx.arc(drw.cx, drw.cy, drw.r, i, i + drw.angle)
      drw.ctx.lineTo(drw.cx, drw.cy)
      drw.ctx.stroke()
    }
  }
  reset() {
    var drw = this

    drw.drawing = true
    drw.last.x = null
    drw.last.y = null
  }
  draw(e) {
    var drw = this
    drw.drawing = true

    if (drw.drawing) {
      var x =
        window.DeviceMotionEvent && e.accelerationIncludingGravity != undefined
          ? Math.abs(e.accelerationIncludingGravity.x * 50)
          : e.clientX
      var y =
        window.DeviceMotionEvent && e.accelerationIncludingGravity != undefined
          ? jQuery("#canvas").offset().top +
            Math.abs(e.accelerationIncludingGravity.y * 100)
          : e.pageY

      y = y - jQuery("#canvas").offset().top

      var d = Math.sqrt(Math.pow(x - drw.cx, 2) + Math.pow(y - drw.cy, 2))

      if (d < drw.r) {
        drw.current.x = x - drw.cx
        drw.current.y = y - drw.cy
        drw.drawLine()
      }
    }
  }
  drawLine() {
    var drw = this

    drw.ctx.lineWidth = drw.s["line width"]
    drw.ctx.lineCap = "round"
    drw.ctx.strokeStyle = drw.s.brush

    for (var i = 0; i < drw._2PI; i += drw.angle) {
      drw.ctx.rotate(drw.angle)
      if (drw.last.x != null && drw.last.y != null) {
        drw.ctx.beginPath()
        drw.ctx.moveTo(drw.last.x, drw.last.y)
        drw.ctx.lineTo(drw.current.x, drw.current.y)
        if (drw.isMirror) {
          drw.ctx.moveTo(-drw.last.x, drw.last.y)
          drw.ctx.lineTo(-drw.current.x, drw.current.y)
        }
        drw.ctx.stroke()
      }
    }
    drw.last.x = drw.current.x
    drw.last.y = drw.current.y
  }
}
function motion(event) {
  console.log(
    "Accelerometer: " +
      event.accelerationIncludingGravity.x +
      ", " +
      event.accelerationIncludingGravity.y +
      ", " +
      event.accelerationIncludingGravity.z,
  )
}
