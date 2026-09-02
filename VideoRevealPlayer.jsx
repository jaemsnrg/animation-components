'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import MuxPlayer from '@mux/mux-player-react';
import PropTypes from 'prop-types';

const EASE = [0.25, 0.1, 0.25, 1];

// Blurred-thumbnail-to-video reveal, driven solely by onPlaying so the
// blurred thumbnail always covers the raw/letterboxed poster until
// playback truly starts.
export function VideoRevealPlayer({
  playbackId,
  alt,
  duration = 1.6,
  borderRadius = 12,
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!playbackId) return null;

  const thumbnailSrc = `https://image.mux.com/${playbackId}/thumbnail.jpg?width=80`;

  return (
    <div style={{ display: 'grid', borderRadius, overflow: 'hidden', width: '100%' }}>
      {/* Blurred thumbnail — sizes the grid cell, fades out on load */}
      <motion.img
        src={thumbnailSrc}
        aria-hidden
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration, ease: EASE }}
        style={{ gridArea: '1/1', width: '100%', height: 'auto', display: 'block', filter: 'blur(24px)', transform: 'scale(1.12)', objectFit: 'cover' }}
      />
      {/* Video — natural width/height, no bars */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration, ease: EASE }}
        style={{ gridArea: '1/1', width: '100%', overflow: 'hidden', fontSize: 0, lineHeight: 0 }}
      >
        <MuxPlayer
          playbackId={playbackId}
          metadata={{ video_title: alt }}
          streamType="on-demand"
          autoPlay="muted"
          muted
          loop
          controls={false}
          tabIndex={-1}
          poster={thumbnailSrc}
          onPlaying={() => setIsLoaded(true)}
          style={{ '--controls': 'none', '--media-border-radius': '0px', '--media-object-fit': 'cover', width: '100%', display: 'block' }}
        />
      </motion.div>
    </div>
  );
}

VideoRevealPlayer.propTypes = {
  playbackId: PropTypes.string,
  alt: PropTypes.string,
  duration: PropTypes.number,
  borderRadius: PropTypes.number,
};
