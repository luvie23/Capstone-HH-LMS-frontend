import React from 'react'

let members = [
    {name: "Antonia Gallardo ", lastAssignment: "Hashes"},
    {name: "Alicia Cortes", lastAssignment: "More Methods"},
    {name: "Alicia Serrano ", lastAssignment: "CustomEnumerable"},
    {name: "Ruben Arias", lastAssignment: "Training Dashboard 4"},
    {name: "Ruben Arias", lastAssignment: "Money Button Game"},
    {name: "Lucia Prieto", lastAssignment: "Self-reference"},
    {name: "Cesar Soler", lastAssignment: "Query Optimization II"},
    {name: "Juan Carlos Medina", lastAssignment: "Q&A Forums"},
    {name: "Mariano Moreno ", lastAssignment: "Subscription"},
    {name: "Daniel Cruz", lastAssignment: "Developer"},
    {name: "Marta Serrano ", lastAssignment: "CustomString"}
]

export default function lastAssignment() {
  return (
    <div className='flex flex-col h-full bg-slate-800 overflow-auto'>
        {members.map(member => {
            return <div key={member.name+member.lastAssignment} className=''>
                <a className='text-gray-200' href='/'>{member.name}</a>
                <p className='text-xs font-normal text-gray-400 '>Last Assignment: {member.lastAssignment}</p>
            </div>
        })}
    </div>
  )
}
