import {Link} from "react-router-dom";
import {login} from "../redux/actions/user";
import {useDispatch} from "react-redux";
import {useState} from "react";

const Login = () => {

   const dispatch = useDispatch();

   const [email, setEmail] = useState("user@user.ru");
   const [password, setPassword] = useState("user");

   const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(login({email, password}))
      
      console.log({email, password})
   }


   return (
      <>
      <div className="form-page login">
         <form action="" className="c-form c-form--small" onSubmit={handleSubmit}>
            <div className="c-form__head">
               <div className="c-form-icon c-form-icon--round"></div>
               <div className="c-form__title">Войдите, чтобы перейти к диску</div>
            </div>
            <div className="c-form__body">
               <div className="c-form__item">
                  <input value={email} onChange={(event) => {
                     setEmail(event.target.value)}
                  } type="text" className="c-input"/>
               </div>
               <div className="c-form__item">
                  <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="c-input"/>
               </div>
            </div>
            <div className="c-form__footer">
               <div className="c-btn-layout">
                  <button 
                  className="c-btn c-btn--medium c-btn--primary c-btn--big c-btn--fulWidth" >Войти</button>
               </div>
               <div className="c-form-box">
                  <div className="c-form-box__text">
                     Нажимая кнопку "Войти", Вы соглашаетесь c условиями политики конфиденциальности
                  </div>
                  <div className="c-form-box c-form-box--center">
                     <Link to="/registration" className="c-link">Зарегистрироваться</Link>
                  </div>
               </div>
            </div>
         </form>
      </div>
      </>
   )
}

export default Login;