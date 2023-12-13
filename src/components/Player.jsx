import { geometries } from "./geometries.js";
import { materials } from "./materials.js";
import { RigidBody } from "@react-three/rapier";

export default function Player(props) {
  return (
    <RigidBody
      {...props}
      canSleep={false}
      colliders="ball"
      restitution={0.2}
      friction={1}
    >
      <mesh
        material={materials.player.player01}
        geometry={geometries.icoSphere}
        castShadow
      />
    </RigidBody>
  );
}
