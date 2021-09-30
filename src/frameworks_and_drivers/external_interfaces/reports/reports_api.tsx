import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { downloadFileFromResponse } from "../../helpers/files";
import {axios as http} from "../axios"
import { IGetReportsResponse } from "./interfaces/report";

// const BASE_URL = 'https://reports.soportesbd.com/v1'
// const BASE_URL = 'https://dev-stan-reports-qbhu4v5bqq-uc.a.run.app/v1'
const BASE_URL = 'http://localhost:8000/v1'
// const BASE_URL = 'https://de5e-201-244-165-206.ngrok.io/v1'

interface ICreateReportArgs {
    start?: string,
    end?: string,
    export_type: string,
    requester: string,
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

export const createReport = async (args: ICreateReportArgs) => {
    const query = getQueryParams(args);
    const URL=`${BASE_URL}/reports/create-report${query}`;
    console.log('Create Report');
    
    console.log(URL);
    
    const response = await http.get(URL, { responseType: 'blob' });
    return response;
}

export const getReports = async (page: number, pageSize: number = 10) => {
    const URL=`${BASE_URL}/reports/get-report`;
    console.log('Get Report');
    
    console.log(URL);
    const config: AxiosRequestConfig = { 
        params: {
            limit: pageSize,
            skip: pageSize * (page - 1)
        }
    }
    const response = await http.get<IGetReportsResponse>(URL, config);  
    return response;
}

export const downloadReport = async (reportId: string, fileName: string, fileExtension: string = '') => {
    const URL=`${BASE_URL}/reports/download-report/${reportId}`;
    console.log('Download Report');
    
    console.log(URL);
    const response = await http.get(URL, {responseType: 'blob'});
    downloadFileFromResponse(response, fileName, fileExtension)
    return response;
}