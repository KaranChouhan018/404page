import { useGLTF, Text, Float, MeshTransmissionMaterial } from '@react-three/drei'
import React, { useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Model() {
    const { viewport } = useThree()
    const groupRef = useRef()
    
    useFrame(() => {
      
    })

    const { nodes } = useGLTF('/medias/segment3.glb')
    
    return (
        <group ref={groupRef} scale={viewport.width < 600 ? viewport.width / 40 : viewport.width / 1}>
            {nodes.Scene.children.map((mesh, i) => (
                <Mesh data={mesh} key={i}/>
            ))}
            <Font />
        </group>
    )
}

function Font() {
    const src = '/fonts/PPNeueMontreal-Regular.ttf'
    const textOption = {
        color: "white",
        anchorX: "center",
        anchorY: "middle"
    }
    return (
        <group>
            <Text font={src} position={[0, 0, -.1]} fontSize={10} {...textOption}>
                404 
            </Text>
            <Text font={src} position={[0, -6, 0]} fontSize={1.2} {...textOption}>
                The link is dead!!!
            </Text>
        </group>
    )
}

function Mesh({ data }) {
    const materialProps = {
        thickness: 0.99,
        ior: 1.8,
        chromaticAberration: 0.8,
        resolution: 300,
    }

    return (
        <Float>
            <mesh {...data}>
                <MeshTransmissionMaterial roughness={0} transmission={0.99} {...materialProps} />
            </mesh>
        </Float>
    )
}
