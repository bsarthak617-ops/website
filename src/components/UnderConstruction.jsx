import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function UnderConstruction() {
  // Force dark body for this page
  useEffect(() => {
    const originalBg = document.body.style.backgroundColor;
    const originalColor = document.body.style.color;
    document.body.style.backgroundColor = '#000000';
    document.body.style.color = '#ffffff';
    document.documentElement.style.backgroundColor = '#000000';

    return () => {
      document.body.style.backgroundColor = originalBg;
      document.body.style.color = originalColor;
      document.documentElement.style.backgroundColor = '';
    };
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', 'Manrope', system-ui, sans-serif",
      }}
    >
      {/* Subtle radial ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          background:
            'radial-gradient(circle, rgba(202,154,67,0.06) 0%, rgba(202,154,67,0.02) 35%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Animated gold grid lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(202,154,67,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(202,154,67,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Floating particle dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: i % 2 === 0 ? '3px' : '2px',
            height: i % 2 === 0 ? '3px' : '2px',
            borderRadius: '50%',
            background: 'rgba(202, 154, 67, 0.35)',
            zIndex: 1,
          }}
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400) - 200,
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 400) - 200,
            opacity: 0,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4 + i * 0.8,
            repeat: Infinity,
            delay: i * 0.7,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        {/* Animated logo */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '2px solid rgba(202, 154, 67, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Pulsing ring */}
          <motion.div
            style={{
              position: 'absolute',
              inset: '-8px',
              borderRadius: '50%',
              border: '1px solid rgba(202, 154, 67, 0.2)',
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <img
            src="/oilteq-drop-animated.webp"
            alt="Oilteq"
            style={{
              width: '56px',
              height: '56px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 8px rgba(202, 154, 67, 0.4))',
            }}
            draggable="false"
          />
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <img
            src="/oilteq-text.png"
            alt="OILTEQ"
            style={{
              height: '28px',
              objectFit: 'contain',
              filter: 'brightness(0) invert(1)',
              opacity: 0.9,
            }}
            draggable="false"
          />
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            width: '80px',
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, rgba(202,154,67,0.6), transparent)',
          }}
        />

        {/* Main heading */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Under Construction
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
            color: 'rgba(255,255,255,0.45)',
            maxWidth: '460px',
            lineHeight: 1.7,
            margin: 0,
            fontWeight: 400,
          }}
        >
          We're building something exceptional.
          <br />
          This page will be live soon.
        </motion.p>

        {/* Animated construction indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '12px',
          }}
        >
          {/* Pulsing dot */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#CA9A43',
              boxShadow: '0 0 12px rgba(202,154,67,0.5)',
            }}
          />
          <span
            style={{
              fontSize: '0.8rem',
              color: 'rgba(202, 154, 67, 0.7)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            In Progress
          </span>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{
            width: '200px',
            height: '2px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '1px',
            overflow: 'hidden',
            marginTop: '4px',
          }}
        >
          <motion.div
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              width: '40%',
              height: '100%',
              background:
                'linear-gradient(90deg, transparent, rgba(202,154,67,0.8), transparent)',
              borderRadius: '1px',
            }}
          />
        </motion.div>
      </div>

      {/* Bottom watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.18)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        © Oilteq Industries
      </motion.div>
    </div>
  );
}
