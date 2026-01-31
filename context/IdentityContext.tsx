
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PROFILE_IMAGES } from '../constants/assets';

interface IdentityContextType {
  profileImage: string;
  updateIdentity: (newImage: string) => void;
}

const IdentityContext = createContext<IdentityContextType | undefined>(undefined);

export const IdentityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profileImage, setProfileImage] = useState(PROFILE_IMAGES.hero);

  const updateIdentity = (newImage: string) => {
    setProfileImage(newImage);
  };

  return (
    <IdentityContext.Provider value={{ profileImage, updateIdentity }}>
      {children}
    </IdentityContext.Provider>
  );
};

export const useIdentity = () => {
  const context = useContext(IdentityContext);
  if (!context) throw new Error('useIdentity must be used within IdentityProvider');
  return context;
};
