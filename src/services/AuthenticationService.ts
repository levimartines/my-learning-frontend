import axios, { AxiosRequestConfig } from 'axios';
import jwt_decode from "jwt-decode";

import { API_URL } from '../constants/env-constants';
import { User } from '../models/user';

export const LOGIN_SESSION = 'SESSION';
export const TOKEN = 'token';

class AuthenticationService {

  registerSuccessfulLogin(email: string, token: string) {
    localStorage.setItem(LOGIN_SESSION, email);
    localStorage.setItem(TOKEN, token);
    this.setupAxiosInterceptors();
  }

  login(email: string, password: string) {
    let login = { email, password };
    return axios.post(API_URL + 'login', login);
  }

  signUp(user: User) {
    return axios.post(API_URL + 'users', user);
  }

  isUserLoggedIn() {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      const decoded = jwt_decode(token, { header: true})
      console.log(decoded);
    }
    return token !== null;
  }

  setupAxiosInterceptors() {
    axios.interceptors.request.use((config: AxiosRequestConfig<{ header: any }>) => {
      let token = localStorage.getItem(TOKEN);
      if (this.isUserLoggedIn() && token && config.headers) {
        config.headers.Authorization = token;
      }
      return config;
    });
  }

}

export default new AuthenticationService();