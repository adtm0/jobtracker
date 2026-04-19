import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import JobForm from './pages/JobForm'
import Navbar from './components/Navbar'

function Layout({ children }) {
  return (
    <>
    
    </>
  );
}

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/jobs' element={<Jobs />} />
      <Route path='/jobs/new' element={<JobForm />} />
    </Routes>
  )
}

export default App
