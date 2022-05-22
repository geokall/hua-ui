import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {StudentSearchComponent} from "../student-search/student-search.component";
import {AuthGuard} from "../shared/guards/auth.guard";
import {StudentCreateComponent} from "../student-create/student-create.component";

const routes: Routes = [
  {
    path: 'actions',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create',
        component: StudentCreateComponent,
        canActivate: [AuthGuard]
        // canActivate: [AuthGuard, GeneralGuard]
      },
      // {path: 'edit/:id', component: DecisionFormComponent, canActivate: [AuthGuard, GeneralGuard]},
      {
        path: 'search',
        component: StudentSearchComponent
      },
      // {path: 'preview/:id', component: PreviewDocumentComponent},
    ]
  },
  // {path: 'users-management', component: UserManagementComponent, canActivate: [AuthGuard, AdminGuard]},
  // {path: 'login', component: LoginComponent},
  // {path: 'taxis_login_callback', component: TaxisLoginComponent},
  {path: '', component: StudentSearchComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {
}
