import React from 'react';

const AlbumCard = ({ item }) => {
  return (
    <article className="page-paper">
      <div className="page-gutter" />
      <div className="page-content">
        <div className="photo-frame">
          <div className="photo-mat">
            <img src={item.image} alt={item.title} className="page-photo" />
          </div>
        </div>
        <div className="page-caption">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      </div>
    </article>
  );
};

export default AlbumCard;