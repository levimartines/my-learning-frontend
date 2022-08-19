import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../constants/env-constants';
import { User } from '../models/user';

class PrincipalService {
  PRINCIPAL_URL = `${API_URL}/principal`;

  me(): Promise<AxiosResponse<User>> {
    return axios.get(this.PRINCIPAL_URL + '/me');
  }

  setMFA(useMFA: boolean): Promise<AxiosResponse<User>> {
    return axios.put(this.PRINCIPAL_URL + '/mfa', null, { params: { useMFA } });
  }

  getQrUrl(): Promise<AxiosResponse<string>> {
    return axios.get(this.PRINCIPAL_URL + '/generate-qr-url');
  }
}

export default new PrincipalService();
