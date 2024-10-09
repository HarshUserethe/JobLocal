import './App.css'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import { HashRouter, Routes, Route} from 'react-router-dom'
import CursorFollower from './components/CursorFollower'
import UserDashboard from './pages/UserDashboard'
import ProfileForm from './pages/ProfileForm'


function App() {


  return (
   
    <HashRouter>
  <div>
  <Routes>
  <Route path="/" element={ <Home />} />
  {/* <Route path="/dashboard/:userid" element={ <UserDashboard />} /> */}
  <Route path="/dashboard/:userid" element={ <ProtectedRoute><UserDashboard /></ProtectedRoute> } />
  {/* <Route path="/profile/:userid" element={ <ProtectedRoute><ProfileForm /></ProtectedRoute> } /> */}
  <Route path="/profile/:userid" element={<ProfileForm />} />
  </Routes>
  </div>
  </HashRouter>

  )
}

export default App
