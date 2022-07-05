import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline,Edit } from "@material-ui/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

type UserProps = {
  _id: string;
  name: string;
  email: string;
  role: string;
  phoneNumber: any;
}[]

const UserList = () => {
  const navigate = useNavigate();
  const [data, setUserData] = useState<UserProps>([]);

  const getAllUser = async () => {
    try {
      const url = `http://localhost:4000/get-user`;
      const response = await axios.get(url);
      setUserData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    getAllUser();
  }, []);

  const handleUserDelete = async (id: any) => {
    try {
      const url = `http://localhost:4000/delete-user/${id}`;
      const response = await axios.delete(url);
      if (response.data.status) {
        alert(response.data.msg);
        getAllUser();
        navigate('/admin/users');
      } else {
        alert(response.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  const columns = [
    { field: '_id', headerName: "#", width: 300 },
    {
      field: "name",
      headerName: "User Name",
      width: 200,
      renderCell: (params: any) => {
        return (
          <div className="userListUser">
            {params.row.name}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    { field: "role", headerName: "User Role", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params: any) => {
        return (
          <>
            <Link to={"/admin/user/" + params.row._id}>
              <Edit className="userListEdit"/>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleUserDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data!}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={20}
      />
    </div>
  );
}

export default UserList;