import React, {useEffect, useState} from 'react'
import FileCard from './FileCard';
import {useDispatch, useSelector} from "react-redux";
import {createDir, getFiles} from "../redux/actions/file";
import Popup from './Popup';
import { setPopupDisplay } from '../redux/reducers/fileReducer';

export default function PublicHomePage() {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);
    
    const files = useSelector(state => state.files.files);

    useEffect(() => {
        dispatch(getFiles(currentDir));
    }, [currentDir])


    const shoPopupHandler = () => {
        dispatch(setPopupDisplay("flex"));
    }

    return (
        <div className="content-page">
            <div className="home">
                <div className="client-listing">
                    <div className="listing-head">
                        <div className="listing-create">
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
