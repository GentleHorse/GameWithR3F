import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Camera from "./misc/Camera.jsx";
import Background from "./misc/Background.jsx";

export default function Scene() {
  return (
    <>
      <Perf position="top-left" />

      <Background />

      <OrbitControls makeDefault />

      <Camera />
    </>
  );
}
