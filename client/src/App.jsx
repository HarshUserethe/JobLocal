import './App.css'
import Home from './pages/Home'
import Form from './pages/Form'
import ProtectedRoute from './components/ProtectedRoute'
import { HashRouter, Routes, Route} from 'react-router-dom'
import CursorFollower from './components/CursorFollower'
import UserDashboard from './pages/UserDashboard'


function App() {
 

  return (
   
    <HashRouter>
  <div>
  <Routes>
  <Route path="/" element={ <Home />} />
  <Route path="/dashboard/:userid" element={ <UserDashboard />} />
  {/* <Route path="/dashboard/:userid" element={ <ProtectedRoute element={<UserDashboard />} />} /> */}
  {/* <Route path="/register" element={ <Form />} /> */}
  </Routes>
  </div>
  </HashRouter>

  )
}

export default App
