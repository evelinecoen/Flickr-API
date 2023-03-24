import React from 'react';
import { Link } from 'react-router-dom';

const Favorites = ({ favorites }) => {
  return (
    <div>
      <h2>Favorites</h2>
      <Link to="/">Go back to home</Link>
      <div>
        {favorites.map((favorite, index) => (
          <div key={index}>
            <img className="favorite-image" src={favorite.srcPath} alt="favorite" />
          </div>
        ))}
      </div>
      <div>
        <Link to="/">Go back to home page</Link>
      </div>
    </div>
  );
};

export default Favorites;




