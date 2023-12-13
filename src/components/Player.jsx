import { geometries } from "./geometries.js";
import { materials } from "./materials.js";
import { useRapier, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function Player(props) {
  const body = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();
  

  // Make a ball jump ===================================
  const jump = () => {
    // origin is its contact point to the floor
    const origin = body.current.translation();
    origin.y -= 0.31;

    // rapier version ray casting
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);

    // 10 -> maxium distance of ray
    // true -> consider everything as a solid object
    const hit = world.castRay(ray, 10, true);

    if (hit.toi < 0.15) {
      // add an impulse from the bottom
      body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
  };

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          jump();
        }
      }
    );

    return () => {
        unsubscribeJump();
    }
  }, []);

  // Make a boll roll =====================================
  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    body.current.applyImpulse(impulse);
    body.current.applyTorqueImpulse(torque);
  });

  // Render ================================================
  return (
    <RigidBody
      {...props}
      ref={body}
      canSleep={false}
      colliders="ball"
      restitution={0.2}  
      friction={1}
      // To more realistic ball's movements
      // Allow forces diminishing gradually
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <mesh
        material={materials.player.player01}
        geometry={geometries.icoSphere}
        castShadow
      />
    </RigidBody>
  );
}