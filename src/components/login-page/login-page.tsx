import React, { Fragment, useState } from 'react';
import './login-page.scss';
import { Link } from 'react-router-dom';
import Spinner from '../slave-components/spinner';
import ApiService from '../../services/api-service';
import {
  userData,
  signInRequestBody,
} from '../../constants/interfaces';

const secretHash: string = 'mb_MB_18_77_ReTTeR_77_81_BM_bm';

interface Ilanguages {
  title: string,
  email: string,
  nick: string,
  enterEmail: string,
  password: string,
  confirm: string,
  enterPassword: string,
  confirmPassword: string,
  enterNick: string,
  errEmailMessage: string,
  errPassMessage: string,
  titlePassMessage: string,
  loginError: string,
  registerError: string,
  confirmError: string,
  serverError: string,
  isNewbie: string,
  createAcc: string,
  beenHere: string,
  toLogin: string,
  login: string,
  register: string,
  escape: string,
}

const EN: Ilanguages = {
  title: 'Welcome to',
  email: 'Email',
  password: 'Password',
  confirm: 'Confirm Password',
  nick: 'Nickname',
  enterEmail: 'Enter your email',
  enterPassword: 'Enter password',
  confirmPassword: 'Confirm password',
  enterNick: 'Enter Nickname',
  errEmailMessage: 'Incorrect input',
  errPassMessage: 'The password must contain: 8+ characters, [a-z],[A-Z],[0-9],[!@#$%^&*]',
  titlePassMessage: '8+ characters, [a-z],[A-Z],[0-9],[!@#$%^&*]',
  loginError: 'Login: Incorrect e-mail or password',
  registerError: 'Register: Incorrect e-mail or password',
  confirmError: 'Register: Passwords do not match',
  serverError: 'Server Error:',
  isNewbie: 'New here?',
  createAcc: 'Create an account',
  beenHere: 'Have you already been here?',
  toLogin: 'Sign In',
  login: 'Login',
  register: 'Register',
  escape: 'Home page',
};

const RU: Ilanguages = {
  title: 'Приветствуем в',
  email: 'Электронная почта',
  password: 'Пароль',
  confirm: 'Повторите пароль',
  nick: 'Ник',
  enterEmail: 'Введите вашу электронную почту',
  enterPassword: 'Введите пароль',
  confirmPassword: 'Повторите пароль',
  enterNick: 'Введите ник',
  errEmailMessage: 'Некорректный ввод',
  errPassMessage: 'Пароль должен содержать: 8+ символов, [a-z],[A-Z],[0-9],[!@#$%^&*]',
  titlePassMessage: '8+ символов, [a-z],[A-Z],[0-9],[!@#$%^&*]',
  loginError: 'Вход:  Неверный email или пароль',
  registerError: 'Регистрация:  Недопустимый email или пароль',
  confirmError: 'Регистрация: Пароли не совпадают',
  serverError: 'Ошибка сервера:',
  isNewbie: 'Новенький тут?',
  createAcc: 'Создать аккаунт',
  beenHere: 'Уже были тут?',
  toLogin: 'Войти',
  login: 'Войти',
  register: 'Регистрация',
  escape: 'На главную',
};
// pattern="/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/"
// const passwordPatern = '^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$';
const passwordPatern = '^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$';

interface ILoginPageProps {
  isLogin: boolean,
  apiService: ApiService,
  // eslint-disable-next-line no-unused-vars
  isLoginCallback: (isLogin: boolean) => void,
  isLanguageRU: boolean,
}

const LoginPage: React.FC<ILoginPageProps> = (props: ILoginPageProps) => {
  const {
    isLogin,
    apiService,
    isLoginCallback,
    isLanguageRU,
  } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (isLoading) {
    return <Spinner />;
  }

  const lang = isLanguageRU ? RU : EN;

  const onChangesetPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (errorMessage !== '') { setErrorMessage(''); }
  };
  const onChangeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    if (errorMessage !== '') { setErrorMessage(''); }
  };
  const onChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
    if (errorMessage !== '') { setErrorMessage(''); }
  };
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (errorMessage !== '') { setErrorMessage(''); }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setErrorMessage(lang.confirmError);
      return;
    }
    registrationAndLogin(nickname, `${secretHash}${email}`, password, isLogin)
      .then((isSuccess) => {
        if (isSuccess) {
          setPassword('');
          setConfirmPassword('');
          setNickname('');
          setEmail('');
          isLoginCallback(true);
        }
      })
      .catch(() => true)
      .finally(() => {
        setIsLoading(false);
      });
    setIsLoading(true);
  };

  async function registrationAndLogin(userNick: string, userEmail: string, userPassword: string, isTryToLogin: boolean) {
    try {
      const user: signInRequestBody = {
        email: userEmail,
        password: userPassword,
      };
      if (!isTryToLogin) {
        const tryUser: userData = {
          name: userNick,
          email: userEmail,
          password: userPassword,
        };
        await apiService.createUser(tryUser);
      }
      await apiService.loginUser(user);
      return (true);
    } catch (err) {
      if ((!isTryToLogin) && (err.message === '422')) {
        setErrorMessage(lang.registerError);
      } else if ((isTryToLogin) && ((err.message === '403') || (err.message === '404'))) {
        setErrorMessage(lang.loginError);
      } else {
        setErrorMessage(`${lang.serverError} ${err.message}`);
      }
    }
    return false;
  }

  const joinButton = isLogin ? (
    <button className="button" type="submit" id="loginRegistered">
      {lang.login}
    </button>
  ) :
    (
      <button className="button" type="submit" id="loginRegistered">
        {lang.register}
      </button>
    );

  const linkToPage = isLogin ?
    (
      <Fragment>
        <span className="asked-text">
          {lang.isNewbie}
          {' '}
          <Link to="/registration" className="link">
            {lang.createAcc}
          </Link>
        </span>
      </Fragment>
    ) :
    (
      <Fragment>
        <span className="asked-text">
          {lang.beenHere}
          {' '}
          <Link to="/login" className="link">
            {lang.toLogin}
          </Link>
        </span>
      </Fragment>
    );

  const nickName = isLogin ? null : (
    <div className="input-group-container">
      <label className="label" htmlFor="inputEmail">
        {lang.nick}
      </label>
      <input
        className="input-text" type="text" name="usernick"
        autoComplete="off" id="inputNickname" required
        maxLength={21}
        placeholder={lang.enterNick}
        onChange={onChangeNickname}
        value={nickname}
      />
      <div className="email-message-container" />
    </div>
  );

  const confirmPass = isLogin ? null : (
    <div className="input-group-container">
      <label className="label" htmlFor="confirmPassword">
        {lang.confirm}
      </label>
      <input
        className="input-password" type="password" name="confirmPassword"
        autoComplete="off" id="confirmPassword" required
        placeholder={lang.confirmPassword}
        onChange={onChangeConfirmPassword}
        value={confirmPassword}
      />
      <div className="email-message-container" />
    </div>
  );
  const loginPageClassName = isLogin ? 'login-page' : 'register login-page';
  // Component code start
  return (
    <div className={loginPageClassName}>
      <form className="login-form" id="login_form" onSubmit={onSubmit}>
        <div className="title-container">
          <h3 className="title">
            {lang.title}
            {' Magic'}
            &nbsp;Buttons
          </h3>
          {linkToPage}
        </div>
        <div className="input-group-container">
          <label className="label" htmlFor="inputEmail">{lang.email}</label>
          <input
            className="input-email"
            type="email"
            name="username"
            autoComplete="off"
            id="inputEmail"
            required
            placeholder={lang.enterEmail}
            onChange={onChangeEmail}
            // onInvalid="this.setCustomValidity('Lütfen işaretli yerleri doldurunuz')"
            value={email}
          />
          <div className="email-message-container" />
        </div>
        {nickName}
        <div className="input-group-container">
          <label className="label" htmlFor="inputPassword">{lang.password}</label>
          <input
            className="input-password" type="password" name="password"
            autoComplete="off" id="inputPassword" required
            placeholder={lang.enterPassword}
            pattern={passwordPatern}
            title={lang.titlePassMessage}
            onChange={onChangesetPassword}
            value={password}
          />
          <div className="email-message-container" />
        </div>
        {confirmPass}
        <div className="input-group-container buttons-container">
          {joinButton}
          <Link to="/" className="button button-quit">{lang.escape}</Link>
        </div>
        <div className="input-group-container">
          <div className="email-message-container">
            {errorMessage}
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
