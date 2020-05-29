import React from 'react';
import { DisableLinkContext } from './disable-link-context';

const DisableLinkProvider = ({ children }) => {
  return (
    <DisableLinkContext.Provider value={{ disableActiveLinks: true }}>
      {children}
    </DisableLinkContext.Provider>
  );
};

export default DisableLinkProvider;
