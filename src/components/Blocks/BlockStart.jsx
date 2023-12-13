export default function BlockStart({ position = [0, 0, 0], geometry, material }) {
    return (
      <group position={position}>
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