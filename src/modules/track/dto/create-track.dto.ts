export class CreateTrackDto {
  name: string;
  url: string;
  createdPrice: number;
  targetPrice?: number;
  percentChange?: number;
}
