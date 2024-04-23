import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './modules/shared/app-layout/components/app-layout/app-layout.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '', component: AppLayoutComponent, children: [
      { path: 'event', loadChildren: () => import('./modules/components/event/event.module').then(m => m.EventModule) },
      { path: 'dashboard', loadChildren: () => import('./modules/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'food', loadChildren: () => import('./modules/components/food-count/food-count.module').then(m => m.FoodCountModule) },
      { path: 'leaveRoster', loadChildren: () => import('./modules/components/leave-roster/leave-roster.module').then(m => m.LeaveRosterModule) },
      { path: 'userProfile', loadChildren: () => import('./modules/components/user-profile/user-profile.module').then(m => m.UserProfileModule) },

    ],
    canActivate: [authGuard]
  },

  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'signUp', loadChildren: () => import('./modules/sign-up/sign-up.module').then(m => m.SignUpModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    bindToComponentInputs: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
