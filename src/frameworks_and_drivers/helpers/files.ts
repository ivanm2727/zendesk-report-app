import { AxiosResponse } from "axios";
import { axios as http } from "../external_interfaces/axios";

export const downloadFileFromResponse = (response: AxiosResponse, fileName: string, exportType: string = '') => {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `obj-sap-${fileName}.${exportType}`);
  document.body.appendChild(link);
  link.click();
}