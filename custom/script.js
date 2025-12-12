// 監視オプション
const options = {
  root: null,
  rootMargin: '0px 0px -100px 0px', // 画面の下から100px入ったら開始
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    
    // ■ 画面に入ってきた時（表示）
    if (entry.isIntersecting) {
      // すでに表示済み（opacityが1）なら何もしない（下から上に戻る時の対策）
      if (entry.target.style.opacity === '1') return;

      // アニメーション実行
      playAnimation(entry.target);
      
      // 表示済みの印としてopacityを1にしておく
      entry.target.style.opacity = '1';
    } 
    
    // ■ 画面から出た時（リセット判定）
    else {
      // 「画面の下側」に消えた時だけリセットする
      // (boundingClientRect.top がプラスなら、要素は画面より下にいる)
      if (entry.target.getBoundingClientRect().top > 0) {
        entry.target.style.opacity = '0'; // 透明に戻す
        
        // 実行中のアニメーションがあればキャンセル
        entry.target.getAnimations().forEach(anim => anim.cancel());
      }
      // ※画面の上側に消えた時（通り過ぎた時）は何もしない＝表示されたまま
    }
  });
}, options);

// 監視開始
const items = document.querySelectorAll('.gallery-item, .img-fadein');
items.forEach(item => {
  item.style.opacity = '0';
  observer.observe(item);
});


// ■ アニメーション関数（ここで動きを変えられます！）
function playAnimation(element) {
  
    /*// 【パターンA】 おすすめ！ 3D回転で起き上がる（高級感）
  const keyframes = {
    opacity: [0, 1],
    transform: ['perspective(1000px) rotateX(20deg) translateY(50px)', 'perspective(1000px) rotateX(0) translateY(0)'],
    filter: ['blur(10px)', 'blur(0)']
  };
  const options = { duration: 1000, easing: 'ease-out', fill: 'forwards' };  */

 // 【パターンB】 斜めからスッと入ってくる（スタイリッシュ）
  const keyframes = {
    opacity: [0, 1],
    transform: ['translate(-30px, 30px)', 'translate(0, 0)'], // 左下から
    filter: ['brightness(150%)', 'brightness(100%)'] // 白飛びしてから戻る
  };
  const options = { duration: 800, easing: 'cubic-bezier(0.25, 1, 0.5, 1)', fill: 'forwards' };


 /* 
  // 【パターンC】 ズームアウト（Apple風）
  const keyframes = {
    opacity: [0, 1],
    transform: ['scale(1.15)', 'scale(1)'],
    filter: ['blur(15px)', 'blur(0)']
  };
  const options = { duration: 1400, easing: 'ease-out', fill: 'forwards' };
  */

  element.animate(keyframes, options);
}