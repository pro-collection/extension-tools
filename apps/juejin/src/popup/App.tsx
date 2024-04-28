import * as React from "react";
import "./style.css";
import ListCompoennts from "@src/popup/components/list";

const App: React.FC = () => {
  return (
    <div className="w-[600px] p-[12px]" id="container">
      <ListCompoennts />
    </div>
  );
};

export default App;
