// import notice from "../db/notice_title.json " assert { type: "json" };



//json
// const noticeData = notice.notice;

// DOM
const $header = document.querySelector("header");
const $h_nav = document.querySelector(".logo-gnb-topset");
const $h_eventWrap = document.querySelector(".event-wrap");
const $h_gnbList = document.querySelector(".gnb-list");
const $topBtn = document.querySelector(".topBtn");
const $noticeBox = document.querySelector(".notice-bundle");
const $a_bgWrap = document.querySelector(".bg-wrap");
const $a_textContent = document.querySelectorAll(".bg-wrap > .container > div");
const $s2_itemList = document.querySelector(".s2-item-list");
const $s2_items = document.querySelectorAll(".s2-item-list > li");
const $s3 = document.querySelector(".s3");
const $s3_imgBox = document.querySelector(".img-content");
const $s3_content = document.querySelector(".text-content");


let noticeData = [
  {
    date:"2022.09.30",
    type:"notice",
    title:"2022년 추석 연휴 매장 영업시간 안내"},
  {
    date:"2022.09.29",
    type:"notice",
    title:"고디바 매장별 메뉴 이용 안내"},
  {
    date:"2022.09.28",
    type:"new",
    title:"2022 고디바X시나모롤 '할로윈 컬렉션' 출시"},
  {
    date:"2022.09.27",
    type:"new",
    title:"해피데이 케이크 틴 지큐브 어쏘트먼트 출시"},
  {
    date:"2022.09.26",
    type:"new",
    title:"시즌한정 카카오 프루츠 퍼센티지 출시"},
  {
    date:"2022.09.25",
    type:"new",
    title:"고디바 시즌한정 '스프링 컬렉션' & '스트로베리 초콜렉사' 출시"
  }
]


// ================ GNB- gnb slide menu ================
gnbSildeEvnt();
function gnbSildeEvnt() {
  let [...gnbMenu] = $h_gnbList.children;
  gnbMenu.forEach(menu => {
    menu.addEventListener("mouseenter", () => {
      $h_eventWrap.style.height = "250px";
    });
  });

  $h_eventWrap.addEventListener("mouseleave", () => {
    $h_eventWrap.style.height = "60px";
  });
}
// ================= topBtn - 상단이동 , 버튼 숨김/표시 이벤트  ===================

//evnt
$topBtn.addEventListener("click", () => {
  setTimeout(() => {
    $h_nav.scrollIntoView({ behavior: "smooth" });
  }, 400);
});

// class 추가제거
function isEvt_arrow(entries) {
  if (!entries[0].isIntersecting) {
    $topBtn.classList.add("act-arrow");
  } else {
    $topBtn.classList.remove("act-arrow");
  }
}

//observer option
let option3 = {
  root: null,
  rootMargin: "250px 0px 0px 0px",
  threshold: 0,
};

//create observer obj
const observer_arrow = new IntersectionObserver(isEvt_arrow, option3);
observer_arrow.observe($header);

// ======================== Article -  change img article area ========================

changeArticleImgFn();
function changeArticleImgFn() {
  let bg = ["../img/h-bg4.jpg", "../img/h-bg3.jpg"];
  let bgIdx = 0;
  let interval = null;

  //초기화, 클래스 토글, 배경 변경 - 함수
  function isEvnt() {
    if (bgIdx >= bg.length) bgIdx = 0;
    $a_bgWrap.style.backgroundImage = `url('${bg[bgIdx]}')`;
    $a_textContent.forEach(e => e.classList.remove("act-bg"));
    $a_textContent[bgIdx].classList.add("act-bg");
    bgIdx++;
  }

  interval = setInterval(() => isEvnt(), 3500);
  //toggle interval 함수
  $a_bgWrap.addEventListener("mouseenter", () => clearInterval(interval));
  $a_bgWrap.addEventListener("mouseleave", () => (interval = setInterval(() => isEvnt(), 3500)));
}

// ================= notice - 공지내용 일정 시간마다 위로 슬라이드 이벤트 ===================

slideNoticeFn();
function slideNoticeFn() {
  const eleSize = 60;
  let currIdx = 0;
  let interval = null;

  //함수 호출 묶음
  let coreFn = () => {
    createNoticeEle();
    const $notiEle = document.querySelectorAll(".notice-bundle > p");
    createCloneNodes($notiEle);
    interval = setInterval(() => moveNotice(currIdx++), 2500);
    toggleInterval($notiEle);
  };
  coreFn();

  //.notice-bundle내 요소 생성 함수
  function createNoticeEle() {
    let element = "";
    noticeData.map(data => {
      element += `<p><a href="#">[${data.type.toUpperCase()}] ${data.title}<time>${data.date}</time><a/></p>`;
    });

    $noticeBox.innerHTML = element;
  }

  // 요소 복사 함수
  function createCloneNodes($notiEle) {
    $notiEle.forEach(e => {
      let clone = e.cloneNode(true);
      clone.classList.add("clone");
      $noticeBox.appendChild(clone);
    });

    $noticeBox.classList.add("noti-animate");
  }
  //요소 이동 함수
  function moveNotice(idx) {
    let currenPos = idx * eleSize;
    $noticeBox.style.bottom = `${currenPos}px`;
    resetIdx();
  }

  //요소 위치 초기화 함수
  function resetIdx() {
    const notiLength = document.querySelector(".notice-bundle").children.length / 4;

    if (currIdx > notiLength) {
      setTimeout(() => {
        $noticeBox.classList.remove("noti-animate");
        $noticeBox.style.bottom = "0px";
        currIdx = 0;
      }, 350);
      setTimeout(() => $noticeBox.classList.add("noti-animate"), 401);
    }
  }

  //toggle interval 함수
  function toggleInterval($notiEle) {
    $notiEle.forEach(pTag => {
      pTag.children[0].addEventListener("mouseenter", () => clearInterval(interval));
      pTag.children[0].addEventListener("mouseleave", () => {
        interval = setInterval(() => moveNotice(currIdx++), 2500);
      });
    });
  }
}

// ============= s2 - 일정 시간마다 이미지 우측 이동 이벤트 ================
s2SlideEvnt();
function s2SlideEvnt() {
  const imgLength = $s2_items.length;
  const imgSize = 402;
  let currIdx = 0;
  let interval = null;

  //함수 호출 묶음
  let core = () => {
    createClone();
    interval = setInterval(() => moveImg(currIdx++), 2500);
    toggleInterval();
  };
  core();

  //요소 복사 함수
  function createClone() {
    $s2_items.forEach(item => {
      let clone = item.cloneNode(true);
      clone.classList.add("clone");
      $s2_itemList.appendChild(clone);
      $s2_itemList.classList.add("s2-animate");
    });
  }

  //요소 이동 & 초기화 함수
  function moveImg(Idx) {
    let currentPos = imgSize * -Idx;
    $s2_itemList.style.left = `${currentPos}px`;

    if (currIdx > imgLength) {
      setTimeout(() => {
        $s2_itemList.classList.remove("s2-animate");
        $s2_itemList.style.left = "0px";
        currIdx = 0;
      }, 470);
      setTimeout(() => $s2_itemList.classList.add("s2-animate"), 570);
    }
  }

  //toggle interval 함수
  function toggleInterval() {
    $s2_itemList.addEventListener("mouseenter", () => clearInterval(interval));
    $s2_itemList.addEventListener("mouseleave", () => (interval = setInterval(() => moveImg(currIdx++), 2500)));
  }
}

// ============= s3 - 텍스트 슬라이드 이벤트   ================

//class 추가 제거 함수
function s3AddClass() {
  $s3_imgBox.classList.add("s3_act_img");
  $s3_content.classList.add("s3_act_content");
}
function s3RemoveClass() {
  $s3_imgBox.classList.remove("s3_act_img");
  $s3_content.classList.remove("s3_act_content");
}
let isEvt_s3 = entries => {
  entries[0].isIntersecting ? s3AddClass() : s3RemoveClass();
};

//Observer option
let option1 = {
  root: null,
  rootMargin: "0px",
  threshold: 0.8,
};

//create observer obj
const observer_s3 = new IntersectionObserver(isEvt_s3, option1);
observer_s3.observe($s3);
