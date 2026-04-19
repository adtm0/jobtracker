import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login'

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/register' element={<Register />} />
      <Route path='/register' element={<Register />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  )
}

export default App
