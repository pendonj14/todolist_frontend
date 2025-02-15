import React, { useState } from 'react'
import { MdDelete, MdOutlineEdit } from 'react-icons/md'
import { Button } from "@/components/ui/button"

const AddNote = ({handleAddNote}) => {
    const [noteText, setNotesText] = useState('');

    const handleChange = (event) => {
        setNotesText(event.target.value);
        
    }
  
    const handleSaveClick = () =>{
        handleAddNote(noteText);
        setNotesText("");
    }


    return (
    <div className='flex flex-col justify-between bg-[#B3B3B3] m-3 p-3 rounded-lg min-h-[200px] text-center text' >
        <textarea className='resize-none bg-inherit border-none outline-none text-center pt-[55px]'
            rows='3'
            placeholder='Type to add new note....'
            value={noteText}
            onChange={handleChange}
        ></textarea>
        <div className ='flex justify-between items-center'>
            <small>200 remaining</small>
            <Button variant="secondary" onClick={handleSaveClick}>Save</Button>
        </div>
    </div>
  )
}

export default AddNote