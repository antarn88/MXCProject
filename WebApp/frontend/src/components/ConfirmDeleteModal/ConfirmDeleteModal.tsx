import { IConfirmDeleteModalProps } from '../../interfaces/confirm-delete-modal/confirm-delete-modal-props.interface';

const ConfirmDeleteModal = ({ isLoading, deleteUserOutputEvent }: IConfirmDeleteModalProps): JSX.Element => {
  return (
    <div className="modal fade" id="confirmDeleteModal" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Biztosan törli a munkatársat?</h5>
          </div>
          <div className="modal-body">A törlés gombra kattintva a munkatárs kitörlődik a rendszerből!</div>
          {isLoading ? (
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger disabled"
                id="accept-button"
                onClick={() => deleteUserOutputEvent()}>
                <span className="spinner-border spinner-border-sm"></span>
                <span> Törlés...</span>
              </button>
              <button type="button" className="btn btn-secondary disabled" id="cancel-delete-button" data-bs-dismiss="modal">
                Vissza
              </button>
            </div>
          ) : (
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" id="accept-button" onClick={() => deleteUserOutputEvent()}>
                Törlés
              </button>
              <button type="button" className="btn btn-secondary" id="cancel-delete-button" data-bs-dismiss="modal">
                Vissza
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
