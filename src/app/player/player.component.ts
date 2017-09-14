import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  
  @ViewChild('playerProgressBar') ppb: ElementRef;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    // this.playerService.addSongEventListeners();
  }

  ngAfterViewInit() {
    
  }

  seek(e) {
    if(this.playerService.songLoaded) {
      var offsetLeft = this.ppb.nativeElement.getClientRects()[0].left;
      var clickWidth = e.clientX - offsetLeft;
      var progressBarWidth = this.ppb.nativeElement.offsetWidth;
      this.playerService.seekPercent = (clickWidth / progressBarWidth) * 100;
      var sec = (clickWidth / progressBarWidth) * this.playerService.song.duration();
      this.playerService.song.seek(sec);
    }
  }

}
