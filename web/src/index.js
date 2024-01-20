import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./sass/common.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { BrowserRouter } from "react-router-dom"

ReactDOM.render(
  <BrowserRouter>
    <App />,
  </BrowserRouter>,
  document.getElementById("root"),
)
