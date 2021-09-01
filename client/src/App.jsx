import {BrowserRouter, Switch, Route, Link, Redirect} from "react-router-dom";
import "./scss/style.scss";
import Login from "./components/Login"
import Registration from "./components/Registration"
import NavBar from "./components/NavBar";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {auth} from "./redux/actions/user";
import PublicHomePage from "./components/PublicHomePage";
import Profile from "./components/Profile/Profile";


function App() {
   const isAuth = useSelector(({user}) => user.isAuth);
   const user = useSelector(({user}) => user);
   const dispatch = useDispatch();

   useEffect(()=> {
      if(localStorage.getItem("token")) {
         dispatch(auth());
      }

   }, [])

   return (
      <div className="App">
         <div className="wrapper">

            <BrowserRouter>
               <NavBar />

               {
                  !isAuth ?
                  <Switch>                     
                     <Route path="/login">
                        <Login />    
                     </Route>
                     <Route path="/registration">
                        <Registration />
                     </Route>
                     <Redirect to="/login" />                     
                  </Switch>
                  :
                  <Switch>
                     <Route exact path="/">
                        <PublicHomePage /> 
                     </Route>
                     <Route exact path="/profile">
                        <Profile />
                     </Route>
                     <Redirect to="/" />
                  </Switch>
               }

            </BrowserRouter>
         </div>

      </div>
   );
}

export default App;
