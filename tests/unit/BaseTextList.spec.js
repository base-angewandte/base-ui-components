import { shallowMount } from '@vue/test-utils';
import BaseTextList from '@/components/BaseTextList/BaseTextList';

describe('BaseTextList', () => {
  const build = () => {
    const wrapper = shallowMount(BaseTextList, {
      propsData: {
        data: [
          {
            label: 'Vero eos et accusam',
            data: 'no sea takimata sanctus est Lorem ipsum dolor sit amet.',
          },
          {
            label: 'Vero eos et accusam',
            data: [
              'Lorem ipsum dolor sit amet',
              'Consetetur sadipscing elitr, sed diam nonumy',
              'Eirmod tempor invidunt',
            ],
          },
          {
            label: 'Vero eos et accusam',
            data: [
              {
                label: 'www',
                value: 'http://base.uni-ak.ac.at',
                url: 'http://base.uni-ak.ac.at',
              },
              {
                label: 'email',
                value: 'base@uni-ak.ac.at',
                url: 'mailto:base@uni-ak.ac.at',
              },
              {
                label: 'Labore',
                value: 'Dolore magna aliquyam erat',
              },
            ],
          },
        ],
      },
    });

    return {
      wrapper,
      p: () => wrapper.find('p'),
      ul: () => wrapper.find('ul'),
      li: () => wrapper.find('li'),
      dl: () => wrapper.find('dl'),
      dt: () => wrapper.find('dt'),
      dd: () => wrapper.find('dd'),
      a: () => wrapper.find('a'),
      baseClass: () => wrapper.find('.base-text-list'),
    };
  };

  it('renders the component', () => {
    // arrange
    const {
      wrapper,
      baseClass,
    } = build();

    // assert
    expect(wrapper.html())
      .toMatchSnapshot();

    expect(baseClass()
      .exists())
      .toBe(true);
  });

  it('renders <p> if object data value is a string', () => {
    // arrange
    const { p } = build();

    // assert
    expect(p()
      .exists())
      .toBe(true);
  });

  it('renders <ul> if object data value is an array', () => {
    // arrange
    const { ul, li } = build();

    // assert
    expect(ul()
      .exists())
      .toBe(true);
    expect(li()
      .exists())
      .toBe(true);
  });

  it('renders <dl> if object data value is an object', () => {
    // arrange
    const { a, dl, dt, dd } = build();

    // assert
    expect(dl()
      .exists())
      .toBe(true);
    expect(dt()
      .exists())
      .toBe(true);
    expect(dd()
      .exists())
      .toBe(true);
    expect(a()
      .exists())
      .toBe(true);
  });
});
