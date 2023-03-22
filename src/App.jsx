import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Favorites from './components/Favorites'
import Navbar from './components/Navbar'

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
    this.setState(prevState => ({ favorites: [...prevState.favorites, newFavorite] }));
  }
  
  fetchPictures = () => {
    const { page } = this.state;
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&tags=thriftedfashion&per_page=10&page=${page}&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(j => {
        let picArray = j.photos.photo.map(pic => {
          const srcPath = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
          return (
            <div className="image-container">
              <img alt="dogs" src={srcPath} key={pic.id} />
              <button className="favorite-button" onClick={event => this.handleFavoriteClick(event, srcPath)}>Favorite</button>
            </div>
          );
        });
     this.setState(prevState => ({ pictures: [...prevState.pictures, ...picArray], loading: false }));
     })
      .catch(error => console.error(error));
  }
  

  render() {
    return (
      
    <Router>
      <Navbar/>
      <div className="App">
        <h1>Your online thrift shop</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<>{this.state.pictures}
            <div ref={loadingRef => (this.loadingRef = loadingRef)} style={{ height: '10px' }}>
              {this.state.loading && 'Loading...'}
            </div>
          </>}/>
          <Route path="/favorites" element={<Favorites favorites={this.state.favorites} />} />
        </Routes>
      </div>
    </Router>
   );
  }
}

export default App;






