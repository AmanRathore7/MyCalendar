import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, Button, Form } from 'react-bootstrap';
import './Calendar.css';

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ id: null, title: '', start: '', end: '' });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  const handleDateClick = (info) => {
    const today = new Date();
    const selectedDate = new Date(info.dateStr);

    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      alert('You cannot create events on past dates.');
      return;
    }

    setNewEvent({ id: null, title: '', start: info.dateStr, end: info.dateStr });
    setShowModal(true);
  };

  const handleEventClick = (info) => {
    setNewEvent({ id: info.event.id, title: info.event.title, start: info.event.startStr, end: info.event.endStr || info.event.startStr });
    setShowModal(true);
  };

  const handleSaveEvent = () => {
    
    let updatedEvents;
    if (newEvent.id) {
      updatedEvents = events.map(eventObj => 
        eventObj.id == newEvent.id ? newEvent : eventObj
      );
    } else {
      newEvent.id = new Date().getTime();
      updatedEvents = [...events, newEvent];
    }
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setShowModal(false);

    const eventDate = new Date(newEvent.start);
    const currentTime = new Date();
    const timeDifference = eventDate.getTime() - currentTime.getTime();

    if (timeDifference > 0 && timeDifference <= 10 * 60 * 1000) { // 10 minutes in milliseconds
      setTimeout(() => {
        const notification = new Notification('Event Reminder', {
          body: 'Your event is starting soon!',
        });

        notification.onclick = () => {
          window.location.href = notification.data.url;
        };
      }, timeDifference);
    }
    
  };

  const handleDeleteEvent = () => {
    setShowModal(false);
    setShowConfirmModal(true);
  };

  const confirmDeleteEvent = () => {
    const updatedEvents = events.filter(event => event.id != newEvent.id);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setShowConfirmModal(false);
  };

  const dayCellClassNames = (arg) => {
    const today = new Date();
    const date = new Date(arg.date);

    if (date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()) {
      return 'today-cell';
    }
    return '';
  };
  
  return (
    <>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          dayHeaderFormat={{ weekday: 'long' }}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          dayMaxEventRows={3}  // Limit to 3 events per day cell
          dayMaxEvents={true}  // Show "more" link when there are too many events
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short',
          }}  // AM/PM time format
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short',
          }}  // AM/PM time format for time slots
          dayCellClassNames={dayCellClassNames}  // Custom function to render day cell content
        />
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEventTitle">
              <Form.Label>Event Title</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter event title" 
                value={newEvent.title} 
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEventStart">
              <Form.Label>Date</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter start date" 
                value={newEvent.start} 
                disabled
              />
            </Form.Group>
            <Form.Group hidden controlId="formEventEnd">
              <Form.Label>End Date</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter end date" 
                value={newEvent.end} 
                
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEvent}>
            Save Changes
          </Button>
          {newEvent.id && (
            <Button variant="danger" onClick={handleDeleteEvent}>
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this event?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteEvent}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyCalendar;
