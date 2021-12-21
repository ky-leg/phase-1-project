const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
//initialize empty asset obj    
let asset = {}
    

document.addEventListener('DOMContentLoaded', e => {
    //fetch request
    fetch(url)
        .then((resp) => resp.json())
        .then((arr) => {
            saveToVar(arr)
            displayBtn()
        }) 
})



function saveToVar(arr){
    //search returned arr and store into asset object
    for (const key in arr){
        if (arr[key].id === 'bitcoin'){
            asset.btc = arr[key]
        }
        if (arr[key].id === "ethereum"){
            asset.eth = arr[key]
        }
        if (arr[key].id === "avalanche-2"){
            asset.avax = arr[key]
        }
        if (arr[key].id === "chainlink"){
            asset.link = arr[key]
        }
        if (arr[key].id === "solana"){
            asset.sol = arr[key]
        }
    }    
}

function displayBtn(){
    //creating btn/card for each asset
    for (const key in asset){
        let assetKey = asset[key]
        createTopBtn(assetKey)
        createCards(assetKey)     
    }
}

function createTopBtn(assetKey){
    //grabbing location for btn
    const assetBtns = document.getElementById('asset-btns')
    //create btn, set btn to have symbol as text, set btn id so that id can be used to identify the event
    const btn = document.createElement('button')
    btn.innerText = assetKey.symbol.toUpperCase()
    btn.id = `${assetKey.symbol.toLowerCase()}`
    //add listener event to btn so when clicked we can display a card for that button and hide that btn
    btn.addEventListener('click', e => turnOnCard(e))
    assetBtns.appendChild(btn)
}

function createCards(assetKey){
     //grab card deck 
     const assetContainer = document.getElementById('asset-container')

     //create divCard
     const divCard = document.createElement('div')
     divCard.className = 'card'
     divCard.id = `${assetKey.symbol.toLowerCase()}-card`
     divCard.style.display = "none"

     //create elements for card, add information to elements
     const h1 = document.createElement('h1');
     h1.append(assetKey.name)
     const img = document.createElement('img');
     img.src = `${assetKey.image}`
     img.className = 'currency-avatar'
     const h2 = document.createElement('h2');
     h2.append(`$${assetKey.current_price}`)
     const delBtn = document.createElement('button');
     delBtn.innerText = 'DELETE'
     delBtn.addEventListener('click', e => turnOffCard(e))

     //append elemetns to card
     divCard.append(h1, img, h2, delBtn)
     assetContainer.appendChild(divCard)
}

function turnOnCard(e){
    e.target.style.display = 'none'
    const id = `${e.target.id}-card`    
    const card = document.getElementById(`${id}`)
    card.style.display = 'block'
}

function turnOffCard(e){
    const div = e.target.parentElement
    div.style.display = 'none'
    const divId = div.id
    const id = divId.substring(0, divId.length - 5)
    const btn = document.getElementById(id)
    btn.style.display = 'block'
}

// function addCard(e){
//     //delete btn now that it's been clicked
//     //TODO delete target btn

//     //add card for clicked btn
//     const targetAsset = asset[e.target.id]

//     //grab card deck 
//     const assetContainer = document.getElementById('asset-container')

//     //create divCard
//     const divCard = document.createElement('div')
//     divCard.className = 'card'
//     divCard.style.display = "none"

//     //create elements for card, add information to elements
//     const h1 = document.createElement('h1');
//     h1.append(targetAsset.name)
//     const img = document.createElement('img');
//     img.src = `${targetAsset.image}`
//     img.className = 'currency-avatar'
//     const h2 = document.createElement('h2');
//     h2.append(`$${targetAsset.current_price}`)
//     const btn = document.createElement('button');
//     btn.innerText = 'DELETE'
//     btn.addEventListener('click', e => {/*TODO DELETE CARD AND ADD BACK BTN*/})

//     //append elemetns to card
//     divCard.append(h1, img, h2, btn)
//     assetContainer.appendChild(divCard)
// }