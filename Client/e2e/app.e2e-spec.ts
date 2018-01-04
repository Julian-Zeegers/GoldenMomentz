import { WotIf.WebAppPage } from './app.po';

describe('wot-if.web-app App', () => {
  let page: WotIf.WebAppPage;

  beforeEach(() => {
    page = new WotIf.WebAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
