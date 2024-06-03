import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AbuseBlackListResponse } from 'src/app/demo/models/abuse';
import { AbuseService } from 'src/app/demo/service/abuse.service';

@Component({
    templateUrl: './abuse-blacklist.component.html',
    providers: [MessageService]
})
export class AbuseBlacklistComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;
    black:AbuseBlackListResponse={};
    blackList: AbuseBlackListResponse[]=[];

    selectedBlack: AbuseBlackListResponse[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private abuseService: AbuseService, private messageService: MessageService) { }

    ngOnInit() {
        this.abuseService.getAllBlackList().subscribe(
            (response)=>{
                this.blackList=response.data;
            }
        )
    }
    updateBlackList(){
        this.abuseService.refreshBlackList().subscribe(
            (response)=>{
                console.log(response)
                if(response.success){
                    this.messageService.add({severity:'success',detail:response.message})
                }
            }
        )
    }

    openNew() {
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;


    }

    findIndexById(id: string): number {
        let index = -1;

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
