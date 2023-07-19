import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { SolutionComponent } from './components/pages/solution/solution.component';
import { NewPersonComponent } from './components/pages/new-person/new-person.component';
import { EditPersonComponent } from './components/pages/edit-person/edit-person.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'solution', component: SolutionComponent },
  { path: 'person/new', component: NewPersonComponent },
  { path: 'person/edit/:id', component: EditPersonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
