import { useRoutes } from "react-router-dom";
import ItTheme from "./components/ItTheme/ItTheme";
import { SettingsProvider } from "./contexts/SettingContext";
import routes from "./routes";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  const context = useRoutes(routes);
  return (
    <SettingsProvider>
      <ItTheme>
        <AuthProvider>{context}</AuthProvider>
      </ItTheme>
    </SettingsProvider>
  );
};

export default App;
