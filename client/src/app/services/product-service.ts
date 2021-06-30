import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Product } from "../models/product";
import { ProductRule } from "../models/product-rule";
import { ProductStatus } from "../models/product-status";

@Injectable({ providedIn: 'root'})
export class ProductService {

    readonly SERVICE_URL = 'http://localhost:8081/temperature/';

    public products$ = new Subject<Product[]>();

    private readonly rules = new Map<number, ProductRule>();

    private readonly staticRules = [
        { id: 1, name: 'Pilsner',    minimumTemperature: 4, maximumTemperature: 6 },
        { id: 2, name: 'IPA',        minimumTemperature: 5, maximumTemperature: 6 },
        { id: 3, name: 'Lager',      minimumTemperature: 4, maximumTemperature: 7 },
        { id: 4, name: 'Stout',      minimumTemperature: 6, maximumTemperature: 8 },
        { id: 5, name: 'Wheat beer', minimumTemperature: 3, maximumTemperature: 5 },
        { id: 6, name: 'Pale Ale',   minimumTemperature: 4, maximumTemperature: 6 },
    ];

    constructor(private httpClient: HttpClient) {
        this.staticRules.forEach(r => this.addRuleFor(r));
    }

    start = () => {
        this.updateProducts();
        setInterval(() => this.updateProducts(), 5000);
    }

    clearRules = () => this.rules.clear();

    addRuleFor = (rule: ProductRule) => this.rules.set(rule.id, rule);

    getProductRules = () => [...this.rules.values()];

    getProductRule = (id: number) => this.rules.get(id);

    getStatusFor = (product: Product):ProductStatus => {
        if (!product || product.temperature === undefined || product.temperature === null)
            return "all good";

        const rule = this.rules.get(product.id);
        if (!rule)
            return "all good";

        if (product.temperature > rule.maximumTemperature)
            return "too high";

        if (product.temperature < rule.minimumTemperature)
            return "too low";

        return "all good";
    }

    private async updateProducts() {
        const updateRequests = this.getProductRules()
            .map(product => 
                this.httpClient
                    .get(`${this.SERVICE_URL}${product.id}`)
                    .toPromise()
        );

        const updated = await Promise.all(updateRequests);

        const products = updated.map(o => {
            const id = parseInt(o['id']);
            const rule = this.getProductRule(id) || new ProductRule();
            return {                 
                id: id, 
                temperature: o['temperature'],
                minimumTemperature: rule.minimumTemperature,
                maximumTemperature: rule.maximumTemperature,
                name: rule.name
            };
        });

        this.products$.next(products);
    }  
}