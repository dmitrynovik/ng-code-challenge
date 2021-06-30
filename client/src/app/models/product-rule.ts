import { NamedItem } from "./namedItem";

export class ProductRule extends NamedItem {
    minimumTemperature!: number;
    maximumTemperature!: number;
}