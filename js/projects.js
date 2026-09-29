// Добавление новой работы = новый объект в массиве.
// Сортировка, счётчики, фильтры, карточки и модальное окно работают автоматически.
const projects = [
  {
    id: "gm_sand",
    title: "gm_sand",
    category: "gmod",
    published: "2021",
    description: "",
    image: "images/gmod/sand.jpg",
    screenshots: ["images/gmod/sand.jpg"],
    tags: ["Переработка", "Заказ"],
    workshop: "https://steamcommunity.com/sharedfiles/filedetails/?id=2545233981"
  },

  {
    id: "gm_freedom",
    title: "gm_freedom",
    category: "gmod",
    published: "2023",
    description: "Карта не доступна для скачивания",
    image: "images/gmod/freedom.jpg",
    screenshots: ["images/gmod/freedom.jpg"],
    tags: ["Авторская", "Недоделка"],
    workshop: null,
    status: "concept"
  },

  {
    id: "gm_simplemap",
    title: "gm_simplemap",
    category: "gmod",
    published: "2023",
    description: "Карта разделенная на 4 зоны. Специально создавалась для сервера SimpleSandbox",
    image: "images/gmod/simplemap.jpg",
    screenshots: ["images/gmod/simplemap.jpg"],
    tags: ["Авторская"],
    workshop: "https://steamcommunity.com/sharedfiles/filedetails/?id=3067747702"
  },

  {
    id: "gm_mordor",
    title: "gm_mordor",
    category: "gmod",
    published: "2022",
    description: "",
    image: "images/gmod/mordor.jpg",
    screenshots: ["images/gmod/mordor.jpg"],
    tags: ["Переработка", "Заказ"],
    workshop: "https://steamcommunity.com/sharedfiles/filedetails/?id=2861581633"
  },

  {
    id: "gm_emptiness",
    title: "gm_emptiness",
    category: "gmod",
    published: "2022",
    updated: "2024",
    description: "",
    image: "images/gmod/emptines.jpg",
    screenshots: ["images/gmod/emptines.jpg"],
    tags: ["Авторская"],
    workshop: "https://steamcommunity.com/sharedfiles/filedetails/?id=2752298621"
  },

  {
    id: "awp_lego_long",
    title: "awp lego long",
    category: "csgo",
    published: "2022",
    description: "",
    image: "images/csgo/awplego.jpg",
    screenshots: ["images/csgo/awplego.jpg"],
    tags: ["Авторская"],
    workshop: "https://steamcommunity.com/sharedfiles/filedetails/?id=2892858338"
  },

  {
    id: "gm_novenka_russia",
    title: "gm_novenka_russia",
    category: "gmod",
    published: "2021",
    updated: "2026",
    description: "",
    image: "images/gmod/novenkarussia.jpg",
    screenshots: ["images/gmod/novenkarussia.jpg"],
    tags: ["Переработка"],
    workshop: "https://steamcommunity.com/sharedfiles/filedetails/?id=2533975498"
  },

  {
    id: "otherworlds",
    title: "OTHERWORLDS",
    category: "gmod",
    published: "2024",
    description: "На скриншоте продемонстрирован фрагмент сделанный мной",
    image: "images/gmod/otherworld.jpg",
    screenshots: ["images/gmod/otherworld.jpg"],
    tags: ["Колаб"],
    workshop: "https://steamcommunity.com/sharedfiles/filedetails/?id=3342334750"
  },

  {
    id: "bunker_g35",
    title: "BUNKER G35",
    category: "gmod",
    published: "2025",
    description: "",
    image: "images/gmod/bunkerg35.jpg",
    screenshots: ["images/gmod/bunkerg35.jpg"],
    tags: ["Авторская"],
    workshop: "https://steamcommunity.com/sharedfiles/filedetails/?id=3555966265"
  },

  {
    id: "gm_construct_big",
    title: "gm_construct_big",
    category: "gmod",
    published: "2023",
    description: "Увеличенная версия стандартной карты",
    image: "images/gmod/constructbig.jpg",
    screenshots: ["images/gmod/constructbig.jpg"],
    tags: ["Переработка"],
    workshop: "https://steamcommunity.com/sharedfiles/filedetails/?id=3025112729"
  },

  {
    id: "the_backrooms_big",
    title: "The backrooms big",
    category: "gmod",
    published: "2022",
    description: "Увеличенная версия оригинальной карты",
    image: "images/gmod/backrooms.jpg",
    screenshots: ["images/gmod/backrooms.jpg"],
    tags: ["Переработка"],
    workshop: "https://steamcommunity.com/sharedfiles/filedetails/?id=2812175065"
  },

  {
    id: "place",
    title: "Place",
    category: "gmod",
    published: "2023",
    description: "",
    image: "images/gmod/place.jpg",
    screenshots: ["images/gmod/place.jpg"],
    tags: ["Авторская"],
    workshop: "https://steamcommunity.com/sharedfiles/filedetails/?id=2986159219"
  }
];

// Для добавления своего проекта просто скопируйте один объект выше
// и измените его поля.
