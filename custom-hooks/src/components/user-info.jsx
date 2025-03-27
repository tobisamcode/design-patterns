import axios from "axios";
import { useDataSource } from "./data-source.hook";
// import { useResource } from "./resource.hook";

const fetchFromServer = (resourceUrl) => async () => {
  const response = await axios.get(resourceUrl);
  return response.data;
};

const getFromLocalStorage = (key) => () => {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
};

export const UserInfo = ({ userId }) => {
  //   const user = useResource(`/users/2`);

  const user = useDataSource(fetchFromServer(`/users/${userId}`));
  const message = useDataSource(getFromLocalStorage("msg"));

  const { name, age, country, books } = user || {};

  return user ? (
    <>
      <h2>{name}</h2>
      <p>Age: {age} years</p>
      <p>Country: {country}</p>
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book}> {book} </li>
        ))}
      </ul>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};
