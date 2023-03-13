import Explore from './Components/Explore';
//import NavBar from './components/NavBar';
import Register from './Components/Register';
import Home from './Components/Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Components/Login';
import Find from './Components/Find';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Explore' element={<Explore/>} />
        <Route path='/Find' element={<Find/>} />
        <Route path='/Home' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
