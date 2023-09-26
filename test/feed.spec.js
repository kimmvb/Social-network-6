import { feed } from '../src/component/feed.js';

describe('Feed', () => {
  it('Should render feed to HTML', async () => {
    const navigateTo = jest.fn();
    const getUserPhoto = jest.fn();
    const feedSection = feed(navigateTo, getUserPhoto);
    expect(feedSection).not.toBeUndefined();
  });
  it('should be a function', () => {
    expect(typeof feed).toBe('function');
  });
  it('should return a Promise', () => {
    expect(feed()).toBeInstanceOf(Promise);
  });
});
