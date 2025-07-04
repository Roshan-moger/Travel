
import TourDetails from './Components/TourDetails'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import ToursTravel from './Pages/ToursTravel'
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom'
function App() {

  return (
    <>
    <Router>
<Routes>

  <Route path='/' element={<LoginPage/>}>
  </Route>
  <Route path='/dashboard' element={<ToursTravel/>}></Route>
     <Route path="/register" element={<RegisterPage />} />
             <Route path="/tour/:id" element={<TourDetails />} />

</Routes>

   

    </Router>
    </>
  )
}

export default App
