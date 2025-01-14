import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/main/service/server.service';
import { ServerRequest, ServerResponse } from 'src/app/main/models/server';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
})
export class ServerComponent implements OnInit {
    servers: ServerResponse[] = [];
    selectedServers: ServerResponse[] = [];
    serverId: number;
    visible = false;
    editMode = false;
    serverFormGroup: FormGroup;
    activeOptions = [
        { name: 'Evet', value: 'true' },
        { name: 'Hayır', value: 'false' },
    ];
    constructor(
        private serverService: ServerService,
        private messageService: MessageService,
        private formBuilder: FormBuilder
    ) {
        this.serverFormGroup = this.formBuilder.group({
            serverName: ['', [Validators.required]],
            serverHost: ['', [Validators.required]],
            serverPort: [
                0,
                [Validators.required, Validators.min(0), Validators.max(65535)],
            ],
            serverUsername: ['', [Validators.required]],
            serverPassword: ['', [Validators.required]],
            serverFilePath: ['', [Validators.required]],
            serverFileName: ['', [Validators.required]],
            serverActive: [true,],
            serverSFTP: [false,],
        });
    }

    ngOnInit() {
        this.loadServers();
    }

    loadServers() {
        this.serverService.getAllServer().subscribe({
            next: (data) => {
                if (data) {
                    this.servers = data;
                } else {
                    this.messageService.add({
                        severity: 'error',
                        detail: 'Bir sorun oluştu!',
                    });
                }
            },
        });
    }
    openNewServerDialog() {
        this.serverId = null; // Güncelleme modu değil, yeni ekleme modu
        this.serverFormGroup.reset(); // Formu temizle
        this.visible = true; // Diyaloğu aç
    }
    saveServer() {
        if (this.serverFormGroup.valid) {
            const requestServer = {
                id: this.serverId, // Güncelleme sırasında gerekli olacak
                name: this.serverFormGroup.get('serverName')?.value,
                host: this.serverFormGroup.get('serverHost')?.value,
                port: this.serverFormGroup.get('serverPort')?.value,
                username: this.serverFormGroup.get('serverUsername')?.value,
                password: this.serverFormGroup.get('serverPassword')?.value,
                remoteFilePath:
                    this.serverFormGroup.get('serverFilePath')?.value,
                fileName: this.serverFormGroup.get('serverFileName')?.value,
                isActive: this.serverFormGroup.get('serverActive')?.value,
                isSFTP: this.serverFormGroup.get('serverSFTP')?.value
            };

            const action = this.serverId
                ? this.serverService.updateServer(this.serverId, requestServer)
                : this.serverService.addServer(requestServer);

            action.subscribe({
                next: (data) => {
                    if (data) {
                        this.messageService.add({
                            severity: 'success',
                            detail: 'Başarıyla işlendi.',
                        });
                        this.loadServers();
                        this.visible = false;
                        this.serverFormGroup.reset();
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            detail: 'Bir sorun oluştu.',
                        });
                    }
                },
            });
        } else {
            this.messageService.add({
                severity: 'warn',
                detail: 'Lütfen gerekli alanları doldurun.',
            });
        }
    }

    deleteServerById(id: number) {
        this.serverService.deleteServerById(id).subscribe({
            complete: () => {
                this.loadServers();
            },
        });
    }
    editServer(server: ServerResponse) {
        this.serverId = server.id;
        this.serverFormGroup.patchValue({
            serverName: server.name,
            serverHost: server.host,
            serverPort: server.port,
            serverUsername: server.username,
            serverPassword: server.password,
            serverFilePath: server.remoteFilePath,
            serverFileName: server.fileName,
            serverActive: server.isActive,
            serverSFTP: server.isSFTP
        });
        console.log(this.serverFormGroup.value);
        
        this.visible = true;
    }

    sendConfToFileSelectedServers() {
        this.serverService.sendBlockConf(this.selectedServers).subscribe({
            next: (data) => {
                if (data) {
                    data.forEach((result) => {
                        if(!result.success){
                            this.messageService.add({
                                severity: 'error',
                                detail: result.message,
                            });
                        }else{
                            this.messageService.add({
                                severity: 'success',
                                detail: result.message,
                            });
                        }
                        
                    });
                }
            },complete: () => {
                this.selectedServers = [];
            }
        });
    }
    convertServerResponseToRequest(serverResponseList:ServerResponse[]):ServerRequest[]{
        let serverRequestList:ServerRequest[] = [];
        serverResponseList.forEach(serverResponse => {
            let serverRequest: ServerRequest;
            serverRequest.id = serverResponse.id;
            serverRequest.name = serverResponse.name;
            serverRequest.host = serverResponse.host;
            serverRequest.username = serverResponse.username;
            serverRequest.password = serverResponse.password;
            serverRequest.port = serverResponse.port;
            serverRequest.remoteFilePath = serverResponse.remoteFilePath;
            serverRequest.fileName = serverResponse.fileName;
            serverRequest.isActive = serverResponse.isActive;
            serverRequest.isSFTP = serverResponse.isSFTP;
            serverRequestList.push(serverRequest);
        });
        return serverRequestList;

    }
}
