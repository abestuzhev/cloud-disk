import {NavLink} from "react-router-dom";

const Navbar = () => {
   return (
      <>
      <header className="header">
         <div className="header-layout">
            <div className="header-logo">
               Cloud disk
            </div>
            <div className="header-menu">
               <NavLink to="/login" activeClassName="selected">Вход</NavLink>
               <NavLink to="/registration">Регистрация</NavLink>
            </div>
         </div>
      </header>
      </>
   )
}

export default Navbar;