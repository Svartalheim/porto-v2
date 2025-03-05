'use client'
import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, wrapEffect } from '@react-three/postprocessing'
import { useControls } from 'leva'
import { Effect } from 'postprocessing'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

import fragmentShader from '!!raw-loader!./fragmentShader.glsl'
// import './scene.css'

class RetroEffectImpl extends Effect {
  constructor({ matrixSize = 8.0, bias = 0.5 }) {
    const uniforms = new Map([
      ['matrixSize', new THREE.Uniform(8.0)],
      ['bias', new THREE.Uniform(0.5)],
    ])

    super('RetroEffect', fragmentShader, {
      uniforms,
    })

    this.uniforms = uniforms
  }

  set matrixSize(value) {
    this.uniforms.get('matrixSize').value = value
  }

  get matrixSize() {
    return this.uniforms.get('matrixSize').value
  }

  set bias(value) {
    this.uniforms.get('bias').value = value
  }

  get bias() {
    return this.uniforms.get('bias').value
  }
}

const RetroEffect = wrapEffect(RetroEffectImpl)

const Retro = () => {
  const mesh = useRef()
  const effect = useRef()

  const { matrixSize, bias } = useControls({
    matrixSize: {
      value: '8.0',
      options: ['2.0', '4.0', '8.0'],
    },
    bias: {
      value: 0.7,
      min: 0.0,
      max: 1.0,
    },
  })

  useFrame(() => {
    effect.current.matrixSize = Number.parseInt(matrixSize, 10)
    effect.current.bias = bias
  })

  return (
    <>
      <mesh receiveShadow castShadow>
        <torusKnotGeometry args={[1, 0.25, 128, 100]} />
        <meshStandardMaterial color="cyan" />
      </mesh>
      <EffectComposer>
        <RetroEffect ref={effect} />
      </EffectComposer>
    </>
  )
}

const Scene = () => {
  return (
    <Canvas shadows dpr={[1, 2]}>
      <Suspense fallback="Loading">
        <ambientLight intensity={0.25} />
        <directionalLight position={[0, 10, 5]} intensity={10.5} />
        <color attach="background" args={['#000000']} />
        <Retro />
        <OrbitControls />
        <OrthographicCamera
          makeDefault
          position={[5, 5, 5]}
          zoom={120}
          near={0.01}
          far={500}
        />
      </Suspense>
    </Canvas>
  )
}

export default Scene
