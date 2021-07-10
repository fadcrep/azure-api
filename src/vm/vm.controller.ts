import { Post, Res } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { VmService } from './vm.service';
import { Response } from 'express';

@Controller('vm')
export class VmController {
  constructor(private readonly vmService: VmService) {}


  @Post('stop')
  powerOffVm(@Res() res: Response){
    this.vmService.powerOffVm();
    res.json("Vm stopped");
  }

  
  @Post('start')
  startVm(@Res() res: Response){
    this.vmService.startVm();
    res.json("Vm started");
  }
  

}
