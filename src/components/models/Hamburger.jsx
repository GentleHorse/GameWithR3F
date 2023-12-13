import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Hamburger(props) {
  const hamburger = useGLTF("./models/hamburger.glb");

  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  return (
    <RigidBody
      type="fixed"
      colliders="hull"
      restitution={0.2}
      friction={0}
      {...props}
      dispose={null}
    >
      <primitive object={hamburger.scene} />
    </RigidBody>
  );
}
