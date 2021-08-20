import React, {useState} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { createDir } from '../redux/actions/file';
import { setPopupDisplay } from '../redux/reducers/fileReducer';

export default function Popup() {

    const dispatch = useDispatch();
    const showPopup = useSelector(({files}) => files.showPopup);
    const currentDir = useSelector(state => state.files.currentDir);
    const [nameDir, setNameDir] = useState("");
    
    
    const createDirHandler = () => {
        dispatch(createDir(currentDir, nameDir));
        dispatch(setPopupDisplay("none"))
        setNameDir("")
    }
    

    return (
        <>
            <div className="popup-layout" onClick={()=> dispatch(setPopupDisplay("none"))} style={ {display: showPopup} }>
                <div className="popup" onClick={(e)=> e.stopPropagation()}>
                    <div className="popup-title">Введите название папки</div>
                    <div className="c-form__item">
                        <input type="text" className="c-input" value={nameDir} onChange={e => setNameDir(e.target.value)}/>
                    </div>
                    <div className="c-btn-layout c-btn-layout--left">
                        <button className="c-btn" onClick={createDirHandler}>Создать</button>
                    </div>
                    
                </div>
                <div className="popup-bg"></div>
            </div>            
        </>
    )
}
