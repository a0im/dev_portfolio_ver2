      // setTimeout(()=> scrollTo(0,0),100)


      class CardFlipOnScroll{
        constructor(wrapper , sticky , cards){
          this.wrapper = wrapper
          this.sticky = sticky
          this.cards = cards.querySelectorAll('.cards__card')
          this.length = this.cards.length

          this.start = 0
          this.end = 0
          this.step = 0

          
        }       
        init(option = 0){
            this.start = this.wrapper.offsetTop
            this.end = this.wrapper.offsetTop + this.wrapper.offsetHeight - innerHeight * 1.2
            this.step = (this.end - this.start) / (this.length * 2) + option
            console.log(option);
            console.log(this.step)
        }
        animate(){
          this.cards.forEach((card, i) => {
            const s = this.start + this.step * i
            const e = s + this.step * (this.length + 1)//스타트에서 + step 5개가 끝나는 구간

            if (scrollY <= s) { //첫시작(영역밖)
              card.style.transform = `
              perspective(100vw)
              translateX(100vw)
              rotateY(180deg)
              `
            } else if (scrollY > s && scrollY <= e - this.step){ // 구간5중 1~4까지
              card.style.transform = `
              perspective(100vw)
              translateX(${100 - (scrollY - s) / (e - s)*100}vw)
              rotateY(180deg)
              `
            } else if (scrollY > e- this.step && scrollY <= e) {//구간 5번째
              card.style.transform = `
              perspective(100vw)
              translateX(${100 - (scrollY - s) / (e - s)*100}vw)
              rotateY(${180 - (scrollY - (e - this.step)) / this.step * 180}deg)
              `
              console.log(180 - (scrollY - (e - this.step)) / this.step * 180);

            } else if (scrollY > e){ //도착
              card.style.transform = `
              perspective(100vw)
              translateX(0vw)
              rotateY(0deg)
              `
            }
          });
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


      // 0 타이틀 구름위로 회전 행성 타이틀 종료 

      class BannerRotateOnScroll{
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
          this.end = this.wrapper.offsetTop +this. wrapper.offsetHeight - innerHeight
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
          } else if(sclY > e - this.step * 6 && sclY <= e - this.step * 5){
            this.obj.classList.remove('cloud')
            this.obj.classList.remove('planet')

            this.bg.style.transform = `
            translate(-50% ,-50%) 
            rotate(180deg) 
            `
          }else if (sclY > e - this.step * 5 && sclY <= e - this.step * 2) {
            this.bg.style.transform = `
            translate(-50% ,-50%) 
            rotate(${180 - (sclY - (e - this.step * 5))/(this.step * 3) * 180}deg)
            `
          } else if (sclY > e - this.step * 2 && sclY <= e - this.step * 1){
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

      let clearScroll = () =>{
        let checkRAF = false;
        let scrollYvalue = scrollY
        if (checkRAF) return ;
        checkRAF = true
        requestAnimationFrame(()=>{
          bannerRotateOnScroll.animate(scrollYvalue)
          cardFlipOnScroll1.animate()
          cardFlipOnScroll2.animate()
          cardFlipOnScroll3.animate()
          checkRAF = false
        })
        
      }

      window.addEventListener('scroll', clearScroll)

      window.addEventListener('resize', ()=>{
        bannerRotateOnScroll.init()
        cardFlipOnScroll1.init()
        cardFlipOnScroll2.init(20)
        cardFlipOnScroll3.init(10)
      })