import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

export function SplineScene({ scene, className, style }) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span
            className="w-8 h-8 rounded-full border-2 border-[#1D9E75]/30 border-t-[#1D9E75] animate-spin"
          />
        </div>
      }
    >
      <Spline scene={scene} className={className} style={style} />
    </Suspense>
  )
}
