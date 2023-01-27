import React from "react";


const TodoItem = ({note}) => {
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
        </tr>
    )
}


const TodosList = ({notes}) => {
    return (
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
            {notes.map((note) => <TodoItem note={note}/>)}
        </table>
    )
}
export default TodosList