import { Injectable } from '@nestjs/common';
import { sampleDTO } from 'src/dto/sample.dto';

@Injectable()
export class SampleService {
  private samples: sampleDTO[] = [
    {
      id: 1,
      name: 'test1',
    },
    {
      id: 2,
      name: 'test2',
    },
    {
      id: 3,
      name: 'test3',
    },
  ];
  findAll(): sampleDTO[] {
    return this.samples;
  }
  findByName(predicate: (item: sampleDTO) => boolean): sampleDTO[] {
    return this.samples.filter((i) => predicate(i));
  }
  findById(id: number) {
    return this.samples.find((item) => item.id === id);
  }
}
