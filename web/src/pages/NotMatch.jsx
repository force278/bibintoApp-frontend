import React from "react"
import inProgress from "../assets/img/notMatch/developing.png"
import styles from "./NotMatch.module.scss"
export function NotMatch() {
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center mt-5 p-4">
        <div>
          <h1 className="fw-bold fs-5">
            Идет разработка! Просто немного терпения...
          </h1>
        </div>
        <div>
          <img
            src={inProgress}
            alt="Ведется разработка"
            className={styles.notMatch}
          />
        </div>
      </div>
    </>
  )
}
