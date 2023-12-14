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
const waterAmbientOcclusionTexture = loader.load(
  "./textures/water/ambientOcclusion.jpg"
);
const waterColorTexture = loader.load(
  "./textures/water/basecolor.jpg"
);

const waterNormalTexture = loader.load(
  "./textures/water/normal.jpg"
);
const waterRoughnessTexture = loader.load(
  "./textures/water/roughness.jpg"
);

// Plaster
const plasterAmbientOcclusionTexture = loader.load(
  "./textures/plaster/ambientOcclusion.jpg"
);
const plasterColorTexture = loader.load(
  "./textures/plaster/basecolor.jpg"
);

const plasterNormalTexture = loader.load(
  "./textures/plaster/normal.jpg"
);
const plasterRoughnessTexture = loader.load(
  "./textures/plaster/roughness.jpg"
);

// Abstract organic
const abstractOrganicAmbientOcclusionTexture = loader.load(
  "./textures/abstract-organic/ambientOcclusion.jpg"
);
const abstractOrganicColorTexture = loader.load(
  "./textures/abstract-organic/basecolor.jpg"
);

const abstractOrganicNormalTexture = loader.load(
  "./textures/abstract-organic/normal.jpg"
);
const abstractOrganicRoughnessTexture = loader.load(
  "./textures/abstract-organic/roughness.jpg"
);

// Stylized blocks
const stylizedBlocksAmbientOcclusionTexture = loader.load(
  "./textures/stylized-blocks/ambientOcclusion.jpg"
);
const stylizedBlocksColorTexture = loader.load(
  "./textures/stylized-blocks/basecolor.jpg"
);

const stylizedBlocksNormalTexture = loader.load(
  "./textures/stylized-blocks/normal.jpg"
);
const stylizedBlocksRoughnessTexture = loader.load(
  "./textures/stylized-blocks/roughness.jpg"
);

const materials = {
  floor: {
    floor01: new THREE.MeshStandardMaterial({
      color: "#1a1d2e",
      map: stoneFloorColorTexture,
      aoMap: stoneFloorAmbientOcclusionTexture,
      normalMap: stoneFloorNormalTexture,
      roughnessMap: stoneFloorRoughnessTexture,
    }),
    floor02: new THREE.MeshStandardMaterial({ 
      color: "#1a1d2e",
      map: abstractOrganicColorTexture,
      aoMap: abstractOrganicAmbientOcclusionTexture,
      normalMap: abstractOrganicNormalTexture,
      roughnessMap:abstractOrganicRoughnessTexture,
     }),
  },
  obstacle: {
    obstacle01: new THREE.MeshStandardMaterial({ 
      color: "crimson",
      // map: waterColorTexture,
      aoMap: waterAmbientOcclusionTexture,
      normalMap: waterNormalTexture,
      roughnessMap: waterRoughnessTexture
     }),
  },
  wall: {
    wall01: new THREE.MeshStandardMaterial({ 
      color: "#1a1d2e",
      map: plasterColorTexture,
      aoMap: plasterAmbientOcclusionTexture,
      normalMap: plasterNormalTexture,
      roughnessMap:plasterRoughnessTexture,
     }),
  },
  player: {
    player01: new THREE.MeshStandardMaterial({ 
      flatShading: true,
      color: "#000000",
      map: stylizedBlocksColorTexture,
      aoMap: stylizedBlocksAmbientOcclusionTexture,
      normalMap: stylizedBlocksNormalTexture,
      roughnessMap:stylizedBlocksRoughnessTexture,
     }),
  }
};

export { materials };
