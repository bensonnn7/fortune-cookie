import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as cheerio from 'cheerio';
import { get } from 'http';

const AXIOS_HEADER = {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    Host: 'www.amazon.com',
    Accept: 'text/html,application/xhtml+xml',
  },
};
@Injectable()
export class ScrapeService {
  constructor(private readonly axiosService: HttpService) {}

  async getProductInfo(url): Promise<any> {
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
        url,
      };
      console.log('product: ', product);
      return product;
    } catch (e) {
      console.log('fetch fail', e);
    }
  }

  // TODO: get decimal price
  getProductPrice($, div) {
    const productPrice = $(div).find('span .a-price-whole').first().text();
    const priceInNum = parseInt(productPrice);
    return priceInNum;
  }
  getProductName($, div) {
    const name = $(div).find('h1 span#productTitle').text().trim();
    return name;
  }
}
