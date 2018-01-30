import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import {
    DashboardComponent,
    LoginComponent,
    AdminComponent,
    PersonComponent,
    PersonListComponent,
    CustomerComponent,
    CustomerListComponent,
    OrderComponent,
    OrderListComponent,
    DiaryComponent
} from './components/';

// Services
import { 
    AuthGuardService 
} from './core';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'login/:redirectUrl', component: LoginComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService] },
    { path: 'customer', component: CustomerComponent },
    { path: 'customer/:id', component: CustomerComponent },
    { path: 'customers', component: CustomerListComponent },
    { path: 'order', component: OrderComponent },
    { path: 'order/:id', component: OrderComponent },
    { path: 'orders', component: OrderListComponent },
    { path: 'diary', component: DiaryComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
    { path: '**', component: LoginComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
