import type { AxiosResponse } from "axios";
import { Response } from "interfaces/utils.interface";
import httpService from "plugins/axios";

class Services {
  public get(data: any): Promise<AxiosResponse<Response>> {
    return httpService.get<Response>(`pub/activities?page=${data.page}&pageSize=${data.pageSize}`);
  }
  public getHome(): Promise<AxiosResponse<Response>> {
    return httpService.get<Response>(`pub/activities?page=1&pageSize=2`);
  }
}

export const activityService = new Services();
