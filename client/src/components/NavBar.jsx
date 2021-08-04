import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/reducers/userReducer";

const NavBar = () => {
   const isAuth = useSelector(({user}) => user.isAuth)
   const dispatch = useDispatch()
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
               {isAuth && <div onClick={() => dispatch(logout())}>Выход</div>}


            </div>
         </div>
      </header>
      </>
   )
}

export default NavBar;