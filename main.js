/* 
  비짓부여 (VisitBuyeo) - Main Logic File
  Handles data-efficient SVG rendering, hero slider, modal popups, search filtering & mobile drawer.
*/

// Ultra-lightweight Vector Image Generator (Zero External Image Data Consumption)
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
        Buyeo Craft &amp; Tour
      </text>
    </svg>
  `;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
}

// 20 Travel Scholarship Teams Data (20팀의 여행장학팀이 직접 발로 뛴 여행지 모음)
const scholarshipTeamsData = [
  {
    id: 1,
    teamNum: "1팀",
    category: "craft",
    title: "[공예컬처] 규암 공예마을과 수제 칠기 공방 탐방",
    desc: "근대 수공예 거리에서 만난 칠기 장인의 정성. 200년 고택의 멋과 전통 공예 아틀리에 스토리가 펼쳐집니다.",
    author: "1팀 김부여 외 2명",
    likes: 248,
    tags: ["부여가볼만한곳", "백제공예", "규암공예마을"],
    gradient: { id: "g1", c1: "#6a2c00", c2: "#b34f00" },
    icon: `<path d="M-12 -12 h24 v24 h-24 z" fill="none" stroke="#fff" stroke-width="2"/><path d="M-8 -8 h16 v16 h-16 z" fill="none" stroke="#ffc999" stroke-width="1.5"/>`,
    details: "규암 근대 문화거리를 누비며 만난 칠기 공방 장인의 솜씨! 수작업으로 올린 칠기의 깊은 광택과 공공 아틀리에 체험 코스를 1팀이 구석구석 기록했습니다.",
    courses: [
      "10:00 - 규암 근대 문화거리 도착 & 고택 카페",
      "12:00 - 부여 전통 칠기 공방 일일 클래스 (수제 컵/수저 칠하기)",
      "15:00 - 백제 수공예거리 팝업 전시관 탐방",
      "17:00 - 백마강 석양 감상 & 규암 찻집"
    ]
  },
  {
    id: 2,
    teamNum: "2팀",
    category: "attraction",
    title: "[역사산책] 정림사지 5층석탑 달빛 야간 기행",
    desc: "유네스코 세계유산 정림사지의 밤 풍경! 탑돌이 행사와 달빛 아래 빛나는 1,400년 백제의 미학.",
    author: "2팀 박사비 외 1명",
    likes: 312,
    tags: ["부여가볼만한곳", "정림사지", "야간기행"],
    gradient: { id: "g2", c1: "#1b2a4a", c2: "#3b5998" },
    icon: `<polygon points="0,-18 16,14 -16,14" fill="none" stroke="#fff" stroke-width="2"/>`,
    details: "은은한 달빛 아래 우뚝 선 정림사지 5층석탑의 균형미와 석불좌상의 온화한 미소를 담았습니다. 밤에 거닐기 좋은 부여 최고 야경 포인트!",
    courses: [
      "18:30 - 정림사지 박물관 사전 도슨트 투어",
      "19:30 - 5층석탑 야간 점등 & 사진 출사",
      "20:30 - 정림사지 잔디광장 버스킹 공연"
    ]
  },
  {
    id: 3,
    teamNum: "3팀",
    category: "attraction",
    title: "[연꽃 힐링] 궁남지 서동요 산책 & 백련 차 체험",
    desc: "우리나라 최초의 인공 정원 궁남지! 포룡정 다리를 건너며 즐기는 연꽃 산책길과 연잎 다도 시음.",
    author: "3팀 이연꽃 외 3명",
    likes: 420,
    tags: ["부여가볼만한곳", "궁남지", "서동공원"],
    gradient: { id: "g3", c1: "#0a4d3c", c2: "#1bcc9a" },
    icon: `<circle cx="0" cy="0" r="14" fill="none" stroke="#fff" stroke-width="2"/><circle cx="0" cy="0" r="6" fill="#ffea00"/>`,
    details: "신라 선화공주와 서동요의 전설이 흐르는 궁남지 포룡정! 3팀이 발로 뛰며 발굴한 베스트 피크닉 존과 시원한 연잎 다도 체험관.",
    courses: [
      "09:30 - 궁남지 연꽃 둘레길 걷기 (포룡정)",
      "11:30 - 궁남지 연잎밥 향토 음식점 점심",
      "14:00 - 전통 연차 차담 클래스"
    ]
  },
  {
    id: 4,
    teamNum: "4팀",
    category: "attraction",
    title: "[백제왕도] 사비궁과 백제문화단지 궁중 복식 체헐",
    desc: "백제 사비시대의 웅장한 궁궐 재현! 능사와 위례성을 둘러보고 백제 왕족 의복을 착용한 화보 출사.",
    author: "4팀 최백제 외 2명",
    likes: 289,
    tags: ["부여가볼만한곳", "백제문화단지", "사비궁"],
    gradient: { id: "g4", c1: "#5a1818", c2: "#a83232" },
    icon: `<path d="M-15,10 L0,-15 L15,10 Z" fill="none" stroke="#fff" stroke-width="2"/>`,
    details: "사비궁 대전과 능사 5층목탑의 웅장함에 압도된 탐방! 백제 의상을 입고 대궐을 거니는 특별한 추억을 선물합니다.",
    courses: [
      "10:00 - 백제문화단지 입구 의상 대여소 (왕족/화랑 복식)",
      "11:00 - 사비궁 천정전 & 능사 목탑 관람",
      "14:00 - 백제역사문화관 디지털 전시 체험"
    ]
  },
  {
    id: 5,
    teamNum: "5팀",
    category: "craft",
    title: "[문학&공예] 신동엽 문학관과 근대 수공예 갤러리",
    desc: "시인 신동엽의 생가와 문학관 투어. 인근 펠트 & 자수 공방에서 시 구절을 새긴 나만의 공예품 제작.",
    author: "5팀 정시인 외 1명",
    likes: 195,
    tags: ["부여가볼만한곳", "신동엽문학관", "백제공예"],
    gradient: { id: "g5", c1: "#4a3b2c", c2: "#8c6d4f" },
    icon: `<rect x="-10" y="-12" width="20" height="24" rx="2" fill="none" stroke="#fff" stroke-width="2"/>`,
    details: "'껍데기는 가라'의 신동엽 시인 문학관 뒤편 지붕 곡선의 정취. 공예 장인들과 협업한 문학 공예 소품 숍 탐방기.",
    courses: [
      "13:00 - 신동엽 문학관 전시 관람",
      "14:30 - 문학관 옆 자수 공방 시구절 캘리그라피 모시자수",
      "16:30 - 규암 근대거리 카페 스탬프 투어"
    ]
  },
  {
    id: 6,
    teamNum: "6팀",
    category: "attraction",
    title: "[자연&비경] 백마강 황포돛배와 낙화암 강바람 길",
    desc: "부소산성 등산로를 따라 낙화암 정상까지! 백마강을 유유히 떠다니는 황포돛배 유람선 체험.",
    author: "6팀 강바람 외 2명",
    likes: 350,
    tags: ["부여가볼만한곳", "부소산성", "낙화암"],
    gradient: { id: "g6", c1: "#004060", c2: "#0080b0" },
    icon: `<path d="M-15,8 Q0,-12 15,8 Z" fill="none" stroke="#fff" stroke-width="2"/>`,
    details: "삼천궁녀의 전설이 깃든 낙화암의 아찔한 절벽 뷰! 삼화정과 고란사 약수터, 황포돛배 선착장까지 완벽한 배산임수 힐링 코스.",
    courses: [
      "09:00 - 부소산성 문표소 출발 (숲길 걷기)",
      "10:30 - 낙화암 수북정 & 고란사 약수 시음",
      "11:30 - 고란사 선착장 황포돛배 탑승 -> 구드래 나루터"
    ]
  },
  {
    id: 7,
    teamNum: "7팀",
    category: "craft",
    title: "[도자 공방] 백제 가마터 도자기 흙빚기 물레 클래스",
    desc: "백제 토기의 부드러운 유선형 코일을 빚다. 손끝으로 전해지는 흙의 질감과 나만의 도자기 완성하기.",
    author: "7팀 윤도예 외 2명",
    likes: 275,
    tags: ["백제공예", "도자기체험", "부여가볼만한곳"],
    gradient: { id: "g7", c1: "#523725", c2: "#9e6847" },
    icon: `<ellipse cx="0" cy="0" rx="14" ry="10" fill="none" stroke="#fff" stroke-width="2"/>`,
    details: "백제 무늬 토기의 정갈함을 현대적 컵과 그릇으로 재해석! 초보자도 쉽게 배울 수 있는 가마터 도예 클래스 리뷰.",
    courses: [
      "14:00 - 부여 도예 공방 가마 구경",
      "14:30 - 성형 물레 성형 & 백제문양 문양 조각",
      "16:30 - 2주 후 택배 수령 신청 & 차 한잔"
    ]
  },
  {
    id: 8,
    teamNum: "8팀",
    category: "craft",
    title: "[금속 세공] 백제 금동대향로 모티브 액세서리 세공",
    desc: "국보 백제 금동대향로의 화려한 미학! 은 세공 아틀리에에서 만드는 봉황 금속 키링 & 반지.",
    author: "8팀 한금속 외 1명",
    likes: 388,
    tags: ["백제공예", "금동대향로", "부여가볼만한곳"],
    gradient: { id: "g8", c1: "#7a5c00", c2: "#d4a300" },
    icon: `<polygon points="0,-16 6,-4 18,-4 8,4 12,16 0,8 -12,16 -8,4 -18,-4 -6,-4" fill="none" stroke="#fff" stroke-width="1.5"/>`,
    details: "부여 국립부여박물관에서 금동대향로를 실물로 감상한 후, 공방에서 대향로 상단 봉황과 연꽃잎 모티브로 나만의 은반지를 제작했습니다.",
    courses: [
      "10:00 - 국립부여박물관 백제관 도슨트 (금동대향로 직관)",
      "13:30 - 부여 금속 세공 공방 은 땜질 & 광내기 작업",
      "16:00 - 나만의 각인 완품 완성"
    ]
  },
  {
    id: 9,
    teamNum: "9팀",
    category: "craft",
    title: "[목공 아뜰리에] 부여 나무 공방 우드 도마 원데이",
    desc: "원목 나무 향 가득한 아틀리에. 부여의 느티나무와 밤나무 재목으로 만드는 고급 수제 우드 도마.",
    author: "9팀 송목공 외 2명",
    likes: 210,
    tags: ["백제공예", "목공체험", "부여가볼만한곳"],
    gradient: { id: "g9", c1: "#2e1f0e", c2: "#6b4720" },
    icon: `<rect x="-14" y="-10" width="28" height="20" rx="3" fill="none" stroke="#fff" stroke-width="2"/>`,
    details: "사포질부터 오일 마감까지 3시간 동안 몰입하는 목공의 매력! 나무 고유의 결을 살려 내 손으로 직접 깎아낸 세상 단 하나의 도마.",
    courses: [
      "13:30 - 원목 목재 수종 선택 (밤나무/느티나무)",
      "14:00 - 직소 샌딩 작업 & 모서리 라운딩",
      "16:00 - 천연 천연 오일 마감 처리"
    ]
  },
  {
    id: 10,
    teamNum: "10팀",
    category: "stay",
    title: "[한옥 스테이] 부여 규암 근대 고택 힐링 밤과 전통 다도",
    desc: "100년 된 부여 적산가옥과 백제식 한옥 숙소. 툇마루에서 들리는 서동공원 바람 소리와 여유.",
    author: "10팀 조고택 외 2명",
    likes: 450,
    tags: ["한옥숙소", "부여가볼만한곳", "힐링여행"],
    gradient: { id: "g10", c1: "#382923", c2: "#785a4f" },
    icon: `<path d="M-18,6 L0,-12 L18,6 V16 H-18 Z" fill="none" stroke="#fff" stroke-width="2"/>`,
    details: "서까래가 아늑하게 살아있는 부여 근대 고택 숙소에서의 1박! 밤이 되면 한옥 마당에 등불이 켜지며 낭만적인 밤하늘이 펼쳐집니다.",
    courses: [
      "15:00 - 한옥 체크인 & 웰컴 백연차 시음",
      "18:00 - 마당 숯불 부여 로컬 바비큐",
      "21:00 - 불멍 & 다도 타임"
    ]
  },
  {
    id: 11,
    teamNum: "11팀",
    category: "food",
    title: "[로컬 푸드] 부여 연잎밥과 백제 정갈한 삼색 한정식",
    desc: "향긋한 연잎 향이 찰밥에 베어든 부여 대표 미식! 15가지 찬과 떡갈비 정식 식도락 탐방.",
    author: "11팀 미식가 외 3명",
    likes: 512,
    tags: ["부여맛집", "연잎밥", "부여가볼만한곳"],
    gradient: { id: "g11", c1: "#432818", c2: "#99582a" },
    icon: `<circle cx="0" cy="0" r="12" fill="#fff" opacity="0.8"/>`,
    details: "궁남지 부근 오래된 노포에서 맛본 뜨끈한 연잎 찰밥! 연잎을 걷어낼 때 퍼지는 구수한 향과 쫄깃한 밤, 은행, 대추의 조화.",
    courses: [
      "12:00 - 궁남지 연잎밥 정식 전문점 식사",
      "13:30 - 부여 전통시장 화교 수제 만두 맛집 방문",
      "15:00 - 백제 밤 라떼 한옥 카페 디저트"
    ]
  },
  {
    id: 12,
    teamNum: "12팀",
    category: "craft",
    title: "[청년 공예가] 부여로 들어온 청년 장인 팝업스토어",
    desc: "젊은 감각으로 백제 문양을 현대화한 리빙 소품 숍. 컵받침, 도자기 트레이, 현대 인센스 홀더.",
    author: "12팀 청년장인 외 2명",
    likes: 310,
    tags: ["백제공예", "청년공예", "부여가볼만한곳"],
    gradient: { id: "g12", c1: "#6d597a", c2: "#b5838d" },
    icon: `<polygon points="0,-12 12,12 -12,12" fill="none" stroke="#fff" stroke-width="2"/>`,
    details: "귀촌 청년 공예가들이 만들어가는 규암 공예마을 문화 팝업! 감각적인 인테리어 오브제와 귀여운 백제 캐릭터 굿즈 쇼핑기.",
    courses: [
      "11:00 - 청년 공예가 공동 매장 구경",
      "13:00 - 백제 수막새 문양 컵받침 DIY 체험",
      "15:00 - 공예마을 시그니처 젤라또 아틀리에"
    ]
  },
  {
    id: 13,
    teamNum: "13팀",
    category: "attraction",
    title: "[자전거 기행] 백마강 강변길 따라 떠나는 힐링 라이딩",
    desc: "구드래 조각공원에서 성흥산성 사랑나무까지! 강 바람을 맞으며 만나는 백제의 푸른 풍경.",
    author: "13팀 라이더 외 1명",
    likes: 240,
    tags: ["부여가볼만한곳", "백마강", "자전거길"],
    gradient: { id: "g13", c1: "#1d3557", c2: "#457b9d" },
    icon: `<circle cx="-8" cy="6" r="6" stroke="#fff" fill="none" stroke-width="2"/><circle cx="8" cy="6" r="6" stroke="#fff" fill="none" stroke-width="2"/><path d="M-8,6 L0,-6 L8,6" stroke="#fff" fill="none" stroke-width="2"/>`,
    details: "평탄하게 조성된 백마강 자전거 전용도로를 따라 15km 신나는 라이딩! 억새밭과 강변 공원의 탁 트인 해방감.",
    courses: [
      "10:00 - 구드래 조각공원 자전거 대여",
      "11:30 - 백마강 억새 단지 쉼터 휴식",
      "13:00 - 성흥산성 아래 시골 국수 맛집"
    ]
  },
  {
    id: 14,
    teamNum: "14팀",
    category: "attraction",
    title: "[사진 스팟] 성흥산성 가림성 사랑나무 인생샷 포토존",
    desc: "드라마 촬영지로 유명한 성흥산성 하트 나무! Sunset 타임 붉게 물드는 여울과 나뭇가지의 조화.",
    author: "14팀 포토그래퍼 외 1명",
    likes: 620,
    tags: ["부여가볼만한곳", "성흥산성", "사랑나무"],
    gradient: { id: "g14", c1: "#d00000", c2: "#ffba08" },
    icon: `<path d="M0,10 C-10,-5 -15,-15 0,-25 C15,-15 10,-5 0,10 Z" fill="none" stroke="#fff" stroke-width="2"/>`,
    details: "부여 여행 가볼만한곳 최다 스크랩 1위! 산성을 따라 15분 올라가면 나타나는 커다란 느티나무 아래에서 하트 모양 반쪽 사진 찍기 꿀팁.",
    courses: [
      "16:30 - 성흥산성 주차장 도착 (계단 등산)",
      "17:15 - 사랑나무 노을 일몰 실루엣 촬영",
      "18:30 - 하산 후 부여 시내 백제 쌈밥"
    ]
  },
  {
    id: 15,
    teamNum: "15팀",
    category: "craft",
    title: "[전통 텍스타일] 부여 한산 모시 & 자연 천연염색 체험",
    desc: "치자, 쪽, 감풀로 물들이는 천연의 빛깔. 바람에 흩날리는 모시 스카프 천연염색 힐링 아틀리에.",
    author: "15팀 천연염색 외 2명",
    likes: 198,
    tags: ["백제공예", "천연염색", "부여가볼만한곳"],
    gradient: { id: "g15", c1: "#2b9348", c2: "#55a630" },
    icon: `<path d="M-15,-10 Q0,15 15,-10 Q0,5 -15,-10 Z" fill="none" stroke="#fff" stroke-width="2"/>`,
    details: "손끝에 은은하게 배어드는 쪽빛 자연 염료의 고운 스펙트럼. 내가 고른 천연 재료로 직접 염색한 실크 스카프를 소장할 수 있습니다.",
    courses: [
      "10:30 - 천연 재료 (치자/쪽/감) 염료 추출 이해",
      "11:00 - 스카프 침염 & 홀치기 문양 만들기",
      "12:30 - 야외 건조 및 다림질 완료"
    ]
  },
  {
    id: 16,
    teamNum: "16팀",
    category: "attraction",
    title: "[가족 여행] 서동공원 피크닉 & 어린이나무 공예 교실",
    desc: "아이들과 함께 떠나는 안전하고 유익한 부여 체험! 서동공원 넓은 잔디밭과 키즈 우드 장난감 만들기.",
    author: "16팀 패밀리 외 3명",
    likes: 265,
    tags: ["부여가볼만한곳", "서동공원", "가족여행"],
    gradient: { id: "g16", c1: "#e07a5f", c2: "#f2cc8f" },
    icon: `<circle cx="0" cy="-6" r="6" fill="none" stroke="#fff" stroke-width="2"/><path d="M-10,12 C-10,0 10,0 10,12" fill="none" stroke="#fff" stroke-width="2"/>`,
    details: "유모차도 다니기 편리한 평탄한 서동공원 수변 산책로! 어린이 눈높이에 맞춘 백제 수막새 조각 체험과 키즈 피크닉 타임.",
    courses: [
      "10:00 - 서동공원 잔디밭 피크닉 돗자리 세팅",
      "11:30 - 어린이 공예 교실 (나무 피리 & 백제 캐릭터 조각)",
      "14:00 - 서동요 전설 애니메이션 관람"
    ]
  },
  {
    id: 17,
    teamNum: "17팀",
    category: "attraction",
    title: "[나이트 투어] 궁남지 연못 위 환상적인 야경 & 낭만 버스킹",
    desc: "밤이 되면 변신하는 부여의 정취. 은은한 LED 하트 터널과 포룡정 수상 위 조명 버스킹 음악회.",
    author: "17팀 나이트 외 2명",
    likes: 410,
    tags: ["부여가볼만한곳", "궁남지야경", "부여야경"],
    gradient: { id: "g17", c1: "#14213d", c2: "#fca311" },
    icon: `<path d="M0,-15 A12,12 0 1,0 12,0 A14,14 0 0,1 0,-15 Z" fill="#fff"/>`,
    details: "부여의 밤은 대낮보다 아름답다! 잔잔한 연못 물결에 반사되는 포룡정 목조 다리의 화려한 수중 조명 연출.",
    courses: [
      "20:00 - 궁남지 야간 조명 수변 산책",
      "20:40 - 포룡정 앞 어쿠스틱 낭만 버스킹 감상",
      "21:30 - 부여 야시장 간식 시식"
    ]
  },
  {
    id: 18,
    teamNum: "18팀",
    category: "food",
    title: "[감성 카페] 부여 규암 근대거리 아날로그 카페 스탬프 투어",
    desc: "오래된 양곡 창고와 정미소를 개조한 이색 빈티지 카페들. 백제 밤 라떼와 연잎 스콘 수제 디저트.",
    author: "18팀 카페투어 외 1명",
    likes: 335,
    tags: ["부여카페", "규암근대거리", "부여가볼만한곳"],
    gradient: { id: "g18", c1: "#6b705c", c2: "#cb997e" },
    icon: `<path d="M-10,-8 H10 V4 C10,10 -10,10 -10,4 Z" fill="none" stroke="#fff" stroke-width="2"/><path d="M10,-4 H14 C16,-4 16,2 14,2 H10" fill="none" stroke="#fff" stroke-width="2"/>`,
    details: "아날로그 레트로 감성이 가득한 규암 카페 거리 4곳 완전 정복! 스탬프를 모두 모으면 수제 공예 티코스터를 드립니다.",
    courses: [
      "13:00 - 100년 양곡 창고 카페 (부여 알밤 라떼)",
      "14:30 - 근대 서점 겸 북카페 쉼터",
      "16:00 - 공예 갤러리 로스터리 카페 (스탬프 리워드 수령)"
    ]
  },
  {
    id: 19,
    teamNum: "19팀",
    category: "attraction",
    title: "[문화유산] 무량사 사천왕문과 단풍 자갈길 산책",
    desc: "만수산 깊은 골짜기에 위치한 천년 고찰 무량사. 김시습 선생이 머물던 조용하고 호젓한 산사 템플스테이.",
    author: "19팀 산사 산책 외 1명",
    likes: 290,
    tags: ["부여가볼만한곳", "무량사", "사찰여행"],
    gradient: { id: "g19", c1: "#2d6a4f", c2: "#52b788" },
    icon: `<path d="M-14,8 L0,-12 L14,8 Z" fill="none" stroke="#fff" stroke-width="2"/>`,
    details: "보물 무량사 극락전과 5층석탑의 고즈넉함. 계곡물 소리와 사찰 종소리가 어우러져 마음을 깨끗이 비워주는 부여 최고의 템플 투어.",
    courses: [
      "10:00 - 무량사 일주문 입장 & 숲길 도보",
      "11:00 - 무량사 극락전 관람 & 김시습 영당",
      "12:30 - 산사 앞 산채비빔밥 식사"
    ]
  },
  {
    id: 20,
    teamNum: "20팀",
    category: "attraction",
    title: "[마스터 코스] 부여 가볼만한곳 3일 완벽 일주 꿀팁",
    desc: "20개 여행장학팀의 정수를 모은 2박 3일 부여 풀코스! 숙소, 동선, 공예 예약, 필수 맛집 종합 가이드.",
    author: "20팀 총괄 리더팀",
    likes: 780,
    tags: ["부여가볼만한곳", "20팀여행장학", "부여풀코스"],
    gradient: { id: "g20", c1: "#b34f00", c2: "#e07a5f" },
    icon: `<polygon points="0,-16 16,14 -16,14" fill="none" stroke="#fff" stroke-width="2"/><circle cx="0" cy="-2" r="4" fill="#ffea00"/>`,
    details: "부여 여행을 준비하는 모든 분들을 위한 대장정 총정리! 백제 역사유적부터 공예 아틀리에, 밤 야경까지 낭비 없는 2박 3일 황금 동선 지도.",
    courses: [
      "1일차 - 정림사지 -> 궁남지 연잎밥 -> 궁남지 야경 -> 한옥 숙박",
      "2일차 - 부소산성/낙화암 -> 황포돛배 -> 규암 백제공예마을 체험",
      "3일차 - 백제문화단지 -> 국립부여박물관 -> 성흥산성 사랑나무 노을"
    ]
  }
];

// "부여 가볼만한곳 BEST 6" Data
const bestSpotsData = [
  {
    id: 101,
    rank: 1,
    name: "궁남지 (서동공원)",
    category: "역사 정원",
    address: "충남 부여군 부여읍 동남리 117",
    summary: "삼국사기에 기록된 우리나라 최초의 인공 포석 정원. 연못 한가운데 백연과 포룡정이 어우러진 최고의 연꽃 명소.",
    gradient: { id: "s1", c1: "#0a4d3c", c2: "#1bcc9a" },
    icon: `<circle cx="0" cy="0" r="14" stroke="#fff" fill="none" stroke-width="2"/>`,
    details: "궁남지는 백제 무왕 때 궁궐 남쪽에 만든 연못으로 서동요 전설의 무대입니다. 봄과 여름엔 연꽃 축제가 열리며, 밤에는 아름다운 수중 조명이 켜집니다."
  },
  {
    id: 102,
    rank: 2,
    name: "정림사지 5층석탑",
    category: "유네스코 세계유산",
    address: "충남 부여군 부여읍 정림로 83",
    summary: "백제 석탑 미학의 결정체! 완벽한 비율과 간결하고 단아한 아름다움을 자랑하는 국보 지정 세계 문화유산.",
    gradient: { id: "s2", c1: "#1b2a4a", c2: "#3b5998" },
    icon: `<polygon points="0,-16 14,14 -14,14" fill="none" stroke="#fff" stroke-width="2"/>`,
    details: "목조 탑의 양식을 석재로 구현한 백제 탑의 대표작입니다. 밤에는 조명이 정림사지 석탑의 우아함을 한층 돋보이게 합니다."
  },
  {
    id: 103,
    rank: 3,
    name: "백제문화단지",
    category: "역사 테마파크",
    address: "충남 부여군 규암면 백제문로 455",
    summary: "찬란했던 백제 사비시대의 왕궁 사비궁과 5층 목탑 능사를 웅장하게 재현한 100만 평 대규모 백제 문화 단지.",
    gradient: { id: "s3", c1: "#5a1818", c2: "#a83232" },
    icon: `<path d="M-15,10 L0,-15 L15,10 Z" fill="none" stroke="#fff" stroke-width="2"/>`,
    details: "국내 최초로 백제 왕궁의 구조를 연구하여 고증·복원한 테마파크입니다. 궁중 의복 체험, 활쏘기, 야간 미디어아트 축제가 열립니다."
  },
  {
    id: 104,
    rank: 4,
    name: "부여 백제공예문화마을",
    category: "공예 아틀리에",
    address: "충남 부여군 규암면 수북로 33",
    summary: "공예가 머무르는 부여의 심장! 도자기, 칠기, 목공예 장인들이 상주하며 수공예 클래스와 갤러리를 운영하는 마을.",
    gradient: { id: "s4", c1: "#6a2c00", c2: "#b34f00" },
    icon: `<rect x="-10" y="-10" width="20" height="20" fill="none" stroke="#fff" stroke-width="2"/>`,
    details: "공예가들의 정성과 멋이 살아있는 근대 수공예 촌입니다. 원데이 아틀리에 클래스를 통해 직접 백제 문양 소품을 만들어볼 수 있습니다."
  },
  {
    id: 105,
    rank: 5,
    name: "부소산성 & 낙화암",
    category: "역사 산책로",
    address: "충남 부여군 부여읍 관북리 1-1",
    summary: "백마강의 절경을 한눈에 바라보는 백제의 마지막 보루. 낙화암과 고란사 약수터, 유유히 뜨는 황포돛배 유람선.",
    gradient: { id: "s5", c1: "#004060", c2: "#0080b0" },
    icon: `<path d="M-15,8 Q0,-12 15,8 Z" fill="none" stroke="#fff" stroke-width="2"/>`,
    details: "부소산 전체가 산성으로 울창한 소나무 숲길을 따라 걸을 수 있습니다. 정상 부근의 낙화암에서 내려다보는 백마강은 탄성을 자아냅니다."
  },
  {
    id: 106,
    rank: 6,
    name: "신동엽문학관 & 규암 근대거리",
    category: "문학 & 카페거리",
    address: "충남 부여군 부여읍 신동엽길 12",
    summary: "민족시인 신동엽 선생의 숨결과 오래된 정미소, 양곡창고를 개조한 힙한 아날로그 공예 카페 거리.",
    gradient: { id: "s6", c1: "#4a3b2c", c2: "#8c6d4f" },
    icon: `<circle cx="0" cy="0" r="10" stroke="#fff" fill="none" stroke-width="2"/>`,
    details: "승효상 건축가가 설계한 단아한 건물 지붕과 시인의 자필 원고. 근대 골목길 따라 아기자기한 레트로 카페와 팝업 스토어가 조성되어 있습니다."
  }
];


// State variables
let currentHeroIndex = 0;
let currentCategoryFilter = "all";
let currentTagFilter = "all";
let heroAutoTimer = null;

// DOM Content Loaded Handler
document.addEventListener("DOMContentLoaded", () => {
  initHeroSlider();
  renderTeamCards();
  renderBestSpots();
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

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      currentHeroIndex = (currentHeroIndex - 1 + 4) % 4;
      updateHeroSlide(currentHeroIndex);
    });

    nextBtn.addEventListener("click", () => {
      currentHeroIndex = (currentHeroIndex + 1) % 4;
      updateHeroSlide(currentHeroIndex);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      const idx = parseInt(e.target.getAttribute("data-index"), 10);
      currentHeroIndex = idx;
      updateHeroSlide(currentHeroIndex);
    });
  });

  // Start Auto Play Timer
  startHeroTimer();
}

function startHeroTimer() {
  if (heroAutoTimer) clearInterval(heroAutoTimer);
  heroAutoTimer = setInterval(() => {
    currentHeroIndex = (currentHeroIndex + 1) % 4;
    updateHeroSlide(currentHeroIndex);
  }, 5000);
}

function updateHeroSlide(index) {
  const slideNum = document.getElementById("slide-num-indicator");
  const slideTitle = document.getElementById("slide-title-display");
  const slideSub = document.getElementById("slide-sub-display");
  const dots = document.querySelectorAll("#hero-dots .dot");

  const heroFeaturedData = [
    {
      num: "COURSE 01 / 20",
      title: "규암 공예마을과 수제 칠기 공방 탐방",
      sub: "1팀: 근대 수공예 거리와 미학이 숨쉬는 부여 공예 아틀리에"
    },
    {
      num: "COURSE 02 / 20",
      title: "정림사지 5층석탑 달빛 야간 기행",
      sub: "2팀: 은은한 달빛 아래 우뚝 선 1,400년 백제 미학의 결정체"
    },
    {
      num: "COURSE 03 / 20",
      title: "궁남지 서동요 산책 & 백련 차 체험",
      sub: "3팀: 우리나라 최초의 인공 정원에서 즐기는 다도와 힐링"
    },
    {
      num: "COURSE 04 / 20",
      title: "사비궁과 백제문화단지 궁중 의복 체험",
      sub: "4팀: 웅장한 백제 왕궁을 배경으로 펼쳐지는 궁중 화보 출사"
    }
  ];

  const item = heroFeaturedData[index];
  if (slideNum) slideNum.textContent = item.num;
  if (slideTitle) slideTitle.textContent = item.title;
  if (slideSub) slideSub.textContent = item.sub;

  dots.forEach((dot, idx) => {
    if (idx === index) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}


/* ==========================================================================
   2. Render 20 Travel Scholarship Teams Cards
   ========================================================================== */
function renderTeamCards() {
  const grid = document.getElementById("teams-grid");
  if (!grid) return;

  grid.innerHTML = "";

  const filtered = scholarshipTeamsData.filter(team => {
    const matchCategory = (currentCategoryFilter === "all" || team.category === currentCategoryFilter);
    const matchTag = (currentTagFilter === "all" || team.tags.includes(currentTagFilter));
    return matchCategory && matchTag;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: #fff; border-radius: 20px; border: 1px solid var(--color-border);">
        <p style="font-size: 18px; font-weight: 700; color: var(--color-font-sub);">검색 조건에 해당되는 20팀 코스가 없습니다.</p>
        <button onclick="resetFilters()" style="margin-top: 15px; background: var(--color-main); color: #fff; padding: 8px 20px; border-radius: 9999px; font-weight: 700;">
          전체 필터 초기화
        </button>
      </div>
    `;
    return;
  }

  filtered.forEach(team => {
    const svgSrc = generateDataUriSvg(team.teamNum, team.gradient, team.icon);

    const card = document.createElement("div");
    card.className = "team-card";
    card.onclick = () => openModal(team, "team");

    card.innerHTML = `
      <div class="team-card-img-wrapper">
        <img src="${svgSrc}" alt="${team.title}" loading="lazy">
        <span class="team-badge">${team.teamNum}</span>
        <button class="team-like-btn" onclick="toggleLike(event, ${team.id})" aria-label="좋아요">
          ♥
        </button>
      </div>
      <div class="team-card-body">
        <span class="team-cat">20팀 여행장학 #${team.teamNum}</span>
        <h3 class="team-title">${team.title}</h3>
        <p class="team-desc">${team.desc}</p>
        <div class="team-footer">
          <span class="team-author">👤 ${team.author}</span>
          <span id="like-count-${team.id}">❤️ ${team.likes}</span>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}


/* ==========================================================================
   3. Render "부여 가볼만한곳 BEST 6" Cards
   ========================================================================== */
function renderBestSpots() {
  const grid = document.getElementById("spots-grid");
  if (!grid) return;

  grid.innerHTML = "";

  bestSpotsData.forEach(spot => {
    const svgSrc = generateDataUriSvg(`BEST ${spot.rank}`, spot.gradient, spot.icon);

    const card = document.createElement("div");
    card.className = "spot-card";
    card.onclick = () => openModal(spot, "spot");

    card.innerHTML = `
      <div class="spot-thumb">
        <img src="${svgSrc}" alt="${spot.name}" loading="lazy">
        <span class="spot-rank">${spot.rank}</span>
      </div>
      <div class="spot-info">
        <div class="spot-tag-row">
          <span class="spot-micro-tag">부여 가볼만한곳</span>
          <span class="spot-micro-tag">${spot.category}</span>
        </div>
        <h3 class="spot-name">${spot.name}</h3>
        <p class="spot-address">📍 ${spot.address}</p>
        <p class="spot-summary">${spot.summary}</p>
      </div>
    `;

    grid.appendChild(card);
  });
}


/* ==========================================================================
   4. Search & Tag Filtering Logic
   ========================================================================== */
window.handleSearch = function() {
  const input = document.getElementById("search-keyword-input");
  if (!input) return;

  const val = input.value.trim().toLowerCase();
  if (!val) {
    resetFilters();
    return;
  }

  // Filter 20 teams by search term
  currentTagFilter = "all";
  currentCategoryFilter = "all";

  const grid = document.getElementById("teams-grid");
  if (!grid) return;

  const filtered = scholarshipTeamsData.filter(team => {
    return team.title.toLowerCase().includes(val) || 
           team.desc.toLowerCase().includes(val) || 
           team.tags.some(t => t.toLowerCase().includes(val));
  });

  grid.innerHTML = "";

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: #fff; border-radius: 20px; border: 1px solid var(--color-border);">
        <p style="font-size: 18px; font-weight: 700; color: var(--color-font-sub);">'${val}' 검색어와 일치하는 부여 추천 결과가 없습니다.</p>
        <button onclick="resetFilters()" style="margin-top: 15px; background: var(--color-main); color: #fff; padding: 8px 20px; border-radius: 9999px; font-weight: 700;">
          검색어 초기화
        </button>
      </div>
    `;
    return;
  }

  filtered.forEach(team => {
    const svgSrc = generateDataUriSvg(team.teamNum, team.gradient, team.icon);
    const card = document.createElement("div");
    card.className = "team-card";
    card.onclick = () => openModal(team, "team");
    card.innerHTML = `
      <div class="team-card-img-wrapper">
        <img src="${svgSrc}" alt="${team.title}">
        <span class="team-badge">${team.teamNum}</span>
      </div>
      <div class="team-card-body">
        <span class="team-cat">검색 결과 #${team.teamNum}</span>
        <h3 class="team-title">${team.title}</h3>
        <p class="team-desc">${team.desc}</p>
        <div class="team-footer">
          <span class="team-author">👤 ${team.author}</span>
          <span>❤️ ${team.likes}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
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
  currentCategoryFilter = cat;
  const catItems = document.querySelectorAll(".category-grid .cat-item");
  catItems.forEach(item => item.classList.remove("active"));
  
  if (event && event.currentTarget) {
    event.currentTarget.classList.add("active");
  }

  renderTeamCards();

  const section = document.getElementById("scholarship");
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
};


/* ==========================================================================
   5. Interactive Like Button
   ========================================================================== */
window.toggleLike = function(e, id) {
  e.stopPropagation(); // prevent opening modal
  const team = scholarshipTeamsData.find(t => t.id === id);
  if (!team) return;

  const btn = e.currentTarget;
  const countSpan = document.getElementById(`like-count-${id}`);

  if (btn.classList.contains("liked")) {
    btn.classList.remove("liked");
    team.likes--;
  } else {
    btn.classList.add("liked");
    team.likes++;
  }

  if (countSpan) countSpan.textContent = `❤️ ${team.likes}`;
};


/* ==========================================================================
   6. Modal Detail Viewer
   ========================================================================== */
function initModalControls() {
  const modal = document.getElementById("detail-modal");
  const closeBtn = document.getElementById("modal-close-btn");

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("open");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("open");
      }
    });
  }
}

function openModal(data, type) {
  const modal = document.getElementById("detail-modal");
  const imgBox = document.getElementById("modal-img-container");
  const badge = document.getElementById("modal-badge");
  const title = document.getElementById("modal-title");
  const meta = document.getElementById("modal-meta");
  const desc = document.getElementById("modal-desc");
  const courseBox = document.getElementById("modal-course-box");
  const courseOl = document.getElementById("modal-course-ol");

  if (!modal) return;

  const svgSrc = generateDataUriSvg(type === "team" ? data.teamNum : `BEST ${data.rank}`, data.gradient, data.icon);
  imgBox.innerHTML = `<img src="${svgSrc}" alt="${data.title || data.name}">`;

  if (type === "team") {
    badge.textContent = `20팀 여행장학 #${data.teamNum}`;
    title.textContent = data.title;
    meta.innerHTML = `
      <span>👤 작성팀: ${data.author}</span>
      <span>❤️ 좋아요: ${data.likes}개</span>
      <span>🏷️ 태그: #${data.tags.join(" #")}</span>
    `;
    desc.textContent = data.details || data.desc;

    if (data.courses && data.courses.length > 0) {
      courseBox.style.display = "block";
      courseOl.innerHTML = data.courses.map(c => `<li>${c}</li>`).join("");
    } else {
      courseBox.style.display = "none";
    }
  } else {
    badge.textContent = `부여 가볼만한곳 RANK ${data.rank}`;
    title.textContent = data.name;
    meta.innerHTML = `
      <span>📍 위치: ${data.address}</span>
      <span>🏛️ 카테고리: ${data.category}</span>
    `;
    desc.textContent = data.details || data.summary;
    courseBox.style.display = "none";
  }

  modal.classList.add("open");
}

window.openCraftModal = function() {
  const craftSample = {
    teamNum: "공예 아틀리에",
    rank: 1,
    gradient: { id: "gCraft", c1: "#6a2c00", c2: "#b34f00" },
    icon: `<rect x="-10" y="-10" width="20" height="20" fill="none" stroke="#fff" stroke-width="2"/>`,
    name: "부여 규암 백제공예마을 아틀리에 체험 예약",
    address: "충남 부여군 규암면 수북로 33",
    category: "공예 체험 클래스",
    summary: "도자기, 목공예, 칠기, 금속세공 장인들과 1:1로 배우는 수공예 원데이 클래스 예약 안내.",
    details: "부여 백제공예문화마을은 전통과 현대의 공예가 공존하는 한국 최고 수준의 수공예 체험지입니다. 사전 예약을 통해 나만의 칠기, 은장신구, 원목 도자기 작품을 완성해보세요. (예약 문의: 010-4487-4468 / viralers@naver.com)"
  };
  openModal(craftSample, "spot");
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
