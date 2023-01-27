 //DOM
const $root = document.querySelector(":root")
let styles = getComputedStyle($root);

const $body = document.querySelector('body')
const $banner = document.querySelector('.banner')
const $banner_sticky = document.querySelector('.banner__img')
const $banner_starrySky = document.querySelector('.starry-sky')

const $gnb = document.querySelector('.gnb')
const $gnbList = Array.from(document.querySelectorAll('.gnb > li'))
const $outerBox = document.querySelector('.outer-img')
const $section = document.querySelectorAll('section')

const $about = document.querySelector('.about')
const $about_topImgBox = document.querySelector('.about-top__img')
const $about_top = document.querySelector('.about-top')
const $about_btm = document.querySelector('.about-btm')

const $skill_contain = document.querySelector('.skill__contain')
const $skill_sticky = document.querySelector('.skill__sticky')
const $skill_cards = document.querySelectorAll('.cards')
const $modal_circle = document.querySelector('.modal__circle')
const $modal_wrap = document.querySelector('.modal')

const $work = document.querySelector('.work')
const $work_sticky = document.querySelector('.work__sticky')
const $workDes = document.querySelectorAll('.work-des') 
const $work_rfImg = document.querySelectorAll('.work-des__rf-contain--border')
const $work_designBtns = document.querySelectorAll('.work__btns--design')
const $contect = document.querySelector('.contect')
const $contect_sns = document.querySelector('.contect__sns')

const $design = document.querySelector('.design-guide')
const $design_close = document.querySelector('.design-guide__close')
const $design_box = document.querySelector('.design-guide__box')
//카페24 에 넣기
let secstions = Array.from($section)
secstions.push($contect)
secstions.unshift($banner)
// setTimeout(()=> scrollTo(0,0),100) //시작시 0,0 


      /*
      9.content animation // 링크연결
      11 자격사항 체워넣기
      12 디자인 가이드 작성
      13 시간나면 아래 하단에 나래이션 추가

      오늘 할일 
      디자인가이드
      리드미 
      */

const skillInfo = {
  html : {
    des : "웹 접근성을 준수한 레이아웃을 구현할 수 있습니다. 시맨틱 태그를 이해하고 있습니다.",
    color : '#e44d27',
    ability : 95,
  },
  css : {
    des : "BEM 방법의 클래스 작성과 반응형을 준수한 <br> 스타일 작성이 가능합니다.",
    color : '#1472b6',
    ability : 90,
  },
  javascript : {
    des : "ES6 문법을 이해하고 있으며 상호작용하는 <br> 애니메이션을 구현할 수 있습니다.",
    color : '#f7df1c',
    ability : 85,
  },
  react : {
    des : "JSX 문법을 준수한 코드 작성이 가능합니다. Hook과 라우팅을 이해하고 있습니다. <br> 이를 활용한 웹을 구현할 수 있습니다.",
    color : '#52c1de',
    ability : 70,
  },
  tailwind : {
    des : "tailwind에서 제공하는 클래스 명령어를 모두 <br> 이해하고 있으며 신속한 스타일 작성이 <br>가능합니다.",
    color : '#05b6d3',
    ability : 80,
  },
  bootstrap : {
    des : "bootstrap에서 제공하고 있는 스타일 컴포넌트를 활용한 웹 제작이 가능합니다.",
    color : '#5e3b7f',
    ability : 60,
  },
  sass : {
    des : "요소의 관계를 명확하게 나타내며 Mixin과 변수를 활용하여 스타일을 작성합니다.",
    color : '#ce649a',
    ability : 70,
  },
  jquery : {
    des : "동적 인터페이스를 구현할 수 있습니다. <br>Ajax를 활용한 비동기 통신이 가능합니다.",
    color : '#0767ac',
    ability : 80,
  },
  git : {
    des : "local , remote repository 간에 업로드 및 업데이트 가능합니다. branch를 활용할 수 있습니다.",
    color : '#e44d27',
    ability : 60,
  },
  nodejs : {
    des : "로그인, 회원가입, 게시판 등의 기본적인 기능 구현이 가능합니다.",
    color : '#4d9345',
    ability : 50,
  },
  mongodb : {
    des : "추가 제거 변경 등의 기능이 DB에 반영될 수 있도록 기능 구현이 가능합니다.",
    color : '#6ab058',
    ability : 50,
  },
  typescript : {
    des : "타입의 범위를 좁혀서 안정적인 코드를 작성할 수 있습니다. 동적인 타입을 활용할 수 있습니다.",
    color : '#3077c6',
    ability : 75,
  },
  vue : {
    des : "라우팅을 통한 간단한 싱글 페이지 웹사이트를 구현할 수 있습니다. <br> 추가 삭제 변경 등의 기본적인 기능 구현이 가능합니다.",
    color : '#3fb984',
    ability : 60,
  },
}


let lastMenu = 0 //대소비교 
let setTime
//nav animation 
let navAnimate = (el , time = 300) => {
  const targetMap = {
    LI : el,
    A : el.parentElement
  }

  let li =  targetMap[el.tagName]; 
  const list = [...$gnb.children]
  if (!li) return 

  let direct = lastMenu > list.indexOf(li) ? '--reverse' : '';
  li.classList.add('gnb-start' + direct)

  setTime =  setTimeout(()=>{
    list.forEach(e => e.classList = '') 
    li.classList = 'gnb-end' +  direct
  },time)

  lastMenu = list.indexOf(li)
}

let scrollInToNav = (e) => {
  e.preventDefault()
  const targetMap = {
    LI : e.target,
    A : e.target.parentElement
  }
  let li =  targetMap[e.target.tagName]; 
  if (!li) return 
  let idx = $gnbList.indexOf(li)

  secstions[idx].className == 'work' && setTimeout( _ => $workDes[0].classList.add('work-des--focuse'),400)
  secstions[idx].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
}

$gnb.addEventListener('click', e =>{
  e.preventDefault()
  navAnimate(e.target)
  scrollInToNav(e)
})

      
//skill
class CardFlipOnScroll{
  constructor(wrapper , sticky , cards){
    this.wrapper = wrapper
    this.sticky = sticky
    this.start = 0
    this.end = 0
    this.step = 0
    this.cards = cards.querySelectorAll('.cards__card')
    this.length = this.cards.length 
  }       
  init(option = 0){
    //animate
    this.start = this.wrapper.offsetTop
    this.end = this.wrapper.offsetTop + this.wrapper.offsetHeight - innerHeight * 1.4
    this.step = (this.end - this.start) / (this.length * 2) + option
  }
  animate(sclY){
    this.cards.forEach((card, i) => {
      const s = this.start + this.step * i
      const e = s + this.step * (this.length + 1)//스타트에서 + step 5개가 끝나는 구간

      if (sclY <= s) { //첫시작(영역밖)
        card.style.transform = `
        perspective(100vw)
        translateX(100vw)
        rotateY(180deg)
        `
      } else if (sclY > s && sclY <= e - this.step){ // 구간5중 1~4까지
        card.style.transform = `
        perspective(100vw)
        translateX(${100 - (scrollY - s) / (e - s)*100}vw)
        rotateY(180deg)
        `
      } else if (sclY > e- this.step && sclY <= e) {//구간 5번째
        card.style.transform = `
        perspective(100vw)
        translateX(${100 - (sclY - s) / (e - s)*100}vw)
        rotateY(${180 - (sclY - (e - this.step)) / this.step * 180}deg)
        `
      } else if (sclY > e){ //도착
        card.style.transform = `
        perspective(100vw)
        translateX(0vw)
        rotateY(0deg)
        `
      }
    });
  }
}

const cardFlipOnScroll1 = new CardFlipOnScroll($skill_contain, $skill_sticky , $skill_cards[0])
const cardFlipOnScroll2 = new CardFlipOnScroll($skill_contain, $skill_sticky , $skill_cards[1])
const cardFlipOnScroll3 = new CardFlipOnScroll($skill_contain, $skill_sticky , $skill_cards[2])

class ClickCardOnModal{
  constructor(body, sticky,  modal, cards, data){
    this.body = body
    this.sticky = sticky
    this.modal = modal
    this.cards = cards.querySelectorAll('.cards__card')
    this.boxHeight = 0
    this.cardsPos = 0
    this.closeBtn = modal.querySelector(".modal__box--close")
    this.img = modal.querySelector(".modal__box--skill")
    this.skillName = modal.querySelector(".modal__box--title")
    this.skillDescription = modal.querySelector(".modal__box--des")
    this.data = data
  }

  init(){
    this.stickyCenter  = this.sticky.offsetHeight / 2 
    this.boxHeight = this.cards[0].parentElement
    this.cardsPos = this.boxHeight.offsetTop +  this.boxHeight.offsetHeight / 2 
  }      

  clickEvnt(){
    const openModal = e => {
      let onCard = {
        'cards__card--front' : e.target , 
        'cards__card--img' : e.target.parentElement.parentElement,
        'cards__card--name' : e.target.parentElement,
        'cards__img-box' : e.target.parentElement
      }[e.target.className]

      if (!onCard) return

      //modal skill content push
      let skillImg = onCard.firstElementChild.firstElementChild
      let skillN = onCard.lastElementChild.textContent
      let skillObj = this.data[skillN.toLowerCase()]

      $root.style.setProperty('--skill-color',skillObj['color'])
      $root.style.setProperty('--skill-ability',skillObj['ability'] / 100 * 40 + "%")

      this.img.setAttribute('src',skillImg.getAttribute('src'))
      this.skillName.textContent = skillN
      this.skillDescription.innerHTML = skillObj['des']
      this.body.style.overflow = 'hidden'
      this.modal.classList = 'modal'
      this.modal.classList.add('modal--open')
    }

    this.cards.forEach( card  => card.addEventListener('click',openModal))

    this.closeBtn.addEventListener('click',()=>{  
      this.modal.classList.remove('modal--open')
      this.body.style.overflow = 'visible'      
    })
  }
}

const clickCardOnModal1 = new ClickCardOnModal($body , $skill_sticky , $modal_wrap , $skill_cards[0], skillInfo)
const clickCardOnModal2 = new ClickCardOnModal($body , $skill_sticky ,$modal_wrap , $skill_cards[1], skillInfo)
const clickCardOnModal3 = new ClickCardOnModal($body , $skill_sticky , $modal_wrap, $skill_cards[2], skillInfo)


// console.log(skillObj['ability'] / 100 * 40);

cardFlipOnScroll1.init()
cardFlipOnScroll2.init(20)
cardFlipOnScroll3.init(10)
clickCardOnModal1.init()
clickCardOnModal2.init()
clickCardOnModal3.init()
clickCardOnModal1.clickEvnt()
clickCardOnModal2.clickEvnt()
clickCardOnModal3.clickEvnt()



class BannerRotateOnScroll {
  constructor(wrapper , sticky){
    this.wrapper = wrapper
    this.sticky = sticky
    this.start = 0
    this.end = 0
    this.step = 0
    this.section = 9
    this.bg = sticky.querySelector('.banner__bg')
    this.obj = sticky.querySelector('.banner__obj-box')
    this.halfMoon = document.querySelector('.outer-img__half')
  }

  init(){
    this.start = this.wrapper.offsetTop
    this.end = this.wrapper.offsetTop +this.wrapper.offsetHeight - innerHeight
    this.step = (this.end - this.start) / this.section
  }

  animate(sclY){
    const s = this.start + this.step 
    const e = s + this.step * (this.section - 1)

    if (sclY <= s) {
      this.bg.style.transform = `
      translate(-50% ,-50%) 
      rotate(180deg) 
      `
    } 
    else if(sclY > e - this.step * 6 && sclY <= e - this.step * 5){
      this.obj.classList.remove('planet')
      this.obj.classList.add('cloud')
      this.bg.style.transform = `
      translate(-50% ,-50%) 
      rotate(180deg) 
      `
    }
    else if (sclY > e - this.step * 5 && sclY <= e - this.step * 2) {
      this.bg.style.transform = `
      translate(-50% ,-50%) 
      rotate(${180 - (sclY - (e - this.step * 5))/(this.step * 3) * 180}deg)
      `
    } 
    else if (sclY > e - this.step * 2 && sclY <= e - this.step * 1){
      this.obj.classList.remove('cloud')
      this.obj.classList.add('planet')
      this.bg.style.transform = `
      translate(-50% ,-50%) 
      rotate(0deg) 
      `
    } 
    else if(sclY > e){
      this.bg.style.transform = `
        translate(-50% ,-50%) 
        rotate(0deg)
        `
    }
  }
}


const bannerRotateOnScroll = new BannerRotateOnScroll( $banner , $banner_sticky)
bannerRotateOnScroll.init()

let imgInit = () => {
  $work_rfImg.forEach( e => {
    let img = e.children[0]
    let imgH = img.offsetHeight 
    let scrollArea = imgH - e.offsetHeight
    let duration = imgH / 0.2

    img.style.transform = `translateY(${scrollArea / imgH * 100}%)`
    img.style.setProperty("--design-duration",duration + "ms")
  })
}
window.onload = imgInit


class SlideVerticalOnScroll {
  constructor (wrapper , sticky , contentBox){
    this.wrapper = wrapper
    this.sticky = sticky
    this.start = 0
    this.end = 0
    this.step = 0
    this.width = 0
    this.breakPoint = 0.5
    this.vertivalBox = sticky.querySelector('.work__abs-box')
    this.length = this.vertivalBox.querySelectorAll('.work-list').length
    this.workDes = contentBox
    this.scrollFn
  }

  init(){
    this.start = this.wrapper.offsetTop * 1.02
    this.end = (this.wrapper.offsetTop +this. wrapper.offsetHeight - innerHeight)
    this.step = (this.end - this.start) / this.length
    this.width = this.vertivalBox.offsetWidth
  }

 

  scroll(sclY  , direction){
    if (sclY  <= this.start) {
      this.vertivalBox.style.transform = `translateX(0)`
      direction == "UP" && this.workDes[0].classList.remove('work-des--focuse')
      return
    } 

    //search

    for (let i = 0; i < this.length - 1; i++) {
      let s = this.start + (this.step * i)
      let e = s + this.step * this.breakPoint;

      const directX = { 
        UP : - (100 - (this.end - sclY) / (this.step  * this.length) * 100),
        DN : - 100 / this.length * (i + 1),
        BUP : - 100 / this.length * i
      }

      const contentStyle = idx => { 
        this.workDes.forEach( e => e.classList.remove('work-des--focuse'))
        this.workDes[idx].classList.add('work-des--focuse')
      }

      if(sclY > s && sclY <= e){
        //객체(directX)에서 스크롤 방향에 맞는 속성 실행
        this.vertivalBox.style.transform = `
        translateX(${directX[direction == 'UP' ? 'BUP' : 'UP']}%)
        ` 

        //스크롤 방향에 맞는 스타일 변경 함수(contentStyle) 실행
        contentStyle(i)
      } 

      else if ( sclY > e  && sclY <= s + this.step) {
        this.vertivalBox.style.transform = `
        translateX(${directX[direction]}%)
        ` 
        contentStyle(i + 1)
      } 
    }
    
    if (sclY >= this.end){
      // this.vertivalBox.style.transform = `translateX(-${80}%)` 
      this.workDes[this.length - 1].classList.remove('work-des--focuse')
    }
  }
}
// --disign-duration
const slideVerticalOnScroll = new SlideVerticalOnScroll($work, $work_sticky ,$workDes)
let lastScroll = 0
slideVerticalOnScroll.init()



//banner - 별생성
const counter = 60 //별갯수
const styleProps = [
  "width", 
  "height" ,
  "animation-duration" ,
  "top" ,
  "left"
]

const printStarrySky = () => { 
  for (let i = 0; i < counter; i++) {
    const ofsetH =  $banner_starrySky.offsetHeight
    const ofsetY =  $banner_starrySky.offsetWidth
    const size = Math.floor(Math.random() * 3) + 3 + "px"

    let styles = {
      "width" : size,
      "height": size,
      "animation-duration" : (Math.random() * 3)  + 1 + "s",
      "top" : Math.floor(Math.random() * ofsetH) + 1 + "px",
      "left": Math.floor(Math.random() * ofsetY) + 1 + "px"
    }
    
    const $star = document.createElement('div')
    $star.classList.add('star')
    $banner_starrySky.appendChild($star)
    styleProps.forEach( prop => $star.style.setProperty(prop ,  styles[prop]))
  }
}
printStarrySky()

//resize star
const resizeStars = () => {
  const stars = document.querySelectorAll('.star')

  stars.forEach( star => {
    let t =  Math.floor(Math.random() * $banner_starrySky.offsetHeight) + 1
    let l =  Math.floor(Math.random() * $banner_starrySky.offsetWidth) + 1
    star.style.setProperty("top" , t + "px") 
    star.style.setProperty("left" , l + "px") 
  })
} 

const designGuideData = {
  hotel : {
    class : "design-guide--hotel" ,
    img : "../images/work/design-hotel.jpg"
  },
  godiva : {
    class : "design-guide--godiva" ,
    img : "../images/work/design-godiva.jpg"
  },
  profile : {
    class : "design-guide--profile" ,
    img : "../images/work/design-profile.jpg"
  },
}

const $design_img =  $design_box.querySelector('img')

const openDesignGuide = e => {
  let imgName = e.target.dataset.project
  $design_box.classList = "design-guide__box"
  $body.style.overflow = "hidden"

  $design_img.setAttribute("src", designGuideData[imgName]["img"])
  $design_box.classList.add(designGuideData[imgName]["class"])
  $design.classList.add('design-guide--open')
  $gnb.classList.add('close-gnb')
}

const closeDesignGuide = () => {
  $body.style.overflow = "visible"
  $design.lastElementChild.scrollTop = 0
  $design.classList.remove('design-guide--open')
  $gnb.classList.remove('close-gnb')

}

$work_designBtns.forEach( e => {
  e.addEventListener('click' , openDesignGuide)
})

$design_close.addEventListener('click' , closeDesignGuide)


//observer secstion
const option = {
  root : null,
  rootMargin: '0px',
  threshold: [0]
}

const isObserver = (entries, _) => {
  const $div = $about.querySelectorAll('.grid')
  let offsetT

  const initAbout = () => ({
      topSecH : $div[0].offsetTop,
      btmSecH : $div[1].offsetTop,
      end : $about.offsetHeight,
  })
  
  const scrollEvt = () => {
    let {topSecH,btmSecH, end} = initAbout()
    let currenScl = scrollY - offsetT + (innerHeight / 2)

    if (currenScl > topSecH && currenScl < btmSecH) {
      $about_top.classList.add('top--focuse')
    }

    if (currenScl > btmSecH && currenScl < end){
      $about_btm.classList.add('btm--focuse')
    }
  }

  entries.forEach( entry => {
    let onArea = entry.isIntersecting
    let onClass = entry.target.className
    offsetT = entry.target.offsetTop 

    const inAbout = () => {
      $gnb.classList.remove('close-gnb')
      window.addEventListener('resize',initAbout)
      window.addEventListener('scroll',scrollEvt,{ passive: true })
    }

    const outAbout = () =>{
      $about_top.classList.remove('top--focuse')
      $about_btm.classList.remove('btm--focuse')
      window.removeEventListener('resize',initAbout)
      window.removeEventListener('scroll',scrollEvt)
    }

    const inContect = () => {      
      scrollTo(0 , $body.offsetHeight)
      $contect_sns.classList.add('focuse-contect')
    }

    let idx = secstions.indexOf(entry.target);

    if (onArea) {
      navAnimate($gnb.children[idx])

      switch (onClass) {
        case 'banner': return $gnb.classList.add('close-gnb')
        case 'about': return inAbout()
        case 'skill': return $skill_sticky.classList.add('skill--focuse')
        case 'contect': return inContect()
      }  
    } 

    if(!onArea) {
      switch (onClass) {
        case 'about': return outAbout()
        case 'skill': return $skill_sticky.classList.remove('skill--focuse')
        case 'contect': return $contect_sns.classList.remove('focuse-contect')
      }
    }
  })
}//isObserver

const io = new IntersectionObserver(isObserver , option)
secstions.forEach( dom => io.observe(dom))


let fadeTarget = secstions
.filter( sec => ["about","skill","work"].includes(sec.className))

let fadeStart = fadeTarget.map( sec => sec.offsetTop)

const fadeText = sclY => {
fadeTarget.forEach(( e , i ) => {
  if (sclY > fadeStart[i] * 0.93 && sclY < fadeStart[i] + innerHeight * 1.3) {
    e.classList.add("fade-title")
  } 
  else {
    e.classList.remove("fade-title")
  }
})
}

//scoll 
const clearScroll = () => {
  let checkRAF = false;
  if (checkRAF) return ;
  checkRAF = true

  let sclY = scrollY
  const sclDirection = sclY < lastScroll ? "UP" : "DN"
  lastScroll = sclY

  requestAnimationFrame(() => {
    bannerRotateOnScroll.animate(sclY)
    cardFlipOnScroll1.animate(sclY)
    cardFlipOnScroll2.animate(sclY)
    cardFlipOnScroll3.animate(sclY)
    slideVerticalOnScroll.scroll(sclY , sclDirection)
    fadeText(sclY) 
    checkRAF = false
  })
}

window.addEventListener('scroll', clearScroll)

//resize
window.addEventListener('resize', () => {
  bannerRotateOnScroll.init()
  cardFlipOnScroll1.init()
  cardFlipOnScroll3.init(10)
  cardFlipOnScroll2.init(20)
  clickCardOnModal1.init()
  clickCardOnModal2.init()
  clickCardOnModal3.init()
  slideVerticalOnScroll.init()
  slideVerticalOnScroll.scroll(scrollY)
  resizeStars()
  fadeText()
  imgInit()
})

