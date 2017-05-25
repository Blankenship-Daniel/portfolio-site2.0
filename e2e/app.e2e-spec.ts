import { PortfolioSite2.0Page } from './app.po';

describe('portfolio-site2.0 App', () => {
  let page: PortfolioSite2.0Page;

  beforeEach(() => {
    page = new PortfolioSite2.0Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
