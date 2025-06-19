import { Route,Routes } from "react-router-dom"
import Login from "./pages/Login"
import Employee from "./pages/Employee"
import ErrorPage from "./pages/ErrorPage"
import Admin from "./pages/Admin"
function App() {
  return (
    <>
    <Routes>
      {/* <Route path="/" element={}/> */}
      <Route path="/login" element={<Login/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/employee" element={<Employee/>}/>
      <Route path="*" element={<ErrorPage/>}/>
    </Routes>
    </>
  )
}
export default App