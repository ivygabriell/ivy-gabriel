'use client'

import { useReducedMotion } from 'framer-motion'

const LAYERS = [
  {
    color:    'rgba(180, 180, 180, 0.12)',
    width:    '70vw',
    height:   '60vh',
    left:     '-10%',
    top:      '20%',
    duration: 18,
    delay:    0,
  },
  {
    color:    'rgba(220, 220, 220, 0.09)',
    width:    '55vw',
    height:   '70vh',
    left:     '40%',
    top:      '-10%',
    duration: 24,
    delay:    -6,
  },
  {
    color:    'rgba(160, 160, 160, 0.08)',
    width:    '80vw',
    height:   '50vh',
    left:     '10%',
    top:      '40%',
    duration: 30,
    delay:    -10,
  },
  {
    color:    'rgba(200, 200, 200, 0.07)',
    width:    '45vw',
    height:   '55vh',
    left:     '55%',
    top:      '30%',
    duration: 22,
    delay:    -4,
  },
  {
    color:    'rgba(140, 140, 140, 0.06)',
    width:    '90vw',
    height:   '45vh',
    left:     '-5%',
    top:      '55%',
    duration: 28,
    delay:    -8,
  },
]

export function AuroraBackground() {
  const reduced = useReducedMotion()

  return (
    <>
      {/* Keyframes CSS injetados uma vez */}
      <style>{`
        @keyframes aurora-drift-0 {
          0%,100% { transform: translate(0px,   0px)   scale(1);    }
          33%     { transform: translate(80px,  60px)  scale(1.08); }
          66%     { transform: translate(-60px, 40px)  scale(0.95); }
        }
        @keyframes aurora-drift-1 {
          0%,100% { transform: translate(0px,   0px)   scale(1);    }
          33%     { transform: translate(-70px, 80px)  scale(1.05); }
          66%     { transform: translate(50px,  -60px) scale(1.1);  }
        }
        @keyframes aurora-drift-2 {
          0%,100% { transform: translate(0px,   0px)   scale(1);    }
          33%     { transform: translate(60px,  -70px) scale(0.92); }
          66%     { transform: translate(-40px, 50px)  scale(1.06); }
        }
        @keyframes aurora-drift-3 {
          0%,100% { transform: translate(0px,   0px)   scale(1);    }
          33%     { transform: translate(-80px, -50px) scale(1.08); }
          66%     { transform: translate(40px,  70px)  scale(0.96); }
        }
        @keyframes aurora-drift-4 {
          0%,100% { transform: translate(0px,   0px)   scale(1);    }
          33%     { transform: translate(70px,  40px)  scale(1.04); }
          66%     { transform: translate(-50px, -60px) scale(1.09); }
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          overflow:      'hidden',
          pointerEvents: 'none',
          zIndex:        0,
        }}
      >
        {LAYERS.map((layer, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left:     layer.left,
              top:      layer.top,
              width:    layer.width,
              height:   layer.height,
              background: `radial-gradient(
                ellipse at center,
                ${layer.color} 0%,
                transparent 70%
              )`,
              filter:     'blur(48px)',
              willChange: 'transform',
              animation:  reduced
                ? 'none'
                : `aurora-drift-${i} ${layer.duration}s ${layer.delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </>
  )
}
