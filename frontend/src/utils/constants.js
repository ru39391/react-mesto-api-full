import iconError from '../images/icons/icon-error.svg';
import iconSuccess from '../images/icons/icon-success.svg';

export const apiUrl = 'http://localhost:4000';
//authUrl: 'https://api.ru39391.students.nomoredomains.icu/users',

export const signupConfig = {
  endPoint: 'signup',
  errorAlert: 'Ошибка при регистрации пользователя'
}

export const signinConfig = {
  endPoint: 'signin',
  errorAlert: 'Неверный логин или пароль'
}

export const tooltipConfig = {
  success: {
    className: 'success',
    title: 'Вы успешно зарегистрировались!',
    icon: iconSuccess,
  },
  error: {
    className: 'error',
    title: 'Что-то пошло не так! Попробуйте ещё раз.',
    icon: iconError,
  }
}