import React, {createContext, ReactNode, useState} from 'react';

const SearchContext = createContext<{
  keyword: string;
  onChangeText: (text: string) => void;
}>({
  keyword: '',
  onChangeText: () => {},
});

interface Props {
  children: ReactNode;
}

export function SearchContextProvider({children}: Props) {
  const [keyword, onChangeText] = useState('');

  return (
    <SearchContext.Provider value={{keyword, onChangeText}}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;
