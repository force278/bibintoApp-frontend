import { useCallback, useState } from "react"
import * as Yup from "yup"

export const ModalSupportForm = ({ id, title, close, save }) => {
  const [showAlert, setShowAlert] = useState(false)
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [validationError, setValidationError] = useState(null)

  const validationSchema = Yup.object().shape({
    message: Yup.string()
      .min(10, "Сообщение должно содержать минимум 10 символов")
      .required("Поле с сообщением должно быть заполненным"),
    email: Yup.string()
      .email("Введите корректный email")
      .required("поле с email должно быть заполненным"),
  })

  const handleShowAlert = useCallback(async () => {
    try {
      await validationSchema.validate({ message, email }, { abortEarly: false })
      setMessage("")
      setEmail("")
      setShowAlert(true)
      setValidationError(null)
    } catch (error) {
      // Валидация не прошла
      setValidationError(error.errors.join(", "))
    }
  }, [message, email, validationSchema])

  const cancelAlert = useCallback(() => {
    setMessage("")
    setEmail("")
    setShowAlert(false)
  }, [])
  return (
    <>
      <div className="modal" tabIndex="-1" id={id}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-5">{title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={cancelAlert}
              ></button>
            </div>
            <div className="modal-body">
              {showAlert && (
                <div>
                  <div className="alert alert-success" role="alert">
                    Спасибо за обращение! Ожидайте наш ответ.
                  </div>
                </div>
              )}
              {validationError && (
                <div>
                  <div className="alert alert-danger" role="alert">
                    {validationError}
                  </div>
                </div>
              )}
              <div>
                <form>
                  <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">
                      Напишите сообщение:
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="form-control"
                      id="message-text"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="col-form-label">
                      Укажите email:
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="form-control"
                      id="email"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={cancelAlert}
              >
                {close}
              </button>
              <button
                onClick={handleShowAlert}
                type="button"
                className="btn border bg-white"
              >
                {save}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
