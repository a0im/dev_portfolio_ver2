  
  
  /* 
  --시작전 구상
  1. 객체 이미지  , 틀린그림위치값 객체 담기
  3. 시간이 증가 감소하는 일이있으면 셋타임아웃 다시적용 keyframe 시간도 다시 변수를 담아서 다시랜더링
  3-1.
  4. 조건식 범위 +-10 
  1200 사이즈 
  */

  /* 
    --구현--
    0랜더링
    1. 정답 오답 판별
    2. 리셋
    3. 시간이 경과하면 실패
    4. 오답시 시간 감소 
    5. 같은 스테이지가 반복되지 않게끔 처리 
    5  전부 맞추면 다음 스테이지로 
    6. 시간초과시 재시작
    7. 재시작시 전번의 이미지랑 다른 이미지 출력
    8. 모든 그림다 맞추면 클리어 메세지 
    9. 이미지 편집 ,
    10. 좌표값 받아오기 
    11. 베너들 디자인
    12. 오클릭 x표시 구현
    13. 클릭버튼 에니메이션
    14. 시계추가
    15. 맞출 그림 갯수 표시
    16. 시간경과시 버튼색상 빨갛게 변하기
    17. 시간경과시 배경 태두리 그림자 점멸
    18.모달 스크립트 작성 
    19. 마지막 전체적인 디자인하기;

  */

  /* 
  TODO

    1., 마우스포인터 디자인
    5. 동그라미 엑스표 애니메이션
    5.css정리 
  ' */

// Array & Object
const options = {
  range : 35, //xPos,yPos 좌표로 부터 정답 인정 범위 
  timeLimit : 40, // 제한시간
  imminentAlarm : 50, //시간 임박 알림 실행값 (1~100) %단위로 실행 
}

const images = [
  {
    id : 1,
    url1 : "./images/simpsons1-1.jpg",
    url2 : "./images/simpsons1-2.jpg",
    xPos : [182,425,79,57,164],
    yPos : [43,639,621,389,472],
  },
  {
    id : 2,
    url1 : "./images/simpsons2-1.jpg",
    url2 : "./images/simpsons2-2.jpg",
    xPos : [153,65,280,348,475],
    yPos : [64,378,751,469,263],
  },
  {
    id : 3,
    url1 : "./images/simpsons3-1.jpg",
    url2 : "./images/simpsons3-2.jpg",
    xPos : [184,73,428,308],
    yPos : [524,87,457,385],
  },
  {
  
    id : 4,
    url1 : "./images/simpsons4-1.jpg",
    url2 : "./images/simpsons4-2.jpg",
    xPos : [186,434,372,445],
    yPos : [86,71,492,252],
  },
  {
    id : 5,
    url1 : "./images/simpsons5-1.jpg",
    url2 : "./images/simpsons5-2.jpg",
    xPos : [555,289,99,488],
    yPos : [83,154,774,582],
  },
  {
    id : 6,
    url1 : "./images/simpsons6-1.jpg",
    url2 : "./images/simpsons6-2.jpg",
    xPos : [359,393,51,79,380,279],
    yPos : [585,220,404,81,354,477],
  },
]

const modalObj = {
  start : '<p class="start"></p>',
  clear : '<div class="clear"><img src="./images/clearbanner.png" alt="clearbanner"></div>',
  fail : '<h2><img src="./images/gameover.png" alt="gameover"></h2><p class="retry"></p>',
  finish : '',
}


//Dom
const $gameBox = document.querySelector('.game-box')
const $imgBox = document.querySelector('.print-img-box')
const $timeBar = document.querySelector('.time-bar')
const $failWrap = document.querySelector('.fail-wrap')
const $startWrap = document.querySelector('.start-wrap')
const $clearWrap = document.querySelector('.claer-wrap')
const $finishWrap = document.querySelector('.finish-wrap')
const $modal = document.querySelector('.modal')
const $count = document.querySelector('.count')


//1. images원본 배열을 복사함  == closer
//2. 함수내 메서드가 배열내 객체를 (추출-readItem ,되섞기-reload ,삭제-delItem , 초기화-reset , 길이확인-itemLength)함 
let setObj = isSetObj(); 
function isSetObj () {
  let cloneArr = JSON.parse(JSON.stringify(images))
  let readItem = cloneArr[Math.floor(Math.random() * cloneArr.length)]
  console.log("resetData");

  return {
    reset : () =>  setObj = isSetObj(),
    delItem : () => cloneArr.splice(cloneArr.indexOf(readItem),1),
    reload : () => readItem = cloneArr[Math.floor(Math.random() * cloneArr.length)],
    readItem : () => readItem,
    itemLength : () => cloneArr.length,
  }
}


//카운터를 브라우저에 출력 
const printCounter = () => {
  images.forEach((obj)=>{
    if (obj.id === setObj.readItem().id) {
      $count.textContent = (obj.xPos.length - setObj.readItem().xPos.length) + "/" + obj.xPos.length;
    }
  })
  console.log( images.length - setObj.itemLength() + 1,"/",images.length) //(스테이지 정보) 적용 안함
}
printCounter() //load deFault

//틀린 그림찾기 이미지 랜더링
const renderImg = () => {
  let {url1,url2} = setObj.readItem()

  $imgBox.innerHTML = `
    <div class="img-contatin"><img src=${url1} alt ="틀린 그림찾기 왼쪽 이미지"></div>
    <div class="img-contatin"><img src=${url2} alt ="틀린 그림찾기 오른쪽 이미지"></div>`
}

//모달 이미지 랜더링
const renderModal = (state) => {
  for (const key in modalObj) {
    if (key === state) {
      $modal.setAttribute('style',"")
      $modal.classList.remove('start-modal','clear-modal','fail-modal','finish-modal')

      let className = state + "-modal";

      $modal.innerHTML = modalObj[key]
      $modal.classList.add(className)
    }
  }
}
renderModal('start') //load Default


//게임 시간초과 함수
let currentTime = 100; //막대크기 100%
let animationFrame
let start //현재 시간 값을 변수에 담음
let limitVal = {...options}.timeLimit
let first = true

const isTimeOver = () => {
  let rect =  $timeBar.parentElement.getBoundingClientRect()
  let sec = (rect.width / options.timeLimit) / (rect.width / 100)  / 60 //(60 렌더 횟수)
  $timeBar.style.width = (currentTime -= sec) + '%';

  animationFrame = requestAnimationFrame(isTimeOver)

  if (new Date().getTime() > start + (limitVal * 1000 / (100 / options.imminentAlarm)) && first) { //시간임박 알람 실행
    $gameBox.classList.add('hurry')
    first = false
  }

  if (new Date().getTime() > start + (limitVal * 1000)){ // 시간초과 하면 실행
    cancelAnimationFrame(animationFrame)
    $gameBox.classList.remove('hurry')
    renderModal('fail')
    $timeBar.style.width = (currentTime = 100) + "%"
    limitVal = {...options}.timeLimit
    console.log('looooseeeeee')
  }
}


  //다음 스테이지로 넘어가는 초기화함수 
  const setNextStage = () => {
  $gameBox.classList.remove('hurry')
  first ||= true
  start = new Date().getTime();
  isTimeOver()
  setObj.delItem()
  setObj.reload()
  document.querySelectorAll('.check').forEach(e => e.remove()) //reset checkTag
  renderImg()
  printCounter()

  console.log("setNextStage!!!!");
}


// retry버튼 클릭 후 초기화 함수
const reset = () => {
  first ||= true
  start = new Date().getTime();  
  isTimeOver() 
  let beforeImg = setObj.readItem();
  setObj.reset()
  setObj.reload()

  while (beforeImg.id ===  setObj.readItem().id) { //같은 이미지 방지
    setObj.reset()
    setObj.reload()
  }
  
  document.querySelectorAll('.check').forEach(e => e.remove()) //reset checkTag
  renderImg()
  printCounter()
  console.log("reset!!!!!");
}


//좌표에 동그라미(.check)를 생성/브라우저 렌더링
const createCricle  = (evnt,truePos) => {
    let checkL = document.createElement('div')
    let checkR = document.createElement('div')
    let checks  = [checkL,checkR];
    let imgContain = evnt.target.parentElement;

    imgContain.appendChild(checkL)
    imgContain.nextElementSibling?.appendChild(checkR) ?? imgContain.previousElementSibling.appendChild(checkR)

    checks.forEach(c => {
      c.classList.add('check')
      c.style.left = truePos[0] - (checkL.offsetWidth / 2) + "px";
      c.style.top = truePos[1] - (checkL.offsetHeight / 2) + "px";
    })
  }


  //좌표에 엑스(.cross)를 생성/브라우저 렌더링
  const createCross = (evnt) => {
    let cross = document.createElement('div')
    let imgContain = evnt.target.parentElement;
    cross.textContent = "X"
    imgContain.appendChild(cross)
    cross.classList.add('cross')

    cross.style.left = evnt.offsetX - (cross.offsetWidth /2) + 'px'
    cross.style.top = evnt.offsetY - (cross.offsetHeight /2) + 'px'

    setTimeout(()=> cross.remove() ,1000)
  }


//1. 객체에 담긴 xy좌표의 범위내에 클릭 좌표가 해당되면 함수를 실행
//2. 틀린그림 모두 맞추면 setNextStage() 함수 실행
const checkPicture = (evnt) => {
  let range = options.range; //정답 인식 범위 
  let offsetY =  evnt.offsetY;
  let offsetX =  evnt.offsetX;
  let {xPos,yPos} = setObj.readItem(); 
  let truePos = [];

  console.log(offsetX, "===",offsetY);

  let state = xPos.filter((x , i)=>{  //정답 판별
    if (offsetX > x + range || offsetX < x - range) return false
    if (offsetY > yPos[i] + range || offsetY < yPos[i] - range) return false

    truePos =  truePos.concat(xPos[i],yPos[i])
    createCricle(evnt , truePos) 
    xPos.splice(i,1)
    yPos.splice(i,1)
    printCounter()

    if (xPos.length === 0) { //이번 스테이지에서 틀린 그림 모두 맞췄을 때 
      cancelAnimationFrame(animationFrame)

      if(setObj.itemLength() <= 1){ // 모든 스테이지 클리어 
        setTimeout(()=>renderModal('finish'),1000)
        $gameBox.classList.remove('hurry')

        console.log("모든게임 클리어 !!");
        return true
      }

      renderModal('clear')

      setTimeout(() =>{ 
        $modal.style.display = 'none';
        $timeBar.style.width = (currentTime = 100) + "%"
        setNextStage()
      } ,3000)
    }
    return true
  })//state

  //오답 - 정답 로직을 실행하고 true를 반환하는 state filter에 배열이 없다면 오답 조건문 실행함
  if (state.length > 0) return false

  limitVal -= options.timeLimit / 20;
  currentTime -= 5;
  createCross(evnt)
  $gameBox.classList.add("click-false")
  setTimeout(()=>$gameBox.classList.remove("click-false"),340)//에니메이션 종료 후 실행

} //checkPicture

$imgBox.addEventListener('click', (e)=>{
  if (e.target.tagName == 'IMG') checkPicture(e)
})


//다시 게임 시작 
const tryAgain = (e) => {
  if (!["retry","retry-img"].includes(e.target.className)) return
  reset()
  $modal.style.display = "none"
}


//처음 게임 시작 
const startNewGame = (e) => {
  if (e.target.className !== "start" ) return
  start = new Date().getTime();
  renderImg()
  isTimeOver()
  
  $modal.style.display = "none"
}

$modal.addEventListener('click',(e)=>{
  startNewGame(e)
  tryAgain(e)
})
