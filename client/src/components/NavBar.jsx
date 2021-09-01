import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/reducers/userReducer";

const NavBar = () => {
   const isAuth = useSelector(({user}) => user.isAuth)
   const avatar = useSelector(({user}) => user.avatar)
   const dispatch = useDispatch()

   const handleExit = (e) => {
      e.preventDefault();
      dispatch(logout())
   }
   return (
      <>
      <header className="header">
         <div className="header-layout">
            <Link to="/" className="header-logo">
               Cloud disk
            </Link>
            <div className="header-menu">
               {!isAuth && <NavLink to="/login" activeClassName="selected">Вход</NavLink>}
               {!isAuth && <NavLink to="/registration">Регистрация</NavLink>}
               {isAuth && <a href="#" className="header-menu__link" onClick={handleExit}>Выход</a>}
               {isAuth && <NavLink to="/profile" className=" header-menu__link header-avatar">
                  {avatar ? <img src={avatar} alt=""/> : <div className="header-avatar__icon"> </div>   }
               </NavLink>}
            </div>
         </div>
      </header>
      </>
   )
}

export default NavBar;