import Logo from "./Logo";
import { UserAuth } from "../firebase/user_auth";
import {
  NavLink,
  Outlet,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import user_pfp from "../img/user.png";
import "../styles/HeaderStyle.scss";
import SearchBar from "./SearchBar";

const UserOption = ({ open, handleLogOut, displayName }) => {
  if (open === true) {
    return (
      <ul className="user-option-lists">
        {/* Improvement Needed: Only authorized / logged in user can access these links. */}
        <li>
          <Link to={`profile/${displayName}`}>Profile</Link>
        </li>
        <li>
          <Link to={`profile/${displayName}/settings`}>Settings</Link>
        </li>
        <li onClick={() => handleLogOut()}>Log Out</li>
      </ul>
    );
  }
};
const AuthHeader = () => {
  const { user, logout } = UserAuth();
  const [openUP, setopenUP] = useState(false);
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [mobileNav, setmobileNav] = useState(false);

  const handleLogOut = async () => {
    try {
      await logout();
      nav("/login", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  const openUserTab = () => {
    setopenUP(!openUP);
  };

  const hamburgerMenu = () => {
    setmobileNav(!mobileNav);
    document.body.style.overflow = "hidden";
  };

  if (!mobileNav) {
    document.body.style.overflow = "visible";
  }

  useEffect(() => {
    setmobileNav(false);
    document.body.style.overflow = "visible";
  }, [pathname]);
  return (
    <>
      <header>
        <Logo />
        <nav className={`nav-cont ${mobileNav ? "active" : "not-active"}`}>
          <ul className="links-cont">
            <li>
              <NavLink to={`profile/${user?.displayName}`} className="link">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/games" className="link">
                Games
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="link">
                Contact
              </NavLink>
            </li>
          </ul>

          <section className="user-sl">
            <SearchBar />
            <Link className="link search-btn" to="/search">
              Search
            </Link>
            <img
              onClick={openUserTab}
              className="user-pfp"
              src={user.photoURL !== undefined ? user.photoURL : user_pfp}
              alt="user-profile"
            />
            <UserOption
              open={openUP}
              handleLogOut={handleLogOut}
              displayName={`${user?.displayName}`}
            />
          </section>

          <button className="hamburger-menu" onClick={() => hamburgerMenu()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 6h14M5 12h14M5 18h14"
              />
            </svg>
          </button>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default AuthHeader;
