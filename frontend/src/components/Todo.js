import React from "react";
import {Link} from "react-router-dom";


const TodoItem = ({note, deleteTodo}) => {
    return (
        <tr>
            <td>
                {note.text_note}
            </td>
            <td>
                {note.date_create}
            </td>
            <td>
                {note.project_id}
            </td>
            <td>
                {note.user_note}
            </td>
            <td>
                <button type='button' onClick={() => deleteTodo(note.id)}>Delete</button>
            </td>
        </tr>
    )
}


const TodosList = ({notes, deleteTodo}) => {
    return (
        <div>
            <table>
                <th>
                    Text note
                </th>
                <th>
                   Date create
                </th>
                <th>
                    Project
                </th>
                <th>
                    User note
                </th>
                {notes.map((note) => <TodoItem note={note} deleteTodo={deleteTodo}/>)}
            </table>
            <Link to='/todo/create'>Create</Link>
        </div>
    )
}
export default TodosList