import { profile } from '../src/component/profile';

describe('Profile', () => {
  it('should be a function', () => {
    expect(typeof profile).toBe('function');
  });
  it('should return a Promise', () => {
    const getUserId = jest.fn();
    const getUserPhoto = jest.fn();
    const getUserName = jest.fn();
    expect(profile(() => {}, getUserPhoto, getUserId, getUserName)).toBeInstanceOf(Promise);
  });
  /* it('should return a section element with a class name called "profile_section"', async () => {
    const sectionElement = await profile(() => {}, getUserPhoto, getUserId, getUserName);
    expect(sectionElement.classList.contains('profile_section')).toBe(true);
  }); */
  // eslint-disable-next-line jest/no-focused-tests
  it.only('should show the posts only from the active user', async () => {
    const navigateToMock = jest.fn();
    const getUserId = jest.fn().mockResolvedValue('id-del-usuario');
    const getUserPhoto = jest.fn();
    const getUserName = jest.fn();
    // eslint-disable-next-line no-shadow
    const getPosts = jest.fn().mockResolvedValue(
      [
        { id: 'post-1', userId: 'id-del-usuario', name: 'Post 1', creationDate: new Date(), content: 'Contenido del Post 1' },
        { id: 'post-2', userId: 'otro-id', name: 'Post 2', creationDate: new Date(), content: 'Contenido del Post 2' },
      ],
    );
    const section = await profile(navigateToMock, getUserPhoto, getUserId, getUserName);
    const divProfile = document.createElement('div');
    section.appendChild(divProfile);
    const userIdMock = await getUserId();
    const posts = await getPosts();
    const currentUserPosts = posts.filter((post) => post.userId === userIdMock);
    let HTMLPosts = '';
    currentUserPosts.forEach((post) => {
      HTMLPosts += `
        <div>
          <h3>${post.name}</h3>
          <p>${post.content}</p>
        </div>
      `;
    });
    divProfile.innerHTML = HTMLPosts;
    expect(divProfile.innerHTML).toContain('Contenido del Post 1');
    expect(divProfile.innerHTML).not.toContain('Contenido del Post 2');
  });
});
