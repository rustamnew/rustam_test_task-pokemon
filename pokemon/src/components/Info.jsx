export const Info = () => {
    //ПОЛУЧАТЬ ДАННЫЕ С АДРЕСНОЙ СТРОКИ И ЗАПРАШИВАТЬ ИНФУ ПО ID ПОКЕМОНА

    let getPokemonData = async (id = 1) => {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json().then(async (data) => {
            let img = data.sprites.front_default
            let name = data.name
            let id = data.id
            let height = data.height
            let weight = data.weight
            let abilities = data.abilities
            let stats = data.stats

            buildInfo(img, name, id, height, weight, abilities, stats)
        }))
    }

    

    let buildInfo = (img, name, id, height, weight, abilities, stats) => {
        console.log(abilities)
        console.log(stats)
        
        let imgWrap = document.querySelector('.info-image')
        let charsWrap = document.querySelector('.infoChar')
        let statsWrap = document.querySelector('.info-stats')
        let abilitiesWrap = document.querySelector('.abilities')

        let image = new Image()
        image.src = img

        let nameElem = document.createElement('li')
        nameElem.innerHTML = 'Name: ' + name

        let idElem = document.createElement('li')
        idElem.innerHTML ='ID: '+ id

        let heightElem = document.createElement('li')
        heightElem.innerHTML = 'Height: ' + height/10 + 'm'

        let weightElem = document.createElement('li')
        weightElem.innerHTML = 'Weight: ' + weight/10 + 'kg'

        

        
        let abilityParent = document.querySelector('.info-abilities')
        let abilityLabel = document.createElement('div')
        abilityLabel.innerHTML = 'Abilities:'
        abilityParent.insertBefore(abilityLabel, abilitiesWrap)

        for (let i = 0; i < abilities.length; i++) {
            let number = i + 1
            
            let abilitiesElem = document.createElement('li')
            abilitiesElem.innerHTML = number + ') ' + abilities[i].ability.name
            abilitiesWrap.appendChild(abilitiesElem)

        }
    
        for (let i = 0; i < stats.length; i++) {
            let statsElem = document.createElement('li')
            statsElem.classList.add('statsRow')
            statsElem.innerHTML = stats[i].stat.name + ': ' + stats[i].base_stat
            statsWrap.appendChild(statsElem)
        }
        

        imgWrap.appendChild(image)
        charsWrap.appendChild(nameElem)
        charsWrap.appendChild(idElem)
        charsWrap.appendChild(heightElem)
        charsWrap.appendChild(weightElem)
        
        
    }

    let url = window.location.href
    let urlSplit = url.split('/')
    let id = urlSplit[4]

    getPokemonData(id)

    return <>
        <div className="info">
            <div className="infoContent">
                <div className="info-image"></div>

                <div className="info-main">
                    <ul className="infoChar"></ul>
                </div>

                <ul className="info-stats"></ul>

                <div className="info-abilities">
                    <ul className="abilities">

                    </ul>
                </div>
            </div>
        </div>
    </>
}