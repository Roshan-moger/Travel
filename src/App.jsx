
// import LoginPage from './Pages/LoginPage'
import ToursTravel from './Pages/ToursTravel'
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom'
function App() {

  return (
    <>
    <Router>
<Routes>

  {/* <Route path='/' element={<LoginPage/>}>
  </Route> */}
  <Route path='/dashboard' element={<ToursTravel/>}></Route>
</Routes>

   

    </Router>
    </>
  )
}

export default App
