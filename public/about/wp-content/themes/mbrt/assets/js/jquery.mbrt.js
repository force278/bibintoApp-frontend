jQuery(document).ready(function () {
  console.log("%c MUBERT ", "background:black; color:white;")
  console.log("Hey, we are hiring, white on ceo@mubert.com")

  var circle, radius, length
  var progress = 750,
    counter = 0
  var Interval, stInterval

  jQuery(document).on("click", ".see-more", function () {
    var article = jQuery(this).data("article")

    showArticle(article)

    clearInterval(Interval)
    clearInterval(stInterval)
  })

  jQuery(document).on("mouseenter", ".see-more", function () {
    var article = jQuery(this).data("article")

    circle = jQuery(this).find(".bar")
    radius = circle.attr("r")
    length = Math.PI * (radius * 2)

    clearInterval(Interval)

    stInterval = setInterval(function () {
      counter = counter + 10

      var pct = ((progress - counter) / progress) * length
      circle.css({ strokeDashoffset: pct })

      if (counter == progress) {
        clearInterval(stInterval)
        showArticle(article)
      }
    }, 10)
  })

  jQuery(document).on("mouseleave", ".see-more", function () {
    circle = jQuery(this).find(".bar")
    radius = circle.attr("r")
    length = Math.PI * (radius * 2)

    clearInterval(stInterval)

    Interval = setInterval(function () {
      counter = counter - 10

      var pct = ((progress - counter) / progress) * length
      circle.css({ strokeDashoffset: pct })

      if (counter <= 0) clearInterval(Interval)
    }, 10)
  })

  function showArticle(article) {
    var Article = jQuery("article#" + article)
    Article.show()
    jQuery("html, body").animate(
      {
        scrollTop: jQuery("#" + article).offset().top,
      },
      500,
    )
  }

  jQuery(document).on("click", ".article", function () {
    jQuery(this).slideToggle()
  })

  var Focus = document.getElementById("Focus")
  if (Focus) {
    $("body").addClass("dark")
    $("#Player").hide()
    let drawYinYan = new YinYan({})
    drawYinYan.DrawRender()
    var Phone = document.createElement("img")
    Phone.id = "Phone"
    Focus.appendChild(Phone)
    FocusRender()
  }
})

function mubertStop() {
  var mubert = document.getElementById("mubert")
  mubert.pause()
  jQuery("#StreamTitle").text("")
  jQuery("#Pause").hide()
  jQuery("#Play").show()
}

function mubertPlay() {
  var mubert = document.getElementById("mubert")
  jQuery("#Play").hide()
  jQuery("#Pause").show()
  mubert.play()
}

function mubertReload(url, artist, title) {
  if (!url) url = "http://mubert.com:49994/600_C_mp3"
  if (!artist) artist = "Mubert"
  if (!title) title = "Ambient"

  jQuery("#StreamTitle").hide()
  jQuery("#StreamTitle").text(artist + " — " + title)

  jQuery("#mubert").remove()

  var source = document.createElement("source")
  source.src = url

  var mubert = document.createElement("audio")
  mubert.id = "mubert"
  mubert.autoplay = true
  mubert.loop = true
  mubert.appendChild(source)

  var player = document.getElementById("Player")
  player.appendChild(mubert)

  mubert.load()
  mubertPlay()
  setTimeout(function () {
    jQuery("#StreamTitle").show()
  }, 1000)
}

function FocusRender() {
  var url =
    "http://mubert.com/wp-content/themes/mbrt/assets/img/app/mubert-app.png"

  setTimeout(function () {
    $("#Focus h1").animate({ opacity: 1 }, 500)
  }, 1000)

  setTimeout(function () {
    if (Phone !== undefined && Phone !== null) {
      Phone.src = url
      Phone.onload = function () {
        setTimeout(function () {
          $("#Progress").addClass("blur")
          $("#Focus h1").addClass("blur vhs")
          $("#Phone").animate({ opacity: 1 }, 1000)
          $(".appstore").animate({ opacity: 1 }, 1000)
        }, 1000)
      }
    }
  }, 3000)
}

function preloadImage(url, anImageLoadedCallback) {
  var img = new Image()
  img.src = url
  img.onload = anImageLoadedCallback
}

function reload() {
  $("#Player").show()
  $("body").removeClass("dark")
  // Focus Reload
  var Focus = document.getElementById("Focus")
  if (Focus) {
    $("body").addClass("dark")
    $("#Player").hide()
    let drawYinYan = new YinYan({})
    drawYinYan.DrawRender()

    var Phone = document.createElement("img")
    Phone.id = "Phone"
    Focus.appendChild(Phone)
    FocusRender()
  }
}
