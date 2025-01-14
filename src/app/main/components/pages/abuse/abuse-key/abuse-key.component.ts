import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {
    AbuseDbKeyRequest,
    AbuseDbKeyResponse,
} from 'src/app/main/models/abuse';
import { AbuseKeyService } from 'src/app/main/service/abuseKey.service';

@Component({
    selector: 'app-abuse-key',
    templateUrl: './abuse-key.component.html',
    styleUrl: './abuse-key.component.scss',
})
export class AbuseKeyComponent implements OnInit {
    abuseKeys: AbuseDbKeyResponse[] = [];
    visible = false;
    abuseRequest: AbuseDbKeyRequest = {};
    constructor(
        private abuseKeyService: AbuseKeyService,
        private messageService: MessageService
    ) {}
    ngOnInit(): void {
        this.loadAbuseKeys();
    }
    loadAbuseKeys() {
        this.abuseKeyService.getAllAbuseKey().subscribe({
            next: (data) => {
                if (data) {
                    this.abuseKeys = data;
                } else {
                    this.messageService.add({
                        detail: 'Bir sorun var!',
                        severity: 'error',
                    });
                }
            },
        });
    }
    openNewAbuseKeyDialog() {
        this.visible = true;
    }
    addNewAbuseKey(form: NgForm) {
        if (form.valid) {
            this.abuseKeyService.addAbuseKey(this.abuseRequest).subscribe({
                next: (data) => {
                    if (data) {
                        this.messageService.add({
                            severity: 'success',
                            detail: 'Başarıyla eklendi.',
                        });
                        this.abuseRequest = {};
                        this.loadAbuseKeys();
                        this.visible = false;
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            detail: 'Bir sorun oluştu!',
                        });
                    }
                },
            });
        } else {
            this.messageService.add({
                detail: 'Tüm alanları doldurun!',
                severity: 'error',
            });
        }
    }
    deleteKey(id: number) {
        this.abuseKeyService.deleteAbuseKey(id).subscribe({
            next: () => {
                this.loadAbuseKeys();
            },
        });
    }
}
