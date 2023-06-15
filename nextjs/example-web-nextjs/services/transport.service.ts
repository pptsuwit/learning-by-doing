import type { AxiosResponse } from "axios";
import { Response } from "interfaces/utils.interface";
import httpService from "plugins/axios";

class Services {
  public getById(data: any): Promise<AxiosResponse<Response>> {
    return httpService.get<Response>(`pub/transportation/${data.id}`);
  }
  public get(): Promise<AxiosResponse<Response>> {
    return httpService.get<Response>(`pub/transportations?page=1&pageSize=6`);
  }
  public getHome(): Promise<AxiosResponse<Response>> {
    return httpService.get<Response>(`pub/transportations?page=1&pageSize=1`);
  }
}

export const transportService = new Services();
