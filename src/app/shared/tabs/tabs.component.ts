import { Component, OnChanges, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ROUTES_WITHOUT_TABS } from '../constants/constants';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  // TODO: Check if possible to hide it only for login/register/forgot-password
  hideTabs = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((routerEvent) => {
      console.log(routerEvent);
      if (routerEvent instanceof NavigationStart) {
        this.hideTabs = ROUTES_WITHOUT_TABS.includes(routerEvent.url);
      }
    });
  }
}
