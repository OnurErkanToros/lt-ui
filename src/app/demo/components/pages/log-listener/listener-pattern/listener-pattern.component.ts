import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {
    LogListenerRegexRequest,
    LogListenerRegexResponse,
} from 'src/app/demo/models/regex';
import { RegexService } from 'src/app/demo/service/regex.service';

@Component({
    selector: 'app-listener-pattern',
    templateUrl: './listener-pattern.component.html',
})
export class ListenerPatternComponent implements OnInit {
    patternList: LogListenerRegexResponse[] = [];
    visible = false;
    patternForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private patternService: RegexService
    ) {
        this.patternForm = this.formBuilder.group({
            pattern: ['', [Validators.required]],
            explanation: [''],
        });
    }
    ngOnInit(): void {
        this.loadPatternList();
    }

    patternFormSubmit() {
        if (this.patternForm.valid) {
            let pattern: LogListenerRegexRequest = {
                pattern: this.patternForm.get('pattern').value,
                explanation: this.patternForm.get('explanation').value,
            };
            this.patternService.addLogPattern(pattern).subscribe({
                complete: () => {
                    this.messageService.add({
                        severity: 'success',
                        detail: 'Pattern başarıyla eklendi.',
                    });
                    this.loadPatternList();
                    this.visible = false;
                },
            });
        } else {
            this.messageService.add({
                severity: 'warn',
                detail: 'Lütfen tüm alanları doldurun!',
            });
        }
    }

    loadPatternList() {
        this.patternService.getAllLogPattern().subscribe({
            next: (data) => {
                this.patternList = data;
            },
        });
    }
    deletePattern(id: number) {
        this.patternService.deleteLogPattern(id).subscribe({
            complete: () => {
                this.messageService.add({
                    severity: 'success',
                    detail: 'Başarıyla silindi.',
                });
                this.loadPatternList();
            },
        });
    }
}
