import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  @Input() menuItems: any[];
  constructor() { }

  ngOnInit(): void {
    console.log(this.menuItems);
  }

}
