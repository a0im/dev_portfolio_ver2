  //DOM
const $skill_contain = document.querySelector('.skill__contain')
const $skill_sticky = document.querySelector('.skill__sticky')
const $skill_cards = document.querySelectorAll('.cards')
const $modal_circle = document.querySelector('.modal__circle')
const $modal_wrap = document.querySelector('.modal')
const $body = document.querySelector('body')
const $work = document.querySelector('.work')
const $work_sticky = document.querySelector('.work__sticky')
const $workDes = document.querySelectorAll('.work-des') 
const $gnb = document.querySelector('.gnb')
const $gnbList = Array.from(document.querySelectorAll('.gnb > li'))
const $section = document.querySelectorAll('section')
const $main = document.querySelector('.banner')
const $contect = document.querySelector('.contect')
const $outerBox = document.querySelector('.outer-img')
const $about_topImgBox = document.querySelector('.about-top__img')
const $about_top = document.querySelector('.about-top')
const $about_btm = document.querySelector('.about-btm')
const $contect_sns = document.querySelector('.contect__sns')
const $banner_starrySky = document.querySelector('.starry-sky')

      /*
      2. 글자 애니메이션
      5. 베너 달 아래쪽 수정

      9.content animation // 링크연결
      10 베너 어바웃 사이에 컨텐츠 넣기
      11 자격사항 체워넣기
      12 버튼 호버 에니메이션 추가 //호버하면 클릭 버튼 나오게하기 
      12 디자인 가이드 작성
      13 시간나면 아래 하단에 나래이션 추가
      14. 어바웃 위치조정 
      */
      let observeArr = Array.from($section)
      observeArr.push($contect)
      observeArr.unshift($main)

      let lastMenu = 0 //대소비교 
      let setTime

      // setTimeout(()=> scrollTo(0,0),100) //시작시 0,0 

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

        observeArr[idx].className == 'work' && setTimeout(()=>$workDes[0].classList.add('work-des--focuse'),400)
        observeArr[idx].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
        
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
        // console.log(180 - (sclY - (e - this.step)) / this.step * 180);

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
  }

  init(){
    this.stickyCenter  = this.sticky.offsetHeight / 2 
    this.boxHeight = this.cards[0].parentElement
    this.cardsPos = this.boxHeight.offsetTop +  this.boxHeight.offsetHeight / 2 
  }      

  clickEvnt(){
    this.cards.forEach((card) => {
      card.addEventListener('click',(e)=>{
        let onCard = {
          'cards__card--front' : e.target , 
          'cards__card--img' : e.target.parentElement,
          'cards__card--name' : e.target.parentElement
        }[e.target.className]
        if (!onCard) return

        //모달 skill 이미지 넣기
        let skillImg = onCard.children[0].getAttribute('src')
        let skillN = onCard.children[1].textContent


        this.img.setAttribute('src',skillImg)
        this.skillName.textContent = skillN

        this.body.style.overflow = 'hidden'
        this.modal.classList = 'modal'
        this.modal.classList.add('modal--open')
      })

      this.closeBtn.addEventListener('click',()=>{  
        this.modal.classList.remove('modal--open')
        this.body.style.overflow = 'visible'      
      })
      
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

const $banner_sticky = document.querySelector('.banner__img')
const $banner = document.querySelector('.banner')
const bannerRotateOnScroll = new BannerRotateOnScroll( $banner , $banner_sticky)
bannerRotateOnScroll.init()

    
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

    for (let i = 0; i < this.length - 1; i++) {
      let s = this.start + (this.step * i)
      let e = s + this.step * this.breakPoint;

      const directX = { 
        UP : - (100 - (this.end - sclY) / (this.step  * this.length) * 100),
        DN : - 100 / this.length * (i + 1),
        BUP : - 100 / this.length * i
      }

      const contentStyle = (idx) => {
        this.workDes.forEach(e => e.classList.remove('work-des--focuse'))
        this.workDes[idx].classList.add('work-des--focuse') //나누는식 공부
      }

      if(sclY > s && sclY <= e){
        console.log("asss");
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
      this.vertivalBox.style.transform = `translateX(-${80}%)` 
      this.workDes[this.length - 1].classList.remove('work-des--focuse')

    }
    
  }
}
    // translateX(-${100 - (this.end - sclY) / (this.step  * this.length) * 100}%)


  const slideVerticalOnScroll = new SlideVerticalOnScroll($work, $work_sticky ,$workDes)
  let lastScroll = 0
  slideVerticalOnScroll.init()

    //scoll 
    let clearScroll = () =>{
      let checkRAF = false;
      if (checkRAF) return ;
      checkRAF = true

      let sclY = scrollY
      const sclDirection = sclY < lastScroll ? "UP" : "DN"
      lastScroll = sclY

      requestAnimationFrame(()=>{
        bannerRotateOnScroll.animate(sclY)
        cardFlipOnScroll1.animate(sclY)
        cardFlipOnScroll2.animate(sclY)
        cardFlipOnScroll3.animate(sclY)
        slideVerticalOnScroll.scroll(sclY , sclDirection)
        checkRAF = false
      })
    }



    //banner - 별생성
    let counter = 50 //별갯수
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
    let stars= document.querySelectorAll('.star')

    stars.forEach( star => {
      let t =  Math.floor(Math.random() * $banner_starrySky.offsetHeight) + 1
      let l =  Math.floor(Math.random() * $banner_starrySky.offsetWidth) + 1
      star.style.setProperty("top" , t + "px") 
      star.style.setProperty("left" , l + "px") 
    })
  } 


    //observer secstion
    const option = {
      root : null,
      rootMargin: '0px',
      threshold: [0]
    }

    let scrollEvt
    let initAbout
    let test

    const isObserver = (entries, observer) => {
      let $div
      let $topTxt
      let $btmTxt
      let offsetT
      let topSecH
      let btmSecH


      entries.forEach( entry => {
        let onArea = entry.isIntersecting
        let onClass = entry.target.className

        if (onArea) {
          let idx = observeArr.indexOf(entry.target)
          navAnimate($gnbList[idx]) //nav animation
        }

        if (onArea && onClass === 'banner') {
          $gnb.classList.add('in-banner')
        } 

        if (onArea && onClass === 'about') {
          $gnb.classList.remove('in-banner')
          $div = entry.target.querySelectorAll('.grid')
          $topTxt = $div[0].querySelector('.about-top__txt')
          $btmTxt = $div[1].querySelector('.about-btm__txt')

          initAbout = () => {
          offsetT = entry.target.offsetTop 
          topSecH = $div[0].offsetTop
          btmSecH = $div[1].offsetTop
          }

          initAbout()

          scrollEvt = () => {
            //about 내의 top & bottom content scroll event
            let currenScl = scrollY - offsetT + innerHeight / 2

            if (currenScl > topSecH && currenScl < btmSecH) {
              $about_top.classList.add('top--focuse')
            }

            if (currenScl > btmSecH){
              $about_btm.classList.add('btm--focuse')
            }
            
          }

          window.addEventListener('resize',initAbout)
          window.addEventListener('scroll',scrollEvt)
        } 
        else if(!onArea && onClass === 'about') {
          //about 벗어나면 이벤트,스타일 삭제  
          $about_top.classList.remove('top--focuse')
          $about_btm.classList.remove('btm--focuse')

          window.removeEventListener('scroll',scrollEvt)
          window.removeEventListener('resize',initAbout)
        }
        //skill
        if (onArea && onClass === 'skill') {
          console.log('skill');
        }

        //contect
        if (onArea && onClass === "contect") {
          scrollTo(0 , $body.offsetHeight)
          $contect_sns.classList.add('focuse-contect')
        }
        else if (!onArea && onClass === "contect"){
          $contect_sns.classList.remove('focuse-contect')
        }

      })
    }//isObserver

const io = new IntersectionObserver(isObserver , option)
observeArr.forEach(dom => io.observe(dom))

window.addEventListener('scroll', clearScroll)

//resize
window.addEventListener('resize', ()=>{
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
})

