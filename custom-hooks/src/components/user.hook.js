import React, { useEffect } from "react";
import axios from "axios";

export const useUser = (userId) => {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/users/${userId}`);
      setUser(response.data);
    })();
  }, [userId]);

  return user;
};
