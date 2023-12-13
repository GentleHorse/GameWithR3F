import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import BlockStart from "./Blocks/BlockStart.jsx";
import BlockEnd from "./Blocks/BlockEnd.jsx";
import BlockSpinner from "./Blocks/BlockSpinner.jsx";
import BlockLimbo from "./Blocks/BlockLimbo.jsx";
import BlockAxe from "./Blocks/BlockAxe.jsx";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor01Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor02Material = new THREE.MeshStandardMaterial({
  color: "greenyellow",
});
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

export default function Level() {
  return (
    <>
      <BlockStart
        geometry={boxGeometry}
        material={floor01Material}
        position={[0, 0, 16]}
      />
      <BlockSpinner
        position={[0, 0, 12]}
        geometry={boxGeometry}
        material={floor02Material}
        obstacleMaterial={obstacleMaterial}
      />
      <BlockLimbo
        position={[0, 0, 8]}
        geometry={boxGeometry}
        material={floor02Material}
        obstacleMaterial={obstacleMaterial}
      />
      <BlockAxe
        position={[0, 0, 4]}
        geometry={boxGeometry}
        material={floor02Material}
        obstacleMaterial={obstacleMaterial}
      />
      <BlockEnd
        position={[0, 0, 0]}
        geometry={boxGeometry}
        material={floor01Material}
      />
    </>
  );
}
