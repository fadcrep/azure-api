import { Injectable } from '@nestjs/common';

@Injectable()
export class VmService {


    resourceClient: string;
    computeClient: string;
    storageClient: string;
    networkClient: string;
}
