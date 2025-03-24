import axios from "axios";
import { useEffect, useState } from "react";

const toCapitalCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const includeUpdatableResource = (
  Component,
  resourceUrl,
  resourceName
) => {
  return (props) => {
    const [initialResource, setInitialResource] = useState(null);
    const [resource, setResource] = useState(null);

    useEffect(() => {
      (async () => {
        const response = await axios.get(resourceUrl);
        const data = response.data;
        setInitialResource(data);
        setResource(data);
      })();
    }, []);

    const onChange = (updates) => {
      setResource({ ...resource, ...updates });
    };

    const onPost = async () => {
      const response = await axios.post(resourceUrl, {
        [resourceName]: resource,
      });
      setInitialResource(response.data);
      setResource(response.data);
    };

    const onReset = () => {
      setResource(initialResource);
    };

    const resourceProps = {
      [resourceName]: resource,
      [`onChange${toCapitalCase(resourceName)}`]: onChange,
      [`onPost${toCapitalCase(resourceName)}`]: onPost,
      [`onReset${toCapitalCase(resourceName)}`]: onReset,
    };

    return <Component {...props} {...resourceProps} />;
  };
};
