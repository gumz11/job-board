import React from 'react';

const Sidebar = (props) => (
    <aside>
        <table>
            <thead>
                <tr>
                    <th scope="col"> # </th>
                    <th scope="col"> Position </th>
                    <th scope="col"> Location </th>
                </tr>
            </thead>
            <tbody>
                {props.jobs.map((m, i) => (
                    <tr key={m.id} onClick={() => props.onClick(m)} className={`${m.selected ? 'jb-selected' : ''}`}>
                        <th scope="row"> {i+1} </th>
                        <td> {m.title} </td>
                        <td> {m.location} </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </aside>
);

export default Sidebar;


