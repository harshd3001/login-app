import './App.css';
import Register from './sections/Register'
import Login from './sections/Login'
import User from './sections/main-page comp/User'
import Admin from './sections/main-page comp/Admin'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/user' element={<User />} />
        <Route path='/admin' element={<Admin />}/>
      </Routes>
    </Router>
  );
}

export default App;
