import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Favorites from './components/Favorites'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      favorites: [],
      page: 1,
      loading: true
    };
  }

  componentDidMount() {
    this.fetchPictures();
    this.createObserver();
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      this.setState({ favorites: storedFavorites });
    }
  }
  

  componentWillUnmount() {
    this.observer.disconnect();
  }

  createObserver = () => {
    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.setState({ page: this.state.page + 1 }, () => {
          this.fetchPictures();
        });
      }
    }, { threshold: 1 });
    this.observer.observe(this.loadingRef);
  }

  handleFavoriteClick = (event, srcPath) => {
    event.preventDefault();
    const newFavorite = { srcPath };
    this.setState(prevState => ({ favorites: [...prevState.favorites, newFavorite] }), () => {
      localStorage.setItem("favorites", JSON.stringify(this.state.favorites));
    });
  }
  
  
  fetchPictures = () => {
    const { page } = this.state;
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&tags=nature&per_page=10&page=${page}&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(j => {
        let picArray = j.photos.photo.map(pic => {
          const srcPath = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_c.jpg`;
          fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&photo_id=${pic.id}&format=json&nojsoncallback=1`)
            .then(response => response.json())
            .then(j => {
              const title = j.photo.title._content;
              const photographer = j.photo.owner.realname || j.photo.owner.username;
              const imageInfo = (
                <div className="image-info" /* style={{ position: "absolute", top: 0, left: 0, backgroundColor: "white", opacity: 0.8, padding: "5px" }} */>
                  <div className="title">{title}</div>
                  <div className="photographer">Photographer: {photographer}</div>
                </div>
              );
              const image = (
                <div className="image-container" key={pic.id}>
                  <img className="image" alt="nature" src={srcPath} />
                  <div className="image-overlay">
                    <div className="image-info">
                      <div className="title">{title}</div>
                      <hr></hr>
                      <div className="photographer"><i>{photographer}</i></div>
                    </div>
                    <div /* className="favorite-button" */><button className="favorite-button" onClick={event => this.handleFavoriteClick(event, srcPath)}>Favorite</button> </div>
                  </div>
                </div>
              );
              this.setState(prevState => ({ pictures: [...prevState.pictures, image], loading: false }));
            })
            .catch(error => console.error(error));
        });
      })
      .catch(error => console.error(error));
  }
  
  
  
  
  
  

  render() {
    return (
      
    <Router>
      <div className="App">
        <div /* className="header" */>
        <h1>Discover the latest pictures</h1>
            <Link to="/favorites">Favorites</Link>
        </div>
        <div className="body">
        <Routes>
          
          <Route path="/" element={<>{this.state.pictures}
            <div ref={loadingRef => (this.loadingRef = loadingRef)} style={{ height: '10px' }}>
              {this.state.loading && 'Loading...'}
            </div>
          </>}/>
          <Route path="/favorites" element={<Favorites favorites={this.state.favorites} />} />
        </Routes>
        </div>
      </div>
    </Router>
   );
  }
}

export default App;






