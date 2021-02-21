export const Header = () => {
    let randomId = Math.round(Math.random()*898)

    return <>
        <div className='header'>
            <nav className='headerNav'>
                <a href='/' className="headerButton">Главная</a>
                <a href={`/pokemon/${randomId}`}className="headerButton">Случайный покемон</a>
                <a href='https://pokeapi.co/' className="headerButton" target="_blank">PokeApi</a>
            </nav>
        </div>
    </>
}