import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'react-toastify/dist/ReactToastify.css';

import { IUser } from '../../interfaces/users/user.interface';
import store, { RootState, useAppSelector } from '../../store/store';
import { getUsers, deleteUser } from '../../store/users/users-api';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Loading from '../../components/Loading/Loading';
import './Home.scss';

const Home = () => {
  const pageSize = 50;

  const [currentUser, setCurrentUser] = useState<IUser>();
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [orderBy, setOrderBy] = useState<string>('firstname');
  const [order, setOrder] = useState<string>('asc');
  const [displayedUsers, setDisplayedUsers] = useState<IUser[]>([]);

  const { isLoading, error } = useAppSelector((state: RootState) => state.users);
  const { errorAtGetUsers } = error;

  useEffect((): void => {
    fetchUsers();
  }, []);

  const onClickColumnName = (columnName: string) => {
    if (orderBy !== columnName) {
      setOrderBy(columnName);
      refreshTableAfterSorting();
    }
  };

  const onClickSorting = (): void => {
    setOrder((previousValue: string) => (previousValue === 'asc' ? 'desc' : 'asc'));
    refreshTableAfterSorting();
  };

  const confirmedEvent = async (): Promise<void> => {
    if (currentUser && currentUser.id) {
      if ((await store.dispatch(deleteUser(currentUser.id))).meta.requestStatus === 'fulfilled') {
        (document.querySelector('#cancel-button') as HTMLElement).click();
        toast.success('Sikeresen törölte a munkatársat.', { autoClose: 4000 });
        refreshTableAfterDeleteUser();
      } else {
        (document.querySelector('#cancel-button') as HTMLElement).click();
        toast.error('Hiba a munkatárs törlésekor!', { autoClose: 8000 });
      }
    }
  };

  const refreshTableAfterSorting = async (): Promise<void> => {
    setDisplayedUsers([]);
    setPageIndex(0);
    const request = await store.dispatch(getUsers({ orderBy, order, pageIndex, limit: pageSize }));
    if (request.meta.requestStatus === 'fulfilled') {
      const userListPiece = request.payload as IUser[];
      setDisplayedUsers(userListPiece);
    } else {
      toast.error('Hiba a munkatársak betöltésekor!', { autoClose: 8000 });
    }
  };

  const fetchUsers = async (): Promise<void> => {
    const request = await store.dispatch(getUsers({ pageIndex, limit: pageSize, order, orderBy }));
    if (request.meta.requestStatus === 'fulfilled') {
      const userListPiece = request.payload as IUser[];
      setPageIndex((previousPage: number) => previousPage + 1);
      setDisplayedUsers([...displayedUsers, ...userListPiece]);
      if (userListPiece.length < pageSize) {
        setHasMore(false);
      }
    } else {
      toast.error('Hiba a munkatársak betöltésekor!', { autoClose: 8000 });
    }
  };

  const refreshTableAfterDeleteUser = (): void => {
    setDisplayedUsers(displayedUsers.filter((user: IUser) => currentUser?.id !== user.id));
  };

  return (
    <div className="home-container my-4">
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
            {isLoading && !errorAtGetUsers && <div>{isLoading && <Loading loadingText="Munkatársak betöltése..." />}</div>}
            {displayedUsers.length > 0 && (
              <InfiniteScroll
                dataLength={displayedUsers.length}
                next={fetchUsers}
                hasMore={hasMore}
                scrollThreshold={0.9}
                loader={<div>{isLoading && <Loading loadingText="Munkatársak betöltése..." />}</div>}
                children={
                  <table className="table mb-0">
                    <thead className="user-select-none">
                      <tr>
                        <th scope="col" className="d-flex gap-1">
                          <span className="cursor-pointer text-uppercase" onClick={() => onClickColumnName('firstname')}>
                            Név
                          </span>
                          {orderBy === 'firstname' && order === 'asc' && (
                            <span className="material-icons d-flex cursor-pointer" onClick={onClickSorting}>
                              arrow_upward
                            </span>
                          )}
                          {orderBy === 'firstname' && order === 'desc' && (
                            <span className="material-icons d-flex cursor-pointer" onClick={onClickSorting}>
                              arrow_downward
                            </span>
                          )}
                        </th>
                        <th scope="col">
                          <span className="d-flex gap-1">
                            <span className="cursor-pointer text-uppercase" onClick={() => onClickColumnName('createdAt')}>
                              CreatedAt
                            </span>
                            {orderBy === 'createdAt' && order === 'asc' && (
                              <span className="material-icons d-flex cursor-pointer" onClick={onClickSorting}>
                                arrow_upward
                              </span>
                            )}
                            {orderBy === 'createdAt' && order === 'desc' && (
                              <span className="material-icons d-flex cursor-pointer" onClick={onClickSorting}>
                                arrow_downward
                              </span>
                            )}
                          </span>
                        </th>
                        <th scope="col" className="text-uppercase">
                          Törlés
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedUsers.map((user: IUser) => (
                        <tr key={user.id}>
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
                }></InfiniteScroll>
            )}
            {!errorAtGetUsers && !isLoading && !displayedUsers.length && <div>Jelenleg nincsenek munkatársak.</div>}
          </li>
        </ul>
      </div>
      <ConfirmModal isLoading={isLoading} confirmedEvent={confirmedEvent} />
    </div>
  );
};

export default Home;
