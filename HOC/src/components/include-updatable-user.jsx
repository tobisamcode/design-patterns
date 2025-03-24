import { useEffect, useState } from "react";

export const includeUpdatableUser = (Component, userId) => {
  return (props) => {
    const [initialUser, setInitialUser] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
      async () => {
        const response = await axios.get(`/users/${userId}`);
        const data = response.data;
        setInitialUser(data);
        setUser(data);
      };
    }, []);
    return <Component {...props} user={user} />;
  };
};
