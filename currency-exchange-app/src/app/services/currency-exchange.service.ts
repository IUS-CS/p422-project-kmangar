import {Injectable, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {MappedCurrencyRateObject} from '../interface/exchange-rates';

@Injectable()
export class CurrencyExchangeService implements OnInit {

  public converterForm: FormGroup = new FormGroup({
    amountControl: new FormControl('', [Validators.required]),
    fromControl: new FormControl('', [Validators.required, Validators.minLength(2)]),
    toControl: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  public exchangeRates: MappedCurrencyRateObject[];

  public fromCurrencies: string[] = [];
  public toCurrencies: string[] = [];

  public currentDate: string;
  public currentTime: string;

  static toTwoDigits(givenNumber: number) {
    return givenNumber > 9 ? `${givenNumber}` : `0${givenNumber}`;
  }
  constructor() {}

  ngOnInit(): void {
        throw new Error('Method not implemented.');
  }
}
