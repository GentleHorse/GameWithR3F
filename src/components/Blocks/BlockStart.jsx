import { Float, Text } from "@react-three/drei";

export default function BlockStart({
  position = [0, 0, 0],
  geometry,
  material,
}) {
  return (
    <group position={position}>
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          font="./fonts/SeriEa-BWxzn.woff"
          scale={0.5}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0.75, 0.65, 0]}
          rotation-y={-0.25}
        >
          Marble Race
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
      <mesh
        geometry={geometry}
        material={material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
    </group>
  );
}
