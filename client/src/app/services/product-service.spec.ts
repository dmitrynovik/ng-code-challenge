import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Product } from '../models/product';
import { ProductService } from './product-service';

describe('ProductService', () => {
    let http: HttpClient;
    let productService: ProductService;

    function makePilsner(temperature: number) { 
        return { id: 1, name: 'Pilsner', temperature: temperature } as Product;
    }

    beforeEach(async () => {        
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductService]
        });

        http = TestBed.inject(HttpClient);
        productService = new ProductService(http);
        productService.addRuleFor({ id: 1, name: 'Pilsner', minimumTemperature: 4, maximumTemperature: 6 });
    });

    it('should create an instance of the ProductService', () => {
        expect(productService).toBeTruthy();
    });

    [4, 5, 6].forEach(t => {
        it(`Temperature ${t} degrees is all good for Pilsner`, () => {
            expect(productService.getStatusFor(makePilsner(t))).toBe('all good');
        });
    });

    [Number.MIN_VALUE, -1, 0, 3, 3.999].forEach(t => {
        it(`Temperature ${t} degrees is too low for Pilsner`, () => {
            expect(productService.getStatusFor(makePilsner(t))).toBe('too low');
        });
    });

    [6.001, 7, Number.MAX_VALUE].forEach(t => {
        it(`Temperature ${t} degrees is too high for Pilsner`, () => {
            expect(productService.getStatusFor(makePilsner(t))).toBe('too high');
        });
    });

});
