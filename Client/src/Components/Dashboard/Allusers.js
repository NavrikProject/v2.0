import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";
const Allusers = () => {
  const user = useSelector((state) => state.user.currentUser);
  const token = user?.accessToken;
  const [allUsers, setAllUsers] = useState([]);
  const [approve, setApprove] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllTheUsers = async () => {
      setLoading(true);
      const res = await axios.get(`/users/get`, {
        headers: { authorization: "Bearer " + token },
      });
      if (res.data.users) {
        setLoading(false);
        setAllUsers(res.data.users);
      } else {
        setLoading(false);
      }
    };
    getAllTheUsers();
  }, [token]);

  const userAdminApproveHandler = async (user) => {
    setLoading(true);
    const res = await axios.put(
      `/users/update/approve/${user.user_dtls_id}`,
      { id: user.user_dtls_id },
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    if (res.data.success) {
      alert(res.data.success);
      window.location.reload();
      setApprove(!approve);
      setLoading(false);
    }
  };
  const userAdminDisApproveHandler = async (user) => {
    setLoading(true);
    const res = await axios.put(
      `/users/update/disapprove/${user.user_dtls_id}`,
      { id: user.user_dtls_id },
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    if (res.data.success) {
      alert(res.data.success);
      setApprove(!approve);
      window.location.reload();
      setLoading(false);
    }
  };
  return (
    <div className="rightbarSect">
      <div className="tableDiv">
        <h1>Approve the trainers</h1>
        {loading && <Loading />}
        <div className="itmes">
          <div className="flex1">
            <div className="greenBox"></div>
            <p className="tag"> Application is Approved</p>
          </div>
          <div className="flex1">
            <div className="redBox"></div>
            <p className="tag"> Application is Declined</p>
          </div>
          <div className="flex1">
            <div className="blueBox"></div>
            <p className="tag"> Application need to be approved</p>
          </div>
          <div className="flex1">
            <div className="yellowBox"></div>
            <p className="tag"> Application will be disapproved</p>
          </div>
        </div>
        <table>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>User Type</th>
            <th>User Status</th>
            <th>Admin</th>
            <th>Make Admin or Not</th>
            <th> Admin Status</th>
          </tr>
          {allUsers?.map((user) => (
            <tbody>
              <tr key={user.user_dtls_id}>
                <td>{user.user_dtls_id}</td>
                <td>{user.user_email}</td>
                <td>{user.user_firstname}</td>
                <td>{user.user_lastname}</td>
                <td>{user.user_type}</td>
                <td>{user.user_status}</td>
                <td>{user.user_is_superadmin}</td>
                <td>
                  {user.user_is_superadmin === 1 ? (
                    <button
                      className="disapprove"
                      onClick={() => userAdminDisApproveHandler(user)}
                    >
                      {approve ? " Disapprove" : "Approve"}
                    </button>
                  ) : (
                    <button
                      onClick={() => userAdminApproveHandler(user)}
                      className="approve"
                    >
                      {approve ? " Approve" : "Disapprove"}
                    </button>
                  )}
                </td>
                <td>
                  {user.user_is_superadmin === 1 ? (
                    <button className="approved">Admin</button>
                  ) : (
                    <button className="disapproved">Not Admin</button>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Allusers;
