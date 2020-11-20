import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConverterComponent } from './components/converter/converter.component';
import { PageNotFoundComponent} from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'converter', component: ConverterComponent},
  {path: '', redirectTo: '/converter', pathMatch: 'full'},
  {path: '***', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
