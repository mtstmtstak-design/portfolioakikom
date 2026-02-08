const toggle = document.getElementById("themeToggle");

// ページ読み込み時：保存された状態を反映
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  toggle.checked = true; // チェック状態も同期
}

// 切り替え時
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");

  // 状態を保存
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

const track = document.querySelector('.track');
const pages = document.querySelectorAll('.track img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const windowEl = document.querySelector('.window');

let current = 1; // 初期表示：2ページ目

function update() {
  if (!windowEl || !track) return;

  const width = windowEl.offsetWidth;
  track.style.transform = `translateX(-${current * width}px)`;

  prevBtn.style.display = current === 0 ? 'none' : 'block';
  nextBtn.style.display = current === pages.length - 1 ? 'none' : 'block';
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    if (current > 0) {
      current--;
      update();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (current < pages.length - 1) {
      current++;
      update();
    }
  });

  window.addEventListener("resize", update);
}

window.addEventListener('resize', update);

const openBtns = document.querySelectorAll('.openModal');
const modal = document.getElementById('modal');

// ★ 追加：modalがあるページだけ実行
if (modal) {
  const modalImg = document.getElementById('modalImg');
  const closeBtn = modal.querySelector('.modal__close');
  const overlay = modal.querySelector('.modal__overlay');
  const modalBody = modal.querySelector('.modal__body');

  // モーダルを開く
  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const imgSrc = btn.dataset.img;
      modalImg.src = imgSrc;

      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      modalBody.scrollTop = 0;
    });
  });

  // 閉じる共通処理
  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
}



// ★ 初期表示時に必ず呼ぶ
update();

