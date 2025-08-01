import { NotePreview } from "./NotePreview.jsx";

const { useState } = React
const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote, onEditNote, onChangeNoteColor, onTogglePin, onDuplicateNote }) {

    const [openDropdownId, setOpenDropdownId] = useState(null)

    const colors = [
        { name: '--color1', label: 'Color 1' },
        { name: '--color2', label: 'Color 2' },
        { name: '--color3', label: 'Color 3' },
        { name: '--color4', label: 'Color 4' },
        { name: '--white', lable: 'White' }
    ]

    function toggleDropdown(noteId) {
        setOpenDropdownId(prev => (prev === noteId ? null : noteId))
    }

    return (
        <ul className="note-list">
            
            {notes.map(note => (
                <li 
                    key={note.id} 
                    className="note-card" 
                    style={{ backgroundColor: note.style && note.style.backgroundColor || '#fff' }}
                >

                    <NotePreview note={note} onTogglePin={onTogglePin} />

                    <section className="handle-note-btns">
                        <button onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash"></i></button>
                        <button onClick={() => onEditNote(note)}><i className="fa-solid fa-pen-to-square"></i></button>
                        <button onClick={() => onDuplicateNote(note)}><i className="fa-solid fa-clone"></i></button>
                        {note.type === 'NoteTxt' && (
                            <Link
                                to={`/mail/edit/?subject=${note.info.title || ''}&body=${note.info.txt || ''}`}
                            >
                                <i className="fa-solid fa-envelope"></i>
                            </Link>
                        )}

                        <div className="color-picker">
                            <button onClick={() => toggleDropdown(note.id)}><i className="fa-solid fa-palette"></i></button>

                            {openDropdownId === note.id && (
                                <div className="color-dropdown">
                                    {colors.map(c => (
                                        <div
                                            key={c.name}
                                            className="color-switch"
                                            style={{ backgroundColor: `var(${c.name})` }}
                                            onClick={() => {
                                                onChangeNoteColor(note.id, `var(${c.name})`)
                                                setOpenDropdownId(null)
                                            }}>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                </li>
            ))}
            
        </ul>
    )
}
