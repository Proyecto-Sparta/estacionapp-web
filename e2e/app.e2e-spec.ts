import { EstacionappWebPage } from './app.po';

describe('estacionapp-web App', () => {
  let page: EstacionappWebPage;

  beforeEach(() => {
    page = new EstacionappWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
