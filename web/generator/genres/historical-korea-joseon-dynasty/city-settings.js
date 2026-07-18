// genres/historical-korea-joseon-dynasty/city-settings.js
// Locations in Joseon Dynasty Korea. Each entry:
//   id           — unique slug; used for slot-machine reel identity and icon lookup
//   label        — display label
//   flavor       — atmospheric detail passed to Claude for the Opening/Description
//   toneTag      — gritty | dramatic | cozy | neutral; feeds TAG_POOLS in settings.js
//   statAffinity — optional stat-weighted selection bias
//   iconPrompt   — text-to-image prompt for this setting's slot-machine reel icon
//   iconPath     — served path where that icon lives

export const CITY_SETTINGS = [
  {
    id: "hanyang_bukchon",
    label: "Hanyang — Bukchon",
    flavor:
      "The aristocratic quarter of the capital: yangban clan compounds behind high walls, narrow lanes governed by social weight",
    iconPrompt:
      "joseon dynasty korean hanyang bukchon yangban compound tiled rooftops narrow aristocratic lane capital city traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/CITY_SETTINGS#hanyang_bukchon.webp",
  },
  {
    id: "hanyang_jongno",
    label: "Hanyang — Jongno Market",
    flavor:
      "The central commercial artery of the capital: merchants, officials, and every class pressed together on one long crowded street",
    iconPrompt:
      "joseon dynasty korean hanyang jongno market street merchants stalls crowds busy commercial lane mixed classes traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/CITY_SETTINGS#hanyang_jongno.webp",
  },
  {
    id: "hanyang_palace",
    label: "Hanyang — Palace Approach",
    flavor:
      "The great gate of Gyeongbokgung and the government offices surrounding it: power, ceremony, and the specific terror of royal proximity",
    iconPrompt:
      "joseon dynasty korean gyeongbokgung palace gate ceremony royal guards officials formal procession imposing traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/CITY_SETTINGS#hanyang_palace.webp",
  },
  {
    id: "hanyang_sungkyunkwan",
    label: "Hanyang — Sungkyunkwan",
    flavor:
      "The royal Confucian academy: scholars, examinations, midnight oil, and the quiet war of academic reputation fought with brushwork",
    iconPrompt:
      "joseon dynasty korean sungkyunkwan confucian academy scholars courtyard lecture hall gwageo preparation night study traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/CITY_SETTINGS#hanyang_sungkyunkwan.webp",
  },
  {
    id: "hanyang_namdaemun",
    label: "Hanyang — Namdaemun Market",
    flavor:
      "The great south gate market: goods from every province, foreign traders, rumors from the road, deals best not discussed openly",
    iconPrompt:
      "joseon dynasty korean namdaemun south gate market merchants goods trade busy crowd gate arch traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/CITY_SETTINGS#hanyang_namdaemun.webp",
  },
  {
    id: "jeonju",
    label: "Jeonju",
    flavor:
      "The southwestern cultural heart of Joseon and the ancestral home of the Yi royal clan: refined, proud, and quietly political",
    iconPrompt:
      "joseon dynasty korean jeonju provincial capital hanok village cultural center refined aristocratic traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/CITY_SETTINGS#jeonju.webp",
  },
  {
    id: "pyongyang",
    label: "Pyongyang",
    flavor:
      "The northern provincial capital, gateway to Manchuria: trade routes, military garrisons, and a culture slightly rougher than the south",
    iconPrompt:
      "joseon dynasty korean pyongyang northern provincial capital fortress wall trade route cold northern city traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/CITY_SETTINGS#pyongyang.webp",
  },
  {
    id: "busan_port",
    label: "Busan Port",
    flavor:
      "The southern sea gate: Korean merchants, Japanese traders in their designated quarter, and the tension of proximity to the sea and its dangers",
    iconPrompt:
      "joseon dynasty korean busan port maritime trade ships dock merchants japanese traders coastal city traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/CITY_SETTINGS#busan_port.webp",
  },
  {
    id: "mountain_temple",
    label: "Mountain Temple",
    flavor:
      "A Buddhist monastery in the Taebaek hills: refuge, scholarship, and a world that runs by entirely different rules than the Confucian court below",
    iconPrompt:
      "joseon dynasty korean mountain buddhist temple monks incense pine trees remote taebaek hills peaceful serene traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/CITY_SETTINGS#mountain_temple.webp",
  },
  {
    id: "northern_frontier",
    label: "Northern Frontier Fortress",
    flavor:
      "A garrison post facing Manchuria: cold, isolated, and home to soldiers who have stopped expecting to be remembered by the capital",
    iconPrompt:
      "joseon dynasty korean northern frontier fortress garrison soldiers cold winter manchuria border isolated wall traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/CITY_SETTINGS#northern_frontier.webp",
  },
];
