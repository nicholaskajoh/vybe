import { Injectable } from '@angular/core';

declare var Howl: any;

@Injectable()
export class PlayerService {

  song: any; // Howl object
  songId: Number; // sound instance
  title: String;
  songCode: String;
  artists: String;
  album: String;
  albumArt: String = "/assets/img/song.jpg";
  time: String = "0:0";
  songPlaylistIndex: number;
  volume: number = 5;
  seekPercent: number = 0;
  updateSeekPosInterval: any;
  playlist: Array<any>; // playlist current song is in
  songLoaded: Boolean;
  status: String;

  constructor() {
    this.playlist = [];
    this.songLoaded = false;
  }

  // load song after playlist and
  // songPlaylistIndex have been set
  load() {
    this.status = "Loading...";
    var src = [this.playlist[this.songPlaylistIndex].url];
    this.song = new Howl({
      src: src,
      volume: this.volume / 10
    });
    this.addSongEventListeners();
    this.songLoaded = true;
  }

  // play current/loaded song
  play() {
    if(this.songLoaded && !this.song.playing()) {
      this.songId = this.song.play();

      this.updateSeekPosInterval = setInterval(() => {
        this.seekPercent = (this.song.seek() / this.song.duration()) * 100;
      }, 1);
    }
  }

  // pause current song
  pause() {
    if(this.songLoaded && this.song.playing()) {
      this.song.pause(this.songId);

      clearInterval(this.updateSeekPosInterval);
    }
  }

  // stop song and unload sound object
  // i.e clear audio cache
  stop() {
    if(this.songLoaded) {
      this.song.stop(this.songId);

      this.seekPercent = 0;
      clearInterval(this.updateSeekPosInterval);
      this.song.unload();
    }
  }

  // load/play next song
  next() {
    if(this.songLoaded && this.songPlaylistIndex < this.playlist.length - 1) {
      // next song exists on playlist, then
      this.song.stop();
      this.songPlaylistIndex++;
      this.status = "Loading...";
      var src = [this.playlist[this.songPlaylistIndex].url];
      this.song = new Howl({
        src: src,
        volume: this.volume / 10
      });
      this.addSongEventListeners();
      this.play();
    }
  }

  // load/play previous song
  previous() {
    if(this.songLoaded && this.songPlaylistIndex > 0) {
      // prev song exists on playlist, then
      this.song.stop();
      this.songPlaylistIndex--;
      this.status = "Loading...";
      var src = [this.playlist[this.songPlaylistIndex].url];
      this.song = new Howl({
        src: src,
        volume: this.volume / 10
      });
      this.addSongEventListeners();
      this.play();
    }
  }

  // increase volume
  volumeUp() {
    if(this.songLoaded && this.volume < 10) {
      this.volume += 1;
      this.song.volume(this.volume / 10);
    }
  }

  // decrease volume
  volumeDown() {
    if(this.songLoaded && this.volume > 0) {
      this.volume -= 1;
      this.song.volume(this.volume / 10);
    }
  }

  // add these listeners once
  // a song has been loaded
  addSongEventListeners() {
    this.song.on('load', () => {
      this.songLoaded = true;
    });

    this.song.on('play', () => {
      this.status = "Playing";

      // set song title
      this.title = this.playlist[this.songPlaylistIndex].title;

      // set song artists
      this.artists = this.playlist[this.songPlaylistIndex].artist;

      // set song album
      this.album = this.playlist[this.songPlaylistIndex].album;

      // set song time
      var sec, min;
      var dur = Math.round(this.song.duration());
      sec = Math.round(((dur / 60) % 1) * 60);
      min = Math.floor(dur / 60);
      this.time = min + ":" + sec;
    });

    this.song.on('pause', () => {
      this.status = "Paused";
    });

    this.song.on('end', () => {
      clearInterval(this.updateSeekPosInterval);
      // play next song
      this.next();
    });
  }

}