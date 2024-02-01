import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => response.json())
      .then(json => setShows(json))
      .catch(error => console.error(error))
  }, []);

//   console.log(shows);

  return (
    
    <div className="container mx-auto mt-8 p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center">TV Shows</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {shows.map(show => (
          <div key={show.show.id} className="bg-white p-4 rounded-lg shadow-md transition duration-300 transform hover:bg-blue-100">
            <Link to={`/show/${show.show.id}`}>
              <img
                src={show.show.image ? show.show.image.medium : 'https://via.placeholder.com/150'}
                alt={show.show.name}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <h2 className="text-lg font-bold mb-2">{show.show.name}</h2>
              <p className="text-gray-600 mb-2">{`Status: ${show.show.status}`}</p>
              <p className="text-gray-600 mb-2">{`Rating: ${show.show.rating.average || 'N/A'}`}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
