import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app-root/app.component'
import { ContactIndexComponent } from './pages/contact-index/contact-index.component'
import { HttpClientModule } from '@angular/common/http'
import { ContactListComponent } from './cmps/contact-list/contact-list.component'
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component'
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HeaderComponent } from './cmps/header/header.component'
import { SidebarComponent } from './cmps/sidebar/sidebar.component'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { ChartComponent } from './cmps/chart/chart.component'
import { AppIndexComponent } from './pages/app-index/app-index.component'
import { GoogleChartsModule } from 'angular-google-charts'
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component'
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { ContactImageComponent } from './shared/contact-image/contact-image.component'
import { UserService } from './services/user.service'
import { USER_RESOLVER } from './resolvers/user.resolver'
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppLayoutComponent } from './cmps/app-layout/app-layout.component'
import { NaturalTypePipe } from './pipes/natural-type.pipe'
import { LoaderComponent } from './cmps/loader/loader.component';
import { UnderConstructionComponent } from './cmps/under-construction/under-construction.component';
import { EvStopDirective } from './directives/ev-stop.directive';

@NgModule({
  declarations: [
    AppComponent,
    ContactIndexComponent,
    ContactListComponent,
    ContactPreviewComponent,
    ContactFilterComponent,
    HeaderComponent,
    SidebarComponent,
    HomePageComponent,
    ChartComponent,
    AppIndexComponent,
    ContactDetailsComponent,
    ContactEditComponent,
    DashboardComponent,
    ContactImageComponent,
    AppLayoutComponent,
    NaturalTypePipe,
    LoaderComponent,
    UnderConstructionComponent,
    EvStopDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GoogleChartsModule,
    ReactiveFormsModule,
  ],
  providers: [
    NaturalTypePipe,
    UserService,
    {
      provide: USER_RESOLVER,
      useFactory:
        (userService: UserService) => (route: ActivatedRouteSnapshot) =>
          userService.fetchUser(),
      deps: [UserService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
