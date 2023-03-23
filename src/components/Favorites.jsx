import React from 'react';
import { Link } from 'react-router-dom';

const Favorites = ({ favorites }) => {
  return (
    <div>
      <h2>Favorites</h2>
      <Link to="/">Home</Link>
      <div>
        {favorites.map((favorite, index) => (
          <div key={index}>
            <img className="favorite-image" src={favorite.srcPath} alt="favorite" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
