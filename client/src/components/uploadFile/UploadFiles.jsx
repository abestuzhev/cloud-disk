import React from 'react';
import UploadFile from "./UploadFile";
import {useDispatch, useSelector} from "react-redux";
import {hideUploadFiles} from "../../redux/reducers/uploadReducer";

const UploadFiles = () => {
    const files = useSelector(({upload}) => upload.files);
    const isVisible = useSelector(({upload}) => upload.isVisible)
    const dispatch = useDispatch();

    function closeUploadHandler() {
        dispatch(hideUploadFiles());
    }

    return (
        <div>
            {isVisible &&
            <div className="upload-file">
                <div className="upload-file__head">
                    <div className="upload-file__title">Загрузки</div>
                    <div className="upload-file__close" onClick={closeUploadHandler}>X</div>
                </div>
                <div className="upload-file__body">
                    <div className="upload-file-list__wrapper">
                        <div className="upload-file-list">
                            {
                                files.map(file => <UploadFile file={file} key={file.id}/>)
                            }
                        </div>
                    </div>

                </div>
            </div>
            }

        </div>
    );
};

export default UploadFiles;