import * as THREE from "three";

const loader = new THREE.TextureLoader();

// Stone
const stoneFloorAmbientOcclusionTexture = loader.load(
  "./textures/stone-floor/ambientOcclusion.jpg"
);
const stoneFloorColorTexture = loader.load(
  "./textures/stone-floor/basecolor.jpg"
);

const stoneFloorNormalTexture = loader.load(
  "./textures/stone-floor/normal.jpg"
);
const stoneFloorRoughnessTexture = loader.load(
  "./textures/stone-floor/roughness.jpg"
);

// Water
const waterFloorAmbientOcclusionTexture = loader.load(
  "./textures/water/ambientOcclusion.jpg"
);
const waterFloorColorTexture = loader.load(
  "./textures/water/basecolor.jpg"
);

const waterFloorNormalTexture = loader.load(
  "./textures/water/normal.jpg"
);
const waterFloorRoughnessTexture = loader.load(
  "./textures/water/roughness.jpg"
);

// Plaster
const plasterFloorAmbientOcclusionTexture = loader.load(
  "./textures/plaster/ambientOcclusion.jpg"
);
const plasterFloorColorTexture = loader.load(
  "./textures/plaster/basecolor.jpg"
);

const plasterFloorNormalTexture = loader.load(
  "./textures/plaster/normal.jpg"
);
const plasterFloorRoughnessTexture = loader.load(
  "./textures/plaster/roughness.jpg"
);


const materials = {
  floor: {
    floor01: new THREE.MeshStandardMaterial({
      map: stoneFloorColorTexture,
      aoMap: stoneFloorAmbientOcclusionTexture,
      normalMap: stoneFloorNormalTexture,
      roughnessMap: stoneFloorRoughnessTexture,
    }),
    floor02: new THREE.MeshStandardMaterial({ 
      map: waterFloorColorTexture,
      aoMap: waterFloorAmbientOcclusionTexture,
      normalMap: waterFloorNormalTexture,
      roughnessMap: waterFloorRoughnessTexture,
     }),
  },
  obstacle: {
    obstacle01: new THREE.MeshStandardMaterial({ color: "orangered" }),
  },
  wall: {
    wall01: new THREE.MeshStandardMaterial({ 
      map: plasterFloorColorTexture,
      aoMap: plasterFloorAmbientOcclusionTexture,
      normalMap: plasterFloorNormalTexture,
      roughnessMap:plasterFloorRoughnessTexture,
     }),
  },
};

export { materials };
