import React from "react";

const useAuth = () => {
  const [token, setToken] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    setIsLoading(true);
    setToken(localStorage?.getItem("token"));
    setIsLoading(false);
  }, []);
  return { token, isLoading };
};

export default useAuth;
