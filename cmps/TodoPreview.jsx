

export function TodoPreview({ todo }) {

    const dynClass = todo.isDone ? 'done' : ''

    return (
        <article className="todo-preview">
            <p className={dynClass}>{todo.txt}</p>
        </article>
    )
}