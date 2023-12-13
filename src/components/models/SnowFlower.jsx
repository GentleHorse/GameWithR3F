import * as THREE from "three";
import { useState, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";

const SnowFlower = (props) => {
  const { nodes, materials } = useGLTF("./models/snowFlowerLowPoly.glb");

  const snowFlowerRef = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * 0.2, 0));
    snowFlowerRef.current.setNextKinematicRotation(rotation);
  });

  return (
    <RigidBody
      ref={snowFlowerRef}
      type="kinematicPosition"
      colliders="hull"
      restitution={0.2}
      friction={0}
      {...props}
      dispose={null}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={props.material}
      />
    </RigidBody>
  );
};

export default SnowFlower;

// useGLTF.preload("/snowFlowerLowPoly.glb");
