type MenuItems = {
  label: string;
  uri: string;
  id: string;
};

type Category = {
  name: string;
  slug: string;
};

type Posts = {
  title: string;
  slug: string;
  modified: Date;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  categories: {
    nodes: Category[];
  };
  excerpt: string;
  author: {
    node: {
      avatar: {
        url: string;
      };
      name: string;
      slug: string;
      description:string
    };
  };
};
