import React, {useEffect, useState} from 'react';
import ReminderList from "./ReminderList";
import './App.css';
function App() {
    const [reminders, setReminders] = useState(() => {
      const savedReminders = localStorage.getItem('reminders');
      return savedReminders ? JSON.parse(savedReminders) : [];  //comments bc I'm learning, this either returns the saved reminders or and empty array
    });
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReminder = {description,deadline}
        const updateReminders = [...reminders,newReminder];  //... makes a copy of what is already there
        updateReminders.sort((a, b) => new Date(a.deadline).getDate() - new Date(b.deadline).getDate()); //sorts by date due
        setReminders(updateReminders);
        localStorage.setItem('reminders', JSON.stringify(updateReminders));
        setDescription('');
        setDeadline('');
    };


    const handleDelete = (index) => {
        const updateReminders = reminders.filter((_, i) => i !== index);
        setReminders(updateReminders);
        localStorage.setItem('reminders', JSON.stringify(updateReminders));
    };

    useEffect(() => {
        const savedReminders = localStorage.getItem('reminders');
        if (savedReminders) {
            setReminders(JSON.parse(savedReminders));
        }
    }, []);



  return (
      <div className="App">
          <div className="App-content">
              <h1>Reminder App</h1>
              <form onSubmit={handleSubmit} className="App-form">
                  <div className="form-group">
                      <label htmlFor="description">New Reminder:</label>
                      <input
                          type="text"
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="App-input"
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="deadline">Date/Deadline:</label>
                      <input
                          type="date"
                          id="deadline"
                          value={deadline}
                          onChange={(e) => setDeadline(e.target.value)}
                          className="App-input"
                      />
                  </div>
                  <button type="submit" className="App-button">Add Reminder</button>
              </form>

              {reminders.length > 0 && (
                  <div className="current-reminders">
                      <h2>Current Reminders:</h2>
                      {reminders.map((reminder, index) => (
                          <ReminderList
                              key={index}
                              deadline={reminder.deadline}
                              description={reminder.description}
                              onDelete={() => handleDelete(index)}
                          />
                      ))}
                  </div>
              )}
          </div>
      </div>
  )
}
export default App;
