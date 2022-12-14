import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'react-toastify/dist/ReactToastify.css';

import { IUser } from '../../interfaces/users/user.interface';
import store, { RootState, useAppSelector } from '../../store/store';
import { getUsers, deleteUser, updateUser, createUser } from '../../store/users/users-api';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal/ConfirmDeleteModal';
import Loading from '../../components/Loading/Loading';
import { OrderOption } from '../../enums/order-option.enum';
import { OrderByOption } from '../../enums/order-by-option.enum';
import UserEditorModal from '../../components/UserEditorModal/UserEditorModal';
import { IUserEditorModalImperativeHandleProps } from '../../interfaces/user-editor-modal/user-editor-modal-imperative-handle-props.interface';
import { IConfirmDeleteModalImperativeHandleProps } from '../../interfaces/confirm-delete-modal/confirm-delete-modal-imperative-handle-props.interface';
import './Home.scss';

const Home = () => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [orderBy, setOrderBy] = useState<OrderByOption>(OrderByOption.FIRSTNAME);
  const [order, setOrder] = useState<OrderOption>(OrderOption.ASC);
  const [displayedUsers, setDisplayedUsers] = useState<IUser[]>([]);

  const { users, isLoading, error } = useAppSelector((state: RootState) => state.users);
  const { errorAtGetUsers } = error;

  const userEditorModalRef = useRef<IUserEditorModalImperativeHandleProps>(null);
  const confirmDeleteModalRef = useRef<IConfirmDeleteModalImperativeHandleProps>(null);

  const pageSize = process.env.REACT_APP_HOME_PAGE_SIZE ? parseInt(process.env.REACT_APP_HOME_PAGE_SIZE) : 25;

  const onClickColumnName = (columnName: OrderByOption): void => {
    if (orderBy !== columnName) {
      setOrderBy(columnName);
      setPageIndex(0);
    }
  };

  const onClickSorting = (): void => {
    setPageIndex(0);
    setOrder(order === OrderOption.ASC ? OrderOption.DESC : OrderOption.ASC);
  };

  const fetchUsers = async (): Promise<void> => {
    if (pageIndex !== 0) {
      const request = await store.dispatch(getUsers({ pageIndex, limit: pageSize, order, orderBy }));
      if (request.meta.requestStatus === 'fulfilled') {
        const userListPiece = request.payload as IUser[];
        setPageIndex((previousPage: number) => previousPage + 1);
        setDisplayedUsers([...displayedUsers, ...userListPiece]);
        if (userListPiece.length < pageSize) {
          setHasMore(false);
        }
      } else {
        toast.error('Hiba a munkat??rsak bet??lt??sekor!');
      }
    }
  };

  const onDeleteUser = async (): Promise<void> => {
    if (currentUser?.id) {
      if ((await store.dispatch(deleteUser(currentUser.id))).meta.requestStatus === 'fulfilled') {
        confirmDeleteModalRef.current?.afterSubmit();
        toast.success('Sikeresen t??r??lte a munkat??rsat.');
        setDisplayedUsers(displayedUsers.filter((user: IUser) => currentUser?.id !== user.id));
      } else {
        confirmDeleteModalRef.current?.afterSubmit();
        toast.error('Hiba a munkat??rs t??rl??sekor!');
      }
    }
  };

  const onUpdateUser = async (user: IUser): Promise<void> => {
    if (user) {
      if ((await store.dispatch(updateUser(user))).meta.requestStatus === 'fulfilled') {
        userEditorModalRef.current?.afterSubmit();
        toast.success('Sikeresen friss??tette a munkat??rsat.');
        setDisplayedUsers(displayedUsers.map((displayedUser: IUser) => (displayedUser.id === user.id ? user : displayedUser)));
      } else {
        toast.error('Hiba a munkat??rs ment??sekor!');
      }
    }
  };

  const onCreateUser = async (user: IUser): Promise<void> => {
    if (user) {
      const response = await store.dispatch(createUser(user));
      if (response.meta.requestStatus === 'fulfilled') {
        userEditorModalRef.current?.afterSubmit();
        toast.success('Sikeresen l??trehozta a munkat??rsat.');
        setDisplayedUsers([{ ...response.payload }, ...displayedUsers]);
      } else {
        toast.error('Hiba a munkat??rs l??trehoz??sakor!');
      }
    }
  };

  const reloadTableAfterSorting = useCallback(async (): Promise<void> => {
    setDisplayedUsers([]);
    const request = await store.dispatch(getUsers({ orderBy, order, pageIndex: 0, limit: pageSize }));
    if (request.meta.requestStatus === 'fulfilled') {
      const userListPiece = request.payload as IUser[];
      setDisplayedUsers(userListPiece);
      if (userListPiece.length === pageSize) {
        setHasMore(true);
      }
      setPageIndex((previousValue: number) => previousValue + 1);
    } else {
      toast.error('Hiba a munkat??rsak bet??lt??sekor!');
    }
  }, [order, orderBy, pageSize]);

  useEffect((): void => {
    reloadTableAfterSorting();
  }, [reloadTableAfterSorting]);

  return (
    <div className="home-container my-4">
      {/* USER EDITOR MODAL */}
      <UserEditorModal
        ref={userEditorModalRef}
        incomingUser={currentUser}
        isLoading={isLoading}
        updateUserOutputEvent={onUpdateUser}
        createUserOutputEvent={onCreateUser}
      />

      {/* CONFIRM DELETE MODAL */}
      <ConfirmDeleteModal ref={confirmDeleteModalRef} isLoading={isLoading} deleteUserOutputEvent={onDeleteUser} />

      <div className="card">
        <h4 className="card-header text-uppercase p-3">
          {/* TABLE CARD HEADER */}
          <div className="d-flex justify-content-between user-select-none top-bar">
            <div className="d-flex align-items-center gap-2">
              <span className="material-icons-outlined">person</span>
              <span className="mr-5"> Munkat??rsak</span>
            </div>
            <button
              className="btn btn-primary d-flex gap-2 text-uppercase"
              data-bs-toggle="modal"
              data-bs-target="#userEditorModal"
              data-backdrop="static"
              data-keyboard="false"
              onClick={() => setCurrentUser(null)}>
              <span className="material-icons-outlined">add</span>
              <span> ??j munkat??rs felv??tele</span>
            </button>
          </div>
        </h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {/* LOADING */}
            {isLoading && !displayedUsers.length && !errorAtGetUsers && (
              <div>
                <Loading loadingText="Munkat??rsak bet??lt??se..." />
              </div>
            )}

            {/* EMPTY CALLOUT */}
            {!isLoading && !errorAtGetUsers && !users.length && <div>Jelenleg nincsenek munkat??rsak.</div>}

            {/* TABLE */}
            {displayedUsers.length > 0 && (
              <InfiniteScroll
                dataLength={displayedUsers.length}
                next={fetchUsers}
                hasMore={hasMore}
                scrollThreshold={0.9}
                loader={<div>{isLoading && <Loading loadingText="Munkat??rsak bet??lt??se..." />}</div>}
                children={
                  <table className="table table-hover mb-0">
                    <thead className="user-select-none">
                      <tr>
                        <th scope="col" className="d-flex gap-1">
                          <span
                            className="cursor-pointer text-uppercase"
                            onClick={() => onClickColumnName(OrderByOption.FIRSTNAME)}>
                            N??v
                          </span>
                          {orderBy === OrderByOption.FIRSTNAME && order === OrderOption.ASC && (
                            <span className="material-icons d-flex cursor-pointer" onClick={onClickSorting}>
                              arrow_upward
                            </span>
                          )}
                          {orderBy === OrderByOption.FIRSTNAME && order === OrderOption.DESC && (
                            <span className="material-icons d-flex cursor-pointer" onClick={onClickSorting}>
                              arrow_downward
                            </span>
                          )}
                        </th>
                        <th scope="col">
                          <span className="d-flex gap-1">
                            <span
                              className="cursor-pointer text-uppercase"
                              onClick={() => onClickColumnName(OrderByOption.CREATED_AT)}>
                              CreatedAt
                            </span>
                            {orderBy === OrderByOption.CREATED_AT && order === OrderOption.ASC && (
                              <span className="material-icons d-flex cursor-pointer" onClick={onClickSorting}>
                                arrow_upward
                              </span>
                            )}
                            {orderBy === OrderByOption.CREATED_AT && order === OrderOption.DESC && (
                              <span className="material-icons d-flex cursor-pointer" onClick={onClickSorting}>
                                arrow_downward
                              </span>
                            )}
                          </span>
                        </th>
                        <th scope="col" className="text-uppercase">
                          T??rl??s
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedUsers.map((user: IUser, index: number) => (
                        <tr key={index}>
                          <td>
                            <span
                              data-bs-toggle="modal"
                              data-bs-target="#userEditorModal"
                              data-backdrop="static"
                              data-keyboard="false"
                              className="cursor-pointer"
                              onClick={() => setCurrentUser(user)}>
                              {user.firstname} {user.lastname}
                            </span>
                          </td>
                          <td>{new Date(user.createdAt!).toLocaleDateString()}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#confirmDeleteModal"
                              data-backdrop="static"
                              data-keyboard="false"
                              onClick={() => setCurrentUser(user)}>
                              T??rl??s
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                }></InfiniteScroll>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
