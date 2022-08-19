import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Home.scss';
import { IUser } from '../../interfaces/users/user.interface';
import store, { RootState, useAppSelector } from '../../store/store';
import { getUsers, deleteUser } from '../../store/users/users-api';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';

const Home = () => {
  const navigate = useNavigate();

  const { users, isLoading, error } = useAppSelector((state: RootState) => state.users);
  const { errorAtGetUsers } = error;

  useEffect((): void => {
    store.dispatch(getUsers());
  }, []);

  // TODO: Modal működése nem tökéletes, a mégse gombra kattintva is lefut ez.
  const onClickDelete = (_userId: number | undefined) => {
    const acceptButton = document.querySelector('#accept-button');
    if (acceptButton) {
      const deleteEvent = () => {
        console.log('Törlés...');
      };
      acceptButton.addEventListener('click', deleteEvent, { once: true });
    }
  };

  return (
    <div className="home-container my-4">
      {users.length && (
        <div className="card">
          <h4 className="card-header text-uppercase p-3">Munkatársak</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Név</th>
                    <th scope="col">CreatedAt</th>
                    <th scope="col">Törlés</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user: IUser) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>
                        {user.lastname} {user.firstname}
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#confirmModal"
                          onClick={() => onClickDelete(user.id)}>
                          Törlés
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </li>
          </ul>
        </div>
      )}
      <ConfirmModal
        title="Biztosan törli a munkatársat?"
        confirmMessage="A törlés gombra kattintva a munkatárs kitörlődik a rendszerből!"
        acceptButtonText="Törlés"
        cancelButtonText="Vissza"
      />
    </div>
  );
};

export default Home;
