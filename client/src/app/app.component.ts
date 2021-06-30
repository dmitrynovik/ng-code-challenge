import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'code-challenge';

  constructor(public productService: ProductService) {  }

  ngOnInit() {
    this.productService.start();
  }
}
