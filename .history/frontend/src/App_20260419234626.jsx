import {Routes, Route, Navigate} from 'react-router-dom'
import { useAuth } from './context/useAuth'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import JobForm from './pages/JobForm'
import Navbar from './components/Navbar'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div>Loading...</div>
  return user ? children : <Navigate to="/login" replace/>
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? <Navigate to="/dashboard" replace/> : children
}
function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
    </>
  );
}

function App() {

  return (
    <Routes>
      <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
      <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
      <Route path='/dashboard' element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
      <Route path='/jobs' element={<PrivateRoute><Layout><Jobs /></Layout></PrivateRoute>} />
      <Route path='/jobs/new' element={<PrivateRoute><Layout><JobForm /></Layout></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
