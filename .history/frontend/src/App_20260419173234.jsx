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
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Layout> </><Dashboard /> </Layout>} />
      <Route path='/jobs' element={<Jobs />} />
      <Route path='/jobs/new' element={<JobForm />} />
    </Routes>
  )
}

export default App
