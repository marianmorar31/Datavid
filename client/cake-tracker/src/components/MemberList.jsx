import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import SearchComponent from './Search';
import SortComponent from './Sorter';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/members', {
          params: {
            firstName: searchTerm,
            sortBy: 'closest-birthday',
            sortOrder: sortOrder === 'desc' ? 'desc' : 'asc',
          },
        });
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, [searchTerm, sortOrder]);

  const handleDelete = async memberId => {
    try {
      await axios.delete(`http://localhost:5000/api/members/${memberId}`);
      const updatedMembers = members.filter(member => member._id !== memberId);
      setMembers(updatedMembers);
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const handleSort = e => {
    setSortOrder(e.target.value);
  };

  const filteredMembers = members.filter(member => {
    return (
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedMembers = filteredMembers.sort((a, b) => {
    if (sortOrder === 'desc') {
      return b.daysUntilBirthday - a.daysUntilBirthday;
    } else {
      return a.daysUntilBirthday - b.daysUntilBirthday;
    }
  });

  return (
    <div className="container mx-auto p-4">
      <SearchComponent searchTerm={searchTerm} onSearch={handleSearch} />
      <SortComponent sortOrder={sortOrder} onSort={handleSort} />
      <h2 className="text-2xl font-bold mb-4">Members</h2>
      <ul className="space-y-4">
        {sortedMembers.map(member => (
          <li
            key={member._id}
            className="bg-white p-4 rounded shadow flex items-center justify-between"
          >
            <div>
              <Link
                to={`/edit-member/${member._id}`}
                className="text-lg font-semibold text-blue-500 hover:text-blue-700"
              >
                {member.firstName} {member.lastName}
              </Link>
              <p>
                Birth Date:{' '}
                {new Date(member.birthDate).toLocaleDateString('en-GB')}
              </p>
              <p>Country: {member.country}</p>
              <p>City: {member.city}</p>
              <p>Days left: {member.daysUntilBirthday}</p>
            </div>
            <div>
              <Link to={`/edit-member/${member._id}`}>
                <button className="mr-2">
                  <MdEdit size={20} />
                </button>
              </Link>
              <button onClick={() => handleDelete(member._id)}>
                <MdDelete size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
