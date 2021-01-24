import React, { Fragment, useState } from 'react';
import './login-page.scss';
import { Link } from "react-router-dom";
import Spinner from '../slave-components/spinner';
import ApiService, { CreateUserError422 } from '../../services/api-service';
import {
  userResponce,
  userData,
  signInRequestBody,
  loginResponseData,
} from '../../constants/interfaces'


interface props {
  isLogin: boolean,
  apiService: ApiService,
  isLoginCallback: (isLogin: boolean) => void,
}


function LoginPage(props: props) {

  const { isLogin, apiService, isLoginCallback } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (isLoading) {
    return <Spinner></Spinner>
  }


  const onChangesetPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (errorMessage !== '') { setErrorMessage('') }
  }
  const onChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
    if (errorMessage !== '') { setErrorMessage('') }
  }
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (errorMessage !== '') { setErrorMessage('') }
  }


  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('submit', event);
    event.preventDefault();
    console.log('Nickname:', nickname);
    console.log('email:', email);
    console.log('password:', password);
    registrationAndLogin(nickname, email, password, isLogin)
      .then((isSuccess) => {
        console.log('afterregistered', isSuccess)
        setIsLoading(false);
        if (isSuccess) {
          isLoginCallback(true);
        }
      })
      .catch((e) => console.log('afterReg', e))
      .finally(() => {  })
    setPassword('');
    setNickname('');
    setEmail('');
    setIsLoading(true);


  }

  async function registrationAndLogin(userNick: string, userEmail: string, userPassword: string, isTryToLogin: boolean) {
    let isLogged: boolean = false;
    let isServerError: boolean = false;
    let isHasStatistics: boolean = false;
    let isHasSettings: boolean = false;
    try {
      const user: signInRequestBody = {
        email: userEmail,
        password: userPassword,
      }
      let loginResult: loginResponseData;
      if (!isTryToLogin) {
        let registerResult: userResponce;


        const tryUser: userData = {
          name: userNick,
          email: userEmail,
          password: userPassword,
        }
        registerResult = await apiService.createUser(tryUser);
        console.log('Register user. ID', registerResult.id)
      }
      loginResult = await apiService.loginUser(user);
      //TODO: now i need to say app that i was registeres.  or  try to get settings.
      isLogged = true;
      console.log('isLogged true;')
      return (true);
    }
    catch (err) {
      if (err instanceof CreateUserError422) {
        console.log('422 my error', err.myErrField, err.message)
      } else {
        console.log('not my error', err.message);
      }
      if ((!isTryToLogin) && (err.message === '422')) {
        //TODO:
        setErrorMessage('Register: Incorrect e-mail or password');
      } else if ((isTryToLogin) && ((err.message === '403') || (err.message === '404'))) {
        //TODO:
        setErrorMessage('Login: Incorrect e-mail or password');
      } else {
        setErrorMessage(`Server Error: ${err.message}`);
      }
    }
    return false;
  }



  const joinButton = isLogin ?
    <button className="button" type="submit" id="loginRegistered"
    >Войти</button> :
    <button className="button" type="submit" id="loginRegistered"
    >Регистрация</button>;

  const linkToPage = isLogin ?
    <Fragment>
      <span className="asked-text">Новенький тут?
    <Link to='/registration' className='link'> Создать аккаунт</Link>
      </span>
    </Fragment> :
    <Fragment>
      <span className="asked-text">Уже были тут?
        <Link to='/login' className='link'> Войти</Link>
      </span>
    </Fragment>

  const nickName = isLogin ? null :
    <div className="input-group-container">
      <label className="label" htmlFor="inputEmail">Nickname</label>
      <input
        className="input-text" type="text" name="usernick"
        autoComplete="off" id="inputNickname" required={true}
        placeholder="Введите nickname"
        onChange={onChangeNickname}
        value={nickname}
      />
      <div className="email-message-container"></div>
    </div>

  // Component code start
  return (
    <div className="login-page">
      <form className="login-form" id="login_form" onSubmit={onSubmit}>
        <div className="title-container">
          <h3 className="title">Приветствуем в Magic&nbsp;Buttons</h3>
          {linkToPage}
        </div>
        <div className="input-group-container">
          <label className="label" htmlFor="inputEmail">Email</label>
          <input
            className="input-email" type="email" name="username"
            autoComplete="off" id="inputEmail" required={true}
            placeholder="Введите email"
            onChange={onChangeEmail}
            value={email}
          />
          <div className="email-message-container"></div>
        </div>
        {nickName}
        <div className="input-group-container">
          <label className="label" htmlFor="inputPassword">Password</label>
          <input
            className="input-password" type="password" name="password"
            autoComplete="off" id="inputPassword" required={true}
            placeholder="Введите пароль"
            // pattern="/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/"
            pattern="^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$"
            title="8+ символов, [a-z],[A-Z],[0-9],[!@#$%^&*]"
            onChange={onChangesetPassword}
            value={password}
          />
          <div className="email-message-container"></div>
        </div>
        <div className="input-group-container">
          {joinButton}
        </div>
        <div className="input-group-container">
          <div className="email-message-container">
            {errorMessage}
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
