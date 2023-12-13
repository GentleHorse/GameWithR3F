import Lights from "./components/misc/Lights.jsx";
import Level from "./components/Level.jsx";
import Scene from "./components/Scene.jsx";
import { Physics } from "@react-three/rapier";
import BlockSpinner from "./components/blocks/BlockSpinner.jsx";
import BlockLimbo from "./components/blocks/BlockLimbo.jsx";
import BlockAxe from "./components/blocks/BlockAxe.jsx";
import Player from "./components/Player.jsx";

export default function Experience() {
  return (
    <>
      <Scene />

      <Physics debug>
        <Lights />
        <Level />
        <Player position={[0, 1, 0]} />
      </Physics>
    </>
  );
}
