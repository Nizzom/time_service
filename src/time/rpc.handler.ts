import {
  RpcId,
  RpcPayload,
  RpcVersion,
  RpcMethod,
  RpcMethodHandler,
  RpcHandler,
} from '@jashkasoft/nestjs-json-rpc';
import { ZonePayload, IpPayload } from 'src/interfaces/time';
import { TimeService } from './time.service';

@RpcHandler({
  method: 'time',
})
export class TimeHandler {
  constructor(private readonly timeService: TimeService) {}

  @RpcMethodHandler('zone')
  public async zones(
    @RpcPayload() payload: ZonePayload,
    @RpcVersion() version: string,
    @RpcId() id: number | string,
    @RpcMethod() method: string,
  ) {
    await this.timeService.saveRequest(payload, version, id, method);
    return this.timeService.getByZone(payload);
  }
  @RpcMethodHandler('ip')
  public async withIp(
    @RpcPayload() payload: IpPayload,
    @RpcVersion() version: string,
    @RpcId() id: number | string,
    @RpcMethod() method: string,
  ) {
    await this.timeService.saveRequest(payload, version, id, method);
    return this.timeService.getByIp(payload);
  }
}
