import { Routes , Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import PagenotFound from "./pages/PagenotFound";
import Policy from "./pages/Policy";
import Contact from "./pages/Contact";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Layout/Routes/PrivateRoute";

function App() {
  return (
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/policy" element={<Policy/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/dashboard" element={<PrivateRoute/>}>
    <Route path="" element={<Dashboard/>}/>
  
    </Route>
   
    <Route path="/pagenotfound" element={<PagenotFound/>}/>
    </Routes>
  );
}

export default App;
