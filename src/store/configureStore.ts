import { createStore, applyMiddleware, compose, Store } from 'redux';
import { rootReducer } from '../reducers';
import thunk from 'redux-thunk';
import { persistStore, persistReducer, Persistor } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import { DuoStatsStore } from '../interfaces/DuoStatsStore';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['myUsername']
};

export function configureStore(): { store: Store<DuoStatsStore>; persistor: Persistor } {
  // tslint:disable-next-line no-any
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
  const persistor = persistStore(store);

  return { store, persistor };
}
