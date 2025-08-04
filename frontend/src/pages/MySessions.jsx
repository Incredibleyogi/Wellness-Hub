import { useEffect, useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function MySessions() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/sessions/my').then(res => setSessions(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Sessions</h2>
      <button className="mb-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate('/editor')}>+ New Session</button>
      <div className="grid gap-4">
        {sessions.map((s) => (
          <div key={s._id} className="p-4 border rounded">
            <h3 className="text-lg">{s.title}</h3>
            <p className="text-sm">Status: {s.status}</p>
            <button className="text-blue-600 underline" onClick={() => navigate(`/editor/${s._id}`)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}
