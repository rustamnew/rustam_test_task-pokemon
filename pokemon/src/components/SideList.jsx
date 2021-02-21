export const SideList = () => {
    let limit = 40
    let offset = 0

    const getPokemonSideInfo = async () => {
        await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`).then((res) => res.json().then((data) => {
            let results = data.results
            let sideList = document.querySelector('.sideList')

            for (let i = 0; i < data.results.length; i++) {
                let item = document.createElement('li')
                item.classList.add('sideListItem')

                let link = document.createElement('a')
                let href = results[i].url.split('/')
                let id = href[6]
                link.setAttribute('href', `pokemon/${id}`)
                
                link.innerHTML = results[i].name

                item.appendChild(link)
                sideList.appendChild(item)
            }

            let button = document.createElement('button')
            button.innerHTML = 'load more'
            button.classList.add('sideListButton')
            button.addEventListener('click', (e) => {
                offset += limit
                getPokemonSideInfo()
                let button = document.querySelector('.sideListButton')
                if (button) {
                    button.remove()
                }
            })
            sideList.appendChild(button)
        })
    )}
    

    getPokemonSideInfo()



    return <>
        <ul className="sideList"></ul>
    </>
}