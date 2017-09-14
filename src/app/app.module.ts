import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routes } from './app.routes';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PlayerComponent } from './player/player.component';
import { AlbumsComponent } from './albums/albums.component';
import { HomeComponent } from './home/home.component';
import { MusicAppComponent } from './music-app/music-app.component';
import { SongsComponent } from './songs/songs.component';
import { ArtistsComponent } from './artists/artists.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { SongComponent } from './song/song.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SiteComponent } from './site/site.component';
import { SettingsComponent } from './settings/settings.component';

import { PlayerService } from "./player.service";

export const firebaseConfig = {
  apiKey: "AIzaSyAvOfwNslliXWkxc8yRFWehP12WjdnRE9Y",
  authDomain: "vybe-music.firebaseapp.com",
  databaseURL: "https://vybe-music.firebaseio.com",
  storageBucket: "vybe-music.appspot.com",
  messagingSenderId: "100973875821"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    PlayerComponent,
    AlbumsComponent,
    HomeComponent,
    MusicAppComponent,
    SongsComponent,
    ArtistsComponent,
    PlaylistsComponent,
    SongComponent,
    LoginComponent,
    RegisterComponent,
    SiteComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
