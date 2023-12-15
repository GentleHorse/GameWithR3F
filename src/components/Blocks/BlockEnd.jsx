import { useState } from "react";
import { Float, Text, MeshTransmissionMaterial } from "@react-three/drei";
import SnowFlower from "../models/SnowFlower.jsx";
import Hamburger from "../models/Hamburger.jsx";

export default function BlockEnd({ position = [0, 0, 0], geometry, material }) {
  const [glassMaterial, setGlassMaterial] = useState();

  return (
    <>
      <MeshTransmissionMaterial
        ref={setGlassMaterial}
        color="snow"
        transmissionSampler
        transmission={0.98}
        thickness={0.3}
        backsideThickness={0.2}
        chromaticAberration={0.1}
        distortion={0.7}
      />

      <group position={position}>
      <Text
          font="./fonts/SeriEa-BWxzn.woff"
          scale={1}
          position={[0, 2.25, 2]}
        >
          Finish
          <meshBasicMaterial toneMapped={false} />
        </Text>
        <mesh
          geometry={geometry}
          material={material}
          position={[0, 0, 0]}
          scale={[4, 0.2, 4]}
          receiveShadow
        />
        <SnowFlower material={glassMaterial} position={[0, 0, 0]} scale={5} />
        {/* <Hamburger position={[0, 0.25, 0]} scale={0.2}/> */}
      </group>
    </>
  );
}
