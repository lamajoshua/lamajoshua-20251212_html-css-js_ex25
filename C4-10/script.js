const images = document.querySelectorAll('.gallery-item');
let currentIndex = 0;

// ページ読み込み後、初回画像に active を付与して拡大アニメーションを実施
window.addEventListener('load', () => {
  images[currentIndex].classList.add('active');
});

function changeImage() {
  // 現在の画像の active を解除
  images[currentIndex].classList.remove('active');
  
  // 次の画像へ切り替え
  currentIndex = (currentIndex + 1) % images.length;
  
  // 次の画像に active を付与（この時 transition が発火して拡大します）
  images[currentIndex].classList.add('active');
}

// 4秒ごとに画像を切り替え
setInterval(changeImage, 4000);