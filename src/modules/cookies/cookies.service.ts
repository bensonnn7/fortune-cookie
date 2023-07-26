import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class CookiesService {
  constructor(private readonly axiosService: HttpService) {}

  async getRandCookie(): Promise<any> {
    // http://yerkee.com/api
    // https://stackoverflow.com/questions/52859515/nestjs-using-axios
    const response = await this.axiosService
      .get('http://yerkee.com/api/fortune')
      .toPromise();
    // console.log('response: ', response.data);
    return response.data;
  }
}
