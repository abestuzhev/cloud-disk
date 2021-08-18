import {BrowserRouter, Switch, Route, Link, Redirect} from "react-router-dom";
import "./scss/style.scss";
import Login from "./components/Login"
import Registration from "./components/Registration"
import NavBar from "./components/NavBar";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {auth} from "./redux/actions/user";
import PublicHomePage from "./components/PublicHomePage";


function App() {
   const isAuth = useSelector(({user}) => user.isAuth);
   const dispatch = useDispatch();

   useEffect(()=> {
      if(localStorage.getItem("token")) {
         dispatch(auth());
         console.log("auth")
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
                     <Redirect to="/" />
                  </Switch>
               }

            </BrowserRouter>
         </div>

      </div>
   );
}

export default App;
