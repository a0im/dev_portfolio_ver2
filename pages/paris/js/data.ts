interface Iproduct {
  readonly id : number;
  readonly product : string;
  price : number;
  readonly url : string;
  count : 0;
  readonly type : "bread" | "beverage" | "sandwich";
}


let productData : Iproduct[]  =  [
  {id:1,product:"다크초코츄잉스타" ,price:2500 ,url:"./images/다크초코츄잉스타.jpg" ,count:0, type :"bread"},
  {id:2,product:"부드러운정통우유식빵" ,price:3600 ,url:"./images/부드러운정통우유식빵.png" ,count:0, type :"bread"},
  {id:3,product:"달콤꽈배기도넛" ,price:1000 ,url:"./images/달콤꽈배기도넛.jpeg" ,count:0, type :"bread"},
  {id:4,product:"블루베리요거트쉐이크" ,price:3500 ,url:"./images/블루베리요거트쉐이크.jpeg" ,count:0, type :"beverage"},
  {id:5,product:"아메리카노" ,price:3600 ,url:"./images/아메리카노.jpeg" ,count:0, type :"beverage"},
  {id:6,product:"아이스라떼" ,price:4000 ,url:"./images/아이스라떼.jpeg" ,count:0, type :"beverage"},
  {id:7,product:"통밀햄에그샌드위치" ,price:3300 ,url:"./images/통밀햄에그샌드위치.jpeg" ,count:0, type :"sandwich"},
  {id:8,product:"런치샌드위치" ,price:3000 ,url:"./images/런치샌드위치.jpeg" ,count:0, type :"sandwich"},
  {id:9,product:"미니버거샌드위치" ,price:4500 ,url:"./images/미니버거샌드위치.jpeg" ,count:0, type :"sandwich"},
  {id:10,product:"멀티그레인시저치킨샌드위치" ,price:2000 ,url:"./images/멀티그레인시저치킨샌드위치.jpeg" ,count:0, type :"sandwich"},
  {id:11,product:"흑당버블라떼" ,price:2000 ,url:"./images/흑당버블라떼.jpeg" ,count:0, type :"beverage"},
  {id:12,product:"허니오트카페라떼" ,price:1000 ,url:"./images/허니오트카페라떼.jpeg" ,count:0, type :"beverage"},
  {id:13,product:"뽀드득그릴소시지" ,price:1000 ,url:"./images/뽀드득그릴소시지.jpeg" ,count:0, type :"bread"},
  {id:15,product:"햄치즈브런치샌드위치" ,price:3000 ,url:"./images/햄치즈브런치샌드위치.jpeg" ,count:0, type :"sandwich"},
  {id:16,product:"딸기라떼" ,price:4500 ,url:"./images/딸기라떼.jpeg" ,count:0, type :"beverage"},
  {id:17,product:"망고스무디" ,price:5400 ,url:"./images/망고스무디.jpeg" ,count:0, type :"beverage"},
  {id:18,product:"블루베리요거트쉐이크" ,price:6500 ,url:"./images/블루베리요거트쉐이크.jpeg" ,count:0, type :"beverage"},
  {id:19,product:"아메리카노" ,price:3000 ,url:"./images/아메리카노.jpeg" ,count:0, type :"beverage"},
  {id:21,product:"아이스라떼" ,price:4000 ,url:"./images/아이스라떼.jpeg" ,count:0, type :"beverage"},
  {id:21,product:"아이스초코" ,price:4500 ,url:"./images/아이스초코.jpeg" ,count:0, type :"beverage"},
  {id:22,product:"아이스티" ,price:3500 ,url:"./images/아이스티.jpeg" ,count:0, type :"beverage"},
  {id:23,product:"까방베르치즈후레쉬번" ,price:2700 ,url:"./images/까방베르치즈후레쉬번.png" ,count:0, type :"bread"},
  {id:24,product:"매콤아삭고로케" ,price:3000 ,url:"./images/매콤아삭고로케.jpeg" ,count:0, type :"bread"},
  {id:25,product:"부드러운모카크림빵" ,price:3000 ,url:"./images/부드러운모카크림빵.png" ,count:0, type :"bread"},
  {id:26,product:"부드러운연유브레드" ,price:3000 ,url:"./images/부드러운연유브레드.jpeg" ,count:0, type :"bread"},
  {id:27,product:"뽀드득그릴소시지" ,price:3000 ,url:"./images/뽀드득그릴소시지.jpeg" ,count:0, type :"bread"},
  {id:28,product:"샐러드빵" ,price:3000 ,url:"./images/샐러드빵.jpeg" ,count:0, type :"sandwich"},
  {id:29,product:"건강한크랩샐러드랩" ,price:3000 ,url:"./images/건강한크랩샐러드랩.jpeg" ,count:0, type :"sandwich"},
  {id:30,product:"건강한플랜트불고기샐러드랩" ,price:3000 ,url:"./images/건강한플랜트불고기샐러드랩.jpeg" ,count:0, type :"sandwich"},
  {id:31,product:"더블바비큐치킨샌드위치" ,price:3000 ,url:"./images/더블바비큐치킨샌드위치.jpeg" ,count:0, type :"sandwich"},
  {id:32,product:"두부텐더콥샐러드" ,price:3000 ,url:"./images/두부텐더콥샐러드.jpeg" ,count:0, type :"sandwich"},
  {id:33,product:"레드페퍼허니스모크햄" ,price:3000 ,url:"./images/레드페퍼허니스모크햄.jpeg" ,count:0, type :"sandwich"},
  {id:34,product:"오미자차" ,price:5400 ,url:"./images/오미자차.jpeg" ,count:0, type :"beverage"},
]