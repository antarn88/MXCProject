import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Home.scss';
import { IUser } from '../../interfaces/users/user.interface';
import store, { RootState, useAppSelector } from '../../store/store';
import { getUsers, deleteUser } from '../../store/users/users-api';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';

const Home = () => {
  const [currentUser, setCurrentUser] = useState<IUser>();

  const navigate = useNavigate();

  const { users, isLoading, error } = useAppSelector((state: RootState) => state.users);
  const { errorAtGetUsers } = error;

  useEffect((): void => {
    fetchUsers();
  }, []);

  const confirmedEvent = async () => {
    if (currentUser && currentUser.id) {
      if ((await store.dispatch(deleteUser(currentUser.id))).meta.requestStatus === 'fulfilled') {
        (document.querySelector('#cancel-button') as HTMLElement).click();
        toast.success('Sikeresen törölte a munkatársat.');
        fetchUsers();
      } else {
        (document.querySelector('#cancel-button') as HTMLElement).click();
        toast.error('Hiba a munkatárs törlésekor!');
      }
    }
  };

  const fetchUsers = async () => {
    if ((await store.dispatch(getUsers())).meta.requestStatus === 'rejected') {
      toast.error('Hiba a munkatársak betöltésekor!');
    }
  };

  return (
    <div className="home-container my-4">
      {isLoading && !errorAtGetUsers && (
        <div className="loading-screen">
          <div className="spinner-border"></div>
          <h5 className="ml-5">Munkatársak betöltése...</h5>
        </div>
      )}

      {!isLoading && !errorAtGetUsers && (
        <div className="card">
          <h4 className="card-header text-uppercase p-3">
            <div className="d-flex justify-content-between user-select-none top-bar">
              <div className="d-flex align-items-center gap-2">
                <span className="material-icons-outlined">person</span>
                <span className="mr-5"> Munkatársak</span>
              </div>
              <button className="btn btn-primary d-flex gap-2 text-uppercase">
                <span className="material-icons-outlined">add</span>
                <span> Új munkatárs felvétele</span>
              </button>
            </div>
          </h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {users.length > 0 ? (
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th scope="col" className="user-select-none">
                        #
                      </th>
                      <th scope="col" className="user-select-none">
                        Név
                      </th>
                      <th scope="col" className="user-select-none">
                        CreatedAt
                      </th>
                      <th scope="col" className="user-select-none">
                        Törlés
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user: IUser) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>
                          {user.firstname} {user.lastname}
                        </td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#confirmModal"
                            data-backdrop="static"
                            data-keyboard="false"
                            onClick={() => setCurrentUser(user)}>
                            Törlés
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>Jelenleg nincsenek munkatársak.</div>
              )}
            </li>
          </ul>
        </div>
      )}
      <ConfirmModal isLoading={isLoading} confirmedEvent={confirmedEvent} />
    </div>
  );
};

export default Home;
