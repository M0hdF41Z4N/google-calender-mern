import React, { useState , useEffect } from 'react';
import GoogleSignIn from './components/GoogleSignIn.js';
import EventForm from './components/EventForm.js';
import './styles.css';
import EventsModal from './components/EventModal.js';
import EventList from './components/EventList.js';

const App = () => {
  const [userId, setUserId] = useState(null); // Store user ID after sign-in

  const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  return (
      <div>
          <main className="main-content">
          <h1>Google Calendar Integration</h1>
          {!userId ? (
              <GoogleSignIn setUserId={setUserId} />
          ) : (
            <>

                <button onClick={handleOpenModal}>Create Event</button>

            <EventsModal isOpen={isModalOpen} onClose={handleCloseModal}>
                <EventForm userId={userId} setIsModalOpen={setIsModalOpen} />
            </EventsModal>

              <EventList userId={userId}/>
            </>
          )}
          </main>
      </div>
  );
};

export default App;
