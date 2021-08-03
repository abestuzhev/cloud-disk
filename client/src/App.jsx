import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import "./scss/style.scss";
import Login from "./components/Login"
import Registration from "./components/Registration"
import Navbar from "./components/Navbar";


function App() {
   return (
      <div className="App">
         <div className="wrapper">

            <BrowserRouter>
               <Navbar />
               <Switch>
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
            </BrowserRouter>
         </div>

      </div>
   );
}

export default App;
