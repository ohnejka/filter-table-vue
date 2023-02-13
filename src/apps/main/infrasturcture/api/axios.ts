import axios, { type AxiosResponse, type AxiosStatic } from "axios";

const URI = "http://localhost:8000/";

export class AxiosApi {
  constructor(private client: AxiosStatic, private uri: string) {}

  get = async (): Promise<AxiosResponse> => this.client.get(URI);
}

export default new AxiosApi(axios, URI);
