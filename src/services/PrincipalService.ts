import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../constants/env-constants';
import { User } from '../models/user';

class PrincipalService {
  PRINCIPAL_URL = `${API_URL}/principal`;

  me(): Promise<AxiosResponse<User>> {
    return axios.get(this.PRINCIPAL_URL + '/me');
  }

  setMFA(useMFA: boolean): Promise<AxiosResponse<User>> {
    const config = { params: { useMFA } };
    return axios.put(this.PRINCIPAL_URL + '/mfa', null, config);
  }

  getQrUrl(): Promise<AxiosResponse<string>> {
    return axios.get(this.PRINCIPAL_URL + '/generate-qr-url');
  }

  getProfilePicture(): Promise<AxiosResponse<string>> {
    return axios.get(this.PRINCIPAL_URL + '/picture');
  }

  uploadPicture(file: File): Promise<AxiosResponse<string>> {
    const formData = new FormData();
    formData.append('file', file);
    const config = { headers: { 'content-type': 'multipart/form-data' } };
    return axios.post(this.PRINCIPAL_URL + '/picture', formData, config);
  }
}

export default new PrincipalService();
