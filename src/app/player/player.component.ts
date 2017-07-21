import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

declare var Howl: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  playerTitle: String;
  playerArtists: String;
  playerAlbum: String;
  playerAlbumArt: String = "/assets/img/song.jpg";

  song: any;
  songPlaylistIndex: number;
  time: String = "0:0";
  volume: number = 5;
  seekPercent: number = 0;
  updateSeekPosInterval: any;
  @ViewChild('playerProgressBar') ppb: ElementRef;
  playlist: Array<any>;

  constructor() {
    this.playlist = [
      {
        id: 1,
        title: "If (remix)",
        artists: "Davido, R. Kelly",
        url: "/assets/audio/sample-music1.mp3"
      },
      {
        id: 2,
        title: "Shayo",
        artists: "Falz, Dremo",
        album: "Weidon sir! 2",
        url: "/assets/audio/sample-music2.mp3"
      },
      {
        id: 3,
        title: "I can't fail",
        artists: "N.U.T.T.Y Josh, Thread Stone",
        url: "/assets/audio/sample-music3.mp3"
      }
    ];

    this.songPlaylistIndex = 0;
    var src = [this.playlist[this.songPlaylistIndex].url];
    this.song = new Howl({
      src: src,
      volume: this.volume / 10
    });
  }

  ngOnInit() {
    this.addSongEventListeners();
  }

  ngAfterViewInit() {
    
  }

  play() {
    if(!this.song.playing()) {
      this.song.play();

      this.updateSeekPosInterval = setInterval(() => {
        this.seekPercent = (this.song.seek() / this.song.duration()) * 100;
      }, 1);
    }
  }

  pause() {
    if(this.song.playing()) {
      this.song.pause();

      clearInterval(this.updateSeekPosInterval);
    }
  }

  next() {
    if(this.songPlaylistIndex < this.playlist.length - 1) {
      // next song exists on playlist, then
      this.song.stop();
      this.songPlaylistIndex++;
      var src = [this.playlist[this.songPlaylistIndex].url];
      this.song = new Howl({
        src: src,
        volume: this.volume / 10
      });
      this.addSongEventListeners();
      this.play();
    } else {
      console.log("End of playlist!");
    }
  }

  previous() {
    if(this.songPlaylistIndex > 0) {
      // prev song exists on playlist, then
      this.song.stop();
      this.songPlaylistIndex--;
      var src = [this.playlist[this.songPlaylistIndex].url];
      this.song = new Howl({
        src: src,
        volume: this.volume / 10
      });
      this.addSongEventListeners();
      this.play();
    } else {
      console.log("End of playlist!");
    }
  }

  volumeUp() {
    if(this.volume < 10) {
      this.volume += 1;
      this.song.volume(this.volume / 10);
    }
  }

  volumeDown() {
    if(this.volume > 0) {
      this.volume -= 1;
      this.song.volume(this.volume / 10);
    }
  }

  seek(e) {
    var offsetLeft = this.ppb.nativeElement.getClientRects()[0].left;
    var clickWidth = e.clientX - offsetLeft;
    var progressBarWidth = this.ppb.nativeElement.offsetWidth;
    this.seekPercent = (clickWidth / progressBarWidth) * 100;
    var sec = (clickWidth / progressBarWidth) * this.song.duration();
    this.song.seek(sec);
  }

  addSongEventListeners() {
    this.song.on('load', () => {
      // ...
    });

    this.song.on('play', () => {
      // set song title
      this.playerTitle = this.playlist[this.songPlaylistIndex].title;

      // set song artists
      this.playerArtists = this.playlist[this.songPlaylistIndex].artists;

      // set song album
      this.playerAlbum = this.playlist[this.songPlaylistIndex].album;

      // set song time
      var sec, min;
      var dur = Math.round(this.song.duration());
      sec = Math.round(((dur / 60) % 1) * 60);
      min = Math.floor(dur / 60);
      this.time = min + ":" + sec;
    });

    this.song.on('end', () => {
      clearInterval(this.updateSeekPosInterval);
      // play next song
      this.next();
    });
  }

}
