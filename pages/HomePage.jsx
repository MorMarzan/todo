const { useRef } = React

export function HomePage() {

    const imgRef = useRef()

    
    return (
        <section className="home-page">
            <img ref={imgRef} src="./assets/img/todo-home.jpg" alt="working" />
        </section >
    )
}