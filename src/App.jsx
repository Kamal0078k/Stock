import react, { useState } from "react";
import Percentage from "./Stock/Percentage";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Percentage />
    </>
  );
}

export default App;
