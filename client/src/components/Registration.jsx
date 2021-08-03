import {Link} from "react-router-dom";

const Registration = () => {
   return (
      <>
      <div className="form-page login">
         <form action="" class="c-form c-form--small">
            <div className="c-form__head">
               <div className="c-form-icon c-form-icon--square"></div>
               <div className="c-form__title">Зарегистрируйтесь, чтобы начать пользоваться диском</div>
            </div>
            <div className="c-form__body">
               <div className="c-form__item">
                  <input type="text" className="c-input"/>
               </div>
               <div className="c-form__item">
                  <input type="password" className="c-input"/>
               </div>
            </div>
            <div className="c-form__footer">
               <div className="c-btn-layout">
                  <button className="c-btn c-btn--medium c-btn--primary c-btn--big c-btn--fulWidth">Зарегистрироваться</button>
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
      </div>
      </>
   )
}

export default Registration;