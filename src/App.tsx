import { useState } from 'react';
import './App.css';
import NoteLists from './components/body/NoteLists';
import { nanoid } from 'nanoid';


function App() {
  const [notes, setNotes] = useState([
    {
    id: nanoid(),
    text:"palto hugas",
    date: "15/02/2025"
    },
    {
    id: nanoid(),
    text:"hugas bugas",
    date: "15/02/2025"
    },
    {
    id: nanoid(),
    text:"hello banana",
    date: "15/02/2025"
    },
    {
    id: nanoid(),
    text:"hello2",
    date: "15/02/2025"
    },
  ]);

  const addNote = (text:string) => {
    const date  = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }
  
  return (
    <>
      <div className='pr-10 pl-10 max-w-600 mr-10 ml-10'>
        <NoteLists notes={notes} handleAddNote = {addNote}/>
      </div>
    </>
  )
}

export default App
