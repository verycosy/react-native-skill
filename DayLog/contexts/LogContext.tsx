import React, {createContext, ReactNode, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

export interface Log {
  id: string;
  title: string;
  body: string;
  date: string;
}

const LogContext = createContext<{
  logs: Log[];
  onCreate: (data: Omit<Log, 'id'>) => void;
}>({
  logs: [],
  onCreate: () => {},
});

interface Props {
  children: ReactNode;
}

export function LogContextProvider({children}: Props) {
  const [logs, setLogs] = useState<Log[]>(
    Array.from({length: 10})
      .map((_, i) => ({
        id: uuidv4(),
        title: `Log ${i}`,
        body: `Log ${i}`,
        date: new Date().toISOString(),
      }))
      .reverse(),
  );

  const onCreate = ({title, body, date}: Omit<Log, 'id'>) => {
    const log = {
      id: uuidv4(),
      title,
      body,
      date,
    };

    setLogs([log, ...logs]);
  };

  return (
    <LogContext.Provider value={{logs, onCreate}}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;
