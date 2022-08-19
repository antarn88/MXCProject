import { IConfirmModalProps } from '../../interfaces/confirm-modal/confirm-modal-props.interface';

const ConfirmModal = (props: IConfirmModalProps): JSX.Element => {
  return (
    <div>
      <div className="modal fade" id="confirmModal" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {props.title}
              </h5>
            </div>
            <div className="modal-body">{props.confirmMessage}</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" id="accept-button">
                {props.acceptButtonText}
              </button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                {props.cancelButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
