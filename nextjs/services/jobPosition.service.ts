import type { AxiosResponse } from "axios";
import { Response } from "interfaces/utils.interface";
import httpService from "plugins/axios";

class Services {
  public getById(data: any): Promise<AxiosResponse<Response>> {
    return httpService.get<Response>(`pub/job-position/${data.id}`);
  }
  public search(data: any): Promise<AxiosResponse<Response>> {
    return httpService.post<Response>(`pub/job-position/search?page=${data.page}&pageSize=${data.pageSize}`, {
      keyword: data.keyword,
    });
  }
}

export const jobPositionService = new Services();
