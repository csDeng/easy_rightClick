import {  
    Route, 
    Switch, 
    Redirect 
} from 'react-router';

import { 
    HashRouter 
} from 'react-router-dom';

import App from '../views/App/App'


function Routes() {
  return ( 
    <HashRouter >
    <Switch>
        <Route path='/' exact component={App} />
        {/* <Route path='/RightClick' exact component={RightClick}/> */}
        <Redirect to='/' />
    </Switch>
     
    </HashRouter>
    
  );
}

export default Routes;
