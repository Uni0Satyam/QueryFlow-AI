import './App.css';
import SideBar from "./SideBar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyProvider } from '../../context/MyContext.jsx';

function App() {

  return (
    <div className='app'>
      <MyProvider>
        <SideBar></SideBar>
        <ChatWindow></ChatWindow>
      </MyProvider>
    </div>
  )
}

export default App;