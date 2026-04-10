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
  const pages = useMemo(
    () => [
      {
        id: 'cover',
        type: 'cover',
        title: ' Roshan Memory Book',
        subtitle: 'A Love & Passion Memory Book',
      },
      ...memories.map((memory) => ({ ...memory, type: 'photo' })),
      {
        id: 'final-note',
        type: 'final',
        title: 'Happy 21st Birthday',
        message:
          'Happy Birthday to a truly one-of-a-kind friend. Looking through these photos made me realize how many great times weve had. Im so grateful for our friendship and cant wait to see what this next year brings for you',
      },
    ],
    [memories],
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
    setCurrentIndex((i) => (i < pages.length - 1 ? i + 1 : i));
  };

  if (memories.length === 0) {
    return (
      <section className="empty-state">
        <h2>No JPG photos found yet</h2>
        <p>Place all your birthday photos in `src/assets` as .jpg/.jpeg, then refresh.</p>
      </section>
    );
  }

  const active = pages[currentIndex];
  const isCover = active.type === 'cover';
  const isFinal = active.type === 'final';

  return (
    <section className="book-shell">
      <div className="book-header">
        <span className="book-chip">21st Birthday Edition</span>
       
      </div>

      <div className="book-stage">
        <button type="button" className="nav-btn" onClick={goPrev} disabled={currentIndex === 0}>
          Prev
        </button>

        <div className="book-page" onClick={() => !isCover && !isFinal && setSelectedImg(active)}>
          <div
            key={active.id}
            className={`page-transition ${direction > 0 ? 'turn-forward' : 'turn-backward'}`}
          >
            {isCover ? (
              <article className="cover-page">
                <div className="cover-inner">
                  <p className="cover-kicker">21st Birthday</p>
                  <h1>{active.title}</h1>
                  <p className="cover-subtitle">{active.subtitle}</p>
                  <div className="cover-divider" />
                  <p className="cover-note">Turn the page to start the memories.</p>
                </div>
              </article>
            ) : isFinal ? (
              <article className="final-page">
                <div className="final-inner">
                  <p className="final-kicker">A Note From The Heart</p>
                  <h2>{active.title}</h2>
                  <p className="final-message">{active.message}</p>
                  <p className="final-sign">Written by Ahmed Abdelgelil</p>
                </div>
              </article>
            ) : (
              <AlbumCard item={active} />
            )}
          </div>
        </div>

        <button
          type="button"
          className="nav-btn"
          onClick={goNext}
          disabled={currentIndex === pages.length - 1}
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