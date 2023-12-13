import { useControls } from "leva";

export default function Background() {
    const {color} = useControls('background', {
        color: "#171517"
    })

  return (
    <>
      <color args={[color]} attach="background" />
    </>
  );
}
