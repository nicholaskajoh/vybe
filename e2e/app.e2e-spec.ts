import { VybePage } from './app.po';

describe('vybe App', function() {
  let page: VybePage;

  beforeEach(() => {
    page = new VybePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
