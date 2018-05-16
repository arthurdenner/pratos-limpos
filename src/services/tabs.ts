import { Injectable } from '@angular/core';

// Declare TabsService as a provider in app.module.ts
// Inject TabsService in your class: constructor(public tabs: TabsService){}
// Use the this.tabs.hide() or this.tabs.show() methods wherever you want
@Injectable()
export class TabsService {
  constructor() {}

  public hide() {
    let tabs = document.querySelectorAll('.tabbar');
    let scrollContent = document.querySelectorAll('.scroll-content');
    if (tabs !== null) {
      Object.keys(tabs).map(key => {
        tabs[key].style.transform = 'translateY(56px)';
      });

      // fix for removing the margin if you got scorllable content
      setTimeout(() => {
        Object.keys(scrollContent).map(key => {
          scrollContent[key].style.marginBottom = '0';
        });
      });
    }
  }

  public show() {
    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map(key => {
        tabs[key].style.transform = 'translateY(0px)';
      });
    }
  }
}
