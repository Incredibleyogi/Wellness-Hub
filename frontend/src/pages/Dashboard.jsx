import { useEffect, useState } from 'react';
import API from '../utils/api';

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    API.get('/sessions').then(res => setSessions(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Published Sessions</h2>
      <div className="grid gap-4">
        {sessions.map((s) => (
          <div key={s._id} className="p-4 border rounded shadow">
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="text-sm text-gray-500">Tags: {s.tags.join(', ')}</p>
            <a href={s.json_file_url} className="text-blue-600 underline" target="_blank">View JSON</a>
          </div>
        ))}
      </div>
    </div>
  );
}