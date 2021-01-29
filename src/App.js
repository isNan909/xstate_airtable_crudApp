import { useMachine } from '@xstate/react';
import { appMachine, MachineContext } from './state';
import Booklist from '././components/Booklist';

function App() {
  const [currentMachine, sendToMachine] = useMachine(appMachine);

  return (
    <MachineContext.Provider value={[currentMachine, sendToMachine]}>
      <div className="App w-10/12 m-auto p-8">
        <h2 className="text-2xl text-left mb-6">Welcome to our book inventory.</h2>
        <Booklist/>
      </div>
    </MachineContext.Provider>
  );
}

export default App;
