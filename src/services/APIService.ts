import axios, { AxiosInstance } from 'axios';

interface ApiResponse {
  //DEPOIS REMOVA ISSO
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  status: number;
  statusText: string;
}

class APIService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.giphy.com', // URL base da API
    });
  }

  async get(query: string): Promise<ApiResponse> {
    try {
      const response = await this.axiosInstance.get(query);
      return response;
    } catch (error) {
      console.error(error);
      return { data: null, status: 500, statusText: 'Erro ao carregar dados' };
    }
  }
}

export default APIService;
