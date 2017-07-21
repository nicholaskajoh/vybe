import { ModuleWithProviders } from '@angular/core';
import  { Routes, RouterModule } from '@angular/router';

// layouts
import { AppComponent } from './app.component';
import { SiteComponent } from './site/site.component';
import { MusicAppComponent } from './music-app/music-app.component';

// partials
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PlayerComponent } from './player/player.component';

// site
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// music app
import { HomeComponent } from './home/home.component';
import { SongComponent } from './song/song.component';
import { SongsComponent } from './songs/songs.component';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistsComponent } from './artists/artists.component';
import { PlaylistsComponent } from './playlists/playlists.component';

export const router: Routes = [
  { path: '', component: MusicAppComponent, children: [
    	{ path: '' , component: HeaderComponent, outlet: 'header'},
    	{ path: '' , component: SidebarComponent, outlet: 'sidebar'},
    	{ path: '', component: HomeComponent },
      { path: 'song', component: SongComponent },
    	{ path: 'songs', component: SongsComponent },
    	{ path: 'albums', component: AlbumsComponent },
    	{ path: 'artists', component: ArtistsComponent },
    	{ path: 'playlists', component: PlaylistsComponent },
    	{ path: '' , component: PlayerComponent, outlet: 'player'}
    ]
  },
  { path: 'auth', component: SiteComponent, children: [
      { path: '' , component: HeaderComponent, outlet: 'header'},
      { path: 'sign-in' , component: LoginComponent },
      { path: 'sign-up' , component: RegisterComponent }
    ]
  },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);