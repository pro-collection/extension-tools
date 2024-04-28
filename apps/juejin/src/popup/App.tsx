import * as React from "react";
import "./style.css";
// import imgOne from "@src/popup/imgs/01.png";

const App: React.FC = () => {
  return (
    <div>
      <div className="p-1 text-red-700">hello yanlele</div>
      <div className="text-base p-1 border border-black border-solid hover:border-red-500">guang</div>
      {/* <img src={imgOne} alt="" /> */}
    </div>
  );
};

export default App;
