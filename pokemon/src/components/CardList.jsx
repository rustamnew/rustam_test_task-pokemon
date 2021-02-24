export const CardList = () => {
    let page = 1
    let limit = 20
    let offset = 0
    let isLoading = false
    let viewportWidth = window.innerWidth
    let viewportHeight = window.innerHeight

    console.log(viewportWidth + ' ' +viewportHeight)

    if (viewportWidth <= 1024) {
        limit = 20
    }
    if (viewportWidth <= 900) {
        limit = 16
    }
    if (viewportWidth <= 768 || viewportHeight <= 1024) {
        limit = 15
    }
    if (viewportWidth <= 425 && viewportHeight <= 900) {
        limit = 9
    }
    if (viewportWidth <= 358) {
        limit = 8
    }
    if (viewportWidth <= 358 && viewportHeight <= 600) {
        limit = 6
    }
    if (viewportWidth <= 358 && viewportHeight <= 500) {
        limit = 4
    }
    if (viewportWidth < 320) {
        limit = 4
    }
    
    const buildCards = async () => {
        isLoading = true

        let arrowLeft = document.querySelector('#left')
        if (page > 1) {
            arrowLeft.disabled = false
        } else if (page <= 1) {
            arrowLeft.disabled = true
        }
        
        let list = document.querySelector('.cardList')
        list.innerHTML= ''

        for (let i = offset; i < offset + limit; i++) {
            let id = i + 1
            await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json().then(async (data) => {
                let name = document.createElement('div')
                name.classList.add('cardName')
                name.innerHTML = `${data.name}`

                let image = new Image()
                image.classList.add('cardImage')
                image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        
                let card = document.createElement('li')
                card.classList.add('cardsItem')

                let cardLink = document.createElement('a')
                cardLink.classList.add('card')
                cardLink.setAttribute('href', `pokemon/${id}`)

                cardLink.appendChild(image)
                cardLink.appendChild(name)
                card.appendChild(cardLink)
                list.appendChild(card)
            }))
        }
        isLoading = false
    }

    const listNav = async (e) => {
        if (e.id === 'right' && !isLoading) {
            page++
            offset += limit
            buildCards()

        } else if (e.id === 'left' && !isLoading) {
            page--
            offset -= limit
            buildCards()
        }
    }

    document.body.onload = () => {
        buildCards()
    }
    
    return <>
        <div className="cardListWrapper">
            <ul className='cardList'></ul>
            <div className="cardListButtons">
                <button onClick={(e) => listNav(e.currentTarget)} className="button left" id='left'>&#8592;</button>
                <button onClick={(e) => listNav(e.currentTarget)} className="button right" id='right'>&#8594;</button>
            </div>
        </div>
        
    </>
}