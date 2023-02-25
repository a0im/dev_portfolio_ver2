 //  DATA
 let data = JSON.parse(JSON.stringify(productData)) //./db/data.js

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
 let $closeModalbtn = null
 let $checkBox = null


 //페이지가 로드되고 상품목록을 동적 생성
 const renderProduct = () => {

   let createEl = "<ul class='contain'>"

   data.forEach(d => {
     createEl += `
     <li data-id="${d.id}" data-type="${d.type}">
       <img src=${d.url}>
       <p class='name'>${d.product}</p>
       <p class='price'>${d.price.toLocaleString('ko-KR')}원</p>
     </li>`
   });

   $itemsBox.innerHTML = createEl + "</ul><div class='more'>더보기</div>"
   

   $itemsBox = document.querySelector('.items-box') //update Dom
 } //renderProduct


 renderProduct()// default
 
 
 //클릭한 메뉴와 일치하는 데이터를 display-block으로 숨김해제 
 const [$moreBtn] = document.getElementsByClassName('more')
 let renderMax = 8
 let recursionFn = null
 let addClass = null
 function updataProduct(type , option) {

   let renderCount = 0
   let $ul = document.querySelector('.contain')
   let liArr = [...$ul.children]
   let filterLi



   //animation 
   option || $ul.classList.add('fade-img')

   filterLi = liArr.filter((li , i)=>{

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
     setTimeout(()=>{
       $moreBtn.classList.add('on')
     },350)

     recursionFn = (e) =>{

       renderMax += 4;
       e.currentTarget.classList.remove('push-more')
       console.log(renderMax);
       setTimeout(()=>{
         $moreBtn.removeEventListener("mouseup", recursionFn); //누적된 이벤트 함수 제거 
         updataProduct(type,"muteAni")
       },150)
     }

       addClass = (e)=>{
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

 //메뉴 목록 클릭시 updataProduct 함수실행
 const clickMenu = (e) => {
   renderMax = 8 //reset rederMax , updataProduct함수 위 선언
   $moreBtn.removeEventListener("mouseup", recursionFn); //누적된 이벤트 함수 제거 
   $moreBtn.removeEventListener('mousedown',addClass); //누적된 이벤트 함수 제거 

   updataProduct(e.target.dataset.productType)//😡

   for (let i = 0; i < $productNav.children.length; i++) { //reset Class
     $productNav.children[i].classList.remove('act') 
   }
   e.target.classList.add('act')
 }
 $productNav.addEventListener('click',clickMenu)


 /*    
 1. 선택한 상품목록(메게변수 tar)과 같은 데이터를 장바구니에 요소생성출력
 2-1. option : null(default) : 수량증가 버튼 클릭시 item 수량을 증가 
 2-2. option : sub : 수량감소 버튼 클릭시 item 수량을 감소
 2-3. option : delete : X 버튼 클릭시 item을 장바구니에서 제거
 */
 const renderPickedItems = (tar,option) => {
   let sumPrice = 0
   let targetId = tar.dataset.id
   let createSelectEl = "<ul>"

   data.forEach((d)=>{
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
     
   $cartBox.innerHTML = createSelectEl + "</ul>"
   $checkBox = document.querySelectorAll('.check-box')//update Dom
   $cartBox = document.querySelector('.cart-box') //update Dom

 }//renderPickedItems


 //장바구니 결제하기 버튼의 결제금액 출력
 let checkedItemsArr = null
 const upDataPrice = () =>{
   let price = [...document.querySelectorAll('.item-price')]
   let sumPrice = 0
   
   checkedItemsArr = price.map((p,i)=>{
     if ($checkBox[i].checked) {
       sumPrice += Number(p.textContent.replace(/[^0-9]/g,""))
       return p.parentElement
     }
   })
   
     if(sumPrice > 0) {
       $sumBox.classList.remove('close')
       $sumBox.textContent = sumPrice.toLocaleString('ko-KR') + "원 결제하기";    
     } else {
       $sumBox.classList.add('close')
       $sumBox.textContent = "결제하기"
     }
 }


 //상품목록을 클릭하면 아래 함수를 실행
 const pickProduct = (e) =>{
   if(["items-box","contain","more"].includes(e.target.className)) return false    

   let target = e.target.tagName == "LI" ? e.target : e.target.parentElement

   target.classList.remove('push-img')
   renderPickedItems(target)
   upDataPrice()  
   showStateOfCart() 
 }

 $itemsBox.addEventListener('mousedown',(e)=>{
   if(["items-box","contain","more"].includes(e.target.className)) return false    
   let target = e.target.tagName == "LI" ? e.target : e.target.parentElement
   target.classList.add('push-img')
 })
 $itemsBox.addEventListener('mouseup',pickProduct)


 //버튼 클릭 후 장바구니 item(1.수량 추가+추감, 2.체크해제, 3.목록에서 제거)  <-- 함수를 실행 
 const addSubQuantity = (e) =>{
   let targetContain = e.target.parentElement.parentElement

   if (e.target.tagName === "BUTTON") { 

     if (e.target.textContent === "+") {
       renderPickedItems(targetContain)
       upDataPrice()  
       e.target.classList.remove('push-btn')
     }

     if (e.target.textContent === "-") {
       renderPickedItems(targetContain,"sub")
       upDataPrice()
       e.target.classList.remove('push-btn')
     }
   }
   if (e.target.tagName === "I") { 
     renderPickedItems(targetContain,"delete")
     upDataPrice()
   }
 }

 $cartBox.addEventListener('mouseup',addSubQuantity)

 $cartBox.addEventListener('mousedown',(e)=>{
   if (["+","-"].includes(e.target.textContent)) {
     e.target.classList.add('push-btn')
   }
 })

 const isChecked = (e) => {
   if(e.target.className === "check-box") upDataPrice()
 }

 $cartBox.addEventListener('click',isChecked)


 //장바구니 충전금액 계산+표시
 let sumPaymentCash = 0
 const printPaymentCash = (e) => {
   if (e.target.tagName !== "BUTTON") return false

   let paymentCash = Number(e.target.dataset.payment)
   sumPaymentCash += paymentCash
   $paymentBox.innerHTML =' <span>충전금액</span> '+ sumPaymentCash.toLocaleString('ko-KR') + "원"
 }

 $paymentBtns.addEventListener('click',printPaymentCash)

 

 //장바구니 정보 초기화 
 const resetData = () => {
   //객체까지 복사하려고 아래 json으로 메서드사용
   data = JSON.parse(JSON.stringify(productData))

   $sumBox.classList.add('close')
   $cartBox.innerHTML = ""
   $sumBox.textContent = "결제하기"
   $paymentBox.innerHTML = "<span>충전금액</span>0원"
   sumPaymentCash = 0
   sumPrice = 0
 }

 $resetBtn.addEventListener('click',resetData)


 //모달생성, 모달팝업, 금액 합계/잔액 출력 
 //!! checkedItemsArr변수 upDataPrice 함수 위에 선언
 const calcPaymentCreactModal = () => {
   let sumPrice = $sumBox.textContent.replace(/[^0-9]/g,"")
   let change = sumPaymentCash - sumPrice 
   let modalEl = ""
   let [firstProduct] = data.filter((d)=>{
     if (d.id === checkedItemsArr[0].dataset.id) return true
   })
   
   let date = new Date()
   let formatObtions = {
     year: 'numeric', 
     month: 'numeric', 
     day: 'numeric',
     hour: 'numeric', 
     minute: 'numeric'
   }

   let currentDate = new Intl.DateTimeFormat('kr',formatObtions).format(date);

   if (sumPrice == 0) return false // 
   if (change >= 0) {
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
     $closeModalbtn = document.querySelector('.close-modal')
     $closeModalbtn.addEventListener('click',()=>{
       $modalWrap.classList.remove('success')
       $body.classList.remove('lock-scroll')
       resetData()
       toggleCartBox()
     })
   }
 }//calcPaymentCreactModal

 $sumBox.addEventListener('click',calcPaymentCreactModal)


 //장바구니 보이기/숨기기 
 let toggleVal = true
 const toggleCartBox = () => {
   let boxW =  $cartWrap.offsetWidth

   if (toggleVal) {
     $cartWrap.style.right = -boxW + "px"
     $closeBtn.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>'
   } else {
     $cartWrap.style.right = 0
     $closeBtn.innerHTML = '<i class="fa-sharp fa-solid fa-xmark delete-product"></i>'  
   }

   toggleVal = !toggleVal
   showStateOfCart()
 }
 toggleCartBox()//default
 
 $closeBtn.addEventListener('click',toggleCartBox)


 //카트에 상품이 담겨있는지를 아이콘으로 표시 
 function showStateOfCart() {
   let liLength = $cartBox?.firstElementChild?.children.length;

   if (liLength > 0 && !toggleVal ) {
     $closeBtn.classList.add("in-items")
   } 
   else
   {
     $closeBtn.classList.remove("in-items")
   }
 }