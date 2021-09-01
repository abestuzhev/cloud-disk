import React, {useEffect, useState} from 'react'
import FileCard from './FileCard';
import {useDispatch, useSelector} from "react-redux";
import {createDir, getFiles, uploadFile} from "../redux/actions/file";
import Popup from './Popup';
import {changeViewFiles, setCurrentDir, setPopupDisplay} from '../redux/reducers/fileReducer';
import UploadFiles from "./uploadFile/UploadFiles";
import Select from "./Select";

export default function PublicHomePage() {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);
    const stackDir = useSelector(state => state.files.stackDir);
    const view = useSelector(({files}) => files.view);
    const [dragEnter, setDragEnter] = useState(false);
    const [sortValue, setSortValue] = useState("name");

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

    const addFileHandler = (event) => {
        const files = [...event.target.files];
        files.forEach(file => {
            dispatch(uploadFile(file, currentDir));
        })
    }

    const dragEnterHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setDragEnter(true)
    }

    const dragLeaveHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setDragEnter(false)
    }

    const dropHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const files = [...event.dataTransfer.files];
        // console.log("files", files)
        files.forEach(file => {
            dispatch(uploadFile(file, currentDir));
        })
        setDragEnter(false);
    }

    const changeSortValue = (value) => {
        setSortValue(value);
        dispatch(getFiles(currentDir, sortValue))
    }

    return (
        <div className="content-page" >
            <div className="home">
                {
                    dragEnter
                    ? <div className="client-drag" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}><div className="client-drag__text">Загрузить файлы на Cloud disk</div></div>
                    : <div className="client-listing" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                            <div className="listing-head">
                                <div className="listing-create">
                                    {
                                        (stackDir.length === 0) ? ""
                                            : <button className="c-btn c-btn--outline" onClick={() => backToDirHandler()}>Назад</button>
                                    }

                                    <div className="listing-download">
                                        <label htmlFor="listing-download" className="listing-download__btn">Загрузить</label>
                                        <input multiple={true} type="file" id="listing-download" onChange={(event) => addFileHandler(event)}/>
                                    </div>
                                    <button className="c-btn c-btn--outline" onClick={shoPopupHandler}>Создать папку</button>
                                </div>
                                <div className="listing-operation">
                                    <div className="listing-sort">
                                        <select className="c-select" name="sort" id="sort" value={sortValue} onChange={(e) => changeSortValue(e.target.value)}>
                                            <option value="name">Имя</option>
                                            <option value="type">Тип файла</option>
                                            <option value="date">Дата создания</option>
                                        </select>
                                        <Select />
                                    </div>
                                    <div className="listing-view">
                                        <div className="listing-view__item">
                                            <div className="listing-view__icon list" onClick={() => dispatch(changeViewFiles("list"))}> </div>
                                        </div>
                                        <div className="listing-view__item">
                                            <div className="listing-view__icon plate" onClick={() => dispatch(changeViewFiles("plate"))}> </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="listing">
                                <div className={view === "plate" ? "listing-items listing-items--plate" : "listing-items"}>
                                    {
                                        files.map(item => <FileCard file={item} key={item._id} />)
                                    }
                                </div>
                            </div>
                            <Popup />
                            <UploadFiles />
                        </div>
                }

            </div>
        </div>
        
    )
}
