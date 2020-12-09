import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {MatOptionSelectionChange} from '@angular/material/core';
import getSymbolFromCurrency from 'currency-symbol-map';
import {ExchangeRatesResponse, MappedCurrencyRateObject} from '../../interface/exchange-rates';
import {CurrencyExchangeService} from '../../../../server/services/currency-exchange.service';
import {ExchangeRatesApiRequestService} from '../../../../server/services/exchange-rates-api-request.service';

import {
  Currency,
  FormNames,
} from '../../models/enums';


@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ConverterComponent implements OnInit {

  public converterForm: FormGroup;
  public filteredFromValues: Observable<string[]>;
  public filteredToValues: Observable<string[]>;

  public amount: number; // store the amount the inputs
  public fromRate: number; // store the rate the user selects
  public fromCurrency: string; // store country user selects to convert from
  public toRate: number; // store the rate the user selects
  public toCurrency: string; // store country user selects to convert to
  public result: string; // holds the result

  private readonly TEMP_ITEM = 0;

  constructor(
    public currencyExchangeService: CurrencyExchangeService,
    private apiRequestService: ExchangeRatesApiRequestService,
  ) {}

  ngOnInit() {
    this.converterForm = this.currencyExchangeService.converterForm;

    this.disableInputAreas([FormNames.FromControl, FormNames.ToControl]);

    this.getRates();

    this.filteredFromValues = this.getFromValueChanges(FormNames.FromControl);

    this.filteredToValues = this.getToValueChanges(FormNames.ToControl);

  }// ngOnInit
  selectCurrencyByEnter(event: MatOptionSelectionChange, inputName: string): void {
    if (event.isUserInput) {
      inputName = event.source.value;
    }
  }// filterSelectedValue

  selectWrittenCurrency(event: any, inputName: string): void {
    const writtenCurrency = event.target.value.toUpperCase();

    if (writtenCurrency.length >= 2 && writtenCurrency.length <= 3) {
      const currencyList = this.mapItemCurrencies();

      const matchedCurrency = currencyList
        .filter((currency) => currency.includes(writtenCurrency))
        [this.TEMP_ITEM].toString();

      this.converterForm.controls[inputName].setValue(matchedCurrency);
    }
  }// selectWrittenCurrency

  exchangeRates(): void {
    this.fromRate = this.filterSelectedValue(FormNames.FromControl).rate;
    this.fromCurrency = this.filterSelectedValue(FormNames.FromControl).currency;

    this.toRate = this.filterSelectedValue(FormNames.ToControl).rate;
    this.toCurrency = this.filterSelectedValue(FormNames.ToControl).currency;

    this.amount = Math.floor(this.converterForm.get(FormNames.AmountControl).value);

    this.result = this.calculateExchangeRate();
  }// exchangeRates

  changeExchangeInputValues(): void {
    this.converterForm = new FormGroup({
      amountControl: new FormControl(this.converterForm.get(FormNames.AmountControl).value, [
        Validators.required,
      ]),
      fromControl: new FormControl(this.converterForm.get(FormNames.ToControl).value, [
        Validators.required,
        Validators.minLength(2),
      ]),
      toControl: new FormControl(this.converterForm.get(FormNames.FromControl).value, [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
    this.currencyExchangeService.fromCurrencies = this.mapItemCurrencies();

    this.currencyExchangeService.toCurrencies = this.mapItemCurrencies();

    this.filteredFromValues = this.getFromValueChanges(FormNames.FromControl);

    this.filteredToValues = this.getToValueChanges(FormNames.ToControl);
  }// changeExchangeInputValues

  mapItemCurrencies(): string[] {
    return this.currencyExchangeService.exchangeRates
      .map((currencyItem: MappedCurrencyRateObject) => {
        return currencyItem.currency;
      })
      .sort();
  }// mapItemCurrencies

  filterSelectedValue(value: string): MappedCurrencyRateObject {
    return this.currencyExchangeService.exchangeRates.filter((item: MappedCurrencyRateObject) => {
      return item.currency === this.converterForm.get(value).value;
    })[this.TEMP_ITEM];
  }// filterSelectedValue

  mapResponseData(responseData: ExchangeRatesResponse): MappedCurrencyRateObject[] {
    return Object.keys(responseData.rates).map(
      (item: string): MappedCurrencyRateObject => {
        return {
          currency: item,
          rate: responseData.rates[item],
        };
      },
    );
  }// mapResponseData

  getFromValueChanges(stringValue: string): Observable<string[]> {
    return this.converterForm.get(stringValue).valueChanges.pipe(
      startWith(''),
      map((value) => this.filterInputValue(value, this.currencyExchangeService.fromCurrencies)),
    );
  }// getFromValueChanges

  getToValueChanges(stringValue: string): Observable<string[]> {
    return this.converterForm.get(stringValue).valueChanges.pipe(
      startWith(''),
      map((value) => this.filterInputValue(value, this.currencyExchangeService.toCurrencies)),
    );
  }// getToValueChanges

  calculateExchangeRate(): string {
    return ((this.converterForm.get(FormNames.AmountControl).value * this.toRate) / this.fromRate).toFixed(3);
  }// calculateExchangeRate

  getRates(): void {
    if (
      this.currencyExchangeService.exchangeRates === undefined ||
      this.currencyExchangeService.exchangeRates.length <= 0
    ) {
      this.apiRequestService.getExchangeRates(Currency.USD).subscribe(
        (exchangeRate: ExchangeRatesResponse): void => {
          this.currencyExchangeService.exchangeRates = this.mapResponseData(exchangeRate);

          this.currencyExchangeService.fromCurrencies = this.mapItemCurrencies();

          this.currencyExchangeService.toCurrencies = this.mapItemCurrencies();

          this.enableInputAreas([FormNames.FromControl, FormNames.ToControl]);
        },
      );
    } else {
      this.enableInputAreas([FormNames.FromControl, FormNames.ToControl]);
    }
  }// getRates

  disableInputAreas(inputNames: string[]): void {
    for (const inputName of inputNames) {
      this.converterForm.controls[inputName].disable();
    }
  }// disableInputAreas

  enableInputAreas(inputNames: string[]): void {
    for (const inputName of inputNames) {
      this.converterForm.controls[inputName].enable();
    }
  }// enableInputAreas

  getSymbol(rate: string): string {
    return getSymbolFromCurrency(rate);
  }// getSymbol

  private filterInputValue(value: string, arrayGoingFiltered: string[]): string[] {
    const filterValue = value.toLowerCase();

    return arrayGoingFiltered.filter((option) => option.toLowerCase().includes(filterValue));
  }// filterInputValue

}
