export const STATIC_CHARACTERS = [
];

export const STATIC_CLASSES = [
  {
    name: "Civil Yangban",
    triggers: "Civil Yangban, Yangban",
    entry: "The scholar-aristocrat class of Joseon Korea, whose status rested on passing the gwageo civil service examinations — grueling tests of classical Confucian learning that could take a lifetime to pass, if a candidate passed at all. Civil yangban filled the government's highest offices, and a family's honor could rise or fall for generations on a single ancestor's examination result.",
  },
  {
    name: "Military Yangban",
    triggers: "Military Yangban, Musa",
    entry: "The warrior branch of the aristocracy, holding rank through the separate mugwa military examination track rather than the civil gwageo. Though technically equal in status to civil yangban, they were widely regarded as socially inferior within a Confucian hierarchy that prized brushwork over swordsmanship — a resentment that simmered for the entire dynasty.",
  },
  {
    name: "Royal Court",
    triggers: "Royal Court",
    entry: "Those attached directly to the throne — royal relatives, palace officials, and the inner circle around the king and his consorts. Proximity to royal power meant extraordinary privilege, but also extraordinary risk: Joseon's court was defined by factional struggles where a change in royal favor could mean exile or execution as easily as promotion.",
  },
  {
    name: "Jungin",
    triggers: "Jungin",
    entry: "The 'middle people' — technical specialists such as interpreters, physicians, astronomers, and law clerks whose expertise was indispensable to the state but who remained permanently barred from the highest offices by birth. Jungin families often intermarried and passed their specialized knowledge down for generations, forming quiet professional dynasties of their own.",
  },
  {
    name: "Common Folk",
    triggers: "Common Folk, Sangmin",
    entry: "The sangmin — free commoners who made up the great majority of Joseon's population: farmers, fishermen, artisans, and laborers. They bore the kingdom's tax burden and corvée labor obligations, and while legally free to sit the gwageo examinations, poverty and lack of education made this a practical impossibility for nearly all of them.",
  },
  {
    name: "Merchant",
    triggers: "Merchant",
    entry: "Traders and peddlers occupied an awkward place in Confucian Joseon — officially ranked below farmers, since commerce was considered to produce nothing of real value, yet often wealthier and better-connected than the yangban who looked down on them. Itinerant peddlers in particular doubled as a nationwide information network, carrying news and rumor along with their goods.",
  },
  {
    name: "Gisaeng",
    triggers: "Gisaeng",
    entry: "Government-registered female entertainers trained from childhood in music, dance, poetry, and conversation, often better educated than yangban daughters despite occupying one of the lowest legal social ranks. Gisaeng served at official banquets and diplomatic functions, and a select few rose to become celebrated artists and poets whose work outlived the men who once patronized them.",
  },
  {
    name: "Cheonmin",
    triggers: "Cheonmin",
    entry: "The lowest legal class in Joseon Korea, standing entirely outside the yangban-jungin-sangmin hierarchy. It encompassed several distinct groups — nobi, baekjeong, mudang, and others — bound together mainly by their shared exclusion from the official social order, and sometimes wielding an influence that order refused to acknowledge.",
  },
  {
    name: "Nobi",
    triggers: "Nobi",
    entry: "Hereditary slaves of Joseon Korea, bound to their masters by birth and legally treated as property to be bought, sold, and inherited. At various points in the dynasty they made up close to a third of the entire population — some worked private households, others toiled on government or noble estates, and a rare few managed to save enough to buy their own freedom.",
  },
  {
    name: "Baekjeong",
    triggers: "Baekjeong",
    entry: "Butchers, leatherworkers, and executioners — occupations considered ritually unclean under Confucian and Buddhist sensibilities for their handling of death and animal slaughter. Baekjeong were forced to live in segregated settlements outside town limits, forbidden from wearing normal clothing or mixing with other classes, a stigma that persisted long after formal class distinctions began to fade.",
  },
  {
    name: "Mudang",
    triggers: "Mudang",
    entry: "Shamans, most often women, who served as intermediaries between the human world and the spirits through ritual, trance, and divination. Officially condemned by the Confucian state as superstition and vice, mudang nonetheless remained in constant demand — for exorcisms, fortune-telling, and rites the yangban would publicly scorn and privately pay handsomely for.",
  },
];

export const STATIC_RACES = [
  {
    name: "Joseon People",
    triggers: "Joseon-in, Joseon person, Korean, Koreans",
    entry: "The people of Joseon Korea most commonly called themselves Joseon-in ('person of Joseon') or Joseon saram in everyday speech — identity was tied to the dynasty and state itself, not to an abstract nationality in the modern sense. The now-common self-designation 'Hanguk' traces back to the ancient Samhan confederacies of the peninsula, but wasn't adopted as the country's own name until 1897, at the very end of the Joseon era, when it became the Daehan Jeguk (Korean Empire) — note that this ancient 'Han' (韓) is an entirely different word from the Chinese 'Han' (漢) of Han Chinese, despite sharing the same English spelling.",
  },
  {
    name: "Han Chinese",
    triggers: "Han Chinese, Han",
    entry: "The core ethnic group of China, whose language, writing system, and Confucian philosophy shaped Joseon's own court culture, laws, and education system down to the smallest detail. A Joseon scholar's highest compliment was often to be told his hanmun (classical Chinese writing) could pass for that of a Han literatus. (A different word entirely from the 'Han' in Joseon's own Samhan heritage — see Joseon People.)",
  },
  {
    name: "Ming Chinese",
    triggers: "Ming, Ming Dynasty, Ming China",
    entry: "The Chinese dynasty Joseon served as tributary state and called on for aid during the Japanese invasions of the 1590s, when Ming armies helped drive the invaders back. Its collapse to the Manchu in 1644 was a genuine crisis of identity for Joseon's scholar class, who came to see themselves — not the new Qing rulers — as the last true keepers of civilized order.",
  },
  {
    name: "Qing / Manchu",
    triggers: "Qing, Qing Dynasty, Manchu",
    entry: "The Manchu-led dynasty that conquered Ming China and forced Joseon into a humiliating tributary submission after the siege of Namhansanseong in 1637. Officially a loyal vassal state, Joseon's court privately regarded the Qing as barbarian usurpers of a civilization they themselves preserved more faithfully — a resentment few dared voice aloud.",
  },
  {
    name: "Japanese (Wae)",
    triggers: "Japanese, Wae",
    entry: "Called Wae by the Joseon court, the people across the strait were a source of both trade and trauma — the devastating Imjin War invasions of 1592–98 left scars that shaped Joseon foreign policy for the rest of the dynasty. Contact afterward was tightly controlled, funneled almost entirely through the walled Waegwan trading post at Busan.",
  },
  {
    name: "Mongols",
    triggers: "Mongol, Mongols, Mongolian",
    entry: "Steppe peoples to the north and west, remembered in Joseon largely through the still-bitter memory of the Mongol Empire's decades-long domination of the preceding Goryeo dynasty. By the Joseon era few Mongols were seen directly, but the word still carried connotations of steppe warfare, subjugation, and wariness of the wide northern frontier.",
  },
  {
    name: "Jurchen",
    triggers: "Jurchen, Jurchens",
    entry: "Semi-nomadic peoples of the Manchurian frontier, alternately trading partners, tributaries, and raiders along Joseon's northern border for most of the dynasty's history. Their eventual unification under Nurhaci reshaped the entire region — the Jurchen tribes of the frontier became, within a generation, the Manchu rulers of the Qing empire.",
  },
  {
    name: "Ryukyuan",
    triggers: "Ryukyuan, Ryukyu, Ryukyu Kingdom",
    entry: "Traders and envoys from the Ryukyu Kingdom, a small maritime state to the south in what is now Okinawa, who occasionally reached Joseon's shores with goods and news from further afield — a rare, exotic point of contact with a world beyond China and Japan.",
  },
];

export const STATIC_LOCATIONS = [
  {
    name: "Gyeongbokgung",
    triggers: "Gyeongbokgung, Gyeongbok Palace, Gyeongbokgung Palace",
    entry: "The primary royal palace of the Joseon dynasty, built in 1395 at the founding of the dynasty and serving as the seat of royal power in the capital, Hanyang. Its throne hall, Geunjeongjeon, is where the king held court and received foreign envoys; the palace was burned during the Japanese invasions of the 1590s and left in ruins for nearly three centuries before being rebuilt.",
  },
  {
    name: "Changdeokgung",
    triggers: "Changdeokgung, Changdeokgung Palace, Huwon, Secret Garden",
    entry: "A royal palace built in 1405 as a secondary residence to Gyeongbokgung, later favored by many kings as their primary seat after Gyeongbokgung's destruction. Its rear garden, the Huwon ('Secret Garden'), is a sprawling landscaped retreat of pavilions, ponds, and forest paths where the royal family could escape the rigid formality of court life.",
  },
  {
    name: "Jongmyo Shrine",
    triggers: "Jongmyo, Jongmyo Shrine",
    entry: "The royal ancestral shrine of the Joseon dynasty, housing spirit tablets of deceased kings and queens. Elaborate memorial rites (Jongmyo Jerye), accompanied by ceremonial court music and dance, were performed here to honor the royal ancestors — among the oldest continuously preserved royal Confucian rituals in the world.",
  },
  {
    name: "Namhansanseong",
    triggers: "Namhansanseong, Namhan Mountain Fortress",
    entry: "A mountain fortress south of the capital, refuge of King Injo during the Qing invasion of 1636. The king and his court endured a grueling forty-five day siege here through the depths of winter before surrendering — one of the most humiliating episodes in Joseon history, and a favorite backdrop for stories of desperation and hard choices under siege.",
  },
  {
    name: "Sungkyunkwan",
    triggers: "Sungkyunkwan, Sungkyunkwan Academy",
    entry: "The highest state-sponsored Confucian academy in Joseon Korea, training the scholars who would go on to sit the gwageo civil service examinations. Students lived and studied on campus for years, and the rivalries, friendships, and reputations forged there often shaped the rest of a scholar-official's career.",
  },
  {
    name: "Bukchon",
    triggers: "Bukchon, Bukchon Hanok Village",
    entry: "The aristocratic quarter of Hanyang, nestled between Gyeongbokgung and Changdeokgung. Home to generations of yangban clans in walled hanok compounds along narrow, winding lanes — a neighborhood where proximity to the palace was itself a mark of status, and every family's standing was silently measured by the height of their gate.",
  },
  {
    name: "Jongno",
    triggers: "Jongno, Jongno Market",
    entry: "The great central thoroughfare of Hanyang, lined with government-licensed shops selling silk, paper, fish, and other goods under royal monopoly. By day a crush of merchants, officials, and commoners of every class; by night home to the massive bronze bell of Bosingak, whose tolling marked the opening and closing of the city gates.",
  },
  {
    name: "Namdaemun",
    triggers: "Namdaemun, Namdaemun Market, Sungnyemun",
    entry: "The Great South Gate of Hanyang (formally Sungnyemun), the grandest of the capital's gates and the ceremonial entrance used by visiting dignitaries. The market that grew up around it was the city's main channel for goods flowing in from the southern provinces — and for rumors, smuggled goods, and deals better struck outside official view.",
  },
  {
    name: "Jeonju",
    triggers: "Jeonju",
    entry: "The cultural heart of the southwestern Jeolla region and the ancestral home of the Yi clan, from which the Joseon dynasty's royal line descended. Its shrine to the dynasty's founding ancestors, Gyeonggijeon, made it a place of particular reverence — proud, refined, and never quite able to forget its own historical weight.",
  },
  {
    name: "Pyongyang",
    triggers: "Pyongyang",
    entry: "The great northern provincial capital, gateway to the trade routes into Manchuria and Qing China. A garrison city as much as a commercial one, with a culture shaped by its exposure to the frontier — harder-edged than the south, and always the first to feel the tremors of trouble across the border.",
  },
  {
    name: "Busan",
    triggers: "Busan, Busan Port, Waegwan",
    entry: "The southern sea gate of Joseon Korea, where Korean merchants dealt with Japanese traders confined to the walled Waegwan (Japan House) trading post. One of the kingdom's only sanctioned points of contact with Japan, and a place where diplomacy, smuggling, and quiet espionage all wore the same polite face.",
  },
];

export const STATIC_FACTIONS = [
  {
    name: "The Cheongnyu Faction",
    triggers: "Cheongnyu Faction, Cheongnyu",
    entry: "A faction of scholar-officials who present themselves as guardians of Confucian moral integrity, rooting out corruption and factional cronyism wherever they find it — or claim to find it. Their righteousness makes them formidable allies and even more dangerous enemies, since an accusation of corruption from the Cheongnyu is difficult to survive politically, whether or not it's true.",
  },
  {
    name: "The Hwang Consortium",
    triggers: "Hwang Consortium",
    entry: "A loose alliance of powerful clans and their client officials, more concerned with land, marriage alliances, and influence than with any particular ideology. Where the Cheongnyu preach reform, the Hwang Consortium simply outlasts it — every purge in living memory has thinned their ranks and left the rest more entrenched.",
  },
  {
    name: "Amun-hoe",
    triggers: "Amun-hoe, Shadow Gate Society",
    entry: "A smuggling syndicate that moves contraband, banned books, and information through the back alleys of Jongno and the docks at Namdaemun and Busan. Officially, no such organization exists; unofficially, everyone from beggars to minor nobles knows exactly who to bribe when something needs to disappear — or appear — quietly.",
  },
  {
    name: "The Ginseng Road Compact",
    triggers: "Ginseng Road Compact",
    entry: "A secretive guild of merchants controlling the immensely profitable wild ginseng trade along the routes into Qing China. Their wealth rivals many yangban households, and their border contacts make them an unofficial intelligence network the government quietly tolerates — so long as the right officials keep receiving the right gifts.",
  },
  {
    name: "The Red Sickles",
    triggers: "Red Sickles",
    entry: "A ruthless street gang of former farmers turned thieves and thugs known for wielding rusty sickles.",
  },

];

export const STATIC_CUSTOM = [
];
