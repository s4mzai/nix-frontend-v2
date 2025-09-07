 
export function pluralizeRole(roleName: string): string {
    if (!roleName) return roleName;
  
    const lowerRole = roleName.toLowerCase();
  
    // Special case: alumini -> already in plural form, all members -> don't need extra s in the end. :)
    const specialCases: Record<string, string> = {
      'alumni': 'alumni',        
      'all members': 'all members', 
    };
  
    if (specialCases[lowerRole]) {
      return specialCases[lowerRole];
    }
  
    // Words endsWith "y" → "ies" , eg.,: "party" → "parties"
    if (/[bcdfghjklmnpqrstvwxyz]y$/.test(lowerRole)) {
      return lowerRole.slice(0, -1) + 'ies';
    }
  
    // Words endsWith "fe" → "ves", eg.,: "knife" → "knives"
    if (lowerRole.endsWith('fe')) {
      return lowerRole.slice(0, -2) + 'ves';
    }
  
    // Words endsWith "f" → "ves", // eg.,: "wolf" → "wolves"
    if (lowerRole.endsWith('f')) {
      return lowerRole.slice(0, -1) + 'ves';
    }
  
    // Words endsWith s, sh, ch, x, z → add "es", eg.,: "bus" → "buses", "match" → "matches"
    if (/(s|sh|ch|x|z)$/.test(lowerRole)) {
      return lowerRole + 'es';
    }
  
    // Default rule → just add "s", eg.,: "doctor" → "doctors"
    return lowerRole + 's';
  }
  
  // for capitalizing the first letter of every string :)
  export function capitalizeWords(str: string): string {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  