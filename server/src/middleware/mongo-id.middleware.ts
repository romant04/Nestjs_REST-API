import { Injectable, NestMiddleware } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class MongoIdMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.params.id) {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).send({ message: 'Invalid ID' });
        return;
      }
    }
    next();
  }
}
