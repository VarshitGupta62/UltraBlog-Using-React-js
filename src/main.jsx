import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routers from './routes/Routers';
import  { Provider } from "react-redux";
import store  from './store/store';

ReactDOM.render(
 <>
 <Provider store={store}>
  <Routers/>
 </Provider>
 </>,
  document.getElementById('root')
);
