import { API_URL } from '../constants/env-constants';
import axios, { AxiosResponse } from 'axios';
import { Task } from '../models/task';

class TaskService {

  TASK_URL = API_URL + 'tasks';

  findAll(): Promise<AxiosResponse<Task[]>> {
    return axios.get(this.TASK_URL);
  }

  save(task: Task): Promise<AxiosResponse<Task>> {
    return axios.post(this.TASK_URL, task);
  }

  markAsDone(id: number) {
    return axios.put(this.TASK_URL + `/done/${id}`);
  }

  delete(id: number) {
    return axios.delete(this.TASK_URL + `/${id}`);
  }
}

export default new TaskService();