import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect } from 'react';

import store, { RootState, useAppSelector } from '../../store/store';
import { login } from '../../store/auth/auth-api';
import { IAuthState } from '../../interfaces/auth/auth-state.interface';

const Login = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
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

  const { accessToken, isLoggedIn, loggedInUser, isLoading, error } = useAppSelector<IAuthState>(
    (state: RootState) => state.auth
  );

  const onLogin = async (event: FormEvent) => {
    event.preventDefault();
    const loginResponse = await store.dispatch(login(watch()));
    if (loginResponse.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  useEffect((): void => {
    if (isLoggedIn && accessToken && loggedInUser) {
      localStorage.setItem('email', loggedInUser.email);
      localStorage.setItem('accessToken', accessToken);
    }
  }, [accessToken, isLoggedIn, loggedInUser]);

  return (
    <div className="login-wrapper mt-5">
      <div className="col-md-6 offset-md-3 form-container">
        <h3 className="text-uppercase d-flex align-items-center mb-3 gap-2 text-primary user-select-none">
          <span className="material-icons-outlined">login</span>
          <span>Bejelentkezés</span>
        </h3>
        <form className="p-4" onSubmit={onLogin}>
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
            <button type="button" className="btn btn-primary w-100 mt-3 disabled">
              <span className="spinner-border spinner-border-sm"></span>
              <span> Bejelentkezés...</span>
            </button>
          ) : (
            <button type="submit" className="btn btn-primary w-100 mt-3" disabled={!isValid}>
              <span>Bejelentkezés</span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
