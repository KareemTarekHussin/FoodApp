import { useEffect, useState } from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthLayout from './modules/SharedModule/components/AuthLayout/AuthLayout'
import Notfound from './modules/SharedModule/components/Notfound/Notfound'
import MasterLayout from './modules/SharedModule/components/MasterLayout/MasterLayout'
import Dashboard from './modules/HomeModule/components/DashBoard/Dashboard'
import RecipesList from './modules/RecipesModule/components/RecipesList/RecipesList'
import CategoriesList from './modules/CategoriesModule/components/CategoriesList/CategoriesList'
import UsersList from './modules/UsersModule/components/UsersList/UsersList'
import Login from './modules/AuthenticationModule/components/login/Login'
import Register from './modules/AuthenticationModule/components/register/Register'
import Forgetpass from './modules/AuthenticationModule/components/forgetpass/ForgetPass'
import ResetPass from './modules/AuthenticationModule/components/resetpass/ResetPass'
import { jwtDecode } from 'jwt-decode'
import ProtectedRoute from './modules/SharedModule/components/ProtectedRoute/ProtectedRoute'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecipeData from './modules/RecipesModule/components/RecipeData/RecipeData'
import VerifyAccount from './modules/AuthenticationModule/components/VerifyAccount/VerifyAccount'
import FavsList from './modules/FavsModule/components/FavsList/FavsList'



function App() {
  let[loginData,setLoginData]=useState(null);
  let saveLoginData= ()=>{
    let encodedToken=localStorage.getItem('token');
    let decodedToken=jwtDecode(encodedToken);
    localStorage.setItem('userData',JSON.stringify(decodedToken))
    setLoginData(decodedToken);
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      saveLoginData()}
  
  },[])


let routes = createBrowserRouter([
  {path:'DashBoard',
    element:
    <ProtectedRoute loginData={loginData} >
    <MasterLayout loginData={loginData}/>
    </ProtectedRoute>,
    errorElement: <Notfound/>,
    children:[{path:"",element:<Dashboard/>}, 
    {path:"recipes",element:<RecipesList/>},
    {path:"recipeData",element:<RecipeData/>},
    {path:"categories",element:<CategoriesList/>},
    {path:"users",element:<UsersList/>},
    {path:"favs",element:<FavsList/>}

    ]

  },
  {path:"/",
    element:<AuthLayout/>,
    errorElement: <Notfound/>,
    children:[
    {path:"",element:<Login saveLoginData={saveLoginData}/>},
    {path:"login",element:<Login saveLoginData={saveLoginData}/>},
    {path:"register",element:<Register/>},
    {path:"forgetpass",element:<Forgetpass/>},
    {path:"resetpass",element:<ResetPass/>},
    {path:"verify",element:<VerifyAccount/>}

    ]


  }
])
  return (<>
    <ToastContainer />
   <RouterProvider router={routes}></RouterProvider>
   </>
  )
}

export default App
