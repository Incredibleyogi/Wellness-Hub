import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/api';

export default function SessionEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State variables to hold form values
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [jsonURL, setJsonURL] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);
  const [published, setPublished] = useState(false); // New state to track if session is published

  // Fetch session details if editing an existing session
  useEffect(() => {
    if (id) {
      API.get(`/sessions/my/${id}`).then(res => {
        console.log('Publishing session ID:', id);
        setTitle(res.data.title);
        setTags(res.data.tags.join(', '));
        setJsonURL(res.data.json_file_url);
        setPublished(res.data.status === 'published'); // Set published status
      });
    }
  }, [id]);

  // Auto-save draft logic with debounce
  const autoSave = () => {
    if (published) return; // Skip auto-save if session is already published
    const tagArray = tags.split(',').map(t => t.trim());
    API.post('/sessions/save-draft', {
      id,
      title,
      tags: tagArray,
      json_file_url: jsonURL
    });
  };

  // Handle input changes with auto-save delay
  const handleChange = (fn) => (e) => {
    fn(e.target.value);
    if (timeoutId) clearTimeout(timeoutId);
    setTimeoutId(setTimeout(autoSave, 5000)); // Debounce 5 seconds
  };

  // Publish the session
  const handlePublish = async () => {
    try {
      const response = await API.post('/sessions/publish', { id });
      console.log('Publish response:', response.data);
      setPublished(true); // Prevent further drafts
      navigate('/my-sessions');
    } catch (error) {
      console.error('Publish error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Session Editor</h2>
      <input
        className="w-full border p-2 mb-2"
        placeholder="Title"
        value={title}
        onChange={handleChange(setTitle)}
      />
      <input
        className="w-full border p-2 mb-2"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={handleChange(setTags)}
      />
      <input
        className="w-full border p-2 mb-4"
        placeholder="JSON File URL"
        value={jsonURL}
        onChange={handleChange(setJsonURL)}
      />
      <div className="flex gap-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={autoSave}
          disabled={published} // Disable if already published
        >
          Save Draft
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handlePublish}
        >
          Publish
        </button>
      </div>
    </div>
  );
}
