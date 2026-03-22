import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GameComponent } from './game/game.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'game/:id',
        component: GameComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }

];
