import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const textureLoader = new THREE.TextureLoader();
const imageUrls = [
  "/images/react.webp",
  "/images/node.webp",
  "/images/mongo.webp",
  "/images/mysql.webp",
  "/images/javascript.webp",
  "/images/Pyhton.webp",
  "/images/Pytroch.webp",
  "/images/CSS.webp",
  "/images/HTML.webp",
  "/images/redis.webp",
  "/images/4j.webp",
  "/images/flow.webp",
  "/images/chain.webp",
  "/images/graph.webp",
  "/images/vision.webp",
  "/images/zap.webp",
  "/images/sci.webp",
  "/images/n8n.webp",
  "/images/docker.webp",
  "/images/dj.webp",
  "/images/airtable.webp",
  "/images/cone.webp",
  "/images/bi.webp",
  "/images/l.webp",
  "/images/f.webp",
  "/images/o.webp",
  "/images/c.webp",
  "/images/h.webp",
  "/images/p.webp",
  "/images/g.webp",
  "/images/k.webp",
];

const textures = imageUrls.map((url) => textureLoader.load(url));
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const techSpheres = imageUrls.map((_, index) => {
  const cols = 5;
  const rows = Math.ceil(imageUrls.length / cols);

  const col = index % cols;
  const row = Math.floor(index / cols);

  const x = (col - (cols - 1) / 2) * 3.2 + (row % 2 === 0 ? 0.3 : -0.3);
  const y = (rows / 2 - row) * 2.5 + (col % 2 === 0 ? 0.5 : -0.5);
  const z = ((index % 3) - 1) * 2.4;

  return {
    scale: [0.7, 1, 0.8, 1, 1][index % 5],
    position: [x, y, z] as [number, number, number],
  };
});

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  position?: [number, number, number];
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  position = [0, 0, 0],
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;

    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={position}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;

    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );

    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    refresh();

    const rafId = requestAnimationFrame(refresh);
    const timeoutId1 = setTimeout(refresh, 100);
    const timeoutId2 = setTimeout(refresh, 300);
    const timeoutId3 = setTimeout(refresh, 600);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document.getElementById("work")!.getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };

    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);

        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <div className="techstack">
      <h2> My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {techSpheres.map((props, i) => (
            <SphereGeo
              key={imageUrls[i]}
              {...props}
              material={materials[i]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;