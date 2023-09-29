import { waitFor, fireEvent } from '@testing-library/dom';
import { profile } from '../src/component/profile';
import * as firebase from '../src/lib/firebase'; // Importa el módulo de Firebase
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
  it.only('should show the posts only from the active user', async () => {
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

    console.log(document.body.innerHTML);
    expect(document.body.innerHTML).toContain('Contenido del Post 1');
    expect(document.body.innerHTML).not.toContain('Contenido del Post 2');
  });
  it('should navigate to "/feed" when click to the icon', async () => {
    const navigateToMock = jest.fn();
    const getUserId = jest.fn();
    const getUserPhoto = jest.fn();
    const getUserName = jest.fn();
    const section = await profile(navigateToMock, getUserPhoto, getUserId, getUserName);
    const backTofeed = section.querySelector('#go_back');
    backTofeed.click();

    expect(navigateToMock).toHaveBeenCalledWith('/feed');
  });
  it('should navigate to "/create_post" when click to the icon', async () => {
    const navigateToMock = jest.fn();
    const getUserId = jest.fn();
    const getUserPhoto = jest.fn();
    const getUserName = jest.fn();
    const section = await profile(navigateToMock, getUserPhoto, getUserId, getUserName);
    const createPost = section.querySelector('#add_post');
    createPost.click();

    expect(navigateToMock).toHaveBeenCalledWith('/create_post');
  });
  // eslint-disable-next-line jest/no-focused-tests
  it('should toggle class on drop down click', async () => {
    // Crear un contenedor en el DOM simulado
    const container = document.createElement('div');
    document.body.appendChild(container);

    // Configurar funciones mock y espías
    const navigateToMock = jest.fn();
    const getUserId = jest.fn().mockReturnValue('id-del-usuario');
    const getUserPhoto = jest.fn();
    const getUserName = jest.fn();
    const getPostsMock = jest.spyOn(firebase, 'getPosts'); // Espía la función real
    getPostsMock.mockResolvedValue([
      { id: 'post-1', userId: 'id-del-usuario', name: 'Post 1', creationDate: { toDate: () => new Date() }, content: 'Contenido del Post 1' },
      { id: 'post-2', userId: 'otro-id', name: 'Post 2', creationDate: { toDate: () => new Date() }, content: 'Contenido del Post 2' },
    ]);

    container.appendChild(await profile(navigateToMock, getUserPhoto, getUserId, getUserName));

    const sectionProfile = document.querySelector('.profile_section');

    await waitFor(() => {
      const postElements = sectionProfile.querySelectorAll('.div_post');
      expect(postElements).toHaveLength(1);
    });

    const dropDownDiv = sectionProfile.querySelector('.drop_down');

    /* const dropDownContent = dropDownDiv.querySelectorAll('.drop_down_content');
    console.log(dropDownContent.outerHTML);

    dropDownDiv.forEach((ele) => {
      // const dropDownContent = dropDownDiv.querySelector('.drop_down_content');
      fireEvent.click(ele);
      console.log(ele.outerHTML);
    }); */

    fireEvent.click(dropDownDiv);

    const dropDownContent = dropDownDiv.querySelector('.drop_down_content');

    // waitFor(() => {
    console.log(dropDownContent.classList.contains('show'));
    // expect(dropDownContent.classList.contains('show')).toBeTruthy();
    // });

    // const clickEvent = new MouseEvent('click', {
    //   bubbles: true,
    //   cancelable: true,
    // });
    // dropDownDiv.dispatchEvent(clickEvent);

    // await waitFor(() => {
    //   console.log(dropDownContent.classList.contains('show'));
    //   // expect(dropDownContent.classList.contains('show')).toBeFalsy();
    //   // dropDownDiv.dispatchEvent(clickEvent);
    //   // expect(dropDownContent.classList.contains('show')).toBeTruthy();
    // });
  });
});
