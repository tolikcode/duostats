import { createStore, applyMiddleware, compose, Store } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import DuoStatsStore from '../interfaces/DuoStatsStore';

const configureStore = (): Store<DuoStatsStore> => {
    // tslint:disable-next-line no-any
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    
    const store = createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(thunk), autoRehydrate())
    );

    persistStore(store, {whitelist: ['myUsername']});

    return store;
};

export default configureStore;