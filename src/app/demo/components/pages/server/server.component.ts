import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/demo/service/server.service';
import { ServerRequest, ServerResponse } from 'src/app/demo/models/server';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
})
export class ServerComponent implements OnInit {
    servers: ServerResponse[] = [];
    selectedServers: ServerResponse[] = [];
    visible = false;
    editMode = false;
    requestServer: ServerRequest = {};
    constructor(
        private serverService: ServerService,
        private messageService: MessageService
    ) {}

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
        this.visible = true;
    }
    saveServer(form: NgForm) {
        if (form.valid) {
            //todo update işlemi için düzenleme yapılacak
            this.serverService.addServer(this.requestServer).subscribe({
                next: (data) => {
                    if (data) {
                        this.messageService.add({
                            severity: 'success',
                            detail: 'Başarıyla eklendi.',
                        });
                        this.requestServer = {};
                        this.loadServers();
                        this.visible = false;
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
        this.requestServer = server;
        this.visible = true;
        this.editMode = true;
    }
}
