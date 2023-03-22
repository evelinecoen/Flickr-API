import React from 'react';

const Favorites = ({ favorites }) => {
  return (
    <div>
      <h2>Favorites</h2>
      <div>
        {favorites.map((favorite, index) => (
          <div key={index}>
            <img src={favorite.srcPath} alt="favorite" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
