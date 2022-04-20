import axios from 'axios'
import { Link } from 'react-router-dom'
import data from './data'
export default function ToDoList(){
  return (
    <div>
        {
            data.map((info)=>{
                const {title}=info
                return(
                    <ul>
                        <li>
                            {title}
                        </li>
                    </ul>
                )
            })
        }
    </div>
  )
}