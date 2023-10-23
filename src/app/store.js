import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import groupsReducer from '../features/groups/groupsSlice';
import groupReducer from '../features/groups/groupSlice';
import loginReducer from '../features/login/loginSlice';
import membersReducer from '../features/members/membersSlice';
import memberReducer from '../features/members/memberSlice';
import coursesReducer from '../features/courses/coursesSlice';
import topicsReducer from '../features/topics/topicsSlice';
import topicReducer from '../features/topics/topicSlice';
import courseworksReducer from '../features/coursework/courseworksSlice';
import courseworkReducer from '../features/coursework/courseworkSlice';
import completedworksReducer from '../features/courses/completedworksSlice';
import isregisteredReducer from '../features/groups/isregisteredSlice';
import joinrequestsReducer from '../features/join/joinrequestsSlice';
import meetingsReducer from '../features/classes/meetingsSlice';
import assignmentsReducer from '../features/statistics/assignmentsSlice';
import absencesReducer from '../features/statistics/absencesSlice';

const persistConfig ={
  key: 'root',
  version: 1,
  storage,
  blacklist: [ 'group', 'groups', 'members', 'member', 'courses', 'topics', 'topic', 'courseworks', 'coursework', 'completedworks', 'registered', 'joinrequests', 'meetings', 'assignments', 'absences']
}

const reducer = combineReducers({
  login: loginReducer,
  groups: groupsReducer,
  group: groupReducer,
  members: membersReducer,
  member: memberReducer,
  courses: coursesReducer,
  topics: topicsReducer,
  topic: topicReducer,
  courseworks: courseworksReducer,
  coursework: courseworkReducer,
  completedworks: completedworksReducer,
  registered: isregisteredReducer,
  joinrequests: joinrequestsReducer,
  meetings: meetingsReducer,
  assignments: assignmentsReducer,
  absences: absencesReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export default store