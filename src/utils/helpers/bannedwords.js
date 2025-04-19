const bannedWords = [
    // Sexual / Suggestive Content
    "nude",
    "nudity",
    "underwear",
    "lingerie",
    "bikini",
    "swimsuit",
    "bra",
    "panties",
    "cleavage",
    "belly",
    "belly button",
    "midriff",
    "thigh",
    "buttocks",
    "erotic",
    "suggestive",
    "seductive",
    "sexual",
    "sexy",
    "topless",
    "exposed skin",
    "exposed stomach",
    "scantily clad",
    "adult content",
  
    // Violence / Weapons
    "blood",
    "gore",
    "gun",
    "pistol",
    "rifle",
    "weapon",
    "knife",
    "blade",
    "sword",
    "axe",
    "bomb",
    "explosion",
    "bullet",
    "firearm",
    "murder",
    "killing",
    "corpse",
    "wound",
    "combat",
    "fight",
    "aggression",
    "execution",
    "riot",
  
    // Additional (Optional)
    "smoking",
    "alcohol",
    "drugs",
    "marijuana",
    "intoxicated",
    "provocative",
    "fetish",
    "bdsm",
    "restraint"
  ];

  export function containsBannedWords(words) {
    return words.some(({ label, confidence }) => 
      confidence > 0.5 &&
      bannedWords.some(bannedWord =>
        label.toLowerCase().includes(bannedWord.toLowerCase())
      )
    );
  }
  
  
  