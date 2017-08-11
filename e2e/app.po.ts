import {browser, by, element} from 'protractor';

export class EstacionappWebPage {
  navigateTo() {
    return browser.get('/');
  }

  getNavbarText() {
    return element(by.className('navbar-brand')).getText();
  }
}
