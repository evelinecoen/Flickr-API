import React, { Component } from 'react';
import './App.css';

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
    this.setState(prevState => ({ favorites: [...prevState.favorites, srcPath] }));
  }
  fetchPictures = () => {
    const { page } = this.state;
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&tags=nature&per_page=10&page=${page}&format=json&nojsoncallback=1`)
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
      <div className="App">
        <h1>Vinted Homework</h1>
        {this.state.pictures}
        <div ref={loadingRef => this.loadingRef = loadingRef} style={{ height: '10px' }}>
          {this.state.loading && 'Loading...'}
        </div>
      </div>
    );
  }
}

export default App;



  /* componentDidMount() {
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+process.env.REACT_APP_FLICKR_API_KEY+'&tags=nature&per_page=10&page=1&format=json&nojsoncallback=1')
    .then(function(response){
      return response.json();
    })
    .then(function(j){
      let picArray = j.photos.photo.map((pic) => {
        
        let srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
        return(
          <img alt="nature" src={srcPath}></img>
        )
      })
      this.setState({pictures: picArray});
    }.bind(this))
  }

  render() {
    return (
      <div className="App">
        <h1>Vinted Homework</h1>
        {this.state.pictures}
      </div>
    );
  }
} 
export default App;

*/






/* import React, {Component} from 'react'
import './App.css';

class App extends Component {

componentDidMount(){
  fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+process.env.flickr_key+'&tags=nyc&per_page=10&page=1&format=json&nojsoncallback=1')
  .then(function(response){
    return response.json();
  })
  .then(function(j){
    alert(JSON.stringify(j));
    let picArray = j.photos.photo.map((pic) => {
      
      let srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
      return(
        <img alt="dogs" src={srcPath}></img>
      )
    })
    this.setState({pictures: picArray});
  }.bind(this))
}


render() {
  return (
    <div className="App">
      <h1>Vinted Homework</h1>
    </div>
  );
}
}

export default App; */
