import { Layout } from "../components/Layout";
import { ResponsiveProvider } from "../hooks/useResponsive";

export const App = () => {
  return (
    <ResponsiveProvider>
      <Layout />
    </ResponsiveProvider>
  );
};
