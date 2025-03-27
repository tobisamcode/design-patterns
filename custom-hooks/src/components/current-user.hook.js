import React, { useEffect } from "react";
import axios from "axios";

export const useCurrentUser = () => {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/current-user");
      setUser(response.data);
    })();
  }, []);

  return user;
};
