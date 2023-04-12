import type { AxiosResponse } from "axios";
import { Response } from "interfaces/utils.interface";
import httpService from "plugins/axios";

class Services {
  public getById(data: any): Promise<AxiosResponse<Response>> {
    return httpService.get<Response>(`pub/sdg/${data.id}`);
  }
  public get(): Promise<AxiosResponse<Response>> {
    return httpService.get<Response>(`pub/sdgs?page=1&pageSize=6`);
  }
  public getHome(): Promise<AxiosResponse<Response>> {
    return httpService.get<Response>(`pub/sdgs?page=1&pageSize=4`);
  }
}

export const sdgsService = new Services();
