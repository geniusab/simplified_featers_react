import user from "./assets/storage/user.json";
import { UserCard } from "./UserCard";

function App() {
  return <UserCard user={user}></UserCard>;
}

export default App;
