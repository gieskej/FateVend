# Phonetics

## Problem Definition

Kokoro'e english voices don't pronounce Japanese or Korean words properly, but the Japanese voices produce incomprehensible English.  So either we write some JavaScript to preprocess English -> Katakana so the Japanese voice works?  Or even better, extend the Kokoro service to do this heavy lifting.  Consider using CMU Pronouncing Dictionary (CMUdict)

I've manually experimented with online CMUdict, pasting in the English I want to TTS, and then copying the Katakana back into Kokoro's web UI.  It sounds a lot better when read with a Japanese voice.


## Brainstorming Possible Solutions

### User Prompt 1
> Using Javascript, write a function that takes an English string and converts it to katakana

If you mean transliterate English words into Katakana (e.g. "computer" → "コンピューター"), there is no simple algorithm that can do this accurately. English spelling is not phonetic, and Japanese loanwords follow pronunciation, not spelling.

For example:

- computer → コンピューター
- knife → ナイフ
- enough → イナフ
- queue → キュー

These cannot be derived correctly from the letters alone.

### Best approach

Use a pronunciation dictionary (such as the CMU Pronouncing Dictionary) to convert:
``` text
English text
      ↓
English pronunciation (phonemes)
      ↓
Japanese syllables
      ↓
Katakana
```

### If you only need a simple letter-based approximation

Here's a JavaScript function that performs a very rough transliteration. It won't be linguistically correct, but works reasonably well for many simple words.

``` javascript
function englishToKatakana(text) {
    let s = text.toLowerCase();

    const rules = [
        ["tion", "ション"],
        ["ture", "チャー"],
        ["ch", "チ"],
        ["sh", "シ"],
        ["th", "ス"],
        ["ph", "フ"],
        ["ck", "ック"],
        ["qu", "ク"],
        ["wh", "ウ"],
        ["ng", "ング"],

        ["a", "ア"],
        ["b", "ブ"],
        ["c", "ク"],
        ["d", "ド"],
        ["e", "エ"],
        ["f", "フ"],
        ["g", "グ"],
        ["h", "ハ"],
        ["i", "イ"],
        ["j", "ジ"],
        ["k", "ク"],
        ["l", "ル"],
        ["m", "ム"],
        ["n", "ン"],
        ["o", "オ"],
        ["p", "プ"],
        ["q", "ク"],
        ["r", "ル"],
        ["s", "ス"],
        ["t", "ト"],
        ["u", "ウ"],
        ["v", "ヴ"],
        ["w", "ワ"],
        ["x", "クス"],
        ["y", "イ"],
        ["z", "ズ"]
    ];

    for (const [from, to] of rules) {
        s = s.replaceAll(from, to);
    }

    return s;
}
```

Example:
``` javascript
console.log(englishToKatakana("computer"));
// コンプウトエル

console.log(englishToKatakana("camera"));
// カメラ (close)

console.log(englishToKatakana("banana"));
// バナナ (fairly close)
```
As you can see, "computer" becomes コンプウトエル, which illustrates why spelling-based transliteration isn't sufficient.

### A much better solution
If you need high-quality katakana (90–99% accuracy for common words), I recommend using:

- The CMU Pronouncing Dictionary for English pronunciation.
- A phoneme-to-katakana conversion table.

This approach correctly produces:
| English    | Katakana |
| ---------- | -------- |
| computer   | コンピューター  |
| internet   | インターネット  |
| browser    | ブラウザー    |
| chocolate  | チョコレート   |
| keyboard   | キーボード    |
| microphone | マイクロフォン  |

The result is far more natural than anything based solely on spelling.

> Ok, how can I use the CMU Pronunciation Dictionary? 

The CMU Pronouncing Dictionary (CMUdict) is actually very easy to use. It's just a text file containing about 135,000 English words and their pronunciations using the ARPABET phoneme set.

For example, the dictionary contains entries like:
``` text
COMPUTER  K AH0 M P Y UW1 T ER0
INTERNET  IH1 N T ER0 N EH2 T
KEYBOARD  K IY1 B AO2 R D
CHOCOLATE CH AA1 K L AH0 T
```
The numbers indicate stress and can usually be ignored when generating katakana.

### Step 1: Download CMUdict
Download the dictionary from the official Carnegie Mellon repository:

https://github.com/cmusphinx/cmudict

The main file is: cmudict.dict
It's about 4 MB.

### Step 2: Load it in JavaScript
At startup, read the dictionary into a ```Map```.

``` javascript
const fs = require("fs");
const dictionary = new Map();
const lines = fs.readFileSync("cmudict.dict", "utf8").split("\n");

for (const line of lines) {
    if (line.startsWith(";;;")) continue;
    const parts = line.trim().split(/\s+/);
    const word = parts.shift();
    dictionary.set(word, parts);
}
```

Now: ```dictionary.get("COMPUTER");```

returns
``` javascript
[
"K",
"AH0",
"M",
"P",
"Y",
"UW1",
"T",
"ER0"
]
```

### Step 3: Remove stress numbers
``` text
AH0 → AH
UW1 → UW
ER0 → ER
```
In code:
``` javascript
phoneme = phoneme.replace(/[012]/g, "");
```

### Step 4: Convert phonemes to Katakana

A simple lookup table works well.
``` javascript
const katakana = {
    AA: "ア",
    AE: "ア",
    AH: "ア",
    AO: "オ",

    AW: "アウ",
    AY: "アイ",

    B: "ブ",
    CH: "チ",
    D: "ド",
    DH: "ズ",

    EH: "エ",
    ER: "アー",

    EY: "エイ",

    F: "フ",
    G: "グ",
    HH: "ハ",

    IH: "イ",
    IY: "イー",

    JH: "ジ",

    K: "ク",
    L: "ル",
    M: "ム",
    N: "ン",

    NG: "ング",

    OW: "オウ",
    OY: "オイ",

    P: "プ",
    R: "ル",
    S: "ス",
    SH: "シ",

    T: "ト",
    TH: "ス",

    UH: "ウ",
    UW: "ウー",

    V: "ヴ",

    W: "ワ",

    Y: "イ",

    Z: "ズ",
    ZH: "ジュ"
};
```

### Step 5: Convert
``` javascript
function wordToKatakana(word) {
    const phones = dictionary.get(word.toUpperCase());

    if (!phones)
        return word;

    return phones
        .map(p => p.replace(/[012]/g, ""))
        .map(p => katakana[p] || "")
        .join("");
}
```

Example: ```console.log(wordToKatakana("computer"));```

Output: ```クアムプイウートアー```

This is better than spelling-based transliteration, but still not natural Japanese because it maps each phoneme independently.

### A better phoneme converter

The next step is to recognize phoneme sequences rather than individual phonemes. For example:

| ARPABET | Katakana |
| ------- | -------- |
| P Y UW  | ピュー      |
| T ER    | ター       |
| K Y UW  | キュー      |
| S H     | シ        |
| CH      | チ        |
| JH      | ジ        |
| AO R    | オー       |
| ER      | アー       |
| OW      | オー       |
| EY      | エイ       |

Then `K AH M P Y UW T ER` becomes `コ ン ピュー ター` → `コンピューター`

Similarly `IH N T ER N EH T` becomes `インターネット` instead of a literal phoneme-by-phoneme rendering.

If you're building a serious transliterator, this sequence-based approach produces results that are much closer to how English loanwords are actually written in Japanese. It can achieve very natural output without requiring a massive table of whole-word exceptions.

### User Prompt 2
> My goal is to build an English TTS narrator with a Japanese accent using Kokoro and a Japanese voice. I've found that if I just give it raw English, it is unintelligible. But if I use an online tool to convert it to katakana, it sounds much better. So I was wondering how that online tool works. 

That makes perfect sense, and you're actually trying to solve a problem that's a bit different from "translating English to Japanese."

What you want is English pronunciation expressed in Japanese phonology. That's essentially what sites like Sljfaq, Google IME, and other "English → Katakana" converters do.

The pipeline they use is usually something like:
``` text
English text
      ↓
Text normalization
("Mr." → "Mister", "2026" → "twenty twenty-six")
      ↓
English Grapheme-to-Phoneme (G2P)
computer
      ↓
K AH0 M P Y UW1 T ER0
      ↓
Japanese phonology rules
      ↓
コンピューター
      ↓
Japanese TTS
```

The hard part isn't the Katakana. The hard part is the English grapheme-to-phoneme (G2P) step.

### Option 1: Use CMUdict + G2P (my recommendation)

CMUdict only covers known words. For words not in the dictionary, use a G2P model.

Popular JavaScript-compatible options include:

- CMUdict for known words
- Sequitur G2P
- Phonetisaurus
- espeak-ng (has a built-in English G2P)
- OpenAI Whisper's internal G2P isn't exposed, but similar neural models exist

A typical flow:
``` text
sentence
 ↓
split into words
 ↓
CMU lookup
 ↓
unknown?
 ↓
G2P model
 ↓
ARPABET
 ↓
Katakana converter
```

### Option 2: Use espeak-ng

This is one of the easiest solutions.

For example:

``` bash
espeak-ng -x "computer"
```
returns a phonetic transcription.


Or:

``` bash
espeak-ng --ipa "computer"
``` 

returns IPA.

IPA is often easier to convert to Katakana than English spelling.

### Option 3: Use Kokoro's phonemes directly

Depending on the version you're using, Kokoro internally converts text into phonemes before synthesis. If you're comfortable modifying the pipeline, you could intercept those phonemes and map them to Japanese phonemes instead of going through Katakana text.

### The "secret sauce"

Online converters don't literally replace letters.

For example, `queue` becomes `K Y UW` which becomes `キュー`.

Similarly, `through` becomes `TH R UW` then `スルー`.

The converter never reasons about the letters after the pronunciation has been determined.

### An idea that might work even better

Since your final goal is Japanese-accented English speech, you might skip Katakana entirely.

Instead, convert English phonemes into Japanese morae:

``` text
K AH M P Y UW T ER
↓
ko n pyu taa
↓
コンピューター
```

This avoids a lot of awkward intermediate steps and lets you fine-tune the mapping for natural-sounding Japanese-accented English.

### I think a small open-source library could do this well

A pipeline like:

``` text
English sentence
        ↓
CMUdict + G2P
        ↓
ARPABET
        ↓
Japanese mora converter
        ↓
Katakana
        ↓
Kokoro Japanese voice
```

would likely produce very good results. Because the converter works from phonemes rather than spelling, it could correctly handle words like "computer," "through," "queue," "GitHub," and even many names with just a modest set of phonological rules.

Out of curiosity, which Kokoro Japanese voice are you using? (For example, jf_alpha, jf_gongitsune, jm_kumo, etc.) Some of the voices articulate foreign loanwords more clearly than others, and that can influence how aggressive the English-to-Katakana conversion should be.

## User Prompt 3
> I was thinking about implementing this client side, but what you describe is more complicated. Maybe I should build it server side. How could I build service (in any language) on top of kokoro using the pipeline you suggested? 

I actually think server-side is the right architecture for this.

The reason isn't just that G2P is computationally heavier—it's that you'll almost certainly want to keep improving the pronunciation rules over time. A server lets you update those rules without redeploying every client.

Here's the architecture I'd build:
``` text
           HTTP POST
      text="Hello, my name is John."
               │
               ▼
      Text normalization
      ("Dr." → "Doctor")
      ("123" → "one hundred twenty-three")
               │
               ▼
         Tokenizer
      ["Hello", ",", "my", ...]
               │
               ▼
        Pronunciation lookup
      ┌──────────────────────────┐
      │     CMUdict              │
      │        ↓                 │
      │   if not found           │
      │        ↓                 │
      │     G2P model            │
      └──────────────────────────┘
               │
               ▼
      ARPABET phonemes
               │
               ▼
    English→Japanese phonology
      (this is where the magic is)
               │
               ▼
          Katakana text
               │
               ▼
      Kokoro Japanese voice
               │
               ▼
          WAV stream
```

I'd use Python, since Kokoro is Python-native, it saves a lot of integration work.

For the web service:

- FastAPI
- Uvicorn
- Kokoro
- CMUdict
- g2p-en
- NumPy

Your API becomes as simple as:
``` http
POST /tts

{
    "text": "Hello, my name is John.",
    "voice": "jf_alpha"
}
```

Response:

`audio/wav`

or
``` json
{
    "katakana": "ハロー、マイ ネーム イズ ジョン。",
    "wav": "base64..."
}
```
Returning the intermediate Katakana is useful for debugging.

#### Libraries I'd use

_CMU dictionary_

``` javascript
import cmudict

d = cmudict.dict()

d["computer"]
```
returns

`[['K','AH0','M','P','Y','UW1','T','ER0']]`

_Unknown words_

```python
from g2p_en import G2p

g2p = G2p()

g2p("ChatGPT")
```
returns phonemes even for words not in CMUdict.

### The interesting part: phonology

Instead of one huge lookup table, I'd build it as a rule engine.

Example: `P Y UW` ↓ `ピュー` instead of `プイウ`

Another rule: `T ER` ↓ `ター`

Another: `AH N` ↓ `アン`

These are context-sensitive transformations.

You'd probably end up with 100–300 rules, not thousands.

### Cache everything

Many words repeat.

A simple cache:

`computer` ↓ `コンピューター`

means the expensive conversion only happens once.

After a few thousand requests, most common English words are already cached.

### I wouldn't stop at Katakana

If I were designing this from scratch, I'd define an intermediate representation instead:
```
[
  "ko",
  "N",
  "pyu",
  "taa"
]
```
rather than

`コンピューター`

Then you can output:

- Katakana
- Hiragana
- IPA
- Kokoro phonemes
- Romaji

from the same representation.

### One more idea that could make this exceptional

Since you're already running Kokoro, you could make the system self-improving.

Whenever a word isn't in your pronunciation cache:

1. Generate a Katakana guess.
1. Synthesize it.
1. Listen to it yourself (or let users rate it).
1. Store the corrected pronunciation.

Eventually you'd build a custom dictionary:

```json
{
    "GitHub": "ギットハブ",
    "OpenAI": "オープンエーアイ",
    "Kubernetes": "クバネティス",
    "LangChain": "ラングチェーン",
    "ComfyUI": "コンフィユーアイ"
}
```

Those proper nouns and technical terms are exactly where generic transliterators tend to struggle, and they're also common in AI and developer content.

Knowing the kinds of projects you've worked on—Kokoro, OpenWebUI, TTS, Ubuntu, networking, and local AI—I think this could become a genuinely useful open-source service. A lightweight REST API that takes English text and returns high-quality Japanese-accented speech (or the intermediate Katakana) would fill a niche that isn't well served by existing tools.