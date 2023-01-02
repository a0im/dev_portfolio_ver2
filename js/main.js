      // setTimeout(()=> scrollTo(0,0),100)

      //nav
      const $gnb = document.querySelector('.gnb')
      let lastMenu = 0 //대소비교 

      //nav animation 
      let navAnimate = (e) => {
        e.preventDefault()
        const targetMap = {
          LI : e.target,
          A : e.target.parentElement
        }

        let li =  targetMap[e.target.tagName]; 
        if (!li) return 

        const list = [...$gnb.children]
        list.forEach(e => e.classList = '') //reset 
        let direct = lastMenu > list.indexOf(li) ? '--reverse' : '';
        li.classList.add('gnb-start' + direct)
        setTimeout(()=> li.classList = 'gnb-end' +  direct,300)
        lastMenu = list.indexOf(li)
      }

      $gnb.addEventListener('click',navAnimate)



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
            this.start = this.wrapper.offsetTop
            this.end = this.wrapper.offsetTop + this.wrapper.offsetHeight - innerHeight * 1.2
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

        hover(){
          this.cards.forEach((card)=>{
            card.addEventListener('mouseover',(e)=>{
              let setTarget = {
                'cards__card--front' : e.target , 
                'cards__card--img' : e.target.parentElement
              }
          
              console.log(setTarget[e.target.className]);
              

            })
            card.addEventListener('mouseout',(e)=>{
              // console.log("ss");
            })

            
          })
        }
      }

      const $skill_contain = document.querySelector('.skill__contain')
      const $skill_sticky = document.querySelector('.skill__sticky')
      const $skill_cards = document.querySelectorAll('.cards')
      const cardFlipOnScroll1 = new CardFlipOnScroll($skill_contain, $skill_sticky , $skill_cards[0])
      const cardFlipOnScroll2 = new CardFlipOnScroll($skill_contain, $skill_sticky , $skill_cards[1])
      const cardFlipOnScroll3 = new CardFlipOnScroll($skill_contain, $skill_sticky , $skill_cards[2])

      cardFlipOnScroll1.init()
      cardFlipOnScroll2.init(20)
      cardFlipOnScroll3.init(10)
      cardFlipOnScroll1.hover()
      cardFlipOnScroll2.hover()
      cardFlipOnScroll3.hover()


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

    const $work = document.querySelector('.work')
    const $work_sticky = document.querySelector('.work__sticky')
    const slideVerticalOnScroll = new SlideVerticalOnScroll($work, $work_sticky)
    let lastScroll = 0
    slideVerticalOnScroll.init()

    let clearScroll = () =>{
      let checkRAF = false;
      let sclY = scrollY
      if (checkRAF) return ;

      checkRAF = true

      const sclDirection = sclY < lastScroll ? "UP" : "DN"
      console.log(sclDirection);
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

    window.addEventListener('resize', ()=>{
      bannerRotateOnScroll.init()
      cardFlipOnScroll1.init()
      cardFlipOnScroll2.init(20)
      cardFlipOnScroll3.init(10)
      slideVerticalOnScroll.init()
      slideVerticalOnScroll.scroll(scrollY)
      console.log("ss");
    })
