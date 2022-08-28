import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../constants/env-constants';

class UserService {
  private USERS_URL = `${API_URL}/users`;

  confirmRegistration(code: string): Promise<AxiosResponse<null>> {
    const url = this.USERS_URL + '/confirm-registration';
    const config = { params: { code } };
    return axios.put(url, null, config);
  }

}

export default new UserService();
