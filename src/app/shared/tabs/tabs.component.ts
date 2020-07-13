import { Component, OnChanges, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { ROUTES_WITHOUT_TABS } from '../constants/constants';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  showTabs = true;

  constructor(private router: Router, private platform: Platform) {
    this.platform.ready().then(() => {
      this.navEvents();
    });
  }

  navEvents() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((routerEvent: NavigationEnd) => {
      this.showTabs = true;
      ROUTES_WITHOUT_TABS.forEach((route) => {
        if (routerEvent.url.startsWith(route) || routerEvent.urlAfterRedirects.startsWith(route)) {
          this.showTabs = false;
        }
      });
    });
  }
}
