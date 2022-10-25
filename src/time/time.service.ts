import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ZonePayload, IpPayload, TimeDto } from 'src/interfaces/time';
import { map, Observable } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Out_request,
  Out_requestDocument,
} from './schemas/out_requests.schema';

@Injectable()
export class TimeService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Out_request.name)
    private out_requestModel: Model<Out_requestDocument>,
  ) {}
  getByZone(
    payload: ZonePayload,
  ): Observable<AxiosResponse<TimeDto | string[] | string>> {
    const path = '' + payload.path + (payload.isText ? '.txt' : '');
    return this.httpService
      .get('https://worldtimeapi.org/api/timezone' + path)
      .pipe(map((response) => response.data));
  }
  getByIp(payload: IpPayload): Observable<AxiosResponse<TimeDto | string>> {
    const path = '' + payload.ip + (payload.isText ? '.txt' : '');
    return this.httpService
      .get('https://worldtimeapi.org/api/timezone' + path)
      .pipe(map((response) => response.data));
  }
  async saveRequest(
    payload: IpPayload | ZonePayload,
    version: string,
    id: string | number,
    method: string,
  ) {
    const newOut_req = new this.out_requestModel({
      payload,
      version,
      id,
      method,
    });
    await newOut_req.save();
  }
}
