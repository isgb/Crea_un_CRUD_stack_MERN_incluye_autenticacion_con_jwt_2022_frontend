// import { useEffect } from "react";
// import { useUser } from "./context/UserContext";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Login } from './componentes/Login';
import { Nav } from './componentes/Nav';
import { Employees } from './componentes/Employees';
import { Register } from './componentes/Register';

function App() {

  // const {loginUser} = useUser();

  // useEffect(() =>{
  //   loginUser({correo: 'jose@gmail.com', password: '123'})
  // },[])

  return (
   <BrowserRouter>
   <Nav/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/employees' element={<Employees/>}/>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
