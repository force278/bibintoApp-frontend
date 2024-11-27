import "./Modal.css"

const Modal = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? "postmodal active" : "postmodal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "postmodal_content active" : "postmodal_content"}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
