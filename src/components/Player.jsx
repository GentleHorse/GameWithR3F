import { geometries } from "./geometries.js";
import { materials } from "./materials.js";
import { useRapier, RigidBody } from "@react-three/rapier";
import { useFrame, useLoader } from "@react-three/fiber";
import {
  useKeyboardControls,
  MeshTransmissionMaterial,
  Float,
  Text,
} from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import useGame from "../stores/useGame.jsx";

export default function Player(props) {
  const body = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();

  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  const start = useGame((state) => state.start);
  const restart = useGame((state) => state.restart);
  const end = useGame((state) => state.end);
  const blocksCount = useGame((state) => state.blocksCount);

  // For mobile controls ================================
  const [mobileOrientation, setMobileOrientation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  const [isPlaying, setIsPlaying] = useState(false);

  async function requestDeviceOrientation() {
    if (
      typeof DeviceOrientationEvent != "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      // iOS 13+
      try {
        const permissionState =
          await DeviceOrientationEvent.requestPermission();

        if (permissionState === "granted") {
          window.addEventListener("deviceorientation", handleOrientation);
        }
      } catch (error) {
        console.log(error);
      }
    } else if ("DeviceOrientationEvent" in window) {
      // not iOS 13+
      window.addEventListener("deviceorientation", handleOrientation);
    } else {
      // device orientation is not supported
      alert("not supported");
    }
  }

  function handleOrientation(event) {
    let alpha = event.alpha; // z-axis 0 ~ 360
    let beta = event.beta; // x-axis -180 ~ 180
    let gamma = event.gamma; // y-axis -90 ~ 90

    setMobileOrientation({
      alpha,
      beta,
      gamma,
    });
  }

  useFrame(() => {
    if (isPlaying) {
      console.log(mobileOrientation);
    }
  });

  // Normal texture for the player's material ===========

  const stylizedBlocksNormalTexture = useLoader(
    THREE.TextureLoader,
    "./textures/stylized-blocks/normal.jpg"
  );

  // Util functions =====================================
  // Jump ---------------------------------
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

    if (hit.timeOfImpact < 0.15) {
      // add an impulse from the bottom
      body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
  };

  // Reset --------------------------------
  const reset = () => {
    body.current.setTranslation({ x: 0, y: 1, z: 0 });
    body.current.setLinvel({ x: 0, y: 0, z: 0 });
    body.current.setAngvel({ x: 0, y: 0, z: 0 });
  };

  // Make a ball jump ===================================
  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ready") {
          reset();
        }
      }
    );

    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          jump();
        }
      }
    );

    /**
     * Change phase from 'ready' to 'playing'
     */
    const unsubscribeAny = subscribeKeys(() => {
      start();
    });

    // Clean up functions when the component gets destroyed
    return () => {
      unsubscribeJump();
      unsubscribeAny();
      unsubscribeReset();
    };
  }, []);

  // Make a boll roll =====================================
  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    /**
     * PC controls
     */
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

    /**
     * Mobile controls
     */
    // forward
    if (isPlaying && mobileOrientation.beta < 45 && mobileOrientation.beta > 0) {
      if (mobileOrientation.beta < 30) {
        impulse.z -= impulseStrength * 0.4;
        torque.x -= torqueStrength * 0.4;
      }

      impulse.z -= impulseStrength * 0.2;
      torque.x -= torqueStrength * 0.2;
    }

    // backward
    if (isPlaying && mobileOrientation.beta > 45 && mobileOrientation.beta < 90) {
      if (mobileOrientation.beta > 60) {
        impulse.z += impulseStrength * 0.4;
        torque.x += torqueStrength * 0.4;
      }

      impulse.z += impulseStrength * 0.2;
      torque.x += torqueStrength * 0.2;
    }

    body.current.applyImpulse(impulse);
    body.current.applyTorqueImpulse(torque);
  });

  // Camera ================================================
  useFrame((state, delta) => {
    const bodyPosition = body.current.translation();

    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);

    /**
     * Change phase from 'playing' to 'ended'
     */
    if (bodyPosition.z < -(blocksCount * 4 + 2)) {
      end();
    }

    /**
     * Change phase from 'playing' to 'ready'
     */
    if (bodyPosition.y < -4) {
      restart();
    }
  });

  // Render ================================================
  return (
    <>
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
          // material={materials.player.player01}
          geometry={geometries.icoSphere}
          castShadow
        >
          <MeshTransmissionMaterial
            backside
            samples={6} // refraction samples, default: 6
            transmission={1}
            thickness={0.9}
            chromaticAberration={0.05}
            anisotropy={0.9} // the structural property of non-uniformity in different directions, default: 0.1
            distortion={2.0} // default: 0
            distortionScale={0.6}
            temporalDistortion={0.1} // speed of movement, default: 0.0
            iridescence={1} // certain surfaces that appear gradually to change colour
            iridescenceIOR={1}
            iridescenceThicknessRange={[100, 400]}
            normalMap={stylizedBlocksNormalTexture}
          />
        </mesh>
      </RigidBody>

      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          font="./fonts/SeriEa-BWxzn.woff"
          scale={0.25}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0, 0.65, 0.35]}
          rotation-y={-0.15}
          onClick={() => {
            requestDeviceOrientation();
            setIsPlaying(true);
          }}
        >
          {!isPlaying ? "Ready?" : "Go!"}
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
    </>
  );
}
