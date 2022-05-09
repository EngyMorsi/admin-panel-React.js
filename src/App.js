import {Routes, Route , useNavigate, Navigate} from 'react-router-dom';
import React from 'react';
import Login from "./Components/Login";
import Navbar from './Components/Navbar';
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import AddSlider from "./Components/AddSlider";
import AllSlider from "./Components/AllSlider";
import Addnews from "./News/Addnews";
import Allnews from "./News/Allnews";
import { useState ,useEffect} from 'react';
import EditNews from './News/EditNews';
import EditSlider from './Components/EditSlider';
import Message from './Messages/Message';
import jwtDecode from 'jwt-decode';
import Admins from './Components/Admins';





  
function App() {
  const navigate = useNavigate()
  const [userInfo , setUserInfo] = useState(null);
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
   if(localStorage.getItem('token'))
   {
    getUserInfo();
   }
  }, [])
  
  
  function getUserInfo(){
    let decodedToken = jwtDecode( localStorage.getItem('token'));
    setUserInfo(decodedToken);
  };

 useEffect(() => {}, [userInfo])
  
 function logOut (){
  localStorage.removeItem('token');
  setUserInfo(null);
  navigate("/login");
 };

 function ProtectedRoute({children}){
   if(!localStorage.getItem('token'))
   {
     return <Navigate to='/login'/>
   }
   else
   {
     return children;
   }
 }
 
 useEffect(() => {
  setDidMount(true);
  return () => setDidMount(false);
}, []);

if (!didMount) {
  return null;
} 


 
  return (
 <>
   <div>
    <Navbar userInfo={userInfo} logOut={logOut}/>
    <main className='App'>
      
 <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/home' element={ <ProtectedRoute><Home /> </ProtectedRoute> } /> 
        <Route path='/admins' element={ <ProtectedRoute><Admins /> </ProtectedRoute> } /> 
        <Route path='/login' element={ <Login getUserInfo={getUserInfo}/>} />
        <Route path='/signup' element={ <Signup />} />
        <Route path='/Addnews' element={ <ProtectedRoute><Addnews /> </ProtectedRoute>} />
        <Route path='/Allnews' element={<ProtectedRoute><Allnews /> </ProtectedRoute>} />
        <Route path='/Allslider' element={<ProtectedRoute><AllSlider /> </ProtectedRoute> } />
        <Route path='/addSlider' element={<ProtectedRoute><AddSlider /> </ProtectedRoute> } />
        <Route path='/editNews/:id' element={<ProtectedRoute><EditNews /> </ProtectedRoute> } />
        <Route path='/editSlider/:id' element={<ProtectedRoute><EditSlider /> </ProtectedRoute> } />
        <Route path='/messages' element={<ProtectedRoute><Message /> </ProtectedRoute> } /> 
        <Route path='*' element={<h2>404</h2>} />  
 </Routes>
     </main>
     </div>
 </>
  );
}

export default App;
