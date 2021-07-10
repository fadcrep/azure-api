import { Injectable } from '@nestjs/common';
var msRestAzure = require('ms-rest-azure');
var util = require('util');
var async = require('async');
var msRestAzure = require('ms-rest-azure');
var ComputeManagementClient = require('azure-arm-compute');
var StorageManagementClient = require('azure-arm-storage');
var NetworkManagementClient = require('azure-arm-network');
var ResourceManagementClient = require('azure-arm-resource').ResourceManagementClient;

@Injectable()
export class VmService {


    private resourceClient: string;
    computeClient;
    storageClient: string;
    networkClient: string;




    async powerOffVm() {
           var that= this;
        msRestAzure.loginWithServicePrincipalSecret(process.env.CLIENT_ID, process.env.SECRET, process.env.DOMAIN, function (err, credentials, subscriptions) {
            if (err) return console.log(err);
            that.resourceClient = new ResourceManagementClient(credentials, process.env.SUBSCRIPTION_ID);
            that.computeClient = new ComputeManagementClient(credentials, process.env.SUBSCRIPTION_ID);
            that.storageClient = new StorageManagementClient(credentials, process.env.SUBSCRIPTION_ID);
            that.networkClient = new NetworkManagementClient(credentials, process.env.SUBSCRIPTION_ID);

            async.series([
                function (callback) {
                    ///////////////////////////
                    //Task3: Poweroff the VM.//
                    ///////////////////////////
                    console.log('\n>>>>>>>Start of Task3: Poweroff the VM: ' + 'game-tourelle');
                    that.computeClient.virtualMachines.powerOff(process.env.RESOURCE_GROUP_NAME, process.env.VM_NAME, function (err, result) {
                      if (err) {
                        console.log(util.format('\n???????Error in Task3: while powering off the VM:\n%s', 
                          util.inspect(err, { depth: null })));
                        callback(err);
                      } else {
                        console.log(util.format('\n######End of Task3: Poweroff the VM is successful.\n%s', 
                          util.inspect(result, { depth: null })));
                          
                        return callback(null, result);
                      }
                    });
                  }
            ]);
        });
    }



    async startVm() : Promise<Object>{
     var that= this;
     var mystartVm ;
     msRestAzure.loginWithServicePrincipalSecret(process.env.CLIENT_ID, process.env.SECRET, process.env.DOMAIN,function (err, credentials, subscriptions) {
         if (err) return console.log(err);
         that.resourceClient = new ResourceManagementClient(credentials, process.env.SUBSCRIPTION_ID);
         that.computeClient = new ComputeManagementClient(credentials, process.env.SUBSCRIPTION_ID);
         that.storageClient = new StorageManagementClient(credentials, process.env.SUBSCRIPTION_ID);
         that.networkClient = new NetworkManagementClient(credentials, process.env.SUBSCRIPTION_ID);

         async.series([
             function (callback) {
                 ///////////////////////////
                 //Task3: start the VM.//
                 ///////////////////////////
                 console.log('\n>>>>>>>Start of Task3: start the VM: ' + process.env.VM_NAME);
                 that.computeClient.virtualMachines.start(process.env.RESOURCE_GROUP_NAME, process.env.VM_NAME, function (err, result) {
                   if (err) {
                    console.log(util.format('\n???????Error in Task4: while starting the VM:\n%s', 
                       util.inspect(err, { depth: null })));
                     callback(err);
                   } else {
                    console.log(util.format('\n######End of Task4: Start the VM is successful.\n%s',  
                       util.inspect(result, { depth: null })));
                       mystartVm = callback(null, result);
                   }
                 });
               }
         ]);
     });

     return mystartVm;
 }


    

}
