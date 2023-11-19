import { Component, OnInit } from '@angular/core';
import { SourceService } from './services/source.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SourceService]
})
export class AppComponent implements OnInit {
  selected = 0
  titles: any = []
  episodes: any = []

  constructor(private service: SourceService) { }

  ngOnInit(): void {
    this.service.getRickAndMortyEpisodes()
      .subscribe(data => {
        this.titles = [...Array(data.length).keys()].map(i => `S0${i + 1}`)
        this.episodes = data;
      })
  }

  changeSelection(value: number) {
    if (value >= 0 && value <= 5) this.selected = value;
  }
}
