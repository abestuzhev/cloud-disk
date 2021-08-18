import {NavLink, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/reducers/userReducer";

const NavBar = () => {
   const isAuth = useSelector(({user}) => user.isAuth)
   const dispatch = useDispatch()

   const handleExit = (e) => {
      e.preventDefault();
      dispatch(logout())
   }
   return (
      <>
      <header className="header">
         <div className="header-layout">
            <div className="header-logo">
               Cloud disk
            </div>
            <div className="header-menu">
               {!isAuth && <NavLink to="/login" activeClassName="selected">Вход</NavLink>}
               {!isAuth && <NavLink to="/registration">Регистрация</NavLink>}
               {isAuth && <a href="#" className="header-menu__link" onClick={handleExit}>Выход</a>}
            </div>
         </div>
      </header>
      </>
   )
}

export default NavBar;