import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const BREAKPOINTS = {
  XS: 0,
  SM: 600,
  MD: 900,
  LG: 1200,
  XL: 1536,
};

const ResponsiveContext = createContext({
  screenSize: "",
  minWidth: () => {},
  maxWidth: () => {},
});

export const useResponsive = () => {
  return useContext(ResponsiveContext);
};

export const ResponsiveProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [screenSize, setScreenSize] = useState();

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const minWidth = useCallback(
    (BP) => {
      console.log(BREAKPOINTS[BP], windowWidth);
      return windowWidth >= BREAKPOINTS[BP];
    },
    [windowWidth]
  );

  const maxWidth = useCallback(
    (BP) => {
      return windowWidth < BREAKPOINTS[BP];
    },
    [windowWidth]
  );

  useEffect(() => {
    if (windowWidth < BREAKPOINTS.SM) {
      setScreenSize("xs");
    } else if (windowWidth < BREAKPOINTS.MD) {
      setScreenSize("sm");
    } else if (windowWidth < BREAKPOINTS.LG) {
      setScreenSize("md");
    } else if (windowWidth < BREAKPOINTS.XL) {
      setScreenSize("lg");
    } else {
      setScreenSize("xl");
    }
  }, [windowWidth]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ResponsiveContext.Provider value={{ screenSize, minWidth, maxWidth }}>
      {children}
    </ResponsiveContext.Provider>
  );
};
