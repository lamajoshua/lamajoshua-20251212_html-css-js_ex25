//画像(.gallery-item) の枚数分ループ
const items = document.querySelectorAll('.gallery-item');

for (let i = 0; i < items.length; i++) {
  const keyframes = {
    opacity: [0, 1],
    translate: ['0 50px', 0],
  };
  const options = {
    duration: 600,
    //delay: i * 300, //i番目の画像ごとに0.3秒ずつ遅らせる
    delay: Math.floor(Math.random() * 1000), //0 ~ 999ミリ秒のランダムな遅延
    fill: 'forwards',
  };
  items[i].animate(keyframes, options);
}