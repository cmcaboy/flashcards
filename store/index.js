import { createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducer from '../reducers';
import storage from 'redux-persist/es/storage';

const config = {
      key: 'root',
      storage
};

const combiReducer = persistCombineReducers(config,{reducer});


export const store = createStore(combiReducer);
export const persistor = persistStore(store);
  