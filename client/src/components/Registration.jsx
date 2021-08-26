import {Link} from "react-router-dom";
import {useState} from "react";
import {registration} from "../redux/actions/user";

const Registration = () => {
   const [userEmail, setUserEmail] = useState("user23@mail.ru");
   const [userPassword, setUserPassword] = useState("user");
   const [message, setMessage] = useState(null);

   async function registrationHandler(event) {
      event.preventDefault();

      const response = await registration({email: userEmail, password: userPassword});
      setMessage(response.message);
   }

   return (
      <>
      <div className="form-page login">

         {
            message
             ? <div className="info">
                  <div className="info-text">{message}</div>
                  <div className="c-btn-layout c-btn-layout--center">
                     <Link to="/login" className="c-btn c-btn--outline">Войти в личный кабинет</Link>
                  </div>

                </div>
             : <form action="" className="c-form c-form--small" onSubmit={registrationHandler}>
                   <div className="c-form__head">
                      <div className="c-form-icon c-form-icon--square"> </div>
                      <div className="c-form__title">Зарегистрируйтесь, чтобы начать пользоваться диском</div>
                   </div>
                   <div className="c-form__body">
                      <div className="c-form__item">
                         <input type="text" className="c-input" value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}/>
                      </div>
                      <div className="c-form__item">
                         <input type="password" className="c-input" value={userPassword}
                                onChange={(e) => setUserPassword(e.target.value)}/>
                      </div>
                   </div>
                   <div className="c-form__footer">
                      <div className="c-btn-layout">
                         <button
                             className="c-btn c-btn--medium c-btn--primary c-btn--big c-btn--fulWidth">Зарегистрироваться
                         </button>
                      </div>
                      <div className="c-form-box">
                         <div className="c-form-box__text">
                            Нажимая кнопку "Войти", Вы соглашаетесь c условиями политики конфиденциальности
                         </div>
                         <div className="c-form-box c-form-box--center">
                            <Link to="/login" className="c-link">Войти</Link>
                         </div>
                      </div>
                   </div>
                </form>
         }


      </div>
      </>
   )
}

export default Registration;