import { Controller } from '@nestjs/common';
import { VmService } from './vm.service';

@Controller('vm')
export class VmController {
  constructor(private readonly vmService: VmService) {}
}
