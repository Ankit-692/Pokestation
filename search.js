const types = document.querySelector('.types').children;
const homePage = document.querySelector('.home-page');
const resultPage = document.querySelector('.result-page');
const strongList = document.querySelector('.stg');
const weakList = document.querySelector('.wek');
const sicon = document.querySelector('.search-icon');
const ppage = document.querySelector('.pic-page');
const pokspic = document.querySelector('.pokspic');
const theBall = document.querySelector('.bicon');
const resHead = document.querySelector('.resHead');
const ehead = document.querySelector('.ehead');
const headings = document.querySelectorAll('h1');
const root = document.querySelector(":root");
const loading = document.querySelector('.spinner');
const searchBar = document.querySelector('.bar-box');
const submit = document.querySelector('.submit');
const detailPage = document.querySelector('.pok-det');
const detIcon = document.querySelector('.det-icon');
const details = document.querySelector('.details');
const dName = document.querySelector('.dName');
const wh = document.querySelector('.wh');
const strong = document.querySelector('.strong');
const weak = document.querySelector('.weak');
const footer = document.querySelector('.footer');


theSList=[]
theWList=[]
theS1List=[]
theW1List=[]





const loadresult=(splitHash)=>{
  const newHash=splitHash[1].split('-');
  if (newHash[0]=="pokemon"){
    init();
    if(newHash.length>2){
     const cHash = newHash.splice(1,newHash.length);
     const joinedHash = cHash.join('-')
     getDetails(joinedHash)
    }
    else{
      getDetails(newHash[1]);
    }
  }
  else{
  control(newHash[1]);
  }

  if (newHash[0]=="every"){
        setTimeout(()=>{
          resultPage.classList.add('hide');
          sicon.classList.add('hide');
          pokspic.classList.remove('hide');
          loading.classList.add('hide');
          footer.style.opacity='1';
        },1500);
}
else{
  setTimeout(()=>{
    loading.classList.add('hide');
    footer.style.opacity='1';
  },1000);

}

};


window.onload = ()=>{
const hash= window.location.hash;
if(hash=='') loading.classList.add('hide');
footer.style.opacity='1';
const splitHash=hash.split('#');
if(splitHash[1]){
loadresult(splitHash);
topFunction();
}
};

  window.addEventListener('hashchange',()=>{
    init();
    detailPage.classList.add('hide');
    footer.style.opacity='0';
    loading.classList.remove('hide');
    const hash = window.location.hash;
    if(hash==''){
      loading.classList.add('hide');
      footer.style.opacity='1';
      homePage.classList.remove('hide');
      pokspic.classList.add('hide');
      resultPage.classList.add('hide');
      sicon.classList.add('hide');
    }
    const splitHash = hash.split('#');
    if (splitHash[1]){
    loadresult(splitHash);
    topFunction();
}else{
  homePage.classList.remove('hide');
}
  });



const firstLoad = ()=>{
  setTimeout(()=>{
      root.style.setProperty("--display", '1');
  },1000);

   setTimeout(()=>{
    root.style.setProperty("--display", '0');
  }, 4000);
};




const init=()=>{
  topFunction();
  resHead.innerHTML="";
  strongList.innerHTML="";
  weakList.innerHTML="";
  ppage.innerHTML="";
  ehead.innerHTML="";
  detIcon.innerHTML="";
  wh.innerHTML="";
  dName.innerHTML="";
  strong.innerHTML="";
  weak.innerHTML="";
  Array.from(types).forEach((logo)=>{
    logo.style.transform="scale(1)";
  });
  theSList=[]
  theWList=[]
  theS1List=[]
  theW1List=[]
};

class Search {
  constructor(type) {
    this.type = type;
  }

  async getPoke() {
    await fetch (`https://pokeapi.co/api/v2/type/${this.type}`)
    .then(data=> {
      return data.json();
    })
    .then(result=> {
      console.log(result);
      this.names = result.pokemon;
      this.strong = result.damage_relations.double_damage_to;
      this.weak = result.damage_relations.double_damage_from;
      this.numOfPok = result.pokemon.length;
    })
    .catch(error => {
      console.log(error);
      alert('Something went Wrong please try again');
    });
  }

}

function topFunction() {
  document.body.scrollTop = 0;
  // For Safari
  document.documentElement.scrollTop = 0;
  // For Chrome, Firefox, IE and Opera
}



Array.from(types).forEach(cards=> {
  cards.addEventListener('click', ()=> {
    let source = cards.src;
    const picName = source.replace(/^.*[\\\/]/, '');
    const searchValue = picName.split('.');
    const pokemonValue = searchValue[0];
    cards.style.transform = "scale(1.1)";
    window.location.hash = `type-${pokemonValue}-pokemon`;
    firstLoad();
  });
});

const hasharr = [];

const store = (pokemonValue)=>{
  hasharr[0]=pokemonValue;
};

const stgList = (pk)=>{
  strongList.insertAdjacentHTML('beforeend',
  `
  <img src="logo/${pk}.png">
  `

  );
};

const wekList = (pok) => {
  weakList.insertAdjacentHTML('beforeend',
  `
  <img src="logo/${pok}.png">
  `
  );
};


const addppage = (value) => {
  ppage.insertAdjacentHTML('beforeend',

 `
 <figure class="aniPok">
    <img src="https://img.pokemondb.net/artwork/large/${value}.jpg">
    <figcaption>${value}</figcaption>
    </figure>
 `

  );
};

const options={
  rootMargin:"5px",
  threshold: 0,
  root:null
};

const anime = new IntersectionObserver((entries, anime)=>{
  entries.forEach(entry=>{
if(!entry.isIntersecting) return;
entry.target.style.opacity="1";
    entry.target.style.transform = "translateY(0)";
    // anime.unobserve(entry.target);
  });
},
 options
  );




const control = async (pokemonValue)=> {

  const search = new Search(pokemonValue);
  await search.getPoke();
  if (search.names != null){
    homePage.classList.add('hide');
    resultPage.classList.remove('hide');
    sicon.classList.remove('hide');
    pokspic.classList.add('hide');
    topFunction();
    store(pokemonValue);
    resHead.insertAdjacentHTML('afterbegin',

      `
      <div class="type-banner">
            <img src="logo/${search.type}.png">
      </div>
          <p>
            Total ${search.type} type pokemon <br><br><span class="num">${search.numOfPok}</span>
          </p>
      `
    );

    ehead.insertAdjacentHTML('afterbegin',
    `
    <div class="head-name">Every ${pokemonValue} Pokemon</div>
    `);

    search.strong.forEach(pk => {
      stgList(pk.name);
    });

    search.weak.forEach(pok => {
      wekList(pok.name);
    });

    search.names.forEach(value => {
      addppage(value.pokemon.name);
    });
    addevent(strongList.children);
    addevent(weakList.children); 
  }
  else return;

  lastpage(ppage.children);
  footer.style.opacity='1';
};

sicon.addEventListener('click', ()=>{
  resultPage.classList.add('hide');
  sicon.classList.add('hide');
  pokspic.classList.remove('hide');
  window.location.hash = `every-${hasharr[0]}-type`;
  topFunction();
});

theBall.addEventListener('click', ()=>{
  homePage.classList.remove('hide');
  pokspic.classList.add('hide');
  resultPage.classList.add('hide');
  sicon.classList.add('hide');
  init();
    window.location.hash='';
});

Array.from(types).forEach(img =>{
  anime.observe(img);
});

Array.from(headings).forEach(hds=>{
  anime.observe(hds);
});



 const getDetails = async (sName)=> {
     await fetch(`https://pokeapi.co/api/v2/pokemon/${sName}`)
         .then(data => {
           return data.json();
         })
         .then(result => {
           detIcon.insertAdjacentHTML('afterbegin',`
           <img src="https://img.pokemondb.net/artwork/large/${sName}.jpg">
           <h1> ${sName} </h1>
           `);
           homePage.classList.add('hide');
           detailPage.classList.remove('hide');

            console.log(result.stats);
            const stat=result.stats;
            let hp=(stat[0].base_stat)*2;
            let attack=(stat[1].base_stat)*2;
            let defense=(stat[2].base_stat)*2;
            let spA=(stat[3].base_stat)*2;
            let spD=(stat[4].base_stat)*2;
            let speed=(stat[5].base_stat)*2;

            document.getElementById('hp').style.width= `${hp}px`;
            document.getElementById('attack').style.width= `${attack}px`;
            document.getElementById('defense').style.width= `${defense}px`;
            document.getElementById('special-attack').style.width= `${spA}px`;
            document.getElementById('special-defense').style.width= `${spD}px`;
            document.getElementById('speed').style.width= `${speed}px`;

           const weight = (result.weight)/10;
           const height = (result.height)/10;

           const add = (weight, height)=>{
           wh.insertAdjacentHTML('beforeend',`
           <h1>Weight : <span>${weight}</span> Kg</h1>
           <h1>Height : <span>${height}</span> m</h1>
           `)}

           add(weight, height);

           Array.from(result.types).forEach(tName=>{
             dName.insertAdjacentHTML('afterbegin',`
             <img src="logo/${tName.type.name}1.png">
             `)
           })
           const serList=result.types;
           console.log(serList)
           
           
           if(serList.length!==1){
            detList(serList[1].type.name);
            secondList(serList[0].type.name);
          }
          else{
            detList(serList[0].type.name);
            }
         })
   .catch (error =>{
     setTimeout(() => {
      alert("Please Enter a Valid Pokemon Name or Check you Internet and try again afer some time");
      window.location.hash="";
     }, 500);
     
   })
   footer.style.opacity='1';
};

const detList = async (tName)=>{
await fetch(`https://pokeapi.co/api/v2/type/${tName}`)
.then(data=> {
  return data.json();
})
.then(result=> {
  const strongs = result.damage_relations.double_damage_to;
  const weaks = result.damage_relations.double_damage_from;

  Array.from(strongs).forEach(pkk=>{
    theS1List.push(pkk.name)
    strong.insertAdjacentHTML('afterbegin', `
    <img src="logo/${pkk.name}.png">
    `);
  })

  Array.from(weaks).forEach(wkk=>{
    theW1List.push(wkk.name)
    weak.insertAdjacentHTML('afterbegin',`
    <img src="logo/${wkk.name}.png">
    `); 
  })

  addevent(strong.children);
  addevent(weak.children);
})
}


submit.addEventListener('click', ()=>{
 pokemonHash();
});

searchBar.addEventListener('keypress',()=>{
  if(event.keycode===13||event.which===13){
 pokemonHash();
}
});

const pokemonHash = ()=>{
  byName = searchBar.value;
  console.log(byName)
  yName = byName.split(' ')
  jName = yName.join('-')
  sName = jName.toLowerCase();
  if(sName) window.location.hash=`pokemon-${sName}`;
  }

  
const addevent = (cross) => {
  Array.from(cross).forEach(imgs=>{
    imgs.addEventListener('click',()=>{
      const name = imgs.src;
      const picName = name.replace(/^.*[\\\/]/, '');
    const searchValue = picName.split('.');
    const typevalue = searchValue[0];
    window.location.hash=`every-${typevalue}-type`;
    })
})
}

const lastpage = (namae)=>{
  Array.from(namae).forEach(imgs=>{
    imgs.addEventListener('click',(event)=>{
      const val = event.target.getAttribute('src')
      const picName = val.replace(/^.*[\\\/]/, '');
      const searchValue = picName.split('.');
      const typevalue = searchValue[0];
      window.location.hash=`pokemon-${typevalue}`;
    })
  })
}

const secondList = async (tname)=>{
await fetch(`https://pokeapi.co/api/v2/type/${tname}`)
.then(data=>{
  return data.json()
})
.then(result=> {
  const strongs = result.damage_relations.double_damage_to;
  const weaks = result.damage_relations.double_damage_from;
  Array.from(strongs).forEach(stg=>{
    theSList.push(stg.name)
  })
console.log(theSList)
console.log(theS1List)

Array.from(weaks).forEach(wek=>{
  theWList.push(wek.name)
})
console.log(theWList)
console.log(theW1List)
strong.innerHTML="";
weak.innerHTML="";  
}
)


theS1List.forEach(el=>{
  strong.insertAdjacentHTML('afterbegin', `
    <img src="logo/${el}.png">
    `);
})


theSList.forEach(el=>{
  if(theS1List.indexOf(el)==-1){
    strong.insertAdjacentHTML('afterbegin', `
    <img src="logo/${el}.png">
    `);
  }
})

theW1List.forEach(el=>{
  if(theS1List.indexOf(el)==-1 && theSList.indexOf(el)==-1){
    weak.insertAdjacentHTML('afterbegin',`
    <img src="logo/${el}.png">
    `); 
  }
})

theWList.forEach(el1=>{
  if(theW1List.indexOf(el1)==-1 && theS1List.indexOf(el1)==-1){
    if(theSList.indexOf(el1)==-1){
    weak.insertAdjacentHTML('afterbegin',`
    <img src="logo/${el1}.png">
    `); 
  }
}
})
addevent(strong.children);
addevent(weak.children);
}
