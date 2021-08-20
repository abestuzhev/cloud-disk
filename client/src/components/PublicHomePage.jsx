import React, {useEffect} from 'react'
import FileCard from './FileCard';
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../redux/actions/file";

export default function PublicHomePage() {
    const currentDir = useSelector(state => state.files.currentDir);
    // const files = [
    //     {_id:1, name: "directory", size: 125, date: "2021-08-18"},
    //     {_id:2, name: "фотографии", size: 100, date: "2021-08-20"},
    //     {_id:3, name: "документы", size: 563, date: "2021-08-08"}
    // ];

    useEffect(() => {
        getFiles(currentDir);
    }, [currentDir])

    const files = useSelector(state => state.files.files);

    return (
        <div className="content-page">
            <div className="home">
                <div className="client-listing">
                    <div className="listing-head">
                        <div className="listing-create">
                            <button className="c-btn c-btn--outline">Загрузить</button>
                            <button className="c-btn c-btn--outline">Создать</button>
                        </div>
                    </div>
                    <div className="listing">
                        <div className="listing-items">
                            {
                                files.map(item => <FileCard file={item} key={item._id} />)
                            }                           
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
