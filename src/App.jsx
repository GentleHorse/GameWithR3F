import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { KeyboardControls } from "@react-three/drei";
import Experience from "./Experience.jsx";
import Interface from "./Interface.jsx";

export default function App() {
  /**
   * Keyboard control preset
   */
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
    // Optional animation key map
    { name: "action1", keys: ["1"] },
    { name: "action2", keys: ["2"] },
    { name: "action3", keys: ["3"] },
    { name: "action4", keys: ["KeyF"] },
  ];

  return (
    <>
      <Leva collapsed />

      <KeyboardControls map={keyboardMap}>
        <Canvas
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [2.5, 4, 6],
          }}
        >
          <Experience />
        </Canvas>
        <Interface />
      </KeyboardControls>
    </>
  );
}
