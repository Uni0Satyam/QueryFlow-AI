import "./SideBar.css";

const SideBar = () => {
  return (
    <section className='sidebar'>
      <button>
        <img src="/logo.png" alt="QueryFlow" className="logo"/>
        <i className="fa-solid fa-pen-to-square"></i>
      </button>

      <ul className="history">
        <li>history 1</li>
        <li>history 2</li>
        <li>history 3</li>
      </ul>

      <div className="sign">
        <p>Made with <span style={{color: "red"}}>&hearts;</span> by Satyam</p>
      </div>
    </section>
  )
}

export default SideBar;