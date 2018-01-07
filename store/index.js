import { createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducer from '../reducers';
import storage from 'redux-persist/es/storage';

// This is the recommended setup for redux-persist.

const config = {
        // Should set this to Flashcards before going live
      key: 'root3',
      storage
};

const combiReducer = persistCombineReducers(config,{reducer});


export const store = createStore(combiReducer);
export const persistor = persistStore(store);
  