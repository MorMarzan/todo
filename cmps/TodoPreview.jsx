

export function TodoPreview({ todo }) {

    const dynClass = todo.isDone ? 'done' : ''

    return (
        <article className="todo-preview">
            <p className={dynClass}>{todo.txt}</p>
            {/* <h4>Todo done? {todo.isDone ? 'yes' : 'no'}</h4> */}
        </article>
    )
}