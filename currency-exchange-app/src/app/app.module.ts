import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import {CoreModule} from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConverterComponent } from './components/converter/converter.component';
import { AboutComponent } from './components/about/about.component';
import {environment} from '../environments/environment';
import {ExchangeRatesApiRequestService} from '../../server/services/exchange-rates-api-request.service';
import {CurrencyExchangeService} from '../../server/services/currency-exchange.service';
import {TableComponent} from './components/table/table.component';

// tslint:disable-next-line:typedef
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent,
    AboutComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CoreModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [ExchangeRatesApiRequestService, CurrencyExchangeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
