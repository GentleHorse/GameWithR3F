import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Lights from "./components/misc/Lights.jsx";
import Camera from "./components/misc/Camera.jsx";
import Level from "./components/Level.jsx";
import { Physics } from "@react-three/rapier";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Camera />

      <Physics debug>
        <Lights />
        <Level />
      </Physics>
    </>
  );
}
