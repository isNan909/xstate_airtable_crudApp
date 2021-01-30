import { useMachine } from '@xstate/react';
import { appMachine, MachineContext } from './state';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Booklist from '././components/Booklist';
import Addbook from '././components/Addbook';
import Header from '././components/Header';

function App() {
  const [currentMachine, sendToMachine] = useMachine(appMachine);

  return (
    <MachineContext.Provider value={[currentMachine, sendToMachine]}>
      <div className="App w-10/12 m-auto p-8">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/">
              <Booklist />
            </Route>
            <Route path="/addbooks">
              <Addbook />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </MachineContext.Provider>
  );
}

export default App;
