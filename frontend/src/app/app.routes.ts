import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PersistComponent } from './persist/persist.component';
import { authGuard } from './guards/auth.guard';
import { NoteComponent } from './pages/note/note.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'Login Page' },
  {
    path: '',
    component: PersistComponent,
    canActivate: [authGuard],
    children: [
      { path: 'notes', component: HomeComponent, title: 'Home Page' },
      {
        path: 'notes/:id',
        component: NoteComponent,
        title: 'Note Detail Page',
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent,
        title: 'Unauthorized Page',
      },
      {
        path: 'notfound',
        component: NotfoundComponent,
        title: 'Not Found Page',
      },
    ],
  },
  {
    path: '**',
    component: NotfoundComponent,
    title: 'Not Found Page',
  },
];
