var MubertPlayerView = function (options) {
  if (!options || !options.element) return null
  var view = this
  // view.apiUrl = options.apiUrl || 'https://devapi.mubert.com/';
  view.element = options.element
  view.title = ""
  view.callback = function (e) {
    switch (e.name) {
      case "play":
        view.dom.playEl.classList.add("pause")
        if (dom.likeEl) dom.controlsEl.appendChild(dom.likeEl)
        break
      case "loading":
        view.dom.playEl.classList.add("loading")
        break
      case "loaded":
        view.dom.playEl.classList.remove("loading")
        break
      case "stop":
        view.dom.playEl.classList.remove("loading")
        view.dom.playEl.classList.remove("pause")
        if (dom.likeEl) dom.likeEl.remove()
        break
      case "mute":
        view.dom.volumeIcon.classList.add("mute")
        view.dom.volumeInput.value = 0
        view.dom.volumeIcon.setAttribute("qtip", "Volume on")
        // view.saveVolume(0);
        break
      case "unmute":
        view.dom.volumeInput.value = view.player.volume
        view.dom.volumeIcon.classList.remove("mute")
        view.dom.volumeIcon.setAttribute("qtip", "Volume off")
        // view.saveVolume(view.player.volume);
        break
      case "setVolume":
        view.dom.volumeInput.value = e.value
        // view.saveVolume(e.value);
        break
      case "setStreamTitle":
        view.setText(e.value)
        break
      case "error":
        view.dom.playEl.classList.remove("pause")
        view.dom.playEl.classList.remove("loading")
        break
    }
  }

  var player = options.player
  if (!player) {
    player = new MubertPlayer({
      apiURL: options.apiURL || null,
    })
  }

  player.addListener("view", view.callback)

  view.player = player

  var html =
    "<div class='mubert-player'>" +
    "<div class='mubert-player__controls'>" +
    "<div class='mubert-player__play' qtip='Play stream'></div>" +
    "<div class='mubert-player__reload' qtip='Restart stream'></div>" +
    "<div class='mubert-player__like' qtip='Like stream!'></div>" +
    "</div>" +
    "<div class='mubert-player__stream-avatar'></div>" +
    "<div class='mubert-player__stream-title'></div>" +
    "<div class='mubert-player__volume'>" +
    "<div class='mubert-player__volume-icon' qtip='Volume off'></div>" +
    "<input class='mubert-player__volume-input' type='range' min='0' max='100' value='80'>" +
    "</div>" +
    "<div class='mubert-player__logo'></div>" +
    "</div>"

  var element = view.element
  element.insertAdjacentHTML("beforeend", html)

  var dom = (view.dom = {}),
    el = (dom.el = element.querySelector(".mubert-player")) // .lastChild;

  if (options.hidden) el.style.display = "none"

  dom.avatarEl = el.querySelector(".mubert-player__stream-avatar") // .childNodes[0];
  dom.controlsEl = el.querySelector(".mubert-player__controls") // .childNodes[1];
  dom.playEl = el.querySelector(".mubert-player__play") // dom.controlsEl.childNodes[0];
  dom.playEl.addEventListener("click", function () {
    if (view.player.isPlaying()) view.player.stop()
    else view.player.play()
    /*if (view.playAudio)
      view[view.audio.paused ? 'play' : 'stop']();
    else
      view[player.isPlaying() ? 'stop' : 'play'](); // player.state() === 'started'*/
  })
  dom.reloadEl = el.querySelector(".mubert-player__reload")
  dom.reloadEl.addEventListener("click", function () {
    view.player.refresh()
  })
  if (options.likes === false) el.querySelector(".mubert-player__like").remove()
  else {
    dom.likeEl = el.querySelector(".mubert-player__like")
    dom.likeEl.addEventListener("click", function () {
      view.player.like()
    })
    dom.likeEl.remove()
  }

  dom.titleEl = el.querySelector(".mubert-player__stream-title")
  dom.volumeEl = el.querySelector(".mubert-player__volume")
  dom.volumeIcon = el.querySelector(".mubert-player__volume-icon")
  dom.volumeIcon.addEventListener("click", function () {
    view.player.toggleVolume()
  })
  dom.volumeInput = el.querySelector(".mubert-player__volume-input") // dom.volumeEl.childNodes[1];
  dom.volumeInput.addEventListener("input", function () {
    view.player.setVolume(+this.value, true)
  })
  dom.volumeInput.addEventListener("change", function () {
    view.player.setVolume(+this.value)
  })
  dom.mubertLogo = el.querySelector(".mubert-player__logo")

  var volume = player.volume
  if (player.volumeMute) {
    view.dom.volumeIcon.classList.add("mute")
    view.dom.volumeInput.value = 0
    view.dom.volumeIcon.setAttribute("qtip", "Volume on")
  } else {
    view.dom.volumeInput.value = view.player.volume
    view.dom.volumeIcon.setAttribute("qtip", "Volume off")
  }
}
MubertPlayerView.prototype.play = function (stream) {
  var playerView = this,
    sid = playerView.sid
  if (stream === undefined || stream === null) {
    if (playerView.playAudio) {
      playerView.audio.src = playerView.serverSrc
      playerView.audio.play()
    } else if (sid !== undefined) {
      if (Array.isArray(sid)) {
        var i = sid.indexOf(playerView.player.sid)
        if (i !== -1) sid = sid[i]
        else sid = playerView.getRandomStream()
      }
      /*playerView.player.play(sid, playerView.title).catch(function(e) {
        playerView.player.callback({
          name: 'error'
          ,action: 'play'
          ,text: e
        });
      });*/
      playerView.player.play(sid, playerView.title)
    }
    return
  }
  if (playerView.playAudio) playerView.stop()
  if (stream.server) {
    if (playerView.player.isPlaying()) playerView.player.stop()
    if (!stream.src || !playerView.audio) return
    playerView.playAudio = true
    playerView.setText(stream.title)
    playerView.serverSrc = playerView.audio.src = stream.src
    playerView.audio.play()
  } else {
    playerView.playAudio = false
    /*if (playerView.player._fetching)
      return;*/
    sid = playerView.sid = stream.sid
    if (stream.text) playerView.setText(stream.text)
    if (Array.isArray(sid)) {
      for (var i = 0; i < sid.length; i++) {
        if (sid[i] !== null && Number.isFinite(+sid[i])) sid[i] = +sid[i]
        else {
          sid.splice(i, 1)
          i--
        }
      }
      if (sid.length === 1) sid = playerView.sid = sid[0]
      else sid = playerView.getRandomStream()
    }
    /*playerView.player.play(sid, playerView.title).catch(function(e) {
      playerView.player.callback({
          name: 'error'
          ,action: 'play'
          ,text: e
      });
    });*/
    playerView.player.play(sid, playerView.title)
  }
}
MubertPlayerView.prototype.setText = function (text) {
  this.dom.titleEl.textContent = this.title = text || ""
}
