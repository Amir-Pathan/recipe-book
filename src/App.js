import logo from './logo.svg';
import './App.css';
import SignUp from './signup';
import { useEffect, useState } from 'react';
import isAuntenticated from './services/autenticated';
import { BrowserRouter as Router,Route,Routes, useLoaderData, useLocation } from 'react-router-dom';
import { privateRoute, publicRoutes } from './routes';
import { useNavigate } from 'react-router-dom';
import TopAppBar from './appbar';
import Recipies from './recipies';

function App() {

  const navigate = useNavigate()

  const location = useLocation()

  const [no,setNo] = useState(0)

  useEffect(()=>{
  


    if(!isAuntenticated()){
 
       navigate('/signup')

    }
  },[])

  return (
    <>
    {
      location.pathname=='/login'||location.pathname=='/signup'?'':<TopAppBar n={no} handle={(no)=>setNo(no)}/>
    }
      <Routes>
        <Route path='/' element={<Recipies n={no} handle={(n)=>setNo}/>}/>
          {

            privateRoute.map((i,index)=>{

              return <Route path={i.path} element={i.component} key={index}/>

            })
            
            


          }

      </Routes>
    </>
  );
}

export default App;
