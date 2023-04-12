import type { AxiosResponse } from "axios";
// import { Response } from "interfaces/utils/utils.interface";
import httpService from "plugins/axios";

class Services {
  public get(): Promise<AxiosResponse<Response>> {
    return httpService.get<Response>(`admin/about-us`);
  }
  //   public update(data: any): Promise<AxiosResponse<Response>> {
  //     const formData = new FormData();
  //     formData.append("aboutUsFile", data.file);
  //     formData.append("titleTh", data.titleTh);
  //     formData.append("titleEn", data.titleEn);
  //     formData.append("detailTh", data.detailTh);
  //     formData.append("detailEn", data.detailEn);
  //     return httpService.put<Response>(`pub/contact`, formData);
  //   }
  //   public updateActive(data: any): Promise<AxiosResponse<Response>> {
  //     return httpService.patch<Response>(`pub/contact/active `, {
  //       isActive: data.isActive,
  //     });
  //   }
}

export const homeService = new Services();
