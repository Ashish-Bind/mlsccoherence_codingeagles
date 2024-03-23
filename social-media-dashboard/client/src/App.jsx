import SignIn from './pages/SignIn'
import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import ConnectPage from './pages/ConnectPage'
import Navbar from './components/Navbar'
import Analytics from './pages/Analytics'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/connect" element={<ConnectPage />} />
        <Route path={`/analytics`} element={<Analytics />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
