import React, { createContext, useState } from "react";
import { merge } from "lodash";
import {
  ItLayoutSettings,
  ItLayoutSettingsType,
} from "../components/ItLayout/settings";

type PartialItLayoutSettings = Partial<ItLayoutSettingsType>;
type PartialLayout1 = Partial<ItLayoutSettingsType["layout1Settings"]>;
type PartialSecondarySidebar = Partial<
  ItLayoutSettingsType["secondarySidebar"]
>;
type PartialFooter = Partial<ItLayoutSettingsType["footer"]>;

type PartialData = PartialItLayoutSettings &
  PartialLayout1 &
  PartialSecondarySidebar &
  PartialFooter;
interface SettingsContextProps {
  settings: ItLayoutSettingsType;
  updateSettings: (update: PartialData) => void;
}

export const SettingsContext = createContext<SettingsContextProps>({
  settings: ItLayoutSettings,
  updateSettings: () => {},
});

interface SettingsProviderProps {
  settings?: Partial<ItLayoutSettingsType>;
  children: React.ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  settings,
  children,
}) => {
  const [currentSettings, setCurrentSettings] = useState<ItLayoutSettingsType>(
    () => {
      const merged = Object.assign({}, ItLayoutSettings, settings);
      return merged;
    }
  );

  const handleUpdateSettings = (update: Partial<ItLayoutSettingsType>) => {
    const merged = merge({}, currentSettings, update);
    setCurrentSettings(merged);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        updateSettings: handleUpdateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
