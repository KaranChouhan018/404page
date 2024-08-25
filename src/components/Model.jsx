import { useGLTF, Text, Float, MeshTransmissionMaterial } from '@react-three/drei'
import React, { useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Model() {
    const { viewport, camera } = useThree()
    const groupRef = useRef()

    // Adjust camera position for mobile view
    useFrame(() => {
        if (viewport.width < 400) {
            camera.position.set(0, 0, 500)
        } else {
            camera.position.set(0, 0, 5)
        }
    })

    const { nodes } = useGLTF('/medias/segment3.glb')
    
    return (
        <group 
            ref={groupRef} 
            scale={viewport.width < 400 ? viewport.width / 30 : viewport.width / 40}>
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
        anchorY: "middle",
        fontFamily : 'SUD',
    }
    return (
        <group>
            <Text font={src} position={[0, 0, -.1]} fontSize={9} {...textOption}>
                404 
            </Text>
            <Text  position={[0, -5, 0]} fontSize={ 0.5} {...textOption}>
                The link is broken!
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
