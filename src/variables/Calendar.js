import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, startOfWeek, endOfWeek, addDays } from 'date-fns';
import '../assets/css/Calendar.css';
import axios from 'axios';

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [newEventDate, setNewEventDate] = useState(null);
  const [newEventTime, setNewEventTime] = useState('');
  const [newEventDetail, setNewEventDetail] = useState('');
  const [newEventCost, setNewEventCost] = useState('');
  const [newEventCategory, setNewEventCategory] = useState('');

  const getEvent = async (day) => {
    try {
      const res = await axios.get("http://172.10.5.95:80/calendar/get", {params :{UID : 1, day : format(day, 'yyyy-MM-dd')}})
      const receivedevents = res.data;
      setEvents(receivedevents);
    }
    catch (err) {
      console.log(err);
    }
  }; 

  const postEvent = async (event) => {
    try {
      const res = await axios.post("http://172.10.5.95:80/calendar/post", event)
    }
    catch (err) {
      console.log(err);
    }
  };

  const openPopup = (day) => {
    setShowPopup(true);
    setNewEventDate(day);
    setNewEventTime('');
    setNewEventDetail('');
    setNewEventCost('');
    setNewEventCategory('');
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const addEvent = () => {
    const newEvent = {
      UID: 1,
      date: format(newEventDate, 'yyyy-MM-dd'),
      time: newEventTime,
      detail: newEventDetail,
      cost: newEventCost,
      category: newEventCategory,
    };

    postEvent(newEvent);
    setEvents([...events, newEvent]);
    closePopup();
  };


  const startOfCurrentMonth = startOfMonth(currentMonth);
  const endOfCurrentMonth = endOfMonth(currentMonth);
  const startOfFirstWeek = startOfWeek(startOfCurrentMonth, { weekStartsOn: 0 });
  const endOfLastWeek = endOfWeek(endOfCurrentMonth, { weekStartsOn: 0 });

  const daysInMonth = [];
  let day = startOfFirstWeek;
  while (day <= endOfLastWeek) {
    for (let i = 0; i < 7; i++) {
      daysInMonth.push(day);
      day = addDays(day, 1);
    }
  }

  useEffect(() => {
    // Default events for testing
    // const defaultEvents = [
    //   {
    //     date: '2023-12-25',
    //     detail: 'MERRY CHRISTMAS',
    //     cost: 'A lot of gift!!!!',
    //     category: 'festivity',
    //   },
    //   {
    //     date: '2023-05-04',
    //     detail: "LUCA'S BIRTHDAY",
    //     cost: 'Another gifts...?',
    //     category: 'birthday',
    //   },
    //   {
    //     date: '2023-03-03',
    //     detail: "MY LADY'S BIRTHDAY",
    //     cost: 'A lot of money to spend!!!!',
    //     category: 'birthday',
    //   },
    //   {
    //     date: '2023-05-04',
    //     detail: "LUCA'S BIRTHDAY",
    //     cost: 'Another gifts...?',
    //     category: 'birthday',
    //   },
    // ];

    //setEvents(defaultEvents);
    fillEventSidebar(selectedDate);
  }, [selectedDate, events]);

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1));
  };

  const handleDayClick = async (day) => {
    setSelectedDate(day);
    await getEvent(day); // getEvent 함수 실행 완료까지 기다림
    //fillEventSidebar(day); // 이 부분을 useEffect로 대체하여 삭제
    console.log(events);
  };

  const fillEventSidebar = (day) => {
    // const thisDate = format(day, 'yyyy-MM-dd');
    // const eventData = events.filter((event) => event.date === thisDate);
    console.log(events);
    const eventList = document.querySelector('.c-aside__eventList');
    if (events.length > 0) {
      eventList.innerHTML = events
        .map((event) => {
          const { detail, cost, category } = event;
          return `
            <p class="c-aside__event c-aside__event--${category}">
              ${detail} <span> • ${cost}</span>
            </p>
          `;
        })
        .join('');
    } else {
      eventList.innerHTML = '';
    }
  };

  return (
    <div className='calendar-container'>
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={prevMonth}>Previous</button>
          <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
          <button onClick={nextMonth}>Next</button>
        </div>
        <div className='calendar-wrapper'>
          <div className="calendar-grid">
            <div className="calendar-day">Sun</div>
            <div className="calendar-day">Mon</div>
            <div className="calendar-day">Tue</div>
            <div className="calendar-day">Wed</div>
            <div className="calendar-day">Thu</div>
            <div className="calendar-day">Fri</div>
            <div className="calendar-day">Sat</div>
            {daysInMonth.map((day) => (
              <div
                key={day.toISOString()}
                className={`calendar-day ${isSameMonth(day, currentMonth) ? '' : 'other-month'} ${selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') ? 'isSelected' : ''}`}
                onClick={() => handleDayClick(day)}
                
              >
                {format(day, 'd')}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='calendar-add-event' onClick={() => openPopup(selectedDate)}>+</div>

      {showPopup && (
        <div className='event-popup'>
          <div className='event-popup-inner'>
            <div className='event-popup-header'>
              <div className='event-popup-title'>Add Event</div>
              <div className='event-popup-close' onClick={closePopup}>x</div>
            </div>
            <div className='event-popup-content'>
              <p>Date: {newEventDate && format(newEventDate, 'yyyy-MM-dd')}</p>
              <input type='time' value={newEventTime} onChange={(e) => setNewEventTime(e.target.value)} />
              <input type='text' placeholder='Event Detail' value={newEventDetail} onChange={(e) => setNewEventDetail(e.target.value)} />
              <input type='text' placeholder='Event Cost' value={newEventCost} onChange={(e) => setNewEventCost(e.target.value)} />
              <input type='text' placeholder='Event Category' value={newEventCategory} onChange={(e) => setNewEventCategory(e.target.value)} />
            </div>
            <div className='event-popup-footer'>
              <button onClick={addEvent}>Add</button>
            </div>
          </div>
        </div>
      )}


      <div className='event-list'>
        <aside className="c-aside">
          <div>
            <h3 className="c-aside__month">{selectedDate && format(selectedDate, 'MMMM')}</h3>
            <p className="c-aside__num">{selectedDate && format(selectedDate, 'd')}</p>
          </div>
        </aside>
        <div className="c-aside__eventList"></div>
      </div>
    </div>
  );
}

export default Calendar;
