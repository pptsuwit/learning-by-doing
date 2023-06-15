import { Controller, Get, Param, Query } from '@nestjs/common';
import { sampleDTO } from 'src/dto/sample.dto';
import { SampleService } from './sample.service';

@Controller('sample')
export class SampleController {
  constructor(private sampleService: SampleService) {}
  @Get()
  getAll(@Query('name') name?: string): sampleDTO[] {
    if (name) {
      return this.sampleService.findByName((item) => item.name.includes(name));
    }
    return this.sampleService.findAll();
  }
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.sampleService.findById(Number(id));
  }
}
