import { Component } from '@angular/core';
import { Product } from 'src/app/demo/api/product';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
})
export class ServerComponent {
    products!: Product[];

    constructor() {}

    ngOnInit() {
    }

    getSeverity (product: Product) {
        switch (product.inventoryStatus.label) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };
}
