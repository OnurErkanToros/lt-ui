import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LogListenerService } from 'src/app/main/service/logListener.service';
import { SettingsService } from 'src/app/main/service/settings.service';

@Component({
    selector: 'app-listener-settings',
    templateUrl: './listener-settings.component.html',
    providers: [MessageService],
})
export class ListenerSettingsComponent implements OnInit {
    checked: boolean = false;
    loading = false;
    findtimetype: string;
    findtime: number;
    maxretry: number;
    logFilePath: string;
    blockConfPath: string;
    isDisabled: boolean = true;

    findtimetypeList = [
        { name: 'Dakika', value: 'minute' },
        { name: 'Saniye', value: 'second' },
    ];
    constructor(
        private loglistenerService: LogListenerService,
        private messageService: MessageService,
        private settingsService: SettingsService
    ) {}
    ngOnInit(): void {
        this.loadChecked();
        this.loadSettings();
    }

    loadChecked() {
        this.loading = true;
        this.loglistenerService.status().subscribe({
            next: (data) => {
                console.log(data);
                if (data) {
                    if (data.status === 'STARTED') {
                        this.checked = true;
                    } else {
                        this.checked = false;
                    }
                } else {
                    this.messageService.add({
                        detail: 'Bir sorun oluştu!',
                        severity: 'error',
                    });
                }
                this.loading = false;
            },
        });
    }
    onChange() {
        if (!this.checked) {
            this.stopListener();
        } else {
            this.startListener();
        }
    }
    startListener() {
        this.loading = true;
        this.loglistenerService.start().subscribe({
            next: (data) => {
                if (data) {
                    this.checked = true;
                    this.messageService.add({
                        detail: 'Başarıyla başlatıldı.',
                        severity: 'success',
                    });
                } else {
                    this.messageService.add({
                        detail: 'Bir sorun oluştu!',
                        severity: 'error',
                    });
                }
                this.loading = false;
            },
        });
    }
    stopListener() {
        this.loading = true;
        this.loglistenerService.stop().subscribe({
            next: (data) => {
                if (data) {
                    this.checked = false;
                    this.messageService.add({
                        detail: 'Başarıyla durduruldu.',
                        severity: 'success',
                    });
                } else {
                    this.messageService.add({
                        detail: 'Bir sorun oluştu!',
                        severity: 'error',
                    });
                }
                this.loading = false;
            },
        });
    }

    loadSettings() {
        this.settingsService.getAllBySettingType('LOG_LISTENER').subscribe({
            next: (data) => {
                if (data.length > 0) {
                    this.isDisabled = false;
                    const maxRetrySetting = data.find(
                        (setting) => setting.key === 'maxRetry'
                    );
                    const findtimeSetting = data.find(
                        (setting) => setting.key === 'findTime'
                    );
                    const findtimetypeSetting = data.find(
                        (setting) => setting.key === 'findTimeType'
                    );
                    const logFileSetting = data.find(
                        (setting) => setting.key === 'logFilePath'
                    );
                    const confFileSetting = data.find(
                        (setting) => setting.key === 'confFilePath'
                    );

                    this.maxretry = maxRetrySetting
                        ? Number(maxRetrySetting.value)
                        : null;
                    this.findtime = findtimeSetting
                        ? Number(findtimeSetting.value)
                        : null;

                    this.findtimetype = findtimetypeSetting
                        ? findtimetypeSetting.value
                        : null;

                    this.logFilePath = logFileSetting
                        ? logFileSetting.value
                        : null;
                    this.blockConfPath = confFileSetting
                        ? confFileSetting.value
                        : null;

                    if (this.findtimetype) {
                        this.setDefaultFindtimeType(this.findtimetype);
                    }
                }
            },
        });
    }

    setDefaultFindtimeType(value: string) {
        const selectedType = this.findtimetypeList.find(
            (option) => option.value === value
        );
        if (selectedType) {
            this.findtimetype = selectedType.value;
        }
    }
    saveSettings() {
        const settings = [
            { key: 'maxRetry', value: this.maxretry.toString() },
            { key: 'findTime', value: this.findtime.toString() },
            { key: 'findTimeType', value: this.findtimetype },
            { key: 'logFilePath', value: this.logFilePath },
            { key: 'confFilePath', value: this.blockConfPath },
        ];
    
        this.loading = true;
    
        const updateObservables = settings.map((setting) =>
            this.settingsService.updateSetting(setting.key, setting.value)
        );
    
        // Ayarları kaydetmek için paralel olarak işlemleri çalıştır
        Promise.all(updateObservables.map((obs) => obs.toPromise()))
            .then(() => {
                this.messageService.add({
                    detail: 'Ayarlar başarıyla kaydedildi.',
                    severity: 'success',
                });
            })
            .catch(() => {
                this.messageService.add({
                    detail: 'Ayarları kaydederken bir sorun oluştu.',
                    severity: 'error',
                });
            })
            .finally(() => {
                this.loading = false;
            });
    }
}
