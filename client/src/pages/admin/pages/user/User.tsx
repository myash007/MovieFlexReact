import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./user.css";

type UserProps = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: any;
  password: string;
}

const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProps>();
  const [userForm, setUserForm] = useState({
    id: id,
    name: '',
    phoneNumber: '',
    password: ''
  });

  useEffect(() => {
    const getUserById = async () => {
      try {
        const url = `http://localhost:4000/get-user/${id}`;
        const response = await axios.get(url);
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserById();
  }, [id]);

  const updateUserForm = (value: object) => {
    return setUserForm((prev) => {
      return { ...prev, ...value };
    });
  };

  const handleUserFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedUser = { ...userForm };
    console.log(updatedUser);
    try {
      const response = await axios.post(
        'http://localhost:4000/update-user',
        JSON.stringify(updatedUser),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // console.log(response);
      if (response.data.status) {
        alert(response.data.msg);
        navigate('/admin/users');
      } else {
        alert(response.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
    setUserForm({
      id: '',
      name: '',
      phoneNumber: '',
      password: ''
    });
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user?.name}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.name}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.phoneNumber}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleUserFormSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  value={user?.email}
                  style={{ backgroundColor: 'rgb(232,232,232)', borderRadius: '10px' }}
                  className="userUpdateInput"
                  readOnly
                />
              </div>
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user?.name}
                  className="userUpdateInput"
                  onChange={(e) => updateUserForm({ name: e.target.value })}
                  required
                />
              </div>

              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder={user?.phoneNumber}
                  className="userUpdateInput"
                  onChange={(e) => updateUserForm({ phoneNumber: e.target.value })}
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="text"
                  placeholder='Enter your new Password'
                  className="userUpdateInput"
                  onChange={(e) => updateUserForm({ password: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default User;