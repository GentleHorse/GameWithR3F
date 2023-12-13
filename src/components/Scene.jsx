import { useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { button, useControls } from "leva";
import Background from "./misc/Background.jsx";

export default function Scene() {
  const [isOrbitControl, setIsOrbitControl] = useState(false);

  const { on, off } = useControls("orbitControls", {
    on: button(() => {
      setIsOrbitControl(true);
      console.log("Turn on OrbitControls")
    }),
    off: button(() => {
      setIsOrbitControl(false);
      console.log("Turn off OrbitControls")
    }),
  });

  return (
    <>
      <Perf position="top-left" />

      <Background />

      {isOrbitControl && <OrbitControls makeDefault />}
    </>
  );
}
