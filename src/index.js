import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integrations/react';
import App from './app/app.component';
import { store, persistor } from './redux/store';
import * as serviceWorker from './serviceWorker';
import './index.style.scss';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <PersistGate persistor={persistor} >
        <App />
      </PersistGate>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
