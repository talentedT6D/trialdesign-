import React, { createContext, useContext, useRef } from "react";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const fileRef = useRef(null);

  const setFile = (file) => {
    fileRef.current = file;
  };

  const getFile = () => fileRef.current;

  const clearFile = () => {
    fileRef.current = null;
  };

  return (
    <FileContext.Provider value={{ setFile, getFile, clearFile }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => useContext(FileContext);
