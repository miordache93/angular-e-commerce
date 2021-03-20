import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit, OnChanges {
  @Input() menuItems: any[];
  constructor() { }

  ngOnInit(): void {
    // console.log(this.menuItems);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
  }

}
