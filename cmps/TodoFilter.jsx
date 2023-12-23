
const { useState, useEffect } = React



export function TodoFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onSetFilterBy(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function handleIsDoneSelect({ target }) {
        let value = target.value
        switch (target.value) {
            case 'true':
                value = true
                break
            case 'false':
                value = false
                break
            default:
                value = undefined
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, isDone: value }))
    }

    const { txt, isDone } = filterByToEdit

    return (
        <section className="todo-filter">
            <h2>Filter Our Todos</h2>
            <form onSubmit={onSetFilterBy} >

                <label htmlFor="txt">Text: </label>
                <input value={txt} onChange={handleChange} type="text" id="txt" name="txt" />

                <label htmlFor="isDone">Done Status:</label>
                <select name="isDone" id="isDone" onChange={handleIsDoneSelect} defaultValue={isDone}>
                    <option value='undefined'>All</option>
                    <option value='false'>Active</option>
                    <option value='true'>Completed</option>
                </select>

                <button>Submit</button>
            </form>
        </section>
    )
}