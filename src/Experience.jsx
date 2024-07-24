import Level from "./components/Level.jsx";
import Scene from "./components/Scene.jsx";
import { Physics } from "@react-three/rapier";
import Player from "./components/Player.jsx";
import useGame from "./stores/useGame.jsx";

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  return (
    <>
      <Physics debug={false}>
        <Scene />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player position={[0, 1, 0]} />
      </Physics>
    </>
  );
}