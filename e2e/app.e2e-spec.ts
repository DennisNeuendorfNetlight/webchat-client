import { WebchatClientPage } from './app.po';

describe('webchat-client App', function() {
  let page: WebchatClientPage;

  beforeEach(() => {
    page = new WebchatClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
