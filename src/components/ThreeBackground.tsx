import { memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const ThreeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    const canvas = canvasRef.current
    if (!canvas || !canvas.parentElement) return

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
    camera.position.z = 6

    const count = 1400
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3
      const radius = 2.4 + Math.random() * 1.6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      colors[i3] = 0.45 + Math.random() * 0.55
      colors[i3 + 1] = 0.7 + Math.random() * 0.3
      colors[i3 + 2] = 0.9
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const glow = new THREE.PointLight('#7df3ff', 1, 12)
    glow.position.set(3, 2, 4)
    scene.add(glow)

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    resize()
    window.addEventListener('resize', resize)

    let frame = 0
    const animate = () => {
      points.rotation.y += 0.0008
      points.rotation.x += 0.0004
      renderer.render(scene, camera)
      frame = window.requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [prefersReducedMotion])

  return (
    <div className="three-bg pointer-events-none fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="absolute inset-0 bg-radial-fade opacity-80" />
    </div>
  )
}

export default memo(ThreeBackground)
