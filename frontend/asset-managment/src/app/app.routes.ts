import { Routes } from '@angular/router';
import { UsersComponent } from './Panel/users/users.component';
import { PanelComponent } from './Panel/panel.component';
import { BuildingsComponent } from './Panel/buildings/buildings.component';
import { ZonesComponent } from './Panel/zones/zones.component';
import { LoginComponent } from './Login/login.component';
import { OpSystemComponent } from './Panel/op-system/op-system.component';
import { OpVersionComponent } from './Panel/op-system/op-version/op-version.component';
import { ComputerComponent } from './Panel/computer/computer.component';
import { FeatureSetComponent } from './Panel/feature-set/feature-set.component';
import { PropertyFeatureComponent } from './Panel/property-feature/property-feature.component';
import { ProductCategoryComponent } from './Panel/product-category/product-category.component';
import { ProductComponent } from './Panel/product-category/product/product.component';

import { authGuard } from './Services/auth.guard';
import { ProfileComponent } from './Panel/profile/profile.component';
import { BuildingSupportersComponent } from './Panel/buildings/building-supporters/building-supporters.component';
import { ProductFeatureCategoryOrderComponent } from './Panel/product-category/product-feature-category-order/product-feature-category-order.component';
import { DeliveredProductComponent } from './Panel/product-category/delivered-product/delivered-product.component';
import { SealComponent } from './Panel/seal/seal.component';
import { UsersPcComponent } from './Panel/users/users-pc/users-pc.component';
import { UsersDeliveredProductComponent } from './Panel/users/users-delivered-product/users-delivered-product.component';
import { SoftwareComponent } from './Panel/computer/software/software.component';

import { OwnTicketsComponent } from './Panel/TicketPages/own-tickets/own-tickets.component';
import { UsersTicketsComponent } from './Panel/TicketPages/users-tickets/users-tickets.component';
import { UserProfileComponent } from './Shared/user-profile/user-profile.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'panel',
    component: PanelComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'userProfile',
    component: UserProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'usersPc',
    component: UsersPcComponent,
    canActivate: [authGuard],
  },
  {
    path: 'usersDelivery',
    component: UsersDeliveredProductComponent,
    canActivate: [authGuard],
  },
  {
    path: 'buildings',
    component: BuildingsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'buildingSupporters',
    component: BuildingSupportersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'zones',
    component: ZonesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'computer',
    component: ComputerComponent,
    canActivate: [authGuard],
  },
  {
    path: 'software',
    component: SoftwareComponent,
    canActivate: [authGuard],
  },

  {
    path: 'op',
    component: OpSystemComponent,
    canActivate: [authGuard],
  },
  {
    path: 'version',
    component: OpVersionComponent,
    canActivate: [authGuard],
  },
  {
    path: 'feature',
    component: FeatureSetComponent,
    canActivate: [authGuard],
  },
  {
    path: 'prfeature',
    component: PropertyFeatureComponent,
    canActivate: [authGuard],
  },
  {
    path: 'products/:category',
    component: ProductCategoryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'products',
    component: ProductComponent,
    canActivate: [authGuard],
  },
  {
    path: 'deliveredProducts',
    component: DeliveredProductComponent,
    canActivate: [authGuard],
  },
  {
    path: 'pfcOrder',
    component: ProductFeatureCategoryOrderComponent,
    canActivate: [authGuard],
  },
  {
    path: 'seal',
    component: SealComponent,
    canActivate: [authGuard],
  },
  {
    path: 'ownTicketPage',
    component: OwnTicketsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'userTicketPage',
    component: UsersTicketsComponent,
    canActivate: [authGuard],
  },
];
