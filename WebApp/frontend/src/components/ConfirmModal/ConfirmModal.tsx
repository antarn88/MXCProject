import { IConfirmModalProps } from '../../interfaces/confirm-modal/confirm-modal-props.interface';

const ConfirmModal = (props: IConfirmModalProps): JSX.Element => {
  return (
    <div>
      <div className="modal" id="confirmModal" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Biztosan törli a munkatársat?</h5>
            </div>
            <div className="modal-body">A törlés gombra kattintva a munkatárs kitörlődik a rendszerből!</div>
            {props.isLoading ? (
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger disabled"
                  id="accept-button"
                  onClick={() => props.confirmedEvent()}>
                  <span className="spinner-border spinner-border-sm"></span>
                  <span> Törlés...</span>
                </button>
                <button type="button" className="btn btn-secondary disabled" id="cancel-button" data-bs-dismiss="modal">
                  Vissza
                </button>
              </div>
            ) : (
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" id="accept-button" onClick={() => props.confirmedEvent()}>
                  Törlés
                </button>
                <button type="button" className="btn btn-secondary" id="cancel-button" data-bs-dismiss="modal">
                  Vissza
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
