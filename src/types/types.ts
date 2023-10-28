export type UserStateType = {
  logToAccountReducer: {
    data: {
      user?: {
        token?: string;
        image?: string;
        email?: string;
        username?: string;
      } | null;
    } | null;
    error:
      | string
      | null
      | {
          errors: {
            [key: string]: string;
          };
        };
    loader: boolean;
    editingError:
      | {
          errors?: {
            username?: string;
            email?: string;
          };
        }
      | null
      | boolean
      | string;
  };
};

export type RegUserStateType = {
  registrationReducer: {
    data: null | {
      user: {
        username: string;
        email: string;
        token: string;
      };
    };
    error: string | null | { errors: { username?: string; email?: string } };
    loader: boolean;
  };
};

export type RegUserFormType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreement: string;
};

export type ArticleDataType = {
  author: {
    username: string;
    image: string;
    following: boolean;
  };

  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[] | [] | Tag[];
  title: string;
  updatedAt: string;
};

export type ArticlesStateType = {
  articlesReducer: {
    currentPage: number;
    percentLoader: number;
    loader: boolean;
    data: {
      articles: ArticleDataType[];
      articlesCount: number;
    };
  };
};

type Tag = {
  name: string;
};

export type createArticleDataType = {
  token: string | null | undefined;
  slug?: string;
  data: {
    article: {
      title: string;
      description: string;
      body: string;
      tagList: string[] | [];
    };
  };
};
