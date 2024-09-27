import { Routes } from '@angular/router';
import { AuthGuardService } from '../services/AuthGuard.service';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./Layout/layout.component').then((m) => m.LayoutComponent),
        children: [
            {
                path: '',
                pathMatch: "full",
                redirectTo: 'products'
                // loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
            },
            {
                path: 'admin',
                data: { role: "admin" },
                children: [
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent), canActivate: [AuthGuardService], }
                ]
            },
            {
                path: 'about',
                pathMatch: "full",
                loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
            },
            {
                path: 'contactus',
                pathMatch: "full",
                loadComponent: () => import('./Pages/collections/collection.component').then((m) => m.CollectionsComponent),
            },
            {
                path: 'login',
                pathMatch: "full",
                loadComponent: () => import('./Pages/Auth/login/login.component').then((m) => m.LoginComponent),
                canActivate: [AuthGuardService]
            },
            {
                path: 'signup',
                pathMatch: 'full',
                loadComponent: () => import('./Pages/Auth/signup/signup.component').then((m) => m.SignupComponent)
            },
            {
                path: "edit/:id",
                loadComponent: () => import('./Pages/Auth/update-profile/update-profile.component').then(r => r.UpdateProfileComponent),
                canActivate: [AuthGuardService]

            },
            {
                path: 'products',
                loadChildren: () => import('./Pages/ProductPages/ProductPage-routes').then(features => features.ProductPagesRoutes),
            },
            {
                path: 'view_cart',
                pathMatch: "full",
                loadComponent: () => import('./Pages/viewCart/view-cart.component').then(features => features.ViewCartComponent),
            },
            {
                path: 'collections',
                loadChildren: () => import('./Pages/collections/collection-routes').then((m) => m.CollectionsComponentRoutes),
            },
            {
                path: '**',
                loadComponent: () => import('./404NotFound/404NotFound.component').then(r => r.FourZeroFourComponent),
                pathMatch: 'full',
            }
        ]
    },
];
