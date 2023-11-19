import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SourceService } from '../services/source.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [SourceService]
})
export class NavComponent implements OnInit, AfterViewInit {
  title = 'angular-tailwind-testing';
  titles: any = []
  episodes: any = []

  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  constructor(private observer: BreakpointObserver, private cdr: ChangeDetectorRef, private service: SourceService) { }

  ngOnInit(): void {
    this.service.getRickAndMortyEpisodes()
      .subscribe(data => {
        this.titles = [...Array(data.length).keys()].map(i => `S0${i + 1}`)
        this.episodes = data;
      })
  }

  ngAfterViewInit(): void {
    this.sideNav.opened = true
    this.observer.observe(['(max-width:800px)'])
      .subscribe((res) => {
        if (res?.matches) {
          this.sideNav.mode = "over"
          this.sideNav.close()
        } else {
          this.sideNav.mode = "side"
          this.sideNav.open()
        }
        this.cdr.detectChanges()
      })
  }
}
