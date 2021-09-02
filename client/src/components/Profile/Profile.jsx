import React from 'react';
import {deleteAvatar, uploadAvatar} from "../../redux/actions/user";
import {useDispatch, useSelector} from "react-redux";
import {API_PATH} from "../../config";
import {sizeFormat} from "../../utils";

const Profile = () => {
    const user = useSelector(({user}) => user.currentUser);
    console.log("user", user)
    const dispatch = useDispatch();
    function deleteAvatarHandler() {
        dispatch(deleteAvatar())
    }

    function uploadAvatarHandler(e) {
        dispatch(uploadAvatar(e.target.files[0]))
    }

    return (
        <div className="content-page">
            <div className="profile">
                <div className="profile-card">
                    <div className="profile-card__img">
                        <div className="profile-card-avatar">
                            {user.avatar
                                ? <img src={`${API_PATH}\\${user.avatar}`} alt=""/>
                                : ""
                            }
                        </div>
                    </div>
                    <div className="profile-card__info">
                        <div className="profile-card-row">
                            <div className="profile-card-row__name">id:</div>
                            <div className="profile-card-row__value">{user.id} </div>
                        </div>
                        <div className="profile-card-row">
                            <div className="profile-card-row__name">Email:</div>
                            <div className="profile-card-row__value">{user.email}</div>
                        </div>

                        <div className="profile-card-row">
                            <div className="profile-card-row__name">Диск:</div>
                            <div className="profile-card-row__value">Занято {sizeFormat(user.usedSpace)} из {sizeFormat(user.diskSpace)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="c-link" onClick={deleteAvatarHandler}>Удалить аватар</div>
            <input type="file" onChange={uploadAvatarHandler}/>
        </div>
    );
};

export default Profile;