import React from "react";


const ProjectItem = ({project}) => {
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
        </tr>
    )
}


const ProjectsList = ({projects}) => {
    return (
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
            {projects.map((project) => <ProjectItem project={project}/>)}
        </table>
    )
}
export default ProjectsList