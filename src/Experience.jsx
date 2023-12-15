import Lights from "./components/misc/Lights.jsx";
import Level from "./components/Level.jsx";
import Scene from "./components/Scene.jsx";
import { Physics } from "@react-three/rapier";
import BlockSpinner from "./components/blocks/BlockSpinner.jsx";
import BlockLimbo from "./components/blocks/BlockLimbo.jsx";
import BlockAxe from "./components/blocks/BlockAxe.jsx";
import Player from "./components/Player.jsx";
import useGame from "./stores/useGame.jsx";

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  return (
    <>
      <Scene />

      <Physics debug={false}>
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player position={[0, 1, 0]} />
      </Physics>
    </>
  );
}
