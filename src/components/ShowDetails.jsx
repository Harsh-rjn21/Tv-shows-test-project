import  { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TicketBookingForm from './TicketBookingForm';

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(response => response.json())
      .then(json => setShow(json))
      .catch(error => console.error(error))
  }, []);

  const bookTicket = (formData) => {
    // Store user details in local storage
    localStorage.setItem('userDetails', JSON.stringify(formData));

    // Mock function for booking a movie ticket
    alert(`Booking ticket for ${show.name} with details: ${JSON.stringify(formData)}`);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="container mx-auto mt-8">
      {show && (
        <>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <img
              src={show.image ? show.image.original : 'https://via.placeholder.com/300'}
              alt={show.name}
              className="w-full h-60 object-cover mb-4 rounded-md"
            />
            <h1 className="text-3xl font-bold mb-4">{show.name}</h1>
            <p className="text-gray-600 mb-2">{`Status: ${show.status}`}</p>
            <p className="text-gray-600 mb-2">{`Genres: ${show.genres.join(', ')}`}</p>
            <p className="text-gray-600 mb-2">{`Language: ${show.language}`}</p>
            <p>{show.summary && show.summary.replace(/<[^>]*>/g, '')}</p>
            <div className="container flex justify-between">

            <button
              onClick={openModal}
              className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
              >
              Book a Movie Ticket
            </button>
          <Link to="/" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">Back to Home</Link>
              </div>
          </div>


          {isModalOpen && (
            <TicketBookingForm
              showName={show.name}
              onClose={closeModal}
              onBookTicket={bookTicket}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ShowDetails;
