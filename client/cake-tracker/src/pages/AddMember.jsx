import React, { useState } from 'react';
import MemberForm from '../components/MemberForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMember = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleAddMember = async formData => {
    try {
      await axios.post('http://localhost:5000/api/members', formData);
      toast.success('Member added successfully!');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data);
        toast.error(error.response.data);
      } else {
        setError('An error occurred while adding the member.');
        toast.error('An error occurred while adding the member.');
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center ">
        <h1 className="text-3xl font-bold mb-4"> Add Member</h1>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      {error && <p className="text-red-500">{error}</p>}
      <MemberForm onSubmit={handleAddMember} />
    </div>
  );
};

export default AddMember;
