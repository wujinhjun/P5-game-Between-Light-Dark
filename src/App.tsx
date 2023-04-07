import React, { useEffect, useRef } from "react";
import "./App.scss";
import p5 from "p5";

const App = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {}, []);

  return <div ref={canvasRef} className="p5" />;
};

export default App;
