import AddNote from "./AddNote";
import Notes from "./Notes";

const NoteLists = ({notes, handleAddNote}) => {
    return <div className="grid lg:grid-cols-4 md:grid-cols-2">
        {notes.map((note) =>( 
            <Notes id={note.id} text={note.text}  date={note.date}/>
        ))}
        <AddNote handleAddNote = {handleAddNote}/>
    </div>
}

export default NoteLists;