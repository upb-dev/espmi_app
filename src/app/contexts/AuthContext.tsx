import { createContext, useEffect, useReducer, ReactNode } from "react";
import moment from "moment/moment";
import axios from "../axios";
import ItLoading from "../components/ItLoading";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  // Tambahkan tipe data yang sesuai dengan properti user
}

interface AuthState {
  isAuthenticated: boolean;
  isInitailised: boolean;
  user: User | null;
}

interface LoginPayload {
  user: User;
}

interface RegisterPayload {
  user: User;
}

type ActionType = "INIT" | "LOGIN" | "LOGOUT" | "REGISTER";

interface AuthAction {
  type: ActionType;
  payload?: AuthState;
}

const initialState: AuthState = {
  //TODO ubah initialstate
  isAuthenticated: true,
  isInitailised: true,
  user: {
    first_name: "sarikhin",
    last_name: "axel",
    email: "email@mail.com",
    confirm_password: "1",
    password: "1",
  },
};

const isValidToken = (accessToken: string): boolean => {
  if (!accessToken) {
    return false;
  }
  const decodedToken: any = "";
  const currentTime = new Date();
  const exDate = moment.unix(decodedToken.exp).toDate();
  return exDate > currentTime;
};

const setSession = (accessToken: string | null): void => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common["Authorization"];
  }
};

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload!;
      return {
        ...state,
        isAuthenticated,
        isInitailised: true,
        user,
      };
    }
    case "LOGIN": {
      const { user } = action.payload as LoginPayload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case "REGISTER": {
      const { user } = action.payload as RegisterPayload;
      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext<any>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email: string, password: string) => {
    const response = await axios.post("/s1mkt/auth/login", {
      email,
      password,
    });
    const { tokens, user } = response.data;

    setSession(tokens.access.token);
    dispatch({
      type: "LOGIN",
      payload: {
        ...initialState,
        user,
      },
    });
  };

  const register = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    confirm_password: string
  ) => {
    const response = await axios.post("/s1mkt/auth/register", {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    });

    const { tokens, data } = response.data;
    const user = data;

    setSession(tokens);

    dispatch({
      type: "REGISTER",
      payload: {
        ...initialState,
        user,
      },
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    // (async () => {
    //   try {
    //     const accessToken = window.localStorage.getItem("accessToken");
    //     if (accessToken && isValidToken(accessToken)) {
    //       setSession(accessToken);
    //       const response = await axios.get("/s1mkt/auth/profile");
    //       dispatch({
    //         type: "INIT",
    //         payload: {
    //           ...initialState,
    //           isAuthenticated: true,
    //           user: response.data,
    //         },
    //       });
    //     } else {
    //       dispatch({
    //         type: "INIT",
    //         payload: {
    //           ...initialState,
    //           isAuthenticated: false,
    //           user: null,
    //         },
    //       });
    //     }
    //   } catch (err) {
    //     console.log(err);
    //     dispatch({
    //       type: "INIT",
    //       payload: {
    //         ...initialState,
    //         isAuthenticated: false,
    //         user: null,
    //       },
    //     });
    //   }
    // })();
  }, []);

  if (!state.isInitailised) {
    return <ItLoading />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
