export const MainList = () => {
    let page = 1
    let cardsPerPage = 45
    let viewportWidth = window.innerWidth
    //if (viewportWidth < 1545) {
    //    cardsPerPage = 35
    //}

    const getPageInfo = async (page = 1) => {
        await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${cardsPerPage}&offset=${(page - 1)*cardsPerPage}`).then(res => res.json().then(async (data) => {
            let list = document.querySelector('.mainList')
            list.innerHTML = ''
            
            for (let i = 0; i < data.results.length; i++) {
                let url = data.results[i].url
                await getData(url)
            }
        }))
        checkPage(page)
    }

    const getData = async (url) => {
        await fetch(`${url}`).then((res) => res.json().then(async (data) => {

            let name = document.createElement('div')
            name.classList.add('cardName')
            name.innerHTML = `${data.name}`

            let href = url.split('/')
            let id = href[6]

            let image = new Image()
            image.classList.add('cardImage')
            image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

            buildCard(image, name, url, id)
        })
        )
    }

    const buildCard = (image, name, url, id) => {
        let list = document.querySelector('.mainList')
        
        let card = document.createElement('li')
        card.classList.add('cardsItem')

        let cardLink = document.createElement('a')
        cardLink.classList.add('card')
        cardLink.setAttribute('href', `pokemon/${id}`)

        cardLink.appendChild(image)
        cardLink.appendChild(name)
        card.appendChild(cardLink)
        list.appendChild(card)
    }
    

    const listNav = (e) => {
        console.log(fetch(`https://pokeapi.co/api/v2/pokemon`).then(res => res.json().then(data => console.log(data))))
        if (e.id === 'right') {
            getPageInfo(++page)
            checkPage(page)

        } else if (e.id === 'left') {
            getPageInfo(--page)
            checkPage(page)
        }
    }

    const checkPage = (page = 1) => {
        let arrowLeft = document.querySelector('#left')
        if (page > 1) {
            arrowLeft.disabled = false
        } else if (page <= 1) {
            arrowLeft.disabled = true
        }
    }

    getPageInfo()
    
    return <>
        <div className="mainListWrapper">
            <ul className='mainList'></ul>
            <div className="mainListButtons">
                <button onClick={(e) => listNav(e.currentTarget)} className="button left" id='left'>&#8592;</button>
                <button onClick={(e) => listNav(e.currentTarget)} className="button right" id='right'>&#8594;</button>
            </div>
        </div>
        
    </>
}