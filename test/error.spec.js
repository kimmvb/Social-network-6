import error from '../src/component/error';

describe('Error', () => {
  it('should be a function', () => {
    expect(typeof error).toBe('function');
  });
  it('should return a HTML element', () => {
    expect(error()).toBeInstanceOf(HTMLElement);
  });
  it('should return a section element with a class name called "error_container"', () => {
    expect(error().className).toBe('error_container');
  });
  it('should navigate to "/" when click "Volver a inicio"', () => {
    const navigateToMock = jest.fn();
    const section = error(navigateToMock);
    const backHome = section.querySelector('button');
    backHome.click();
    expect(navigateToMock).toHaveBeenCalledWith('/');
  });
});
