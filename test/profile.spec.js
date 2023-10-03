import { profile } from '../src/component/profile';
import {
  getPosts,
} from '../src/lib/firebase'; // Importa el módulo de Firebase

jest.mock('../src/lib/firebase');

describe('Profile', () => {
  // eslint-disable-next-line jest/no-focused-tests
  it('should be a function', () => {
    expect(typeof profile).toBe('function');
  });
  // eslint-disable-next-line jest/no-focused-tests
  it('should show the posts only from the active user', async () => {
    const navigateToMock = jest.fn();
    const getUserId = jest.fn().mockResolvedValue('id-del-usuario');
    const getUserPhoto = jest.fn();
    const getUserName = jest.fn();
    // Configura el mock para la función getPosts
    getPosts.mockResolvedValue([
      { id: 'post-1', userId: 'id-del-usuario', name: 'Post 1', creationDate: { toDate: () => new Date() }, content: 'Contenido del Post 1' },
      { id: 'post-2', userId: 'otro-id', name: 'Post 2', creationDate: { toDate: () => new Date() }, content: 'Contenido del Post 2' },
    ]);

    const section = await profile(navigateToMock, getUserPhoto, getUserId, getUserName);
    const root = document.createElement('div');
    root.id = 'root';
    root.appendChild(section);
    document.body.appendChild(root);

    expect(document.body.innerHTML).toContain('Contenido del Post 1');
    expect(document.body.innerHTML).not.toContain('Contenido del Post 2');
  });
  // eslint-disable-next-line jest/no-focused-tests
  it('should navigate to "/feed" when click to the icon', async () => {
    const navigateToMock = jest.fn();
    const getUserId = jest.fn().mockResolvedValue('id-del-usuario');
    const getUserPhoto = jest.fn();
    const getUserName = jest.fn();
    // Configura el mock para la función getPosts
    getPosts.mockResolvedValue([
      { id: 'post-1', userId: 'id-del-usuario', name: 'Post 1', creationDate: { toDate: () => new Date() }, content: 'Contenido del Post 1' },
      { id: 'post-2', userId: 'otro-id', name: 'Post 2', creationDate: { toDate: () => new Date() }, content: 'Contenido del Post 2' },
    ]);

    const section = await profile(navigateToMock, getUserPhoto, getUserId, getUserName);
    const root = document.createElement('div');
    root.id = 'root';
    root.appendChild(section);
    document.body.appendChild(root);

    const backTofeed = section.querySelector('#go_back');

    backTofeed.click();

    expect(navigateToMock).toHaveBeenCalledWith('/feed');
  });
  // eslint-disable-next-line jest/no-focused-tests
  it('should navigate to "/create_post" when click to the icon', async () => {
    const navigateToMock = jest.fn();
    const getUserId = jest.fn().mockResolvedValue('id-del-usuario');
    const getUserPhoto = jest.fn();
    const getUserName = jest.fn();
    // Configura el mock para la función getPosts
    getPosts.mockResolvedValue([
      { id: 'post-1', userId: 'id-del-usuario', name: 'Post 1', creationDate: { toDate: () => new Date() }, content: 'Contenido del Post 1' },
      { id: 'post-2', userId: 'otro-id', name: 'Post 2', creationDate: { toDate: () => new Date() }, content: 'Contenido del Post 2' },
    ]);

    const section = await profile(navigateToMock, getUserPhoto, getUserId, getUserName);
    const root = document.createElement('div');
    root.id = 'root';
    root.appendChild(section);
    document.body.appendChild(root);

    const createPost = section.querySelector('#add_post');
    createPost.click();

    expect(navigateToMock).toHaveBeenCalledWith('/create_post');
  });
});
