let card=document.querySelectorAll(".songcard")
let pl=document.querySelector
for(let i of card){
    i.addEventListener("mouseenter",()=>{
        i.firstElementChild.style.display="flex"
    })
    i.addEventListener("mouseleave",()=>{
        i.firstElementChild.style.display="none"
    })
}
let m =0

function sectotime(x){
    let min = 0
    let sec = 0
    if(x>=60){
        min=parseInt(parseInt(x)/60)
        sec=parseInt(x)%60
    }else{
        sec = parseInt(x)
    }
    if(min<10 && sec<10){
        return `0${min}:0${sec}`
    }else if(min<10&&sec>=10){
        return `0${min}:${sec}`
    }else if(min>=10&&sec<10){
        return `${min}:0${sec}`
    }else{
        return `${min}:${sec}`
    }
}
let mus = new Audio()
let playy=document.querySelector(".playy")
playy.addEventListener("click",()=>{
    if(mus.paused){
        mus.play()
        playy.src="img/paused.svg"
    }else{
        mus.pause()
        playy.src="img/pl.svg"
    }
})

async function song() {
    let allsong=[]
    let a = await fetch("songs.json")
    let res=await a.json()
    let el = document.createElement("div")
    el.innerHTML=res
    
    
    // let as=el.getElementsByTagName("a")
    // for(let i =0;i<as.length;i++){
    //     if(as[i].href.endsWith(".mp3")){
    //         allsong.push(as[i].href)
    //     }
    // }
    
    for(let s of res){
        allsong.push(`songs/${s}`)
    }
    return(allsong)
}


function addsong(songname,singer,songimg){
   let el =  document.querySelector(".songlist")
   
   el.innerHTML=el.innerHTML+`<div class="left-songcard">
                        <div class="song-img" style="background-image: url(${songimg}); background-position: center; object-fit: cover;background-size: cover;"">
                            <img src="img/music.svg" alt="">
                        </div>
                        <div class="songname">
                            <h3 class="song-h">${songname}</h3>
                            <p>${singer}</p>
                        </div>
                        <div class="songplay">
                            <h3>play now</h3>
                            <img src="img/pl.svg" alt="">
                        </div>
                    </div>`
}
function playmusic(music){
    m=1
    let circle=document.querySelector(".circle")
    
    mus.src=music
    mus.play()
    let songduration = document.querySelector(".songduration")
    mus.addEventListener("loadedmetadata",()=>{
        songduration.innerText=`${sectotime(mus.duration)}/00:00`
    })
    mus.addEventListener("timeupdate",()=>{
         songduration.innerText=`${sectotime(mus.duration)}/${sectotime(mus.currentTime)}`
         circle.style.left=`${mus.currentTime*98/mus.duration}%`
         

    })
    let songinfo1=document.querySelector('.song-info')
    songinfo1.innerHTML=`<h4>${check(mus.src).replaceAll("%20"," ")}</h4>`
    
}
function check(ch){
    let x=ch.split("/")
    
    
    
    return x.pop().replace(".mp3"," ")
    
}




 async function main2(){
    let newsong=await song()
    
    
    
    
    let songinfo = document.querySelector(".song-info")
    

    
    
    let musicc=document.querySelectorAll(".left-songcard")
    
    for(let x of newsong){
        if(musicc[0].getElementsByClassName("song-h")[0].innerText.toLocaleLowerCase()==check(x).trim().toLocaleLowerCase()){
            playmusic(x)
        }
    }
    let allcard=[]
    for(let i of musicc){
        allcard.push(i.getElementsByClassName("song-h")[0].innerText.toLowerCase())
        
    }
    
    for (let i of musicc) {
        i.addEventListener("click",()=>{
            for (const z of newsong) {
               

                if(i.getElementsByClassName("song-h")[0].innerText.toLowerCase()==check(z).trim().toLowerCase()){
                    playmusic(z)
                    
                    playy.src="img/paused.svg"
                    // songinfo.innerHTML=`<h4>${i.getElementsByClassName("song-h")[0].innerText}</h4>`
                }
                
            }
            
        })
    }
    
    
    let next=document.querySelector(".next")
let pre =document.querySelector(".previos")
next.addEventListener("click",()=>{
    
    for(let i of allcard){
        
        if(check(mus.src).trim().toLowerCase().replaceAll("%20"," ")==i){

            
            for(let z of newsong){
                if(check(z).trim().toLowerCase()===allcard[allcard.indexOf(i)+1]){
                    if(allcard.indexOf(i)+1<allcard.length){
                        
                        playmusic(z)
                        
                    }
                    
                }
            }
            break
        }
    }
})
pre.addEventListener("click",()=>{
    
    for(let i of allcard){
        if(check(mus.src).trim().toLowerCase().replaceAll("%20"," ")==i){
           
            
            for(let z of newsong){
                if(check(z).trim().toLowerCase()===allcard[allcard.indexOf(i)-1]){
                    if(allcard.indexOf(i)-1>=0){
                        
                        playmusic(z)
                        
                    }
                    
                }
            }
            break
        }
    }
})

}
let arr = document.querySelector(".arr")
let n=0


arr.addEventListener("click",()=>{
    
    if(n%2==0){
        n++
        
        
        document.querySelector(".left").style.left="0px"
        document.querySelector(".arrow").style.right="5%"
    }else{
        n++
        document.querySelector(".left").style.left="-255px"
        document.querySelector(".arrow").style.right="0"
    }
    
    
})

async function main3() {
    let nsong=await song()
    let sc=document.querySelectorAll(".sc")

for(let i of sc){
    i.addEventListener("click",()=>{
        for(let z of nsong){
            if(i.getElementsByClassName("nm")[0].innerText.toLowerCase()===check(z).trim().toLocaleLowerCase()){
                
                playmusic(z)
                document.querySelector(".playy").src="img/paused.svg"
            }
            
        }
        
    })}
}
main3()
document.querySelector(".gym").addEventListener("click",()=>{
    document.querySelector(".songlist").innerHTML=""
    addsong("Kar Har Maidan Fateh","rajkumar hirani","img/kar.jpeg")
    addsong("Arjan Vailly","sandeep,bhupinder","img/arjanv.jpg")
    main2()
    if(playy.src="img/pl.svg"){
        playy.src="img/paused.svg" 
    }
})
document.querySelector(".rom").addEventListener("click",()=>{
    document.querySelector(".songlist").innerHTML=""
    addsong("Aawaara angaara","A.R.Rahman,Faheem","img/3rd.jpeg")

addsong("i think they call this love - cover","matthew ifiels","img/7th.jpeg")
addsong("DARKHAAST","Arjit Singh,Sunidhi chauhan","img/darkhaast.jpg")
addsong("Hua Main x Finding Her","","img/lofis.png")
main2()
if(playy.src="img/pl.svg"){
        playy.src="img/paused.svg" 
    }
})
document.querySelector(".bl").addEventListener("click",()=>{
    document.querySelector(".songlist").innerHTML=""
    addsong("FA9LA","Flipperachi","img/1sttrend.jpeg")

    addsong("Ishq Jalakar - Karvaan","Shashwat Sachdev,Shahzad Ali","img/2nd.jpeg")
    addsong("sitaare","arjit singh,white noise collectives","img/4th.jpeg")
    main2()
    if(playy.src="img/pl.svg"){
        playy.src="img/paused.svg" 
    }
})
document.querySelector(".lofi").addEventListener("click",()=>{
    document.querySelector(".songlist").innerHTML=""
    addsong("Hua Main x Finding Her","","img/lofis.png")
    main2()
    if(playy.src="img/pl.svg"){
        playy.src="img/paused.svg" 
    }
})
document.querySelector(".eng").addEventListener("click",()=>{
    document.querySelector(".songlist").innerHTML=""
    addsong("i think they call this love - cover","matthew ifiels","img/7th.jpeg")
    addsong("CHANEL","tyla","img/10th.jpeg")
    main2()
    if(playy.src="img/pl.svg"){
        playy.src="img/paused.svg" 
    }
})
document.querySelector(".party").addEventListener("click",()=>{
    document.querySelector(".songlist").innerHTML=""
    addsong("Brown Rang","yo yo honey singh","img/brown.jpeg")
    addsong("Chaar Botal Vodka","yo yo honey singh","img/chaarbotal.jpg")
    main2()
    if(playy.src="img/pl.svg"){
        playy.src="img/paused.svg" 
    }
})
async function main3(){

    let ss= await song()
    
    let sc = document.querySelectorAll(".sc")
    for(let i of sc){
        i.addEventListener("click",()=>{
            
            for(let z of ss){
                if(check(z).trim().toLocaleLowerCase()==i.getElementsByClassName("nm")[0].innerText.toLocaleLowerCase()){
                    playmusic(z)
                    m=0
                    if(document.querySelector(".playy").src="img/pl.svg"){
                        document.querySelector(".playy").src="img/paused.svg"
                    }
                }
            }

        })
        
    }
let arr=[]

        
        
        
    
}
main3()
document.querySelector(".stick").addEventListener("click",e=>{
        let m =e.offsetX*100/e.target.getBoundingClientRect().width
        document.querySelector(".circle").style.left=`${m}%`
        mus.currentTime=m*mus.duration/100
    })
let vol=document.querySelector(".range")
    vol.addEventListener("change",e=>{
       
        mus.volume=e.target.value/100
    })


main2()





