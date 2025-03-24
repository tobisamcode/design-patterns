import { checkProps } from "./components/check-props";
import { includeUser } from "./components/include-user";
import { UserInfo } from "./components/user-info";

const UserInfoWrapper = checkProps(UserInfo);
const UserInfoWrapperWithUser = includeUser(UserInfo, 1);

function App() {
  return (
    <>
      {/* <UserInfoWrapper propA="test1" blabla={{ a: 1, age: 23 }} />*/}
      <UserInfoWrapperWithUser />
    </>
  );
}

export default App;
