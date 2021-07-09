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
    resourceGroupName= 'game-tourelle_group';
    vmName: 'game-tourelle';
    clientId = 'd70845f4-38b5-4139-b60b-8332f085ba65';
    domain = 'b7b023b8-7c32-4c02-92a6-c8cdaa1d189c';
    secret ='07minJamj6lgRcMK~5GcoF~2WmGsggqgO~';
    subscriptionId = 'a7825e15-8cf3-4b76-826f-dc8e2adc89ac';



    async powerOffVm(){
           var that= this;
        msRestAzure.loginWithServicePrincipalSecret(this.clientId, this.secret, this.domain, function (err, credentials, subscriptions) {
            if (err) return console.log(err);
            that.resourceClient = new ResourceManagementClient(credentials, 'a7825e15-8cf3-4b76-826f-dc8e2adc89ac');
            that.computeClient = new ComputeManagementClient(credentials, 'a7825e15-8cf3-4b76-826f-dc8e2adc89ac');
            that.storageClient = new StorageManagementClient(credentials, 'a7825e15-8cf3-4b76-826f-dc8e2adc89ac');
            that.networkClient = new NetworkManagementClient(credentials, 'a7825e15-8cf3-4b76-826f-dc8e2adc89ac');

            async.series([
                function (callback) {
                    ///////////////////////////
                    //Task3: Poweroff the VM.//
                    ///////////////////////////
                    console.log('\n>>>>>>>Start of Task3: Poweroff the VM: ' + 'game-tourelle');
                    that.computeClient.virtualMachines.powerOff('game-tourelle_group', 'game-tourelle', function (err, result) {
                      if (err) {
                        console.log(util.format('\n???????Error in Task3: while powering off the VM:\n%s', 
                          util.inspect(err, { depth: null })));
                        callback(err);
                      } else {
                        console.log(util.format('\n######End of Task3: Poweroff the VM is successful.\n%s', 
                          util.inspect(result, { depth: null })));
                        callback(null, result);
                      }
                    });
                  }
            ]);
        });
    }



    async startVm(){
        var that= this;
     msRestAzure.loginWithServicePrincipalSecret(this.clientId, this.secret, this.domain, function (err, credentials, subscriptions) {
         if (err) return console.log(err);
         that.resourceClient = new ResourceManagementClient(credentials, 'a7825e15-8cf3-4b76-826f-dc8e2adc89ac');
         that.computeClient = new ComputeManagementClient(credentials, 'a7825e15-8cf3-4b76-826f-dc8e2adc89ac');
         that.storageClient = new StorageManagementClient(credentials, 'a7825e15-8cf3-4b76-826f-dc8e2adc89ac');
         that.networkClient = new NetworkManagementClient(credentials, 'a7825e15-8cf3-4b76-826f-dc8e2adc89ac');

         async.series([
             function (callback) {
                 ///////////////////////////
                 //Task3: start the VM.//
                 ///////////////////////////
                 console.log('\n>>>>>>>Start of Task3: start the VM: ' + 'game-tourelle');
                 that.computeClient.virtualMachines.start('game-tourelle_group', 'game-tourelle', function (err, result) {
                   if (err) {
                    console.log(util.format('\n???????Error in Task4: while starting the VM:\n%s', 
                       util.inspect(err, { depth: null })));
                     callback(err);
                   } else {
                    console.log(util.format('\n######End of Task4: Start the VM is successful.\n%s',  
                       util.inspect(result, { depth: null })));
                     callback(null, result);
                   }
                 });
               }
         ]);
     });
 }


    

}
