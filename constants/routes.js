const ROUTES = {
  LANDING: '/',
  PUBLIC: {
    HOME: 'home',
    BOOKS: 'books',
    BOOK_DETAILS: 'book/:id', // Dynamic route parameter for book ID
    CART: 'cart',
    PROFILE: 'profile',
    EDIT_PROFILE: 'profile/edit-profile',
    MY_ORDERS: 'profile/my-orders',
    INVOICE: 'invoice/:id', // Dynamic route parameter for invoice ID
  },
  AUTH: {
    SIGN_UP: 'auth/signup',
    LOG_IN: 'auth/login',
    FORGOT_PASSWORD: 'auth/forgot-password',
  },
  DASHBOARD: {
    HOME: 'dashboard/home',
    MY_PROFILE: 'dashboard/my-profile',
    LIST_OF_BOOKS: 'dashboard/list-of-books',
    EDIT_BOOK: 'dashboard/edit-book/:id', // Dynamic route parameter for book ID
    ADD_NEW_BOOK: 'dashboard/add-new-book',
    LIST_OF_USERS: 'dashboard/list-of-users',
    EDIT_USER: 'dashboard/edit-user/:id', // Dynamic route parameter for user ID
    ADD_NEW_USER: 'dashboard/add-new-user',
    LIST_OF_ORDERS: 'dashboard/list-of-orders',
    EDIT_ORDER: 'dashboard/edit-order/:id', // Dynamic route parameter for order ID
    ADD_NEW_ORDER: 'dashboard/add-new-order',
  },
};

export default ROUTES;
