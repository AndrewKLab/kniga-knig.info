import { combineReducers } from 'redux';

import { users } from './users.reducer';

import { style } from './styles.reducer';
import { search } from './search.reducer';


import { courses } from './courses.reducer';
import { courses_categories } from './courses_categories.reducer';
import { courses_users_progress } from './courses_users_progress.reducer';
import { lessons } from './lessons.reducer';
import { lessons_users_progress } from './lessons_users_progress.reducer';
import { auth } from './auth.reducer';
import { support } from './support.reducer';

import { notifications, chats, modals, users_reviews } from '../../public/_reducers';
import coursesPromoSlice from '../../public/_store/courses_promo.slice';

const rootReducer = combineReducers({
  users,
  style,
  search,
  users_reviews,


  courses_promo: coursesPromoSlice,
  courses,
  courses_categories,
  courses_users_progress,
  lessons,
  lessons_users_progress,
  auth,
  support,
  chats,
  notifications,
  modals
});

export default rootReducer;