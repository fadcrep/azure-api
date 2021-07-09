import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { VmService } from './vm.service';

@Controller('vm')
export class VmController {
  constructor(private readonly vmService: VmService) {}


  @Post('stop')
  powerOffVm(){
    this.vmService.powerOffVm();
  }

  @Post('start')
  startVm(){
    this.vmService.startVm();
  }
  

}
