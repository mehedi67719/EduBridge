import { useState } from "react";
import { Loadingcontext } from "./LoadingContext";


const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Loadingcontext.Provider value={{ loading, setLoading }}>
      {children}
    </Loadingcontext.Provider>
  );
};

export default LoadingProvider;