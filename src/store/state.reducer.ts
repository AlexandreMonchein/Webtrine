export const initialState = {
  client: "webtrine",
  socials: {
    facebook: {
      profileId: 100010455097064,
    },
    instagram: {
      profileId: "alexandre_monschein",
    },
    x: {
      profileId: "Chiormaaa",
    },
    linkedIn: {
      profileId: "alexandre-monschein-34984a161",
    },
  },
  layout: {
    main: {
      templates: [
        {
          type: "banner",
          id: "banner",
          datas: {
            title: "Webtrine",
            subTitle: "Il n'as jamais été aussi simple de se faire connaître",
          },
        },
        {
          type: "description",
          id: "description",
          datas: {
            features: { isReversed: false, isCentered: false },
            title: "Enim ex aliquip reprehenderit ad excepteur",
            content:
              "Enim ex aliquip reprehenderit ad excepteur aliqua excepteur amet proident duis qui exercitation. Exercitation laboris duis elit mollit ut incididunt adipisicing voluptate irure adipisicing minim culpa proident. Proident nostrud cillum sint Lorem excepteur. Laboris non exercitation sint do quis id deserunt exercitation sunt sunt pariatur ullamco esse.",
            src: "https://via.placeholder.com/400",
          },
        },
        {
          type: "showcase",
          id: "showcase",
          datas: {
            features: {},
            content: [
              {
                image: "https://via.placeholder.com/150",
                title: "Item 1",
                description: "This is the description for item 1.",
              },
              {
                image: "https://via.placeholder.com/150",
                title: "Item 2",
                description: "This is the description for item 2.",
              },
              {
                image: "https://via.placeholder.com/150",
                title: "Item 3",
                description: "This is the description for item 3.",
              },
              {
                image: "https://via.placeholder.com/150",
                title: "Item 4",
                description: "This is the description for item 4.",
              },
              {
                image: "https://via.placeholder.com/150",
                title: "Item 5",
                description: "This is the description for item 5.",
              },
              {
                image: "https://via.placeholder.com/150",
                title: "Item 6",
                description: "This is the description for item 6.",
              },
              {
                image: "https://via.placeholder.com/150",
                title: "Item 6",
                description: "This is the description for item 6.",
              },
            ],
          },
        },
        {
          type: "description",
          id: "description",
          datas: {
            features: { isReversed: true, isCentered: true },
            title: "Enim ex aliquip reprehenderit ad excepteur",
            content:
              "Enim ex aliquip reprehenderit ad excepteur aliqua excepteur amet proident duis qui exercitation. Exercitation laboris duis elit mollit ut incididunt adipisicing voluptate irure adipisicing minim culpa proident. Proident nostrud cillum sint Lorem excepteur. Laboris non exercitation sint do quis id deserunt exercitation sunt sunt pariatur ullamco esse.",
            src: "https://via.placeholder.com/400",
          },
        },
      ],
    },
    second: {
      templates: [
        {
          type: "display",
          id: "display",
          datas: {
            features: {},
            images: [
              {
                src: "https://via.placeholder.com/200x200",
                alt: "Image 1",
                width: 200,
                height: 200,
              },
              {
                src: "https://via.placeholder.com/400x200",
                alt: "Image 2",
                width: 400,
                height: 200,
              },
              {
                src: "https://via.placeholder.com/200x200",
                alt: "Image 3",
                width: 200,
                height: 200,
              },
              {
                src: "https://via.placeholder.com/400x200",
                alt: "Image 4",
                width: 400,
                height: 200,
              },
              {
                src: "https://via.placeholder.com/200x200",
                alt: "Image 5",
                width: 200,
                height: 200,
              },
              {
                src: "https://via.placeholder.com/400x200",
                alt: "Image 6",
                width: 400,
                height: 200,
              },
              {
                src: "https://via.placeholder.com/200x200",
                alt: "Image 7",
                width: 200,
                height: 200,
              },
              {
                src: "https://via.placeholder.com/400x200",
                alt: "Image 8",
                width: 400,
                height: 200,
              },
              {
                src: "https://via.placeholder.com/200x200",
                alt: "Image 9",
                width: 200,
                height: 200,
              },
              {
                src: "https://via.placeholder.com/400x200",
                alt: "Image 10",
                width: 400,
                height: 200,
              },
              {
                src: "https://via.placeholder.com/200x200",
                alt: "Image 11",
                width: 200,
                height: 200,
              },
              {
                src: "https://via.placeholder.com/400x200",
                alt: "Image 12",
                width: 400,
                height: 200,
              },
              {
                src: "https://via.placeholder.com/400x400",
                alt: "Image 13",
                width: 400,
                height: 400,
              },
              {
                src: "https://via.placeholder.com/200x400",
                alt: "Image 14",
                width: 200,
                height: 400,
              },
              {
                src: "https://via.placeholder.com/400x400",
                alt: "Image 15",
                width: 400,
                height: 400,
              },
              {
                src: "https://via.placeholder.com/200x400",
                alt: "Image 16",
                width: 200,
                height: 400,
              },
            ],
          },
        },
      ],
    },
    error: {
      templates: [
        {
          type: "error",
          id: "error",
          datas: {
            features: {},
          },
        },
      ],
    },
  },
};

export function stateReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
