import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ContactIndexComponent } from './pages/contact-index/contact-index.component'
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component'
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component'
import { authGuard } from './guards/auth.guard'
import { contactResolver } from './resolvers/contact.resolver'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { AppLayoutComponent } from './cmps/app-layout/app-layout.component'
import { USER_RESOLVER } from './resolvers/user.resolver'
import { DelayGuardService } from './guards/delay.gurad'
import { UnderConstructionComponent } from './cmps/under-construction/under-construction.component'
const routes: Routes = [
  {
    path: 'login',
    component: HomePageComponent,
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard,DelayGuardService],
        resolve: { contact: USER_RESOLVER },
      },
      {
        path: 'underconstruction',
        component: UnderConstructionComponent,
      },
      {
        path: 'contact',
        component: ContactIndexComponent,
        children: [
          { path: 'edit', component: ContactEditComponent },
          {
            path: ':id/edit',
            component: ContactEditComponent,
            resolve: { contact: contactResolver },
          },
          {
            path: ':id',
            component: ContactDetailsComponent,
            resolve: { contact: contactResolver },
          },
        ],
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: '/dashboard',
      },
    ],
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, enableTracing: false }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
