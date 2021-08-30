import React from 'react';
import {useDispatch} from "react-redux";
import {removeUploadFiles} from "../../redux/reducers/uploadReducer";

const UploadFile = ({file}) => {

    const dispatch = useDispatch();

    function removeUploadHandler() {
        dispatch(removeUploadFiles(file))
    }

    return (
        <div  className="upload-file-list__item">
            <div className="upload-file-card">
                <div className="upload-file-card__close" onClick={() => removeUploadHandler()}>x</div>
                <div className="upload-file-card__name">{file.name}</div>
                <div className="upload-file-card-progress">
                    <div className="upload-file-card-progress__bar" style={{width: file.progress + '%'}}> </div>
                    <div className="upload-file-card-progress__num">{file.progress + '%'}</div>
                </div>
            </div>
        </div>
    );
};

export default UploadFile;