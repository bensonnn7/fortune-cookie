import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as cheerio from 'cheerio';
import { NotificationService } from '../notification/notification.service';
import { TrackService } from '../track/track.service';
import { ScrapeResultDto } from './dto/scrape-result.dto';
import { Cron } from '@nestjs/schedule';
const AXIOS_HEADER = {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    Host: 'www.amazon.com',
    'Accept-Language': 'en-US,en;q=0.9', // Set preferred language
    Accept: 'text/html,application/xhtml+xml',
  },
};
@Injectable()
export class ScrapingService {
  constructor(
    private readonly axiosService: HttpService,
    private readonly notificationService: NotificationService,
    private readonly trackServices: TrackService,
  ) {}

  // @Cron('45 * * * * *')
  cronTest() {
    console.log('test cron job');
  }

  async startScraping() {
    // step 1 get all pending track
    const pendingTracks = await this.trackServices.getPendingTracks();

    // step 2 scrape each track
    const fetchFailList: Array<number> = [];
    const notificationList: Array<number> = [];

    for (let i = 0; i < pendingTracks.length; i++) {
      const { url, id, createdPrice } = pendingTracks[i];
      console.log(
        `Start ${i + 1}th scraping at ${new Date().toLocaleString()}}`,
      );
      try {
        const { price, name } = await this.getProductInfo(url);
        // step 3 compare price
        const shouldNotify = this.checkShouldNotify(price, createdPrice);
        if (shouldNotify) {
          const content = this.generateNotification(name, price);
          notificationList.push(id);
        }
        // step 5 update track
      } catch (err) {
        fetchFailList.push(id);
      }
    }

    // step 3 send notification
    // return await this.notificationService.sendNotification();
  }

  async getProductInfo(url): Promise<ScrapeResultDto> {
    try {
      const { data: html } = await this.axiosService
        .get(url, AXIOS_HEADER)
        .toPromise();
      const $ = cheerio.load(html);
      const container = $('div#dp-container');
      const name = this.getProductName($, container);
      const price = this.getProductPrice($, container);
      const product = {
        name,
        price,
      };
      return product;
    } catch (e) {
      console.log('fetch fail', e);
    }
  }
  // TODO: different account may has different price
  getProductPrice($, div) {
    const productPriceWhole = $(div).find('span .a-price-whole').first().text();
    const productPriceFraction = $(div)
      .find('span .a-price-fraction')
      .first()
      .text();
    const price =
      parseInt(productPriceWhole) + parseInt(productPriceFraction) / 100;
    return price;
  }

  getProductName($, div) {
    const name = $(div).find('h1 span#productTitle').text().trim();
    // TODO: limit the name length if too long
    return name;
  }

  checkShouldNotify(currentPrice, createdPrice) {
    return currentPrice < createdPrice;
  }

  generateNotification(name, price) {
    return `${name} is now ${price}`;
  }
}
