 //  DATA - ./src/data.js
let data : Iproduct[] = JSON.parse(JSON.stringify(productData)) 

 // DOM
const $body = document.querySelector('body')
const $productNav =  document.querySelector('.product-nav')
const $sumBox = document.querySelector('.sum-box')
const $paymentBox = document.querySelector('.payment-box')
const $paymentBtns = document.querySelector('.payment-btns')
const $calcPaymentBtn = document.querySelector('.calc-payment-btn')
const $resetBtn = document.querySelector('.reset-btn')
const $closeBtn = document.querySelector('.hidden-btn')
const $cartWrap = document.querySelector('.cart-wrap')
const $modalWrap = document.querySelector('.modal-wrap')
let $itemsBox = document.querySelector('.items-box')
let $cartBox = document.querySelector('.cart-box')
let $checkBox : Element[]
let $closeModalBtn : Element | null
let toggleVal = true


//페이지가 로드되고 상품목록을 동적 생성
const renderProduct = ():void =>{
  let createEl = "<ul class='contain'>"

  data.forEach( d => {
    createEl += `
    <li data-id="${d.id}" data-type="${d.type}">
      <img src=${d.url}>
      <p class='name'>${d.product}</p>
      <p class='price'>${d.price.toLocaleString('ko-KR')}원</p>
    </li>`
  });

  if ($itemsBox != null) {
    $itemsBox.innerHTML = createEl + "</ul><div class='more'>더보기</div>"
  }
  

  $itemsBox = document.querySelector('.items-box') //update Dom
} //renderProduct
renderProduct()// default


 //카트에 상품이 담겨있는지를 아이콘으로 표시 

const showStateOfCart = () => {
  let liLength : number = 0

  if ($cartBox?.firstElementChild instanceof Element) {
    liLength = $cartBox.firstElementChild.children.length;
  }

  if (liLength > 0 && !toggleVal ) {
    $closeBtn?.classList.add("in-items")
  } 
  else
  {
    $closeBtn?.classList.remove("in-items")
  }
}

 //클릭한 메뉴와 일치하는 데이터를 display-block으로 숨김해제 
  const [$moreBtn] = document.getElementsByClassName('more')
  let renderMax : number = 8
  let recursionFn : (e:Event) => void
  let addClass : (e:Event) => void

  type TupdataProduct = (type:string , option? : string) => void

  const updataProduct: TupdataProduct = (type , option) => {

    let renderCount : number = 0
    const $ul = document.querySelector('.contain')
    let liArr : Element[]
    let filterLi

    if ($ul == null) return

      liArr = [...$ul.children]

      //animation 
      option || $ul.classList.add('fade-img')

    filterLi = liArr.filter( li => {
      if (!(li instanceof HTMLElement)) return
      
      if (type === "*" || type === li.dataset.type) {
        if (renderCount < renderMax) {
          option 
          ? li.classList.remove('invisible')
          : setTimeout(()=>{
            li.classList.remove('invisible')
          },320)

          renderCount ++
        } 
        else{
          setTimeout(()=>{
            li.classList.add('invisible')
            option || $ul.classList.remove('fade-img')
          },400)
        }
        return li
      }
      else{
        setTimeout(()=>{
          li.classList.add('invisible')
          option || $ul.classList.remove('fade-img')
        },400)
      }
    })
    




    /*    
    1. more버튼 클릭시 renderMax 수량을 추가 , updataProduct함수를 다시 호출
    2. 모든 항목이 렌더링 되었으면 more버튼을 숨김 */
    if(renderCount < filterLi.length){
      setTimeout(() => $moreBtn.classList.add('on') ,350)

      recursionFn = e => {
        if (!(e.currentTarget instanceof Element)) return
        
        renderMax += 4;
        e.currentTarget.classList.remove('push-more')
        console.log(renderMax);
        setTimeout(()=>{
          $moreBtn.removeEventListener("mouseup", recursionFn); //누적된 이벤트 함수 제거 
          updataProduct(type,"muteAni")
        },150)
      }

      addClass = e =>{
        if (!(e.currentTarget instanceof Element)) return

        e.currentTarget.classList.add('push-more')
        $moreBtn.removeEventListener('mousedown',addClass); //누적된 이벤트 함수 제거
      }

      $moreBtn.addEventListener('mouseup',recursionFn)
      $moreBtn.addEventListener('mousedown',addClass)
    }
    else{
      $moreBtn.classList.remove('on')
    }

    showStateOfCart()
  }//updataProduct
  updataProduct("*")//default

   //장바구니 보이기/숨기기 

const toggleCartBox = () => {
  if (!($cartWrap instanceof HTMLElement) || $closeBtn == null ) return
  let boxW =  $cartWrap.offsetWidth

  if (toggleVal) {
    $cartWrap.style.right = -boxW + "px"
    $closeBtn.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>'
  } else {
    $cartWrap.style.right = "0"
    $closeBtn.innerHTML = '<i class="fa-sharp fa-solid fa-xmark delete-product"></i>'  
  }

  toggleVal = !toggleVal

  console.log(toggleVal);
  
  showStateOfCart()
}
toggleCartBox()//default
$closeBtn?.addEventListener('click',toggleCartBox)
  


 //메뉴 목록 클릭시 updataProduct 함수실행
type TclickMenu = (e:Event) => void 

const clickMenu : TclickMenu = e => {
  if (!(e.target instanceof HTMLElement && e.target.dataset.productType)) return

  renderMax = 8 //reset rederMax , updataProduct함수 위 선언
  $moreBtn.removeEventListener("mouseup", recursionFn); //누적된 이벤트 함수 제거 
  $moreBtn.removeEventListener('mousedown',addClass); //누적된 이벤트 함수 제거 

  updataProduct(e.target.dataset.productType)//😡

  if ($productNav instanceof Element) {
    for (let i = 0; i < $productNav.children.length; i++) { //reset Class
      $productNav.children[i].classList.remove('act') 
    }
  }
  
  e.target.classList.add('act')
}
$productNav?.addEventListener('click',clickMenu)



 /*    
 1. 선택한 상품목록(메게변수 tar)과 같은 데이터를 장바구니에 요소생성출력
 2-1. option : null(default) : 수량증가 버튼 클릭시 item 수량을 증가 
 2-2. option : sub : 수량감소 버튼 클릭시 item 수량을 감소
 2-3. option : delete : X 버튼 클릭시 item을 장바구니에서 제거
 */
type TrenderItems = (tar: HTMLElement | null , option?:"sub"|"delete") => void

const renderPickedItems : TrenderItems = (tar,option) => {
  
  let sumPrice = 0
  let targetId : number
  let createSelectEl = "<ul>"
  if (tar?.dataset.id) targetId = Number(tar.dataset.id)
  
  data.forEach( d =>{
    if(targetId === d.id && !option) d.count++
    if(targetId === d.id && option === "sub" && d.count > 1  ) d.count--
    if (targetId === d.id && option === "delete") d.count = 0
    
    if (d.count > 0){
      let itemPrice = d.price * d.count
      sumPrice += itemPrice 
      
      createSelectEl += `
      <li data-id="${d.id}">
        <div class="cart-content-wrap">
          <input class="check-box" type="checkbox" value="true" checked>
          <div class="cart-img">
            <img src="${d.url}">
          </div>
          <span>${d.product}</span>
          <i class="fa-sharp fa-solid fa-xmark delete-product"></i>
        </div>

        <div class="cart-cash">
          <button>+</button><span>${d.count}</span><button class="${d.count <= 1 && "stop"}">-</button>
        </div>
        <span class="item-price">${itemPrice}원</span>
      </li>`
    }
  })
    
  if ($cartBox != null) $cartBox.innerHTML = createSelectEl + "</ul>"
  $checkBox = [...document.querySelectorAll('.check-box')]//update Dom
  $cartBox = document.querySelector('.cart-box') //update Dom

}//renderPickedItems


 //장바구니 결제하기 버튼의 결제금액 출력
let checkedItemsArr : (HTMLElement| undefined | null)[]
const upDataPrice = () =>{
  let price = [...document.querySelectorAll('.item-price')]
  console.log(price);
  
  let sumPrice = 0
  console.log(price);
  

  if ($sumBox == null) return 
  
  checkedItemsArr = price.map((p , i) =>{
    let target = $checkBox[i] as HTMLInputElement
      
    if (target.checked) {
      sumPrice += Number(p.textContent?.replace(/[^0-9]/g,""))
      return p.parentElement
    } 
  })
  
    if(sumPrice > 0 ) {
      $sumBox.classList.remove('close')
      $sumBox.textContent = sumPrice.toLocaleString('ko-KR') + "원 결제하기";    
    } else {
      $sumBox.classList.add('close')
      $sumBox.textContent = "결제하기"
    }
}

 //상품목록을 클릭하면 아래 함수를 실행
const pickProduct = (e:Event) =>{
  let tar = e.target as HTMLElement
  if(["items-box","contain","more"].includes(tar.className)) return false    

  let target = tar.tagName == "LI" ? tar : tar.parentElement
  
  target?.classList.remove('push-img')
  renderPickedItems(target)
  upDataPrice()  
  showStateOfCart() 
}

$itemsBox?.addEventListener('mousedown',(e:Event)=>{
  let evntTar =  e.target as HTMLInputElement
  
  if(["items-box","contain","more"].includes(evntTar.className)) return false    
  let target = evntTar.tagName == "LI" ? evntTar : evntTar.parentElement
  target?.classList.add('push-img')
})
$itemsBox?.addEventListener('mouseup',pickProduct)


 //버튼 클릭 후 장바구니 item(1.수량 추가+추감, 2.체크해제, 3.목록에서 제거)  <-- 함수를 실행 
const addSubQuantity = (e:Event) =>{
  let evntT = e.target as HTMLElement
  let targetContain : HTMLElement 

  if (!evntT.parentElement?.parentElement) return
    targetContain = evntT.parentElement?.parentElement
  

  if (evntT.tagName === "BUTTON") { 

    if (evntT.textContent === "+") {
      renderPickedItems(targetContain)
      upDataPrice()  
      evntT.classList.remove('push-btn')
    }

    if (evntT.textContent === "-") {
      renderPickedItems(targetContain,"sub")
      upDataPrice()
      evntT.classList.remove('push-btn')
    }
  }
  if (evntT.tagName === "I") { 
    renderPickedItems(targetContain,"delete")
    upDataPrice()
  }
}

const pushAnimate = (e:Event) => {
  let tar = e.target as HTMLInputElement
  if (["+","-"].includes(String(tar.textContent))) {
    tar.classList.add('push-btn')
  }
}

const isChecked = (e:Event) => {
  let tar = e.target as HTMLInputElement
  if(tar.className === "check-box") upDataPrice()
}

$cartBox?.addEventListener('mouseup',addSubQuantity)
$cartBox?.addEventListener('mousedown',pushAnimate)
$cartBox?.addEventListener('click',isChecked)


//장바구니 정보 초기화 
let sumPaymentCash = 0

const printPaymentCash = (e:Event) => {
  let tar = e.target as HTMLInputElement

  if (tar.tagName !== "BUTTON") return false

  let paymentCash = Number(tar.dataset.payment)
  sumPaymentCash += paymentCash

  if ($paymentBox !== null) {
    $paymentBox.innerHTML =' <span>충전금액</span> '+ sumPaymentCash.toLocaleString('ko-KR') + "원"
  }
}
  
  
$paymentBtns?.addEventListener('click',printPaymentCash)
const resetData = () => {
  //객체까지 복사하려고 아래 json으로 메서드사용
  data = JSON.parse(JSON.stringify(productData))

  if (
    $sumBox == null ||
    $cartBox == null ||
    $paymentBox == null 
  ) return

  $sumBox.classList.add('close')
  $sumBox.classList.add('close')
  $cartBox.innerHTML = ""
  $sumBox.textContent = "결제하기"
  $paymentBox.innerHTML = "<span>충전금액</span>0원"
  sumPaymentCash = 0
  // sumPrice = 0
}

$resetBtn?.addEventListener('click',resetData)


//모달생성, 모달팝업, 금액 합계/잔액 출력 
 //!! checkedItemsArr변수 upDataPrice 함수 위에 선언
const calcPaymentCreactModal = () => {
  if ($sumBox?.textContent == null) return
  
  let sumPrice = Number($sumBox.textContent.replace(/[^0-9]/g,""))
  let change = sumPaymentCash - sumPrice 
  let modalEl = ""
  let itemArr =  checkedItemsArr[0] as HTMLElement
  let [firstProduct] = data.filter((d)=>{
    if (d.id === Number(itemArr.dataset.id)) return true
  })
  
  let date = new Date()

  let formatObtions = {
    year: 'numeric', 
    month: 'numeric', 
    day: 'numeric',
    hour: 'numeric', 
    minute: 'numeric'
  } as Intl.DateTimeFormatOptions 

  let currentDate = new Intl.DateTimeFormat('kr',formatObtions).format(date);

  if (sumPrice == 0) return false // 
  if (change >= 0) {
    if (
      $body == null ||
      $modalWrap == null
    ) return

    $modalWrap.classList.add('success')
    $body.classList.add('lock-scroll')

    modalEl =`
    <div class="modal">
      <i class="fa-sharp fa-solid fa-xmark close-modal"></i>
      <h2>결제완료</h2>
      <strong>${Number(sumPrice).toLocaleString('ko-KR')}원</strong>
      <div class="change"><p>잔여금액</p><p>${change.toLocaleString('ko-KR')}원</p></div>
      <div class="bought-goods"><p>상품명</p><p>${firstProduct.product} 외 ${checkedItemsArr.length - 1}개</p></div>
      <div class="bought-time"><p>결제일시</p><p>${currentDate}</p></div>
    </div>`

    $modalWrap.innerHTML = modalEl

    //모달 닫기
    $closeModalBtn = document.querySelector('.close-modal')

    $closeModalBtn?.addEventListener('click',()=>{
      $modalWrap.classList.remove('success')
      $body.classList.remove('lock-scroll')
      resetData()
      toggleCartBox()
    })
  }
}//calcPaymentCreactModal

$sumBox?.addEventListener('click',calcPaymentCreactModal)


