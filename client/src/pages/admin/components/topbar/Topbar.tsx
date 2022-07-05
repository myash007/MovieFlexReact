import React, { useContext } from "react";
import "./topbar.css";
import { Settings, MeetingRoom } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext, UserContext, AuthContextType, UserContextType } from '../../../../context/AuthContext';

export default function Topbar() {
  const auth = useContext(AuthContext) as AuthContextType;
  const user = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();
  const logout = () => {
    auth.logout();
    user.setData(null);
    localStorage.removeItem('loginToken');
    navigate('/');
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">MovieFlex</span>
        </div>
        <div className="topRight">
          <img src="https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png" alt="" className="topAvatar" />
          <span className="adminUserName">{user.username != undefined ? <span>Hello, {" " + user.username.toUpperCase()}</span> : ''}</span>
          <div className="topbarIconContainer">
            <MeetingRoom fontSize="large" onClick={logout} />
          </div>
        </div>
      </div>
    </div>
  );
}
