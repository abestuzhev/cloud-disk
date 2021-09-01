import React from 'react';
import {deleteAvatar} from "../../redux/actions/user";
import {useDispatch} from "react-redux";

const Profile = () => {
    const dispatch = useDispatch();
    function deleteAvatarHandler() {
        dispatch(deleteAvatar())
    }

    function uploadAvatarHandler() {
        dispatch(deleteAvatar())
    }

    return (
        <div className="content-page">
            <div className="c-link" onClick={deleteAvatarHandler}>Удалить аватар</div>
            <input type="file" onChange={uploadAvatarHandler}/>
        </div>
    );
};

export default Profile;