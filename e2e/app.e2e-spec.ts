import {EstacionappWebPage} from './app.po';

describe('estacionapp-web App', () => {
  let page: EstacionappWebPage;

  beforeEach(() => {
    page = new EstacionappWebPage();
  });

  it('should display a navigation bar with the app name', () => {
    page.navigateTo();
    expect(page.getNavbarText()).toEqual('EstacionApp');
  });

  it('should disable login button if login form is empty', () => {
    page.navigateTo();
  })
});
