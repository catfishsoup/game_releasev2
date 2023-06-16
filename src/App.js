import './App.scss';
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements} from 'react-router-dom';
import { UserAuth } from './firebase/user_auth';
import Header from './components/Header'
import Footer from './components/Footer'
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

import {Warning, Empty} from './pages/Warning'

const App = () => {
  const user = UserAuth()

  const router = createBrowserRouter( 
  createRoutesFromElements(
    // If user is not null (check for null `?`), then render one of the two header options
  <Route path="/" >
    <Route element={<>{user?.user !== null ? <AuthHeader/> : <Header/>} <Footer/></>}>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="about" element={<About />}/>
      <Route path="games" element={<Games />}/>
      <Route path="login" element={<Login />}/>
      <Route path="games/:id" element={<Template />}/>
      <Route path="signup" element={<Signup />}/>
      <Route path="contact" element={<Contact />}/>
    <Route element={user.user !== null ? <Profile/> : <Warning/>}>
      <Route path="profile/:user_name" element={<Profile />}/>
    </Route>

    <Route path="search/:name" element={<Search />}/>

    </Route>
    <Route path="*" element={<Empty />} />
  </Route>
)
);
  return(

        <RouterProvider router={router} />
        
    
  )
}

export default App;
