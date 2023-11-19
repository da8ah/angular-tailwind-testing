import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements AfterViewInit {
  title = 'Rick and Morty API';
  @Input() selected = 0
  @Input() titles: any = []
  @Output() selector = new EventEmitter<number>()

  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  constructor(private observer: BreakpointObserver, private cdr: ChangeDetectorRef) { }

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

  onSelection(value: number) {
    this.selector.emit(value)
  }
}
