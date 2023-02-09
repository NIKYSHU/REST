import React from "react";
import {Link} from "react-router-dom";


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                {project.name_project}
            </td>
            <td>
                {project.link_repo}
            </td>
            <td>
                {project.users_project}
            </td>
            <td>
                <button type='button' onClick={() => deleteProject(project.id)}>Delete</button>
            </td>
        </tr>
    )
}


const ProjectsList = ({projects, deleteProject}) => {
    return (
        <div>
            <table>
            <th>
                Name project
            </th>
            <th>
               Link on repo
            </th>
            <th>
                Users project
            </th>
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
        </table>
        <Link to='/projects/create'>Create</Link>
        </div>
    )
}
export default ProjectsList