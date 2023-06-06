import './App.scss';
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements} from 'react-router-dom';
import { AuthContextProvider, UserAuth } from './firebase/user_auth';
import {auth} from './firebase/firebase.js'
import Header from './components/Header'
import AuthHeader from './components/AuthHeader'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Games from './pages/Games'
import Home from './pages/Home'
import Template from './pages/Template'
import Profile from './pages/Profile'
import Search from './pages/Search'



const App = () => {
  const user = UserAuth()
  const router = createBrowserRouter( 
  createRoutesFromElements(
    // If user is not null (check for null `?`), then render one of the two header options
  <Route path="/" element={user?.user !== null ? <AuthHeader/> : <Header/>}>
    <Route index element={<Home />} />
    <Route path="home" element={<Home />} />
    <Route path="about" element={<About />}/>
    <Route path="games" element={<Games />}/>
    <Route path="login" element={<Login />}/>
    <Route path="games/:id" element={<Template />}/>
    <Route path="signup" element={<Signup />}/>
    <Route path="profile" element={<Profile />}/>
    <Route path="search/:name" element={<Search />}/>
  </Route>
)
);
  return(
    <main>

        <RouterProvider router={router} />
        
    </main>
    
  )
}

export default App;
