import axios, { AxiosRequestConfig } from 'axios';
import jwt_decode from 'jwt-decode';

import { API_URL } from '../constants/env-constants';
import { User } from '../models/user';

export const LOGIN_SESSION = 'SESSION';
export const TOKEN = 'token';

interface IToken {
  exp: number;
  sub: string;
}

class AuthenticationService {
  registerSuccessfulLogin(email: string, token: string) {
    if (email && token) {
      localStorage.setItem(LOGIN_SESSION, email);
      localStorage.setItem(TOKEN, token);
      this.setupAxiosInterceptors();
    } else {
      throw new Error('Invalid email or token');
    }
  }

  login(email: string, password: string) {
    const login = { email, password };
    return axios.post(`${API_URL}login`, login);
  }

  signUp(user: User) {
    return axios.post(`${API_URL}users`, user);
  }

  isUserLoggedIn() {
    const bearerToken = localStorage.getItem(TOKEN);
    if (bearerToken) {
      const token = bearerToken.substring(7);
      const decoded: IToken = jwt_decode(token);
      const currentTimeInSeconds = new Date().getTime() / 1000;
      return decoded.exp > currentTimeInSeconds;
    }
    return false;
  }

  setupAxiosInterceptors() {
    axios.interceptors.request.use((config: AxiosRequestConfig<{ header: any }>) => {
      const token = localStorage.getItem(TOKEN);
      if (this.isUserLoggedIn() && token && config.headers) {
        config.headers.Authorization = token;
      }
      return config;
    });
  }

  deleteTokens() {
    localStorage.clear();
  }
}

export default new AuthenticationService();
