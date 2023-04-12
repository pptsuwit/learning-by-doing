import type { AxiosResponse } from "axios";
import { Response } from "interfaces/utils.interface";
import httpService from "plugins/axios";

class Services {
  public get(): Promise<AxiosResponse<Response>> {
    return httpService.get<Response>(`pub/user/service-conditions`);
  }
}

export const userConditionService = new Services();
