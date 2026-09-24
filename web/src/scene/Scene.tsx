import { Suspense, useMemo, useRef, useEffect, type MutableRefObject } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField, SMAA } from '@react-three/postprocessing'
import * as THREE from 'three'
import Env from './Env'
import { FOCUS_POINTS, FRAMES_PER_NODE } from '../data/focusPoints'

const CHARACTER_MODEL = `${import.meta.env.BASE_URL}models/Meshy_AI__0924181510_texture.glb`
const HAS_TIMELINE_MODEL = false

useGLTF.preload(CHARACTER_MODEL)

const POINTS = FOCUS_POINTS as readonly string[]
const M = POINTS.length
const RESUME_FRAMES = M * FRAMES_PER_NODE
const WORKS_ENTRANCE = 50
const FPS = 24
const NODE_LINE = 0.3

function GradientBackground() {
  const top = '#f4d7df'
  const bottom = '#f7efe4'
  const steep = 1.4
  const uniforms = useMemo(() => ({
    uTop: { value: new THREE.Color(top) },
    uBottom: { value: new THREE.Color(bottom) },
    uSteep: { value: steep },
  }), [])

  return (
    <mesh scale={100}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        side={THREE.BackSide}
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`varying vec3 vDir; void main(){vDir=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`}
        fragmentShader={`uniform vec3 uTop; uniform vec3 uBottom; uniform float uSteep; varying vec3 vDir; void main(){float t=clamp(vDir.y*uSteep*0.5+0.5,0.0,1.0);gl_FragColor=vec4(mix(uBottom,uTop,t),1.0);}`}
      />
    </mesh>
  )
}

function Lights() {
  return (
    <>
      <Env intensity={0.75} rotationX={0} rotationY={0} rotationZ={0} asBackground={false} bgIntensity={0.25} bgBlur={0} />
      <hemisphereLight args={['#fff7fb', '#5a4b55', 1.35]} />
      <directionalLight position={[5, 8, 5]} intensity={2.4} color="#ffe0d0" castShadow shadow-mapSize={[2048, 2048]} />
      <directionalLight position={[-5, 4, -4]} intensity={1.8} color="#cfd8ff" />
    </>
  )
}

function NoorCharacter({ focusRef, frameRef, dofBokehRef, dofRangeRef }:{focusRef:MutableRefObject<THREE.Vector3>;frameRef:MutableRefObject<number>;dofBokehRef:MutableRefObject<number>;dofRangeRef:MutableRefObject<number>}) {
  const get = useThree((s) => s.get)
  const { scene } = useGLTF(CHARACTER_MODEL)
  const model = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((o:any) => {
      if (o.isMesh) {
        o.castShadow = true
        o.receiveShadow = true
        if (o.geometry?.computeVertexNormals) o.geometry.computeVertexNormals()
        const mats = Array.isArray(o.material) ? o.material : [o.material]
        mats.forEach((m:any) => { m.flatShading = false; m.needsUpdate = true })
      }
    })
    return clone
  }, [scene])

  const mouse = useRef({x:0,y:0})
  const smouse = useRef({x:0,y:0})
  const isMobile = useRef(typeof window !== 'undefined' && (window.matchMedia?.('(pointer: coarse)').matches === true || window.innerWidth <= 640))
  const tmpVec = useRef(new THREE.Vector3())
  const tmpQuat = useRef(new THREE.Quaternion())
  const tmpEuler = useRef(new THREE.Euler(0,0,0,'YXZ'))

  useEffect(() => {
    const onMove = (e:MouseEvent) => { mouse.current.x=(e.clientX/window.innerWidth)*2-1; mouse.current.y=-((e.clientY/window.innerHeight)*2-1) }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  },[])

  useFrame((_, dt) => {
    const camera:any = get().camera
    const me = 1 - Math.pow(0.1, dt)
    smouse.current.x += (mouse.current.x-smouse.current.x)*me
    smouse.current.y += (mouse.current.y-smouse.current.y)*me

    // Subtle hover/parallax for the static custom GLB until the animated camera pass is added.
    if (!isMobile.current) {
      const yaw = THREE.MathUtils.degToRad(-smouse.current.x*3.0)
      const pitch = THREE.MathUtils.degToRad(smouse.current.y*1.5)
      tmpEuler.current.set(pitch,yaw,0)
      tmpQuat.current.setFromEuler(tmpEuler.current)
      model.quaternion.slerp(tmpQuat.current, 0.04)
    }

    // Static character focus for current non-animated model.
    if (focusRef) focusRef.current.set(0, 1.2, 0)
    if (frameRef) frameRef.current = 0
    if (dofBokehRef) dofBokehRef.current = -1
    if (dofRangeRef) dofRangeRef.current = 0.5
    void camera
  })

  return <group position={[0,-1.7,0]} scale={2.35}><primitive object={model} /></group>
}

function Post2({focusRef, frameRef, dofBokehRef, dofRangeRef}:{focusRef:MutableRefObject<THREE.Vector3>;frameRef:MutableRefObject<number>;dofBokehRef:MutableRefObject<number>;dofRangeRef:MutableRefObject<number>}) {
  const post = { bloomIntensity: 0.45, bloomThreshold: 0.86, dof: true, startBokeh: 5.0, startRange: 3.0, focusBokeh: 7.0, focusRange: 0.5 }
  const dofRef = useRef<any>(null)
  useFrame(() => {
    const e = dofRef.current
    if (!e) return
    if (e.target) e.target.copy(focusRef.current)
    if (dofBokehRef.current >= 0) {
      e.bokehScale = dofBokehRef.current
      if (e.cocMaterial) e.cocMaterial.focusRange = Math.max(1e-4, dofRangeRef.current)
    } else {
      e.bokehScale = post.startBokeh
      if (e.cocMaterial) e.cocMaterial.focusRange = post.startRange
    }
    void frameRef
  })

  return (
    <EffectComposer multisampling={0} stencilBuffer={false} depthBuffer>
      <DepthOfField ref={dofRef} target={[0,1.2,0]} worldFocusRange={post.focusRange} bokehScale={post.focusBokeh} height={480} />
      <Bloom mipmapBlur intensity={post.bloomIntensity} luminanceThreshold={post.bloomThreshold} luminanceSmoothing={0.3} />
      <SMAA />
    </EffectComposer>
  )
}

export default function Scene() {
  const focusRef = useRef(new THREE.Vector3(0,1.2,0))
  const frameRef = useRef(0)
  const dofBokehRef = useRef(-1)
  const dofRangeRef = useRef(0.5)
  return (
    <>
      <GradientBackground />
      <Suspense fallback={null}>
        <Lights />
        <NoorCharacter focusRef={focusRef} frameRef={frameRef} dofBokehRef={dofBokehRef} dofRangeRef={dofRangeRef} />
      </Suspense>
      <Post2 focusRef={focusRef} frameRef={frameRef} dofBokehRef={dofBokehRef} dofRangeRef={dofRangeRef} />
    </>
  )
}
