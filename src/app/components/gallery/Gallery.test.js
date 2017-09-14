import Gallery from './Gallery';

it('renders without crashing', () => {
  const gallery = new Gallery().render();
  expect(gallery.$el.html()).toBeTruthy();
});

