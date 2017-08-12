import { SlidePuzzlePage } from './app.po';

describe('slide-puzzle App', () => {
  let page: SlidePuzzlePage;

  beforeEach(() => {
    page = new SlidePuzzlePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
