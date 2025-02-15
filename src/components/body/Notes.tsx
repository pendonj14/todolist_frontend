import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";



const Notes = ({id, text, date}) => {
    return (
        <div className = 'flex flex-col justify-between bg-[#ffc843] m-3 p-3 rounded-lg min-h-[200px] text-center'>
            <span className="pt-[55px]">{text} </span>
            
            <div className ='flex justify-between items-center'>
                <small>{date}</small>
                <div className="flex"> 
                    <MdOutlineEdit />
                    <MdDelete />
                </div>
            </div>
        </div>
    )
}

export default Notes;