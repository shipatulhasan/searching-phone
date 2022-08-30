// spiner
const spiner = (isTrue)=>{
  const loader = document.getElementById('preloader')
  if(isTrue){
    loader.classList.remove('d-none')
  }else{
    loader.classList.add('d-none')
  }
 
}
// spineer end

// loading api

const loadData = async(name,dataLimit) =>{
  try{
    const url = `https://openapi.programming-hero.com/api/phones?search=${name}`
    const res = await fetch(url)
    const data = await res.json()
    display(data.data, dataLimit)
  }
  catch (error){

    
    console.log(error)
  }
}


const display = (phones, dataLimit)=>{




  spiner(true)

  // validation

  if(phones.length === 0 ){
    document.getElementById('nothing').classList.remove('d-none')
    spiner(false)
  }else{
    document.getElementById('nothing').classList.add('d-none')

  }
  // call container
  const container = document.getElementById('phone-container')
  container.textContent = ''
  

// slice and show product
const showAll = document.getElementById('show-all')

  if(dataLimit && phones.length > 10){

    phones = phones.slice(0,10)
    showAll.classList.remove('d-none')
  }
  else{
    showAll.classList.add('d-none')
  }

  // remove cotainer after slicing
 

  phones.forEach(phone => {

    

    const div = document.createElement('div')
    div.classList.add('col')
    div.innerHTML = `
    
        <div class="card p-3 h-100 phone-card">
        <img src="${phone.image}" class=" ms-3" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
        <button onclick = "modal('${phone.slug}')" class="btn text-white bg-dark" data-bs-toggle="modal" data-bs-target="#phone-modal">
            view details
        </button>
      </div>
    
    `
    container.appendChild(div)

    spiner(false)

  }); 
}

const modal = async(id)=>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  const res = await fetch(url)
  const data = await res.json()
  displayDetails(data.data)
}

const displayDetails = (data)=>{
  console.log(data)

  const details = document.getElementById('phone-details')
  details.innerHTML = `
            <div class="modal-header">
                <h5 class="modal-title">${data.name}</h5>
                <i class="fa-solid fa-xmark fs-4" data-bs-dismiss="modal" aria-label="Close"></i>
            </div>
            <img src="${data.image}" class="mx-auto m-3" alt="...">
            <div class="modal-body">
              <p>MainFeatures:
                <ul class="">
                  <li>Display-size: ${data.mainFeatures.displaySize}</li>
                  <li>Storage: ${data.mainFeatures.storage}</li>
                  <li>Chipset: ${data.mainFeatures.chipSet}</li>
                  <li>Memory: ${data.mainFeatures.memory}</li>
                </ul>
              </p>
              <p>Others:
                <ul class="">
                  <li>Bluetooth: ${data.others.Bluetooth}</li>
                  <li>GPS: ${data.others.GPS}</li>
                  <li>USB: ${data.others.USB}</li>
                </ul>
              </p>
            </div>
      `

  
}


// search 

const procecing = (dataLimit)=>{
  spiner(true)
  const searchField = document.getElementById('search-field')
  const searchValue = searchField.value
  loadData(searchValue, dataLimit)
  // searchField.value = ''
}

document.getElementById('search-field').addEventListener('keypress',function(e){

  if (e.key === "Enter"){
    procecing(10)
  }

})


const searchPhone = (event) =>{
  event.preventDefault()
  procecing(10)
}


// show all btn

document.getElementById('btn-show').addEventListener('click',function(){
  spiner(true)
  procecing()
})

loadData('iphone')



