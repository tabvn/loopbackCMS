import { BackendAppPage } from './app.po';

describe('backend-app App', () => {
  let page: BackendAppPage;

  beforeEach(() => {
    page = new BackendAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
