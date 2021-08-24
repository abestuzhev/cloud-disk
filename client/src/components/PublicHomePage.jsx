import React, {useEffect, useState} from 'react'
import FileCard from './FileCard';
import {useDispatch, useSelector} from "react-redux";
import {createDir, getFiles} from "../redux/actions/file";
import Popup from './Popup';
import { setCurrentDir, setPopupDisplay } from '../redux/reducers/fileReducer';

export default function PublicHomePage() {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);
    const stackDir = useSelector(state => state.files.stackDir);
    
    const files = useSelector(state => state.files.files);

    useEffect(() => {
        dispatch(getFiles(currentDir));
    }, [currentDir])


    const shoPopupHandler = () => {
        dispatch(setPopupDisplay("flex"));
    }

    const backToDirHandler = () => {
        const dir = stackDir.pop();
        dispatch(setCurrentDir(dir));
    } 

    return (
        <div className="content-page">
            <div className="home">
                <div className="client-listing">
                    <div className="listing-head">
                        <div className="listing-create">
                            {
                                (stackDir.length === 0) ? "" 
                                : <button className="c-btn c-btn--outline" onClick={() => backToDirHandler()}>Назад</button>
                            }
                            
                            <button className="c-btn c-btn--outline">Загрузить</button>
                            <button className="c-btn c-btn--outline" onClick={shoPopupHandler}>Создать</button>
                        </div>
                    </div>
                    <div className="listing">
                        <div className="listing-items">
                            {
                                files.map(item => <FileCard file={item} key={item._id} />)
                            }
                        </div>
                    </div>
                    <Popup />
                </div>
            </div>
        </div>
        
    )
}
