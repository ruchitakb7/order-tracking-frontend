import AppRoutes from "./Approutes";
import { useEffect } from "react";
import { listenForMessages } from "./firebase/firebaseMessaging";

function App() {

  useEffect(() => {
  listenForMessages();
}, []);
  return <AppRoutes />;
}

export default App;