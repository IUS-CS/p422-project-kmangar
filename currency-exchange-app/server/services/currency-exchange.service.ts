import {Injectable, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {MappedCurrencyRateObject} from '../../src/app/interface/exchange-rates';

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

  constructor() {}

  ngOnInit() {}
}
