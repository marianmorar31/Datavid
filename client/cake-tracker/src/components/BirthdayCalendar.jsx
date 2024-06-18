import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';

const BirthdayCalendar = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/members');
        setBirthdays(response.data);
      } catch (error) {
        console.error('Error fetching birthdays:', error);
      }
    };

    fetchBirthdays();
  }, []);

  const handleDateClick = date => {
    setSelectedDate(date);
  };

  const getTileContent = ({ date, view }) => {
    if (view === 'month') {
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const birthday = birthdays.find(member => {
        const memberBirthDate = new Date(member.birthDate);
        const memberMonth = memberBirthDate.getMonth() + 1;
        const memberDay = memberBirthDate.getDate();

        return memberMonth === month && memberDay === day;
      });

      if (birthday) {
        return (
          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            🎂
          </div>
        );
      }
    }
    return null;
  };

  const getTileClassName = ({ date }) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const birthday = birthdays.find(member => {
      const memberBirthDate = new Date(member.birthDate);
      const memberMonth = memberBirthDate.getMonth() + 1;
      const memberDay = memberBirthDate.getDate();

      return memberMonth === month && memberDay === day;
    });

    return birthday ? 'birthday-tile' : null;
  };

  const getMemberNamesForDate = date => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const membersOnDate = birthdays.filter(member => {
      const memberBirthDate = new Date(member.birthDate);
      const memberMonth = memberBirthDate.getMonth() + 1;
      const memberDay = memberBirthDate.getDate();

      return memberMonth === month && memberDay === day;
    });

    return membersOnDate
      .map(member => `${member.firstName} ${member.lastName}`)
      .join(', ');
  };

  return (
    <div className="container mx-auto p-4 h-full w-full">
      <h2 className="text-2xl font-bold mb-4">Birthday Calendar</h2>
      <div className="w-full h-full xl:w-3/4 mx-auto relative">
        <Calendar
          onChange={() => {}}
          value={selectedDate}
          onClickDay={handleDateClick}
          tileContent={getTileContent}
          tileClassName={getTileClassName}
          className="shadow-lg rounded-lg border border-gray-200 w-full h-full"
        />
        {selectedDate && (
          <div className="absolute top-0 left-0 mt-2 ml-2 bg-white shadow-lg p-2 rounded-lg">
            <p className="font-semibold">
              Birthdays on {selectedDate.toLocaleDateString('en-GB')}:
            </p>
            <p>{getMemberNamesForDate(selectedDate)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayCalendar;
