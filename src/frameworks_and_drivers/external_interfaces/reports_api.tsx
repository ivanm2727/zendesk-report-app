import { AxiosResponse } from "axios";
import {axios as http} from "./axios"

const BASE_URL = 'https://dev-stan-reports-qbhu4v5bqq-uc.a.run.app/v1'

interface IGetReportArgs {
    start?: string,
    end?: string,
    export_type: string,
    group: string
}


const getQueryParams = (args: any) => {
    let query = '?';
    for (const key in args) {
        const value = args[key];
        if (value) {
            const currentQuery = `${key}=${value}`
            query += currentQuery + '&';
        }
    }
    return query;
}

const downloadFileFromResponse = (response: AxiosResponse, exportType: string) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
   const link = document.createElement('a');
   link.href = url;
   link.setAttribute('download', `file.${exportType}`); //or any other extension
   document.body.appendChild(link);
   link.click();
}

export const getReport = async (args: IGetReportArgs) => {
    const query = getQueryParams(args);
    const URL=`${BASE_URL}/reports/get-report${query}`;
    const response = await http.get(URL, { responseType: 'blob' });
    downloadFileFromResponse(response, args.export_type)
    return response;
}