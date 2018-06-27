import { Component } from '@angular/core';

import { HistoryPage } from '../history/history';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = HistoryPage;
  tab3Root = ProfilePage;

  constructor() {}
}
