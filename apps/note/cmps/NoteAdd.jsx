const { useState } = React

export function NoteAdd({ onAddNote }) {
    const [noteToAdd, setNoteToAdd] = useState({ title: '', type: '', content: '' })

    function handleChange({ target }) {
        const { name, value } = target
        setNoteToAdd(prevNote => ({ ...prevNote, [name]: value }))
    }

    function handleTypeSelect(type) {
        setNoteToAdd(prev => ({ ...prev, type, content: '' }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        const { type, title, content } = noteToAdd
        if (!type || !title) return

        const note = {
            type,
            info: getInfoByType(type, title, content)
        }
        onAddNote(note)
        setNoteToAdd({ type: '', title: '', content: '' }) 
        console.log('note to add:', note)
    }

    function getInfoByType(type, title, content) {
        switch (type) {
            case 'NoteTxt':
                return { title, txt: content }
            case 'NoteImg':
            case 'NoteVideo':
                return { title, url: content }
            case 'NoteTodos': {
                const todos = (content || '')
                    .split(',')
                    .map(txt => txt.trim())
                    .filter(txt => txt)
                    .map(txt => ({ txt, doneAt: null }))
                return { title, todos }
            }
            default:
                return { title }
        }
    }

    function getPlaceholder(type) {
        switch(type) {
            case 'NoteTxt':
                return 'Enter text note...'
            case 'NoteImg':
                return 'Enter image URL...'
            case 'NoteVideo':
                return 'Enter YouTube URL...'
            case 'NoteTodos':
                return 'Enter comma separated list: car, dog, house...'
            default:
                return 'Choose a type for your note...'
        }
    }

    function handleImageUpload(ev) {
        const file = ev.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setNoteToAdd(prev => ({ ...prev, content: reader.result }))
        }
        reader.readAsDataURL(file)
    }


    return (

        <section className="note-add-container">
           
            <form onSubmit={handleSubmit}>
                
                {noteToAdd.type && (
                    <input
                        className="title-input"
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={noteToAdd.title}
                        onChange={handleChange}
                    />
                )}

                {noteToAdd.type === 'NoteImg' ? (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                ) : (
                    <input
                        className="body-input"
                        type="text"
                        name="content"
                        placeholder={getPlaceholder(noteToAdd.type)}
                        value={noteToAdd.content}
                        onChange={handleChange}
                    />
                )}

                <section className="handle-note-type">
                    <button type="button" onClick={() => handleTypeSelect('NoteTxt')}><i className="fa-solid fa-font"></i></button>
                    <button type="button" onClick={() => handleTypeSelect('NoteImg')}><i className="fa-solid fa-image"></i></button>
                    <button type="button" onClick={() => handleTypeSelect('NoteVideo')}><i className="fa-solid fa-video"></i></button>
                    <button type="button" onClick={() => handleTypeSelect('NoteTodos')}><i className="fa-solid fa-list"></i></button>
                    {noteToAdd.type && <button className="add-note-btn" type="submit"><i className="fa-solid fa-plus"></i></button>}
                </section>

            </form>
            
        </section>
    )
}
