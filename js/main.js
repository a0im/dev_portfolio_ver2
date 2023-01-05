      //DOM
      const $skill_contain = document.querySelector('.skill__contain')
      const $skill_sticky = document.querySelector('.skill__sticky')
      const $skill_cards = document.querySelectorAll('.cards')

      const $modal_circle = document.querySelector('.modal__circle')
      const $modal_wrap = document.querySelector('.modal')

      const $body = document.querySelector('body')



      const $work = document.querySelector('.work')
      const $work_sticky = document.querySelector('.work__sticky')

      const $gnb = document.querySelector('.gnb')
      const $gnbList = Array.from(document.querySelectorAll('.gnb > li'))

      const $section = document.querySelectorAll('section')
      const $main = document.querySelector('.banner')
      const $contect = document.querySelector('.contect')

     
      
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

        // list.forEach(e => e.classList = '') 
        //reset 

        let direct = lastMenu > list.indexOf(li) ? '--reverse' : '';
        li.classList.add('gnb-start' + direct)

        
        setTime =  setTimeout(()=>{
          list.forEach(e => e.classList = '') 
          li.classList = 'gnb-end' +  direct
        },time)
        lastMenu = list.indexOf(li)
      }

      let scrollInToNav = (e) => {
        const targetMap = {
          LI : e.target,
          A : e.target.parentElement
        }
        let li =  targetMap[e.target.tagName]; 
        if (!li) return 
        let idx = $gnbList.indexOf(li)

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


      // this.body = document.querySelector('body')
      // this.modal = 

      const cardFlipOnScroll1 = new CardFlipOnScroll($skill_contain, $skill_sticky , $skill_cards[0])
      const cardFlipOnScroll2 = new CardFlipOnScroll($skill_contain, $skill_sticky , $skill_cards[1])
      const cardFlipOnScroll3 = new CardFlipOnScroll($skill_contain, $skill_sticky , $skill_cards[2])

      class HoverCardOnModal{
          constructor(body  ,sticky ,  modal , cards){
            this.body = body
            this.sticky = sticky
            this.modal = modal
            this.cards = cards.querySelectorAll('.cards__card')
            this.boxHeight = 0
            this.cardsPos = 0
          }

          init(){
            this.stickyCenter  = this.sticky.offsetHeight / 2 
            this.boxHeight = this.cards[0].parentElement
            this.cardsPos = this.boxHeight.offsetTop +  this.boxHeight.offsetHeight / 2 
          }      

          hover(){
            this.cards.forEach((card)=>{
              
              card.addEventListener('mouseover',(e)=>{
                console.log("aaa");
                console.log(e.target.className);
                let onCard = {
                  'cards__card--front' : e.target , 
                  'cards__card--img' : e.target.parentElement,
                  'cards__card--name' : e.target.parentElement
                }[e.target.className]
                this.body.style.overflow = 'hidden'
                  this.modal.classList = 'modal'
                 if(this.cardsPos <= this.stickyCenter){
                    this.modal.classList.add('modal--open-t')
                  } 
                  else {
                    this.modal.classList.add('modal--open-b')
                  }
                  onCard.style.background = "#bbbee9"
              })
  
              card.addEventListener('mouseout',(e)=>{

                let onCard = {
                  'cards__card--front' : e.target , 
                  'cards__card--img' : e.target.parentElement,
                  'cards__card--name' : e.target.parentElement
                }[e.target.className]
                  this.modal.classList = 'modal'
                if(this.cardsPos <= this.stickyCenter){
                  this.modal.classList.add('modal--close-t')
                }
                else {
                  this.modal.classList.add('modal--close-b')
                }
                this.body.style.overflow = 'visible'
                onCard.style.background = "#fff"
              })
            })
          }
      }

     const hoverCardOnModal1 = new HoverCardOnModal($body , $skill_sticky , $modal_wrap , $skill_cards[0])
     const hoverCardOnModal2 = new HoverCardOnModal($body , $skill_sticky ,$modal_wrap , $skill_cards[1])
     const hoverCardOnModal3 = new HoverCardOnModal($body , $skill_sticky , $modal_wrap, $skill_cards[2])

     
      cardFlipOnScroll1.init()
      cardFlipOnScroll2.init(20)
      cardFlipOnScroll3.init(10)
      hoverCardOnModal1.init()
      hoverCardOnModal2.init()
      hoverCardOnModal3.init()
      hoverCardOnModal1.hover()
      hoverCardOnModal2.hover()
      hoverCardOnModal3.hover()

      
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
            this.obj.classList.add('cloud')
            this.bg.style.transform = `
            translate(-50% ,-50%) 
            rotate(180deg) 
            `
          } 
          else if(sclY > e - this.step * 6 && sclY <= e - this.step * 5){
            this.obj.classList.remove('cloud')
            this.obj.classList.remove('planet')

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
            this.obj.classList.add('planet')
            this.bg.style.transform = `
            translate(-50% ,-50%) 
            rotate(0deg) 
            `
          } else if(sclY > e){

            // this.bg.style.transform = `
            //   translate(-50% ,-50%) 
            //   rotate(0deg)
            //   scale(0.70)
            //   `
            // this.halfMoon.style.transform = `
            //   translateX(-50%) 
            //   scale(0.70)
            // `
          }
        }
      }

      const $banner_sticky = document.querySelector('.banner__img')
      const $banner = document.querySelector('.banner')
      const bannerRotateOnScroll = new BannerRotateOnScroll( $banner , $banner_sticky)
      bannerRotateOnScroll.init()

    
    class SlideVerticalOnScroll {
      constructor (wrapper , sticky){
        this.wrapper = wrapper
        this.sticky = sticky
        this.start = 0
        this.end = 0
        this.step = 0
        this.width = 0
        this.breakPoint = 0.5
        this.vertivalBox = sticky.querySelector('.work__abs-box')
        this.length = this.vertivalBox.querySelectorAll('.work-list').length
      }

      init(){
        this.start = this.wrapper.offsetTop
        this.end = (this.wrapper.offsetTop +this. wrapper.offsetHeight - innerHeight)
        this.step = (this.end - this.start) / this.length
        this.width = this.vertivalBox.offsetWidth 
      }

      scroll(sclY , direction){

        if (sclY  <= this.start ) {
          this.vertivalBox.style.transform = `translateX(0)` 
          return
        } 

        for (let i = 0; i < this.length - 1; i++) {
          let s = this.start + this.step * i
          let e = s + this.step * this.breakPoint;

          const directX = {
            UP : - (100 - (this.end - sclY) / (this.step  * this.length) * 100),
            DN : - 100 / this.length * (i + 1),
            BUP : - 100 / this.length * i
          }

          if(sclY > s && sclY <= e){
            this.vertivalBox.style.transform = `
            translateX(${directX[direction == 'UP' ? 'BUP' : 'UP']}%)
            ` 
          } 

          else if ( sclY > e  && sclY <= s + this.step) {
            this.vertivalBox.style.transform = `
            translateX(${directX[direction]}%)
            ` 
          } 
        }
        
        if (sclY >= this.end ) this.vertivalBox.style.transform = `translateX(-${80}%)` 
      }
    }
    // translateX(-${100 - (this.end - sclY) / (this.step  * this.length) * 100}%)


    const slideVerticalOnScroll = new SlideVerticalOnScroll($work, $work_sticky)
    let lastScroll = 0
    slideVerticalOnScroll.init()

    //scoll 
    let clearScroll = () =>{
      let checkRAF = false;
      let sclY = scrollY
      if (checkRAF) return ;

      checkRAF = true

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

    window.addEventListener('scroll', clearScroll)

    //resize
    window.addEventListener('resize', ()=>{
      bannerRotateOnScroll.init()
      cardFlipOnScroll1.init()
      cardFlipOnScroll2.init(20)
      cardFlipOnScroll3.init(10)
      hoverCardOnModal1.init()
      hoverCardOnModal2.init()
      hoverCardOnModal3.init()
      slideVerticalOnScroll.init()
      slideVerticalOnScroll.scroll(scrollY)
      console.log("ss");
    })


    //observer
    const option = {
      root : null,
      rootMargin: '0px',
      threshold: 0
    }

    const isObserver = (entries, observer) => {
      console.log(entries , '---' , observer);

      entries.forEach( entry => {
        if (entry.isIntersecting) {
          let idx = observeArr.indexOf(entry.target)
          navAnimate($gnbList[idx]) //nav animation
        }
        console.log(entries);
        if (entry.isIntersecting && entry.target.className === 'banner') {
         $gnb.classList.add('inBanner') 
        } 
        else if(entry.isIntersecting && entry.target.className !== 'banner'){
         $gnb.classList.remove('inBanner') 
        }



      })
    }

    const io = new IntersectionObserver(isObserver,option)
    observeArr.forEach(dom => io.observe(dom))
  
