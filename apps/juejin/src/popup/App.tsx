import * as React from "react";
import "./style.css";
import { Button } from "antd";

const App: React.FC = () => {
  const handleClick = () => {
    console.log(`[yanle] - click`);
  };

  return (
    <div>
      <div className="p-1 text-red-700">hello yanlele</div>
      <div className="text-base p-1 border border-black border-solid hover:border-red-500">guang</div>
      <Button onClick={handleClick}>click</Button>
    </div>
  );
};

export default App;
