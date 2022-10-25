import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { In_request, In_requestDocument } from './schemas/in_requests.schema';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(In_request.name)
    private in_requestModel: Model<In_requestDocument>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const newIn_req = new this.in_requestModel({
      headers: req.headers,
      bosy: req.body,
    });
    await newIn_req.save();
    next();
  }
}
