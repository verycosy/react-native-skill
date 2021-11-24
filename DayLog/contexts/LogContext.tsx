import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import {v4 as uuidv4} from 'uuid';
import logsStorage from '../storages/logsStorage';

export interface Log {
  id: string;
  title: string;
  body: string;
  date: string;
}

const LogContext = createContext<{
  logs: Log[];
  onCreate: (data: Omit<Log, 'id'>) => void;
  onModify: (data: Log) => void;
  onRemove: (id: string) => void;
}>({
  logs: [],
  onCreate: () => {},
  onModify: () => {},
  onRemove: () => {},
});

interface Props {
  children: ReactNode;
}

export function LogContextProvider({children}: Props) {
  const initialLogsRef = useRef(null);

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

  const onModify = (modified: Log) => {
    const nextLogs = logs.map(log => (log.id === modified.id ? modified : log));
    setLogs(nextLogs);
  };

  const onRemove = (id: string) => {
    const nextLogs = logs.filter(log => log.id !== id);
    setLogs(nextLogs);
  };

  useEffect(() => {
    (async () => {
      const savedLogs = await logsStorage.get();
      if (savedLogs) {
        initialLogsRef.current = savedLogs;
        setLogs(savedLogs);
      }
    })();
  }, []);

  useEffect(() => {
    if (logs === initialLogsRef.current) {
      return;
    }

    logsStorage.set(logs);
  }, [logs]);

  return (
    <LogContext.Provider value={{logs, onCreate, onModify, onRemove}}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;
