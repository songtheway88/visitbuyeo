/*
  비짓부여 (VisitBuyeo) - Main Logic File
  123사비공예마을(규암) 중심 콘텐츠 허브
  Handles hero slider, youth video archive, 1박2일 course, craft village spots, modal popups, search filtering & mobile drawer.
*/

// Ultra-lightweight Vector Image Generator (사진이 없는 카드의 대체 이미지)
function generateDataUriSvg(title, bgGradient, iconSvg) {
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
      <defs>
        <linearGradient id="${bgGradient.id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bgGradient.c1}" />
          <stop offset="100%" stop-color="${bgGradient.c2}" />
        </linearGradient>
        <pattern id="craft-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1.5" fill="#ffffff" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#${bgGradient.id})" />
      <rect width="100%" height="100%" fill="url(#craft-pattern)" />

      <!-- Artistic Overlay Circles -->
      <circle cx="700" cy="80" r="180" fill="#ffffff" opacity="0.06"/>
      <circle cx="100" cy="420" r="140" fill="#ffffff" opacity="0.05"/>

      <!-- Center Graphic Icon -->
      <g transform="translate(400, 210) scale(3.5)" fill="#ffffff" opacity="0.9">
        ${iconSvg}
      </g>

      <!-- Title Overlay -->
      <rect x="0" y="380" width="800" height="120" fill="rgba(0,0,0,0.35)"/>
      <text x="40" y="445" font-family="'Pretendard GOV', sans-serif" font-size="34" font-weight="800" fill="#ffffff" letter-spacing="-1">
        ${title}
      </text>
      <text x="760" y="445" font-family="'Pretendard GOV', sans-serif" font-size="22" font-weight="600" fill="#ffc999" text-anchor="end">
        123사비공예마을
      </text>
    </svg>
  `;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
}

const fallbackGradient = { id: "gFallback", c1: "#6a2c00", c2: "#b34f00" };
const playIcon = `<circle cx="0" cy="0" r="14" fill="none" stroke="#fff" stroke-width="2"/><polygon points="-4,-7 8,0 -4,7" fill="#fff"/>`;
const pinIcon = `<path d="M0,-14 C8,-14 12,-8 12,-3 C12,5 0,14 0,14 C0,14 -12,5 -12,-3 C-12,-8 -8,-14 0,-14 Z" fill="none" stroke="#fff" stroke-width="2"/><circle cx="0" cy="-3" r="4" fill="#fff"/>`;

const platformLabels = {
  youtube: "유튜브",
  instagram: "인스타그램",
  naverclip: "네이버 클립",
  blog: "네이버 블로그",
  tiktok: "틱톡"
};

// 청년 여행장학 영상 아카이브 (COME PLAY INSIGHT 「공예로 머무는 시간」 청년 20명 · 16팀)
// 미제출 팀(4·6·14팀)은 제출되면 아래 목록에 추가합니다.
const scholarshipTeamsData = [
  {
    id: 1,
    teamNum: "1팀",
    author: "강현준",
    title: "네이버 클립으로 본 123사비공예마을",
    desc: "1박 2일 동안 규암 공예마을을 짧은 클립 두 편에 담았습니다.",
    image: null,
    tags: ["123사비공예마을", "부여가볼만한곳", "숏폼"],
    links: [
      { type: "naverclip", label: "클립 1", url: "https://naver.me/52aNhloS" },
      { type: "naverclip", label: "클립 2", url: "https://naver.me/5qLfAR9I" }
    ]
  },
  {
    id: 2,
    teamNum: "2팀",
    author: "권민기",
    title: "부여여행 공예체험 vlog",
    desc: "규암골목안커피202부터 123사비 레지던스, 공예페스타까지 걸어 다닌 기록.",
    image: "/img/t02.webp",
    tags: ["123사비공예마을", "부여공예체험", "브이로그"],
    links: [
      { type: "youtube", label: "부여여행 공예체험 vlog", url: "https://youtu.be/kxZ0dr3bC20", videoId: "kxZ0dr3bC20" },
      { type: "instagram", label: "릴스", url: "https://www.instagram.com/reel/DdaGKPsTthD/" }
    ]
  },
  {
    id: 3,
    teamNum: "3팀",
    author: "김선호",
    title: "네이버 클립으로 본 규암 공예마을",
    desc: "공예마을 규암의 하루를 네이버 클립으로 기록했습니다.",
    image: null,
    tags: ["123사비공예마을", "규암", "숏폼"],
    links: [
      { type: "naverclip", label: "클립", url: "https://naver.me/GGGbUur2" }
    ]
  },
  {
    id: 5,
    teamNum: "5팀",
    author: "문가빈",
    title: "부여 여행 — 공예마을 블로그 후기",
    desc: "자개 공예체험으로 만든 작품과 마을 곳곳의 풍경을 블로그와 릴스로 남겼습니다.",
    image: "/img/t05.webp",
    tags: ["부여공예체험", "자개", "블로그"],
    links: [
      { type: "blog", label: "부여 여행 (블로그)", url: "https://m.blog.naver.com/mashimarong2455/224422739157" },
      { type: "instagram", label: "릴스", url: "https://www.instagram.com/reel/DdgNrxpyLuD/" }
    ]
  },
  {
    id: 7,
    teamNum: "7팀",
    author: "박현준",
    title: "부여 123사비 공예 마을",
    desc: "드론과 카메라로 담은 백마강과 규암 마을 풍경 숏폼.",
    image: "/img/t07.webp",
    tags: ["123사비공예마을", "백마강", "숏폼"],
    links: [
      { type: "youtube", label: "부여 123사비 공예 마을", url: "https://www.youtube.com/shorts/1p0Ck86r510", videoId: "1p0Ck86r510" }
    ]
  },
  {
    id: 8,
    teamNum: "8팀",
    author: "배요한 · 김정민",
    title: "남자 둘이서 가는 부여 여행.. 미친듯(P)",
    desc: "부여새시장부터 공예마을, 팜파티까지 둘이서 즐긴 1박 2일.",
    image: "/img/t08.webp",
    tags: ["부여가볼만한곳", "부여여행", "브이로그"],
    links: [
      { type: "youtube", label: "남자 둘이서 가는 부여 여행", url: "https://youtu.be/HmD7Va4FnmY", videoId: "HmD7Va4FnmY" },
      { type: "instagram", label: "릴스", url: "https://www.instagram.com/reel/DdRhIL7S2yt/" }
    ]
  },
  {
    id: 9,
    teamNum: "9팀",
    author: "손별 · 김명호",
    title: "부여 공예마을 데이트 브이로그",
    desc: "데이트 브이로그와 공간 필름, 두 가지 시선으로 본 공예마을.",
    image: "https://i.ytimg.com/vi/FEzDdprYDcA/hqdefault.jpg",
    tags: ["123사비공예마을", "부여데이트", "브이로그"],
    links: [
      { type: "youtube", label: "부여 공예마을 데이트 브이로그", url: "https://youtu.be/FEzDdprYDcA", videoId: "FEzDdprYDcA" },
      { type: "youtube", label: "부여 공예마을 공간 필름", url: "https://youtu.be/tTfi6l-sT5Q", videoId: "tTfi6l-sT5Q" },
      { type: "instagram", label: "릴스 1", url: "https://www.instagram.com/reel/DeE-2FvSHz6/" },
      { type: "instagram", label: "릴스 2", url: "https://www.instagram.com/reel/DeE_KvHyEnA/" }
    ]
  },
  {
    id: 10,
    teamNum: "10팀",
    author: "오연우",
    title: "부여 규암마을 느좋 스팟 추천",
    desc: "규암마을에서 찾은 감성 스팟과 꼭 가야 할 핫플을 정리했습니다.",
    image: "https://i.ytimg.com/vi/XqkjVMiMbc8/hqdefault.jpg",
    tags: ["부여가볼만한곳", "규암", "부여핫플"],
    links: [
      { type: "youtube", label: "부여 규암마을 느좋 스팟 추천", url: "https://youtu.be/XqkjVMiMbc8", videoId: "XqkjVMiMbc8" },
      { type: "youtube", label: "부여 여행 가면 꼭 가야 할 느좋 핫플", url: "https://youtube.com/shorts/3rPYa-Gs4O4", videoId: "3rPYa-Gs4O4" },
      { type: "instagram", label: "릴스", url: "https://www.instagram.com/reel/DdwDxBpz7Qy/" }
    ]
  },
  {
    id: 11,
    teamNum: "11팀",
    author: "오예진",
    title: "규암 공예마을 투어 가보세요!",
    desc: "123사비공예마을 투어 코스를 숏폼과 롱폼으로 소개합니다.",
    image: "https://i.ytimg.com/vi/aKTnAkgxv8U/hqdefault.jpg",
    tags: ["123사비공예마을", "규암", "2026공예주간"],
    links: [
      { type: "youtube", label: "규암 공예마을 투어 가보세요!", url: "https://youtube.com/shorts/vTheXLJn7vs", videoId: "vTheXLJn7vs" },
      { type: "youtube", label: "123사비공예마을 · 2026공예주간", url: "https://youtu.be/aKTnAkgxv8U", videoId: "aKTnAkgxv8U" }
    ]
  },
  {
    id: 12,
    teamNum: "12팀",
    author: "윤금송",
    title: "심장 부여잡고한 부여 공예체험 🏺",
    desc: "부여서고, 레지던스 공예상점 등 골목 구석구석과 공예체험 기록.",
    image: "/img/t12.webp",
    tags: ["부여공예체험", "부여서고", "브이로그"],
    links: [
      { type: "youtube", label: "심장 부여잡고한 부여 공예체험", url: "https://youtu.be/J1pKey3pSg0", videoId: "J1pKey3pSg0" },
      { type: "instagram", label: "릴스", url: "https://www.instagram.com/reel/DdNefIGC2Gm/" }
    ]
  },
  {
    id: 13,
    teamNum: "13팀",
    author: "이연주",
    title: "공예마을 규암에서 보낸 1박 2일",
    desc: "백마강, 공방, 공예페스타까지. 1박 2일 전체 동선을 차례대로 담았습니다.",
    image: "/img/t13.webp",
    tags: ["123사비공예마을", "부여1박2일", "공예페스타"],
    links: [
      { type: "youtube", label: "공예마을 규암에서 보낸 1박 2일", url: "https://youtu.be/1J4OdTNfiKA", videoId: "1J4OdTNfiKA" },
      { type: "instagram", label: "릴스", url: "https://www.instagram.com/reel/Dds99-ChXXC/" }
    ]
  },
  {
    id: 15,
    teamNum: "15팀",
    author: "정선희",
    title: "부여여행끓여옴",
    desc: "공예상점의 작은 작품들과 마을 풍경을 유튜브와 틱톡으로.",
    image: "/img/t15.webp",
    tags: ["부여가볼만한곳", "공예상점", "브이로그"],
    links: [
      { type: "youtube", label: "부여여행끓여옴", url: "https://youtu.be/mxsHXe_f1I0", videoId: "mxsHXe_f1I0" },
      { type: "tiktok", label: "틱톡", url: "https://vt.tiktok.com/ZSbW3tDXE/" }
    ]
  },
  {
    id: 16,
    teamNum: "16팀",
    author: "정성경 · 박상아",
    title: "좋은 기회가 있어 부여에 다녀왔습니다",
    desc: "백제문화단지와 공예마을을 오간 부여 여행 숏폼 두 편.",
    image: "/img/t16.webp",
    tags: ["부여가볼만한곳", "백제문화단지", "숏폼"],
    links: [
      { type: "youtube", label: "부여에 다녀왔습니다 1", url: "https://youtube.com/shorts/y5nTFc0uWOc", videoId: "y5nTFc0uWOc" },
      { type: "youtube", label: "부여에 다녀왔습니다 2", url: "https://youtube.com/shorts/p2xGiLI2k_Q", videoId: "p2xGiLI2k_Q" },
      { type: "instagram", label: "릴스", url: "https://www.instagram.com/reel/DdtKE6Vuqm8/" }
    ]
  }
];

// 1박 2일 코스 (2026.9.11~12 실제 진행 동선, 13팀 이연주 사진 기준)
const courseData = [
  { day: 1, place: "부여새시장", note: "부여 여행의 시작, 시장 입구에서 집결", image: "/img/c01.webp" },
  { day: 1, place: "123사비 창작센터", note: "오리엔테이션 「공예로 머무는 시간」", image: "/img/c02.webp" },
  { day: 1, place: "123사비 청년창고", note: "옛 창고를 고친 청년 공간 투어", image: "/img/c03.webp" },
  { day: 1, place: "규암 옛거리 · 벽화거리", note: "가이드 해설과 함께 걷는 근대 골목", image: "/img/c04.webp" },
  { day: 1, place: "백마강 강변", note: "강변 산책길에서 듣는 규암나루 이야기", image: "/img/c05.webp" },
  { day: 1, place: "공방 · 책방 · 소품샵", note: "창고거리의 공방과 작은 책방 구경", image: "/img/c06.webp" },
  { day: 1, place: "해질녘 백마강변", note: "노을 지는 강변 산책", image: "/img/c07.webp" },
  { day: 1, place: "팜파티", note: "부여 식재료로 차린 저녁과 네트워킹", image: "/img/c08.webp" },
  { day: 2, place: "규암면면", note: "마을 식당에서 여는 둘째 날", image: "/img/c09.webp" },
  { day: 2, place: "자개 공예체험", note: "직접 만드는 자개 소품", image: "/img/c10.webp" },
  { day: 2, place: "공예페스타", note: "작가 부스에서 공예품 구경", image: "/img/c11.webp" },
  { day: 2, place: "매듭팔찌 체험", note: "페스타 부스에서 만드는 매듭팔찌", image: "/img/c12.webp" }
];

// 123사비공예마을 스팟 (운영시간·연락처는 추후 업데이트)
// category: craft(공방·체험) | food(먹거리) | cafe(카페) | stay(숙소) | walk(산책·볼거리)
const villageSpotsData = [
  {
    id: 101,
    name: "123사비 창작센터",
    category: "craft",
    categoryLabel: "공예마을 시설",
    area: "부여군 규암면 · 123사비공예마을",
    summary: "123사비공예마을 여행의 출발점. 청년 여행장학 1박 2일이 이곳에서 시작됐습니다.",
    image: "/img/spot-center.webp"
  },
  {
    id: 102,
    name: "123사비 레지던스 (공예상점)",
    category: "craft",
    categoryLabel: "공예마을 시설",
    area: "부여군 규암면 · 123사비공예마을",
    summary: "마을에 머무는 공예가들의 작품을 구경하고 살 수 있는 공예상점.",
    image: "/img/spot-residence.webp"
  },
  {
    id: 103,
    name: "123사비 청년창고",
    category: "craft",
    categoryLabel: "공예마을 시설",
    area: "부여군 규암면 · 123사비공예마을",
    summary: "오래된 창고를 고쳐 만든 청년 공간. 1일차 마을 투어 코스.",
    image: "/img/spot-warehouse.webp"
  },
  {
    id: 104,
    name: "선화핸즈",
    category: "craft",
    categoryLabel: "공방·상점",
    area: "부여군 규암면 · 123사비공예마을",
    summary: "규암 옛거리를 걷다 만나는 공간. 1일차 투어에서 들렀습니다.",
    image: "/img/spot-sunhwa.webp"
  },
  {
    id: 105,
    name: "규암면면",
    category: "food",
    categoryLabel: "먹거리",
    area: "부여군 규암면 · 123사비공예마을",
    summary: "공예마을 지도에 실린 마을 먹거리. 2일차 코스에서 들렀습니다.",
    image: "/img/spot-myeonmyeon.webp"
  },
  {
    id: 106,
    name: "규암골목안커피202",
    category: "cafe",
    categoryLabel: "카페",
    area: "부여군 규암면 · 123사비공예마을",
    summary: "골목 안 한옥 지붕 아래 카페. 2팀 권민기의 영상 첫 장면.",
    image: "/img/spot-coffee202.webp"
  },
  {
    id: 107,
    name: "부여서고",
    category: "walk",
    categoryLabel: "책방",
    area: "부여군 규암면 · 123사비공예마을",
    summary: "부여 이야기가 담긴 책과 소품을 만나는 작은 서점.",
    image: "/img/spot-seogo.webp"
  },
  {
    id: 108,
    name: "규암나루터 강변산책길",
    category: "walk",
    categoryLabel: "산책",
    area: "부여군 규암면 · 백마강변",
    summary: "백마강을 따라 걷는 산책길. 청년들이 해질녘에 걸었던 길입니다.",
    image: "/img/spot-riverside.webp"
  }
];

// 함께 가면 좋은 곳 (부여가볼만한곳 · 궁남지 동선 결합)
const nearbySpotsData = [
  {
    id: 201,
    name: "궁남지",
    category: "walk",
    categoryLabel: "부여 대표 명소",
    area: "부여군 부여읍 동남리 117 · 공예마을에서 차로 약 5분(2.8km)",
    summary: "우리나라 최초의 인공 연못으로 알려진 백제 정원. 공예마을과 하루 동선으로 묶기 좋습니다.",
    image: null
  },
  {
    id: 202,
    name: "백제문화단지",
    category: "walk",
    categoryLabel: "역사 테마파크",
    area: "부여군 규암면 백제문로 455",
    summary: "공예마을과 같은 규암면에 있는 백제 왕궁 재현 단지. 16팀이 함께 다녀왔습니다.",
    image: "/img/spot-baekje.webp"
  },
  {
    id: 203,
    name: "부여새시장",
    category: "food",
    categoryLabel: "전통시장",
    area: "부여군 부여읍",
    summary: "청년 여행장학 1박 2일의 집결지. 부여 먹거리 구경을 시작하기 좋은 곳.",
    image: "/img/spot-market.webp"
  }
];

const allSpotsData = [...villageSpotsData, ...nearbySpotsData];

// 히어로 슬라이드: 청년 영상 중 1박 2일 흐름이 잘 보이는 4편
const heroFeaturedIds = [13, 10, 12, 9];


// State variables
let currentHeroIndex = 0;
let currentCategoryFilter = "all";
let currentTagFilter = "all";
let heroAutoTimer = null;

// DOM Content Loaded Handler
document.addEventListener("DOMContentLoaded", () => {
  initHeroSlider();
  renderTeamCards();
  renderCourse();
  renderSpots();
  initMobileDrawer();
  initModalControls();
});


/* ==========================================================================
   1. Hero Carousel Slider Implementation
   ========================================================================== */
function initHeroSlider() {
  const prevBtn = document.getElementById("prev-hero-btn");
  const nextBtn = document.getElementById("next-hero-btn");
  const dots = document.querySelectorAll("#hero-dots .dot");
  const info = document.getElementById("hero-slide-info");

  if (prevBtn) prevBtn.addEventListener("click", () => {
    updateHeroSlide((currentHeroIndex - 1 + heroFeaturedIds.length) % heroFeaturedIds.length);
    startHeroTimer();
  });

  if (nextBtn) nextBtn.addEventListener("click", () => {
    updateHeroSlide((currentHeroIndex + 1) % heroFeaturedIds.length);
    startHeroTimer();
  });

  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      const idx = parseInt(e.target.getAttribute("data-index"), 10);
      updateHeroSlide(idx);
      startHeroTimer();
    });
  });

  if (info) info.addEventListener("click", () => {
    const team = scholarshipTeamsData.find(t => t.id === heroFeaturedIds[currentHeroIndex]);
    if (team) openTeamModal(team);
  });

  updateHeroSlide(0);
  startHeroTimer();
}

function startHeroTimer() {
  if (heroAutoTimer) clearInterval(heroAutoTimer);
  heroAutoTimer = setInterval(() => {
    updateHeroSlide((currentHeroIndex + 1) % heroFeaturedIds.length);
  }, 5000);
}

function updateHeroSlide(index) {
  const slideNum = document.getElementById("slide-num-indicator");
  const slideTitle = document.getElementById("slide-title-display");
  const slideSub = document.getElementById("slide-sub-display");
  const dots = document.querySelectorAll("#hero-dots .dot");

  currentHeroIndex = index;
  const team = scholarshipTeamsData.find(t => t.id === heroFeaturedIds[index]);
  if (!team) return;

  if (slideNum) slideNum.textContent = `청년 영상 ${String(index + 1).padStart(2, "0")} / ${String(heroFeaturedIds.length).padStart(2, "0")}`;
  if (slideTitle) slideTitle.textContent = team.title;
  if (slideSub) slideSub.textContent = `${team.teamNum} ${team.author} · ${team.desc}`;

  dots.forEach((dot, idx) => {
    if (idx === index) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}


/* ==========================================================================
   2. Render Youth Travel Scholarship Video Cards
   ========================================================================== */
function teamImageSrc(team) {
  return team.image || generateDataUriSvg(team.teamNum, fallbackGradient, playIcon);
}

function teamCardHtml(team, label) {
  const platforms = [...new Set(team.links.map(l => platformLabels[l.type]))].join(" · ");
  return `
    <div class="team-card-img-wrapper">
      <img src="${teamImageSrc(team)}" alt="${team.teamNum} ${team.author} - ${team.title}" loading="lazy">
      <span class="team-badge">${team.teamNum}</span>
      <span class="team-play-badge">▶ ${team.links.length}</span>
    </div>
    <div class="team-card-body">
      <span class="team-cat">${label}</span>
      <h3 class="team-title">${team.title}</h3>
      <p class="team-desc">${team.desc}</p>
      <div class="team-footer">
        <span class="team-author">👤 ${team.author}</span>
        <span>${platforms}</span>
      </div>
    </div>
  `;
}

function renderTeamCards(list = null, emptyMessage = "선택한 키워드의 청년 영상이 없습니다.") {
  const grid = document.getElementById("teams-grid");
  if (!grid) return;

  grid.innerHTML = "";

  const filtered = list || scholarshipTeamsData.filter(team => {
    return currentTagFilter === "all" || team.tags.includes(currentTagFilter);
  });

  if (filtered.length === 0) {
    grid.innerHTML = emptyStateHtml(emptyMessage);
    return;
  }

  filtered.forEach(team => {
    const card = document.createElement("div");
    card.className = "team-card";
    card.onclick = () => openTeamModal(team);
    card.innerHTML = teamCardHtml(team, `청년 여행장학 · ${team.teamNum}`);
    grid.appendChild(card);
  });
}

function emptyStateHtml(message) {
  return `
    <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: #fff; border-radius: 20px; border: 1px solid var(--color-border);">
      <p style="font-size: 18px; font-weight: 700; color: var(--color-font-sub);">${message}</p>
      <button onclick="resetFilters()" style="margin-top: 15px; background: var(--color-main); color: #fff; padding: 8px 20px; border-radius: 9999px; font-weight: 700;">
        전체 보기
      </button>
    </div>
  `;
}


/* ==========================================================================
   3. Render 1박 2일 Course Timeline
   ========================================================================== */
function renderCourse() {
  const list = document.getElementById("course-list");
  if (!list) return;

  list.innerHTML = courseData.map((step, idx) => `
    <li class="course-step">
      <div class="course-thumb">
        <img src="${step.image}" alt="${step.place}" loading="lazy">
        <span class="course-day">DAY ${step.day}</span>
      </div>
      <div class="course-text">
        <span class="course-num">${String(idx + 1).padStart(2, "0")}</span>
        <h3>${step.place}</h3>
        <p>${step.note}</p>
      </div>
    </li>
  `).join("");
}


/* ==========================================================================
   4. Render Craft Village Spots & Nearby Spots
   ========================================================================== */
function spotImageSrc(spot) {
  return spot.image || generateDataUriSvg("", { id: `gs${spot.id}`, c1: "#0a4d3c", c2: "#1bcc9a" }, pinIcon);
}

function spotCardHtml(spot, rankLabel) {
  return `
    <div class="spot-thumb">
      <img src="${spotImageSrc(spot)}" alt="${spot.name}" loading="lazy">
      <span class="spot-rank">${rankLabel}</span>
    </div>
    <div class="spot-info">
      <div class="spot-tag-row">
        <span class="spot-micro-tag">부여 가볼만한곳</span>
        <span class="spot-micro-tag">${spot.categoryLabel}</span>
      </div>
      <h3 class="spot-name">${spot.name}</h3>
      <p class="spot-address">📍 ${spot.area}</p>
      <p class="spot-summary">${spot.summary}</p>
    </div>
  `;
}

function renderSpotGrid(gridId, spots, emptyMessage) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  grid.innerHTML = "";

  if (spots.length === 0) {
    grid.innerHTML = emptyStateHtml(emptyMessage);
    return;
  }

  spots.forEach((spot, idx) => {
    const card = document.createElement("div");
    card.className = "spot-card";
    card.onclick = () => openSpotModal(spot);
    card.innerHTML = spotCardHtml(spot, idx + 1);
    grid.appendChild(card);
  });
}

function renderSpots() {
  const filtered = villageSpotsData.filter(spot => {
    return currentCategoryFilter === "all" || spot.category === currentCategoryFilter;
  });
  const emptyMessage = currentCategoryFilter === "stay"
    ? "123사비공예마을 숙소 정보는 준비 중입니다."
    : "해당 분류의 공예마을 스팟은 준비 중입니다.";

  renderSpotGrid("spots-grid", filtered, emptyMessage);
  renderSpotGrid("nearby-grid", nearbySpotsData, "");
}


/* ==========================================================================
   5. Search & Tag / Category Filtering Logic
   ========================================================================== */
window.handleSearch = function() {
  const input = document.getElementById("search-keyword-input");
  if (!input) return;

  const val = input.value.trim().toLowerCase();
  if (!val) {
    resetFilters();
    return;
  }

  currentTagFilter = "all";
  currentCategoryFilter = "all";

  const teams = scholarshipTeamsData.filter(team => {
    return team.title.toLowerCase().includes(val) ||
           team.desc.toLowerCase().includes(val) ||
           team.author.toLowerCase().includes(val) ||
           team.tags.some(t => t.toLowerCase().includes(val));
  });
  const spots = allSpotsData.filter(spot => {
    return spot.name.toLowerCase().includes(val) ||
           spot.summary.toLowerCase().includes(val) ||
           spot.area.toLowerCase().includes(val);
  });

  renderTeamCards(teams, `'${val}' 검색어와 일치하는 청년 영상이 없습니다.`);
  renderSpotGrid("spots-grid", spots, `'${val}' 검색어와 일치하는 스팟이 없습니다.`);

  const target = teams.length === 0 && spots.length > 0 ? "spots" : "scholarship";
  const section = document.getElementById(target);
  if (section) section.scrollIntoView({ behavior: "smooth" });
};

window.filterByTag = function(tag) {
  currentTagFilter = tag;
  const pills = document.querySelectorAll(".keywords-box .tag-pill");
  pills.forEach(p => p.classList.remove("active"));

  event.target.classList.add("active");
  renderTeamCards();

  // Scroll smoothly to scholarship section
  const section = document.getElementById("scholarship");
  if (section) section.scrollIntoView({ behavior: "smooth" });
};

window.filterCategory = function(cat) {
  const catItems = document.querySelectorAll(".category-grid .cat-item");
  catItems.forEach(item => item.classList.remove("active"));

  if (event && event.currentTarget) {
    event.currentTarget.classList.add("active");
  }

  if (cat === "video") {
    currentTagFilter = "all";
    renderTeamCards();
    const section = document.getElementById("scholarship");
    if (section) section.scrollIntoView({ behavior: "smooth" });
    return;
  }

  currentCategoryFilter = cat;
  renderSpots();

  const section = document.getElementById("spots");
  if (section) section.scrollIntoView({ behavior: "smooth" });
};

window.resetFilters = function() {
  currentCategoryFilter = "all";
  currentTagFilter = "all";

  const input = document.getElementById("search-keyword-input");
  if (input) input.value = "";

  const pills = document.querySelectorAll(".keywords-box .tag-pill");
  pills.forEach((p, idx) => {
    if (idx === 0) p.classList.add("active");
    else p.classList.remove("active");
  });

  const catItems = document.querySelectorAll(".category-grid .cat-item");
  catItems.forEach((item, idx) => {
    if (idx === 0) item.classList.add("active");
    else item.classList.remove("active");
  });

  renderTeamCards();
  renderSpots();
};


/* ==========================================================================
   6. Modal Detail Viewer
   ========================================================================== */
function initModalControls() {
  const modal = document.getElementById("detail-modal");
  const closeBtn = document.getElementById("modal-close-btn");

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

function closeModal() {
  const modal = document.getElementById("detail-modal");
  const imgBox = document.getElementById("modal-img-container");
  if (!modal) return;
  modal.classList.remove("open");
  // 재생 중인 영상 정지
  if (imgBox) imgBox.innerHTML = "";
}

function openTeamModal(team) {
  const modal = document.getElementById("detail-modal");
  const imgBox = document.getElementById("modal-img-container");
  const badge = document.getElementById("modal-badge");
  const title = document.getElementById("modal-title");
  const meta = document.getElementById("modal-meta");
  const desc = document.getElementById("modal-desc");
  const courseBox = document.getElementById("modal-course-box");
  const courseTitle = document.getElementById("modal-course-title");
  const courseOl = document.getElementById("modal-course-ol");

  if (!modal) return;

  imgBox.classList.remove("is-map");
  const firstVideo = team.links.find(l => l.videoId);
  if (firstVideo) {
    imgBox.innerHTML = `<iframe class="modal-video" src="https://www.youtube-nocookie.com/embed/${firstVideo.videoId}" title="${firstVideo.label}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
  } else {
    imgBox.innerHTML = `<img src="${teamImageSrc(team)}" alt="${team.title}">`;
  }

  badge.textContent = `청년 여행장학 · ${team.teamNum}`;
  title.textContent = team.title;
  meta.innerHTML = `
    <span>👤 ${team.author}</span>
    <span>🏷️ #${team.tags.join(" #")}</span>
  `;
  desc.textContent = team.desc;

  courseBox.style.display = "block";
  courseTitle.textContent = "콘텐츠 보러가기";
  courseOl.innerHTML = team.links.map(l => `
    <li><a class="modal-link" href="${l.url}" target="_blank" rel="noopener">${platformLabels[l.type]} · ${l.label} ↗</a></li>
  `).join("");

  modal.classList.add("open");
}

function openSpotModal(spot) {
  const modal = document.getElementById("detail-modal");
  const imgBox = document.getElementById("modal-img-container");
  const badge = document.getElementById("modal-badge");
  const title = document.getElementById("modal-title");
  const meta = document.getElementById("modal-meta");
  const desc = document.getElementById("modal-desc");
  const courseBox = document.getElementById("modal-course-box");

  if (!modal) return;

  imgBox.innerHTML = `<img src="${spotImageSrc(spot)}" alt="${spot.name}">`;
  imgBox.classList.toggle("is-map", Boolean(spot.isMap));
  badge.textContent = spot.categoryLabel;
  title.textContent = spot.name;
  meta.innerHTML = `<span>📍 ${spot.area}</span>`;
  desc.textContent = spot.isMap ? spot.summary : `${spot.summary} 운영시간과 연락처는 곧 업데이트됩니다.`;
  courseBox.style.display = "none";

  modal.classList.add("open");
}

window.openMapModal = function() {
  openSpotModal({
    name: "123사비 공예마을지도",
    categoryLabel: "공예마을 지도",
    area: "충남 부여군 규암면 규암리 일대",
    summary: "창작센터·레지던스(공예상점)·아트큐브&전망대·청년창고 4개 시설과 공방, 먹을거리, 마실거리, 즐길거리, 숙박이 한 장에 담긴 마을 지도입니다. 현장 안내판을 촬영한 사진입니다.",
    image: "/img/map.webp",
    isMap: true
  });
};


/* ==========================================================================
   7. Mobile Drawer Navigation Toggle
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const drawer = document.getElementById("mobile-drawer");
  const overlay = document.getElementById("drawer-overlay");
  const closeBtn = document.getElementById("drawer-close-btn");
  const links = document.querySelectorAll(".drawer-link");

  function openDrawer() {
    if (drawer) drawer.classList.add("open");
    if (overlay) overlay.classList.add("open");
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove("open");
    if (overlay) overlay.classList.remove("open");
  }

  if (toggleBtn) toggleBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (overlay) overlay.addEventListener("click", closeDrawer);

  links.forEach(link => {
    link.addEventListener("click", closeDrawer);
  });
}
