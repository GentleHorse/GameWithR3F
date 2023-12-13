export default function BlockEnd({ position = [0, 0, 0], geometry, material }) {
    return (
      <group position={position}>
        <mesh
          geometry={geometry}
          material={material}
          position={[0, 0, 0]}
          scale={[4, 0.2, 4]}
          receiveShadow
        />
      </group>
    );
  }