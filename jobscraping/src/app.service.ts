import {Injectable} from '@nestjs/common';
import {JobSearchResponseDto} from "./dto/jobSearch.response.dto";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

@Injectable()
export class AppService {
    getHello():string{
        return 'Hello World!';
    }
    
    async getVacancies(query):Promise<void>{
        console.log(query);
        console.log(typeof query);
        await this.axiosRequest(query);
    }

    private async axiosRequest(query, url?:string):Promise<void>{

        const config:AxiosRequestConfig = {
            method: 'get',
            url: 'https://jobsearch.az/api-az/vacancies-az?hl=az&q=&posted_date=&seniority=&categories=&industries=&order_by=',
            headers: {
                'x-requested-with': 'XMLHttpRequest',
                'Cookie': 'JOB_SEARCH=eyJpdiI6Inp3emM1a01PVFdSZ0lwYjB2NG9HMlE9PSIsInZhbHVlIjoiMSt1OUJLdkxyekhGcHlPSkRNMENPZXJSQ1puUi96Ym1JOUFlR3h3QzdMSzVCM1NIcVFOSk1hWEp5eGpCNXNxV2tXb01NS2YzN1NKbTZYMG03N1JkR2ZXMGE3WHlOczJ5bXlMcGdHMmwwcVc0RVVLaGJuNkVaRVpKa3MxUmpXVHAiLCJtYWMiOiI5ZjNjMjc2OGJlNjQ4MWRjN2U2MTMxNDhhZWMyMDUyYWY4ZjE1OTUwZjMwNDcyYTY0ZTkyZTMwMDkzOTdiNjYxIn0%3D; XSRF-TOKEN=eyJpdiI6IjdrWWp6VnAybFIrRmE3TFI3alZ3TXc9PSIsInZhbHVlIjoiSFhrZzNJNFlUS3RyUURySllsSmphUC9ya2FDamhBdVh5cTl3R2dxeW1iSzZRK2FJaENNQWlzWXlQRUI5Z2QrTjRIYjRTcmhmckI1Ny9TeTVZRzNhMUdDbWxqU1lvWklCcVhmczZGZU5uVHhlRUxGcW4yM0JXc0dHQU9CNDc5KzQiLCJtYWMiOiIyNGI2YmQ2ZDVlOWFlODExYzc5N2M2ZmRmNGFiYjcxODdkZmNhNWQwZTUzYzNhMmRlNzIyOTgwOWZlNDQzMjk3In0%3D'
            },
            data: query
        };
        if (url !== undefined) {
            // console.log("url bos deyil")
            config.url = url;
            // console.log(config.url);
        }
        await axios(config)
            .then(async (response) => {
                let result:AxiosResponse = response;
                let responseDto:JobSearchResponseDto = response.data;
                // let itemIds:Array<number> = responseDto.items.map((item) => item.id);
                // console.log(itemIds);
                // console.log(config.url);
                // console.log("config++++++++++++++++++++++++++++++++++++++++++++++++++++");
                // console.log(responseDto.next);
                // // config.url = responseDto.next;
                // // console.log(config.url);
                if (responseDto.next) {
                    console.log("next var")
                    await this.axiosRequest(query, responseDto.next);
                }
            })
            .catch((error) => console.log(error));
    }
}
