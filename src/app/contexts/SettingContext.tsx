import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import {
  ItLayoutSettings,
  ItLayoutSettingsType,
} from "../components/ItLayout/settings";

interface SettingsContextProps {
  settings: ItLayoutSettingsType;
  updateSettings: Dispatch<SetStateAction<ItLayoutSettingsType>>;
}

export const SettingsContext = createContext<SettingsContextProps>({
  settings: ItLayoutSettings,
  updateSettings: () => {
    throw new Error("udateSettings belum diimplementasikan");
  },
});

interface SettingsProviderProps {
  settings?: ItLayoutSettingsType;
  children: React.ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}) => {
  const [currentSettings, setCurrentSettings] =
    useState<ItLayoutSettingsType>(ItLayoutSettings);

  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        updateSettings: setCurrentSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
