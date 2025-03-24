import axios from "axios";
import { useEffect, useState } from "react";

export const includeUser = (Component, userId) => {
  return (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      (async () => {
        const response = await axios.get(`/users/${userId}`);
        const data = response.data;
        setUser(data);
      })();
    }, [userId]);

    return <Component {...props} user={user} />;
  };
};
