import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function StarField() {
    const ref = useRef();
    const { mouse } = useThree();

    // Generate random points
    const points = useMemo(() => {
        const p = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000; i++) {
            p[i * 3] = (Math.random() - 0.5) * 10;
            p[i * 3 + 1] = (Math.random() - 0.5) * 10;
            p[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return p;
    }, []);

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;

        // Mouse reaction: parallax effect
        ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouse.x * 0.5, 0.1);
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouse.y * 0.5, 0.1);
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#6366f1"
                    size={0.015}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

function FloatingShapes() {
    const meshRef = useRef();
    const { mouse } = useThree();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = Math.sin(time / 4);
        meshRef.current.rotation.y = Math.cos(time / 2);

        // Dynamic color based on mouse position
        const r = (mouse.x + 1) / 2;
        const g = (mouse.y + 1) / 2;
        const b = 1 - r;
        meshRef.current.material.color.setRGB(r, g, b);
    });

    return (
        <mesh ref={meshRef} position={[2, 1, -2]}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial wireframe color="#4f46e5" />
        </mesh>
    );
}

export default function Background() {
    return (
        <div className="fixed inset-0 -z-10 bg-slate-950">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <StarField />
                <FloatingShapes />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
        </div>
    );
}
