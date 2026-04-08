import React, { useMemo, useState } from 'react';
import AlbumCard from './albumcard';
import Modal from './modal';

const imageModules = import.meta.glob('../assets/**/*.{jpg,jpeg,JPG,JPEG}', {
  eager: true,
  import: 'default',
});

const toLabel = (path) =>
  path
    .split('/')
    .pop()
    ?.replace(/\.[^/.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || 'Memory';

const ScrollTrack = () => {
  const memories = useMemo(
    () =>
      Object.entries(imageModules)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([path, image], index) => ({
          id: index + 1,
          title: toLabel(path),
          image,
          description: `Page ${index + 1} of your birthday memory book`,
        })),
    [],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedImg, setSelectedImg] = useState(null);

  const goPrev = () => {
    setDirection(-1);
    setCurrentIndex((i) => (i > 0 ? i - 1 : i));
  };
  const goNext = () => {
    setDirection(1);
    setCurrentIndex((i) => (i < memories.length - 1 ? i + 1 : i));
  };

  if (memories.length === 0) {
    return (
      <section className="empty-state">
        <h2>No JPG photos found yet</h2>
        <p>Place all your birthday photos in `src/assets` as .jpg/.jpeg, then refresh.</p>
      </section>
    );
  }

  const active = memories[currentIndex];

  return (
    <section className="book-shell">
      <div className="book-header">
        <span className="book-chip">21st Birthday Edition</span>
        <p>
          Celebrating her special 21st - Page {currentIndex + 1} of {memories.length}
        </p>
      </div>

      <div className="book-stage">
        <button type="button" className="nav-btn" onClick={goPrev} disabled={currentIndex === 0}>
          Prev
        </button>

        <div className="book-page" onClick={() => setSelectedImg(active)}>
          <div
            key={active.id}
            className={`page-transition ${direction > 0 ? 'turn-forward' : 'turn-backward'}`}
          >
            <AlbumCard item={active} />
          </div>
        </div>

        <button
          type="button"
          className="nav-btn"
          onClick={goNext}
          disabled={currentIndex === memories.length - 1}
        >
          Next
        </button>
      </div>

      <Modal
        isOpen={!!selectedImg}
        image={selectedImg?.image}
        title={selectedImg?.title}
        onClose={() => setSelectedImg(null)}
      />
    </section>
  );
};

export default ScrollTrack;