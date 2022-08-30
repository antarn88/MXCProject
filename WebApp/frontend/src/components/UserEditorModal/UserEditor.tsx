import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';

import { IUser } from '../../interfaces/users/user.interface';
import { IUserEditorModalProps } from '../../interfaces/user-editor-modal/user-editor-modal-props.interface';

const UserEditor = ({ incomingUser, isLoading, updateUserOutputEvent, createUserOutputEvent }: IUserEditorModalProps) => {
  const initialFormData = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    phone: '',
    email: '',
  };

  const [, setUser] = useState<IUser | null>(initialFormData);

  const userSchema = z.object({
    firstname: z.string().min(1, 'A keresztnév kitöltése kötelező'),
    lastname: z.string().min(1, 'A vezetéknév kitöltése kötelező'),
    username: z.string().min(1, 'A felhasználónév kitöltése kötelező'),
    password: z
      .string()
      .min(4, 'Minimum 4 karakter szükséges')
      .regex(
        /^(?=[^a-zíáéüűúöőó]*[a-zíáéüűúöőó])(?=[^A-ZÍÁÉÜŰÚÖŐÓ]*[A-ZÍÁÉÜŰÚÖŐÓ]).{2,}$/,
        'Legalább 1 kisbetűt és 1 nagybetűt tartalmaznia kell'
      ),
    phone: z.string().min(1, 'A telefonszám kitöltése kötelező'),
    email: z.string().min(1, 'Az email kitöltése kötelező').email('Érvénytelen email cím'),
  });

  type FormSchemaType = z.infer<typeof userSchema>;

  const {
    register,
    getValues,
    setValue,
    setFocus,
    reset,
    getFieldState,
    formState: { isValid, errors },
  } = useForm<FormSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(userSchema),
  });

  useEffect((): void => {
    if (incomingUser?.id) {
      setUser(incomingUser);
      setValue('lastname', incomingUser.lastname, { shouldValidate: true });
      setValue('firstname', incomingUser.firstname, { shouldValidate: true });
      setValue('username', incomingUser.username, { shouldValidate: true });
      setValue('password', incomingUser.password, { shouldValidate: true });
      setValue('phone', incomingUser.phone, { shouldValidate: true });
      setValue('email', incomingUser.email, { shouldValidate: true });
    } else {
      reset({ lastname: '', firstname: '', username: '', password: '', phone: '', email: '' });
    }
  }, [incomingUser, reset, setFocus, setValue]);

  const setOutputEvent = () => {
    incomingUser ? updateUserOutputEvent(getValues()) : createUserOutputEvent(getValues());
  };

  return (
    <div className="modal fade" id="userEditorModal" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <form>
            <div className="modal-header">
              <h5 className="modal-title">
                <div className="d-flex align-items-center gap-2 text-uppercase">
                  <span className="material-icons-outlined">contact_page</span>
                  <span>Adatok</span>
                </div>
              </h5>
            </div>
            <div className="modal-body">
              {/* LASTNAME */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control ${getFieldState('lastname').error ? 'is-invalid' : ''}`}
                  {...register('lastname')}
                  id="lastname"
                  placeholder="Vezetéknév *"
                />
                {errors.lastname && <div className="invalid-feedback">{errors.lastname.message}</div>}
                <label htmlFor="lastname">Vezetéknév *</label>
              </div>

              {/* FIRSTNAME */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control ${getFieldState('firstname').error ? 'is-invalid' : ''}`}
                  {...register('firstname')}
                  id="firstname"
                  placeholder="Keresztnév *"
                />
                {errors.firstname && <div className="invalid-feedback">{errors.firstname.message}</div>}
                <label htmlFor="firstname">Keresztnév *</label>
              </div>

              {/* USERNAME */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control ${getFieldState('username').error ? 'is-invalid' : ''}`}
                  {...register('username')}
                  id="username"
                  placeholder="Felhasználónév *"
                />
                {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                <label htmlFor="firstname">Felhasználónév *</label>
              </div>

              {/* PASSWORD */}
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className={`form-control ${getFieldState('password').error ? 'is-invalid' : ''}`}
                  {...register('password')}
                  id="password"
                  placeholder="Jelszó *"
                />
                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                <label htmlFor="password">Jelszó *</label>
              </div>

              {/* PHONE */}
              <div className="form-floating mb-3">
                <input
                  type="tel"
                  className={`form-control ${getFieldState('phone').error ? 'is-invalid' : ''}`}
                  {...register('phone')}
                  id="phone"
                  placeholder="Telefonszám *"
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                <label htmlFor="phone">Telefonszám *</label>
              </div>

              {/* EMAIL */}
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className={`form-control ${getFieldState('email').error ? 'is-invalid' : ''}`}
                  {...register('email')}
                  id="email"
                  placeholder="Email *"
                />
                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                <label htmlFor="email">Email *</label>
              </div>
            </div>
            <div className="modal-footer">
              {/* SAVE AND CANCEL BUTTON */}
              {isLoading ? (
                <>
                  <button type="button" className="btn btn-primary disabled" id="save-button">
                    <span className="spinner-border spinner-border-sm"></span>
                    <span> Mentés...</span>
                  </button>
                  <button type="button" className="btn btn-secondary disabled" id="cancel-save-button" data-bs-dismiss="modal">
                    Mégse
                  </button>
                </>
              ) : (
                <>
                  <button type="button" className="btn btn-primary" id="save-button" disabled={!isValid} onClick={setOutputEvent}>
                    <span>Mentés</span>
                  </button>
                  <button type="button" className="btn btn-secondary" id="cancel-save-button" data-bs-dismiss="modal">
                    Mégse
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEditor;
