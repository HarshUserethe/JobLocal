import './App.css'
import Home from './pages/Home'
import Form from './pages/Form'

import { HashRouter, Routes, Route} from 'react-router-dom'


function App() {
 

  return (
   
    <HashRouter>
  <div>
  <Routes>
  <Route path="/" element={ <Home />} />
  <Route path="/register" element={ <Form />} />
  </Routes>
  </div>
  </HashRouter>

  )
}

export default App
