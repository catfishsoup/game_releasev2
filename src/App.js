// CSS / Library imports 
import './App.scss';
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements} from 'react-router-dom';
import { UserAuth } from './firebase/user_auth';

// Various Pages import 
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Games from './pages/Games'
import Home from './pages/Home'
import Template from './pages/Template'
import Search from './pages/Search'

// Profile Pages import 
import Profile from './pages/profile/Profile'
import ProfileList from './pages/profile/ProfileList';
import Settings from './pages/profile/Settings'
import ProfileGames from './pages/profile/ProfileGames';
import ProfileOverview from './pages/profile/ProfileOverview';
import ProfileFavorite from './pages/profile/ProfileFavorite';
// 

//Ultility Pages import 
import { Empty } from './pages/Warning'
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header'
import AuthHeader from './components/AuthHeader'
import Footer from './components/Footer'


const App = () => {
  const user = UserAuth()

  const router = createBrowserRouter( 
  createRoutesFromElements(
    // If user is not null (check for null `?`), then render one of the two header options
  <Route path="/" >
    <Route element={<>{user?.user !== null ? <AuthHeader/> : <Header/>} <Footer/></>}>
      <Route index element={<Home />} />
      
      <Route path="about" element={<About />}/>
      <Route path="games" element={<Games />}/>
      <Route path="login" element={<Login />}/>
      <Route path="games/:id" element={<Template />}/>
      <Route path="games/:platforms" element={<Template />}/>
      <Route path="signup" element={<Signup />}/>
      <Route path="contact" element={<Contact />}/>
      
    <Route path='/' element={<ProtectedRoute/>}>
      <Route path="/" element={<Profile/>}>
        <Route path="profile/:user_name" element={<ProfileOverview />}/>
        <Route path="profile/:user_name/overview" element={<ProfileOverview />}/>
        <Route path="profile/:user_name/games" element={<ProfileGames />}/>
        <Route path="profile/:user_name/lists" element={<ProfileList />}/>
        <Route path="profile/:user_name/favorites" element={<ProfileFavorite />}/>
      </Route>
      <Route path="profile/:user_name/settings" element={<Settings/>}/>
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
