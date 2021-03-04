import { useMachine } from '@xstate/react';
import { appMachine, MachineContext } from './state';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import dotenv from 'dotenv';
import Header from '././components/Header';
import Booklist from '././components/Booklist';
import Addbook from '././components/Addbook';
import Editbook from '././components/Editbook';

dotenv.config();

function App() {
  const [currentMachine, sendToMachine] = useMachine(appMachine);

  return (
    <MachineContext.Provider value={[currentMachine, sendToMachine]}>
      <div className="App m-auto p-8 md:w-3/4">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" component={Booklist} exact />
            <Route path="/addbooks" component={Addbook} exact />
            <Route path="/editbook/:id" component={Editbook} exact />
          </Switch>
        </BrowserRouter>
      </div>
    </MachineContext.Provider>
  );
}

export default App;
