import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from '../app-routing.module';
import { PageNotFoundComponent} from '../components/page-not-found/page-not-found.component';
import { HeaderComponent} from '../components/header/header.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HeaderComponent, PageNotFoundComponent],
  imports: [CommonModule, AppRoutingModule, MatButtonModule, TranslateModule],
  exports: [HeaderComponent, AppRoutingModule],
})
export class CoreModule {}
