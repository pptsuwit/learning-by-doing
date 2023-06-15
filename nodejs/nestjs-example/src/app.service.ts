import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World test2!';
  }
  getHello2(): string {
    return 'Hello World2!';
  }
}
