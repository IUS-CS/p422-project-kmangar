import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConverterComponent } from './components/converter/converter.component';
import { PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
// @ts-ignore
import { TableComponent} from './components/table/table-Component.component';

const routes: Routes = [
  {path: 'converter', component: ConverterComponent},
  {path: '', redirectTo: '/converter', pathMatch: 'full'},
  {path: 'table', component: TableComponent},
  {path: 'history', component: TableComponent},
  {path: '***', component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
