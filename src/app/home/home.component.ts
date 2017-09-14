import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  songs: FirebaseListObservable<any[]>;

  constructor(public afDb: AngularFireDatabase, private playerService: PlayerService) {
    this.songs = afDb.list('/songs');
  }

  ngOnInit() {
  }

  play(songCode) {
    this.songs.subscribe(songs => {
      // stop song currently loaded, if any
      if(this.playerService.songLoaded) this.playerService.stop();

      // create playlist
      this.playerService.playlist = songs;

      // set song code
      this.playerService.songCode = songCode;

      // get and set song index in playlist
      var index = this.playerService.playlist.findIndex(s => s.code == songCode);
      this.playerService.songPlaylistIndex = index;

      // load song
      this.playerService.load();

      // play song
      this.playerService.play();
    });
  }

}
