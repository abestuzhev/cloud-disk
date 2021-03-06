import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pushDir, setCurrentDir } from '../redux/reducers/fileReducer';
import {deletedFile, downloadFile} from "../redux/actions/file";
import {sizeFormat} from "../utils";

export default function FileCard({file}) {

    const dispatch = useDispatch();

    const currentDir = useSelector(state => state.files.currentDir);
    const view = useSelector(({files}) => files.view);

    const openDirHandler = () => {
        if(file.type === "dir") {
            dispatch(pushDir(currentDir))
            dispatch(setCurrentDir(file._id))
        }
        console.log("file._id", file._id);
    }

    const downloadFileHandler = (e) => {
        e.preventDefault();

        console.log("file",file)
        downloadFile(file);
    }
    const deleteFileHandler = (file) => {
        dispatch(deletedFile(file));
    }


    return (
        <>
            {
                view === "list"
                    ? <div className="listing-item">
                        <div className="listing-card" onClick={() => openDirHandler(file)}>
                            {
                                file.type === "dir"
                                    ? <div className="listing-card__icon listing-card__icon--dir"><i></i></div>
                                    : <div className="listing-card__icon listing-card__icon--file"><i>{file.type}</i></div>
                            }
                            <div className="listing-card__info">
                                <div className="listing-card__name">{file.name}</div>
                                <div className="listing-card__date">{file.date}</div>
                                <div className="listing-card__size">{file.size === 0 ? "-" : sizeFormat(file.size)}</div>
                                <div className="listing-card__link">
                                    <svg className="ufo-icon__icon" width="12" height="12" viewBox="0 0 16 16">
                                        <g>
                                            <path fill="#9b2aff" d="M10.792 6.572c.35-.38.34-.97-.025-1.337a.97.97 0 0 0-1.338-.028l-.093.089-1.364 1.367-1.312 1.31-1.361 1.364-.091.091a.965.965 0 1 0 1.365 1.365l.09-.093 1.364-1.36 1.312-1.313L10.7 6.664l.094-.093v.002l-.003-.001z"></path>
                                            <path fill="#9b2aff" d="M14.796 2.955l-1.773-1.778c-1.055-1.061-2.903-1.061-3.96 0L7.289 2.955a2.803 2.803 0 0 0-.17 3.756l1.454-1.46a.768.768 0 0 1 .154-.858l1.776-1.777a.761.761 0 0 1 1.084 0l1.776 1.777a.775.775 0 0 1 0 1.09L11.587 7.26a.784.784 0 0 1-.854.15L9.275 8.876a2.77 2.77 0 0 0 3.75-.173L14.8 6.924a2.817 2.817 0 0 0 0-3.97h-.004zm-7.37 7.765c.133.29.072.63-.153.856l-1.776 1.781a.787.787 0 0 1-1.085 0L2.64 11.576a.77.77 0 0 1 0-1.085l1.773-1.784a.76.76 0 0 1 .858-.154l1.456-1.458c-1.08-.875-2.76-.827-3.751.168L1.2 9.045a2.817 2.817 0 0 0 0 3.974l1.773 1.777c.528.53 1.234.823 1.979.823.75 0 1.453-.292 1.984-.823l1.773-1.78a2.807 2.807 0 0 0 .174-3.76l-1.456 1.463-.002.004.002-.003z"></path>
                                        </g>
                                    </svg>
                                </div>
                                <div className="listing-card__btns">
                                    {
                                        file.type === "dir" ? "" : <button className="listing-card__btn" onClick={(e)=> downloadFileHandler(e)}>??????????????</button>
                                    }
                                    <button className="listing-card__btn" onClick={() => deleteFileHandler(file)}>??????????????</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div className="listing-item">
                        <div className="listing-card listing-card--plate" onClick={() => openDirHandler(file)}>
                            {
                                file.type === "dir"
                                    ? <div className="listing-card__icon listing-card__icon--dir"><i></i></div>
                                    : <div className="listing-card__icon listing-card__icon--file"><i>{file.type}</i></div>
                            }
                            <div className="listing-card__info">
                                <div className="listing-card__name">{file.name}</div>
                                {/*<div className="listing-card__btns">*/}
                                {/*    {*/}
                                {/*        file.type === "dir" ? "" : <button className="listing-card__btn" onClick={(e)=> downloadFileHandler(e)}>??????????????</button>*/}
                                {/*    }*/}
                                {/*    <button className="listing-card__btn" onClick={() => deleteFileHandler(file)}>??????????????</button>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
            }

        </>
    )
}
