  //DOM
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

let secstions = Array.from($section)
secstions.push($contect)
secstions.unshift($banner)

      /*
      2. 글자 애니메이션
      5. 베너 달 아래쪽 수정
      9.content animation // 링크연결
      10 베너 어바웃 사이에 컨텐츠 넣기
      11 자격사항 체워넣기
      12 디자인 가이드 작성
      13 시간나면 아래 하단에 나래이션 추가
      */
    
      
      // setTimeout(()=> scrollTo(0,0),100) //시작시 0,0 
      
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
  constructor(body  ,sticky ,  modal , cards){
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
  }

  init(){
    this.stickyCenter  = this.sticky.offsetHeight / 2 
    this.boxHeight = this.cards[0].parentElement
    this.cardsPos = this.boxHeight.offsetTop +  this.boxHeight.offsetHeight / 2 
  }      

  clickEvnt(){
    const skillDes = {
      html : "웹 접근성을 준수한 회원가입폼 구현가능, 마크업 가능 HTML5 등에서 사용되는 시멘틱 태그를 이해하고 있습니다.",
      css : "BEM방법의 클래스작성과 반응형을 준수한 CSS 작성이 가능합니다",
      javascript : "Vanilla Javascript 활용 및 Jquery.js React.js 활용 배열 및 객체의 이해, 상호작용하는 애니메이션을 구현할수 있습니다.",
      react : "Hook ,라우팅을 이해하고 있습니다. 이를 활용한 웹을 구현할수 있습니다.",
      tailwind : "tailwind에서 제공하는 클래스 명령어를 모두 이해하고 있으며 신속한 스타일 작성이 가능합니다",
      bootstrap : "bootstrap에서 제공하고 있는 스타일 컴포넌트를 활용한 웹 제작이 가능합니다",
      sass : "요소의 관계를 명확하게 나타내며 Mixin과 변수를 활용하여 스타일을 작성합니다.",
      jquery : "슬라이드, 풀페이지 및 동적 인터페이스 구현가능 Ajax를 활용한 비동기 통신 구현가능",
      git : "local , remote repository 간에 업로드 및 업데이트 가능. branch 활용 가능.",
      nodejs : "로그인,회원가입, 게시판 기본적인 기능 구현이 가능 합니다."
    } 

    const openModal = e => {
      let onCard = {
        'cards__card--front' : e.target , 
        'cards__card--img' : e.target.parentElement.parentElement,
        'cards__card--name' : e.target.parentElement,
        'cards__card--name' : e.target.parentElement
      }[e.target.className]

      if (!onCard) return

      //modal skill content push
      let skillImg = onCard.firstElementChild.firstElementChild
      let skillN = onCard.lastElementChild.textContent

      console.log(skillImg)
      console.log(onCard);;
      let skillmsg = skillDes[skillN.toLowerCase()]

      this.img.setAttribute('src',skillImg.getAttribute('src'))
      this.skillName.textContent = skillN
      this.skillDescription.textContent = skillmsg

      this.body.style.overflow = 'hidden'
      this.modal.classList = 'modal'
      this.modal.classList.add('modal--open')
    }


    this.cards.forEach( card  => {
      card.addEventListener('click',openModal)
    })

    this.closeBtn.addEventListener('click',()=>{  
      this.modal.classList.remove('modal--open')
      this.body.style.overflow = 'visible'      
    })
  }
}

const clickCardOnModal1 = new ClickCardOnModal($body , $skill_sticky , $modal_wrap , $skill_cards[0])
const clickCardOnModal2 = new ClickCardOnModal($body , $skill_sticky ,$modal_wrap , $skill_cards[1])
const clickCardOnModal3 = new ClickCardOnModal($body , $skill_sticky , $modal_wrap, $skill_cards[2])

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

let workImgs = [...document.querySelectorAll('.work-des__rf-contain--border > img')]
let imgH = workImgs.map(e => e.offsetHeight)
workImgs.map(e => {
  let clones = e.cloneNode(true)
  e.insertAdjacentElement('afterend' , clones)
})

$work_rfImg.for


// let $cloneNodes = [...$work_rfImg].map( e => {
//   let clone = e.firstElementChild.cloneNode(true)
//   clone.classList.add('clone')
//   e.appendChild(clone)
//   return clone
// }) 

let img 
function scrollEvnt() {
  scrollY
  let imgBox = $work_rfImg[0].children[0]
  let imgBoxT = imgBox.offsetTop

  console.log(imgBoxT);
  
  console.log();

}

addEventListener('scroll' , scrollEvnt)


// - $work_rfImg[idx].offsetHeight 
// let scrollLength = $work_rfImg[idx].children[0].offsetHeight
// $work_rfImg[idx].style.setProperty("--work-pos",-scrollLength + "px")

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


    const scrollImg = idx => {    
      // - $work_rfImg[idx].offsetHeight 
      // - $work_rfImg[idx].offsetHeight 
      //   let scrollLength = $work_rfImg[idx].children[0].offsetHeight
      //   $work_rfImg[idx].style.setProperty("--work-pos",-scrollLength + "px")
    }

    for (let i = 0; i < this.length - 1; i++) {
      let s = this.start + (this.step * i)
      let e = s + this.step * this.breakPoint;

      const directX = { 
        UP : - (100 - (this.end - sclY) / (this.step  * this.length) * 100),
        DN : - 100 / this.length * (i + 1),
        BUP : - 100 / this.length * i
      }

      const contentStyle = idx => { 
        this.workDes.forEach(e => e.classList.remove('work-des--focuse'))
        this.workDes[idx].classList.add('work-des--focuse')
      }

      if(sclY > s && sclY <= e){
        //객체(directX)에서 스크롤 방향에 맞는 속성 실행
        this.vertivalBox.style.transform = `
        translateX(${directX[direction == 'UP' ? 'BUP' : 'UP']}%)
        ` 

        //스크롤 방향에 맞는 스타일 변경 함수(contentStyle) 실행
        contentStyle(i)
        scrollImg(i)
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

const slideVerticalOnScroll = new SlideVerticalOnScroll($work, $work_sticky ,$workDes)
let lastScroll = 0
slideVerticalOnScroll.init()


//banner - 별생성
let counter = 70 //별갯수
let styleProps = [
  "width", 
  "height" ,
  "animation-duration" ,
  "top" ,
  "left"
]

let printStarrySky = () => { 
  for (let i = 0; i < counter; i++) {
    let ofsetH =  $banner_starrySky.offsetHeight
    let ofsetY =  $banner_starrySky.offsetWidth
    let size = Math.floor(Math.random() * 3) + 3 + "px"

    let styles = {
      "width" : size,
      "height": size,
      "animation-duration" : (Math.random() * 3)  + 1 + "s",
      "top" : Math.floor(Math.random() * ofsetH) + 1 + "px",
      "left": Math.floor(Math.random() * ofsetY) + 1 + "px"
    }
    
    let $star = document.createElement('div')
    $star.classList.add('star')
    $banner_starrySky.appendChild($star)
    styleProps.forEach( prop => $star.style.setProperty(prop ,  styles[prop]))
  }
}

printStarrySky()

let resizeStars = () => {
  let stars = document.querySelectorAll('.star')

  stars.forEach( star => {
    let t =  Math.floor(Math.random() * $banner_starrySky.offsetHeight) + 1
    let l =  Math.floor(Math.random() * $banner_starrySky.offsetWidth) + 1
    star.style.setProperty("top" , t + "px") 
    star.style.setProperty("left" , l + "px") 
  })
} 



//design-guide--open
let openDesignGuide = () => {
  $body.style.overflow = "hidden"
  $design.classList.add('design-guide--open')
}

let closeDesignGuide = () => {
  $body.style.overflow = "visible"
  $design.lastElementChild.scrollTop = 0
  $design.classList.remove('design-guide--open')
}

$work_designBtns.forEach((e)=>{
  e.addEventListener('click' , openDesignGuide)
})

$design_close.addEventListener('click' , closeDesignGuide)


//observer secstion
const option = {
  root : null,
  rootMargin: '0px',
  threshold: [0]
}

const isObserver = (entries, observer) => {
  let $div = $about.querySelectorAll('.grid')
  let offsetT

  let initAbout = () => ({
      topSecH : $div[0].offsetTop,
      btmSecH : $div[1].offsetTop,
      end : $about.offsetHeight,
  })
  
  let scrollEvt = () => {
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

    let inAbout = () => {
      $gnb.classList.remove('in-banner')
      window.addEventListener('resize',initAbout)
      window.addEventListener('scroll',scrollEvt)
    }

    let outAbout = () =>{
      $about_top.classList.remove('top--focuse')
      $about_btm.classList.remove('btm--focuse')
      window.removeEventListener('resize',initAbout)
      window.removeEventListener('scroll',scrollEvt)
    }

    let inContect = () => {      
      scrollTo(0 , $body.offsetHeight)
      $contect_sns.classList.add('focuse-contect')
    }

    let idx = secstions.indexOf(entry.target);

    if (onArea) {
      navAnimate($gnb.children[idx])

      switch (onClass) {
        case 'banner': return $gnb.classList.add('in-banner')
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

let fadeText = sclY => {
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
let clearScroll = () => {
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
})

