import { includeUpdatableResource } from "./include-updatable-resource";

export const UserInfoForm = includeUpdatableResource(
  ({ user, onChangeUser, onPostUser, onResetUser }) => {
    const { name, age, country } = user || {};

    return user ? (
      <>
        <div className="">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => onChangeUser({ name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => onChangeUser({ age: Number(e.target.value) })}
            />
          </div>

          <button onClick={onResetUser}>Reset</button>
          <button onClick={onPostUser}>Save</button>
        </div>
      </>
    ) : (
      <h3>Loading...</h3>
    );
  },
  "/users/2",
  "user"
);
