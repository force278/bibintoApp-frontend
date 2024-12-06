$(document).ready(function () {
  console.log("ready")

  var player = (window.player = new MubertPlayer())
  player.setVolume(100)

  $("#Burger").click(function () {
    $("#mainMenu").toggleClass("active")
  })
  $("#menuClose").click(function () {
    $("#mainMenu").toggleClass("active")
  })

  $("#contentClose").sticky({ topSpacing: 0 })
  $("#Player").css({ height: $(window).height() })

  $("#playerPlay").click(function () {
    var sid = $(this).data("sid")
    player.play(sid)
    $("#playerVideoCover").fadeIn(3000)
    $(this).parent().removeClass("stopped")
  })
  $("#playerStop").click(function () {
    player.stop()
    $("#playerControls").addClass("stopped")
    $("#playerCover").fadeOut(3000)
  })
  $("#playerRefresh").click(function () {
    player.refresh()
  })
  $("#playerPlay").delay(1000).trigger("click")

  $("#contentClose").click(function () {
    $("html,body").animate({ scrollTop: 0 }, "slow")
    return false
  })
})
