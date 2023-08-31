export class CreateProductDto {
  name: string;
  url: string;
  createdPrice: number;
  targetPrice?: number;
  percentChange?: number;
}
