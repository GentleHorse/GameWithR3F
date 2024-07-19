import { useMemo } from "react";
import { geometries } from "./geometries.js";
import { materials } from "./materials.js";
import BlockStart from "./blocks/BlockStart.jsx";
import BlockEnd from "./blocks/BlockEnd.jsx";
import BlockSpinner from "./blocks/BlockSpinner.jsx";
import BlockLimbo from "./blocks/BlockLimbo.jsx";
import BlockAxe from "./blocks/BlockAxe.jsx";
import Bounds from "./walls/Bounds.jsx";


export default function Level({
  count = 5,
  types = [BlockSpinner, BlockAxe, BlockLimbo],
  seed = 0
}) {
  const blocks = useMemo(() => {
    const blocks = [];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }

    return blocks;
  }, [count, types, seed]);

  return (
    <>
      <BlockStart
        geometry={geometries.cube}
        material={materials.floor.floor01Glass}
        position={[0, 0, 0]}
      />

      {blocks.map((Block, index) => (
        <Block
          key={index}
          position={[0, 0, -(index + 1) * 4]}
          geometry={geometries.cube}
          material={materials.floor.floor02Glass}
          obstacleMaterial={materials.obstacle.obstacle01Glass}
        />
      ))}

      <BlockEnd
        position={[0, 0, -(count + 1) * 4]}
        geometry={geometries.cube}
        material={materials.floor.floor01Glass}
      />

      <Bounds
        length={count + 2}
        geometry={geometries.cube}
        material={materials.wall.wall01}
      />
    </>
  );
}
