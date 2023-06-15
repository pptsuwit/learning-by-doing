import type { AxiosResponse } from "axios";
import { Response } from "interfaces/utils.interface";
import httpService from "plugins/axios";

class Services {
  public create(data: any): Promise<AxiosResponse<Response>> {
    const formData = new FormData();
    formData.append("jobPositionID", data.jobPositionID);
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);
    formData.append("tel", data.tel);
    data.files.map((file: any) => {
      formData.append("documentFiles[]", file.fileItem);
    });
    return httpService.post<Response>(`pub/job-application`, formData);
  }
}

export const jobAppicationService = new Services();
