const $body = document.querySelector('body')
const $inputBox = document.querySelector('.input-box')
const $row = [...document.querySelectorAll('.row')]
const $column = document.querySelectorAll('.column')
const $printBox = document.querySelector('.print-content-box')
const $btns = document.querySelector('.btns')
const $result = document.querySelector('.result')
const $modalWrap = document.querySelector(".modal-wrap")
const $closeModalBtn = document.querySelectorAll(".close-modal")
const $messegeBox = document.querySelector('.messege-box')
const $modalType = document.querySelector('.type')


let $intTable : HTMLElement | null;
let $resultTable : Element;
let calcText: string;

$inputBox?.addEventListener('input', e => {
  if (e.target instanceof HTMLInputElement) {
    e.target.value = e.target.value.replace(/[^-1-5]/g, '')
  }
})

//1.모달창 열기
//2.에러 메세지 모달에 출력
type TerrorTxt = (err:string , load?:boolean) => void;

const pushErrorTxt : TerrorTxt = ( error , load )  => {
  let pushMessege:string = `
    <img src=${!load ? './images/error.png' : './images/computer.png'}><p>${error}</p>
  `

  if ($messegeBox != null && $modalType != null) {
    $messegeBox.innerHTML = pushMessege
    $modalType.textContent = !load ? "ERROR" : "Made by A02 2022/12/05"
  }

  $modalWrap?.classList.add('show')
  $body?.classList.add('lock-scroll')
}

pushErrorTxt("*WELCOME*",true)

//모달창 닫기 
type Tmodalbtn = (this:HTMLElement) => void;

const downCloseBtn: Tmodalbtn = function() {
  this.classList.add('push')
}

const upCloseBtn: Tmodalbtn = function() {
  this.classList.remove('push')
  $body?.classList.remove('lock-scroll')
  setTimeout(() => $modalWrap?.classList.remove('show') ,70)
}

$closeModalBtn.forEach( e => {
  e.addEventListener('mousedown',downCloseBtn)
  e.addEventListener('mouseup',upCloseBtn)
})

type TcreateTable = (
  row : Element,
  col : Element,
  wrap : Element | null,
  classN : string,
  idx? : number,
) => void

//테이블(행,열) 생성
const createTable : TcreateTable = (row, col, wrap, className, idx) => {
  let rowN : number = 0
  let colN : number = 0
  
  if(row && row instanceof HTMLInputElement){
    rowN += Number(row.value.trim())
  }

  if (col && col instanceof HTMLInputElement) {
    colN += Number(col.value.trim())
  }

  let captionName = className !== "result-table" 
    ? "테이블 " + (Number(idx) + 1)
    : "테이블 " + calcText + " 결과"
  
  let element = `<table class = ${className}><caption>${captionName}</caption>`

  for (let r = 0; r < rowN; r++) {
    element += '<tr>'
    for (let c = 0; c < colN; c++) {
      element += '<td></td>'
    }
    element += '</tr>'
  }
  
  wrap?.insertAdjacentHTML('beforeend' , element + "</table>")
};


//생성된 테이블에 렌덤한 숫자 할당
const printRandomNum = ():void => {
  let $trList = document?.querySelectorAll('.int-table tr')

  for (let i = 0; i < $trList.length; i++) {
    for (let j = 0; j < $trList[i].children.length; j++) {

      let td = $trList[i].children[j]
      td.textContent = String(Math.floor(Math.random()*50)+1)
    }
  }
}

type TcalcOption = (v1:string | null , v2:string | null) => number
type TcalcProps = (cb : TcalcOption) => void

//두 테이블의 값을 가져와서 콜백함수로 계산 
const printCalcValue:TcalcProps = cbFn => {
  const $trList = document.querySelectorAll('.int-table tbody')

  let wrapItem1:HTMLCollection = $trList[0].children;
  let wrapItem2:HTMLCollection  = $trList[1].children;
  let value1 : string | null;
  let value2 : string | null;
  let td : Element;

  if (wrapItem1.length != wrapItem2.length){ //row check
    pushErrorTxt("두 테이블의 행과 열의 개수가 동일해야 합니다.")
    return false
  }; 
  if (wrapItem1[0].children.length != wrapItem2[0].children.length){ //column check
    pushErrorTxt("두 테이블의 행과 열의 개수가 동일해야 합니다.")
    return false
  } 
  if (!wrapItem1[0].children[0].textContent) { //value check
    pushErrorTxt("숫자추가를 눌러서 테이블에<br> 값을 추가하세요.")
    return false
  }
  if ($resultTable)$resultTable.remove() //remove beforeResult

  createTable($row[0] , $column[0] ,$printBox,`result-table`) //create table

  const $resultTrList = document.querySelectorAll('.result-table tr')

  let Table = document.querySelector('.result-table') 
  if (Table != null) $resultTable = Table
  

    for (let i = 0; i < $resultTrList.length; i++) {
      for (let j = 0; j < $resultTrList[i].children.length; j++) {
        value1 = wrapItem1[i].children[j].textContent
        value2 = wrapItem2[i].children[j].textContent
        td = $resultTrList[i].children[j]

        td.innerHTML = String(cbFn(value1,value2)) //argument is callback fn
      }
  }
}

//printCalcValue callbackFn
const sunFn : TcalcOption = (v1,v2) =>{
  return Number(v1) + Number(v2)
}
const subFn : TcalcOption = (v1,v2) =>{
  return Number(v1) - Number(v2)
}
const multiFn : TcalcOption = (v1,v2) => {
  return Number(v1) * Number(v2)
}

//각 버튼의 해당하는 함수를 실행
const controlFunctions= ( e:Event ) => {
  let tar = e.target as HTMLDivElement
  let target : string = ""

  target = tar.className
  if (tar.dataset.type !== undefined) {
    calcText = tar.dataset.type
  }
  


  if(target ==  "create-btn") {
      let empty = false

      for (let i:number = 0; i < $row.length; i++) { //empty check
          let r = $row[i] as HTMLInputElement
          let c = $row[i] as HTMLInputElement

          if (!r.value ||!c.value) {
            pushErrorTxt("빈칸에 값을 입력하세요.")
            empty = true
          }
        }

        if (empty) return false 
        if ($printBox != null) $printBox.innerHTML = ""

        for (let i = 0; i < $row.length; i++) {
            createTable($row[i],$column[i],$printBox ,`int-table`,i)
        }
  
        $body?.scrollIntoView({behavior: "smooth", block: "end", inline: "center"})
  
        $intTable = document.querySelector('.int-table') //updata
  }
  

  if ($intTable) {
    target == "random-btn" && printRandomNum()
    target == "sum-btn" && printCalcValue(sunFn)
    target == "sub-btn" && printCalcValue(subFn)
    target == "multi-btn" && printCalcValue(multiFn)
  }
  else if (["random-btn","sum-btn","sub-btn","multi-btn"].includes(target)) {
    pushErrorTxt("생성된 테이블이 없습니다.<br>테이블을 생성하세요.") //check null value 
  }
}

$btns?.addEventListener('click',controlFunctions)