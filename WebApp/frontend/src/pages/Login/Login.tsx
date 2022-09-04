import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import store from '../../store/store';
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

  const onLogin = async (): Promise<void> => {
    const loginResponse = await store.dispatch(login(watch()));
    if (loginResponse.meta.requestStatus === 'fulfilled') {
      navigate('/');
    } else {
      toast.error('Hibás felhasználónév vagy jelszó!', { autoClose: 8000 });
    }
  };

  return (
    <div className="login-wrapper">
      <div className="col-4 offset-4 mt-5 form-container">
        <form>
          <div className="form-floating mb-3">
            <input
              type="text"
              id="username"
              className={`form-control ${getFieldState('username').error ? 'is-invalid' : ''}`}
              {...register('username')}
              placeholder="Felhasználónév *"
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
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            <label htmlFor="username">Jelszó *</label>
          </div>
          <button type="button" className="btn btn-primary w-100 mt-4" disabled={!isValid} onClick={onLogin}>
            Bejelentkezés
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
