'use client';
import { Canvas } from '@react-three/fiber'
import Model from './Model'
import { Environment } from '@react-three/drei'
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';

export default function Scene() {
    return (
        <Canvas orthographic style={{background: "black"}} camera={{position: [0, 0, 1], zoom: 800}}>
             <Model />
            <directionalLight intensity={3} position={[0, 0.1, 1]} />
            <Environment preset="city"/>
            <EffectComposer>
            <DepthOfField  />
            <Bloom/>

            <Noise opacity={0.2} />
           <Vignette eskil={false}  darkness={1.5} />
      </EffectComposer>
        </Canvas>
    )
}