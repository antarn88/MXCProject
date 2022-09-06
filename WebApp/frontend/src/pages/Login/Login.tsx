import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

import store, { RootState, useAppSelector } from '../../store/store';
import { login } from '../../store/auth/auth-api';

const Login = () => {
  const navigate = useNavigate();
  const loginSchema = z.object({
    username: z.string().min(1, 'A felhasználónév kitöltése kötelező'),
    password: z.string().min(1, 'A jelszó kitöltése kötelező'),
  });

  type FormSchemaType = z.infer<typeof loginSchema>;

  const {
    register,
    getFieldState,
    watch,
    formState: { isValid, errors },
  } = useForm<FormSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const { isLoading, error } = useAppSelector((state: RootState) => state.auth);

  const onLogin = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();
    const loginResponse = await store.dispatch(login(watch()));
    if (loginResponse.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  return (
    <div className="login-wrapper mt-5">
      <div className="col-md-6 offset-md-3 form-container">
        <h3 className="text-uppercase d-flex align-items-center mb-3 gap-2 text-primary user-select-none">
          <span className="material-icons-outlined">login</span>
          <span>Bejelentkezés</span>
        </h3>
        <form className="p-4">
          {error && (
            <div className="mb-3 alert alert-danger" role="alert">
              Hibás felhasználónév vagy jelszó!
            </div>
          )}

          <div className="form-floating mb-3">
            <input
              type="text"
              id="username"
              className={`form-control ${getFieldState('username').error ? 'is-invalid' : ''}`}
              {...register('username')}
              placeholder="Felhasználónév *"
              disabled={isLoading}
              autoFocus
            />
            {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
            <label htmlFor="username">Felhasználónév *</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              id="password"
              className={`form-control ${getFieldState('password').error ? 'is-invalid' : ''}`}
              {...register('password')}
              placeholder="Jelszó *"
              disabled={isLoading}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            <label htmlFor="username">Jelszó *</label>
          </div>

          {isLoading ? (
            <button type="button" className="btn btn-primary w-100 mt-3 disabled" onClick={onLogin}>
              <span className="spinner-border spinner-border-sm"></span>
              <span> Bejelentkezés...</span>
            </button>
          ) : (
            <button type="submit" className="btn btn-primary w-100 mt-3" disabled={!isValid} onClick={onLogin}>
              <span>Bejelentkezés</span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
