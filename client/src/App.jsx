import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import "./scss/style.scss";
import Login from "./components/Login"
import Registration from "./components/Registration"
import NavBar from "./components/NavBar";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {auth} from "./redux/actions/user";


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
                  !isAuth &&  <Switch>
                     <Route path="/login">
                        <Login />
                     </Route>
                     <Route path="/registration">
                        <Registration />
                     </Route>
                     <Route path="/" exact>
                        Home page
                     </Route>
                  </Switch>
               }

            </BrowserRouter>
         </div>

      </div>
   );
}

export default App;
