import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConverterComponent } from './components/converter/converter.component';
import { PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import { TableComponent} from './components/table/table.component';
import {AboutComponent} from './components/about/about.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/converter',
    pathMatch: 'full',
  },
  {path: 'converter', component: ConverterComponent},
  {path: 'table', component: TableComponent},
  {path: 'about', component: AboutComponent},
  {path: 'page-not-found', component: PageNotFoundComponent},
  {path: '***', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
