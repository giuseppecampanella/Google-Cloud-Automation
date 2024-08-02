/**
 * Function to convert a number into its textual representation in Italian.
 * @param {number} number - The number to convert.
 * @returns {string} The textual representation of the input number in Italian.
 */
function convertNumberToWords(number) {
    // Arrays containing text representation of numbers
    const numberText = [
      '', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove',
      'dieci', 'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove'
    ];
  
    const tensText = [
      '', '', 'venti', 'trenta', 'quaranta', 'cinquanta', 'sessanta', 'settanta', 'ottanta', 'novanta'
    ];
  
    /**
     * Function to convert numbers up to 999 into words.
     * @param {number} number - The number to convert.
     * @returns {string} The textual representation of the input number up to 999.
     */
    function convertUpTo999(number) {
      if (number < 20) {
        return numberText[number];
      } else if (number < 100) {
        return tensText[Math.floor(number / 10)] + numberText[number % 10];
      } else {
        return numberText[Math.floor(number / 100)] + 'cento' + convertUpTo999(number % 100);
      }
    }
  
    /**
     * Main conversion function.
     * @param {number} number - The number to convert.
     * @returns {string} The textual representation of the input number.
     */
    function convert(number) {
      if (number === 0) return 'zero';
  
      let result = '';
  
      if (number < 1000000) {
        result += convertUpTo999(Math.floor(number / 1000)) + 'mila';
        number %= 1000;
      }
  
      result += convertUpTo999(number);
  
      return result;
    }
  
    return convert(number);
  }
  
  /**
   * Function to convert a number with decimal places into its textual representation in Italian.
   * @param {number} number - The number to convert.
   * @returns {string} The textual representation of the input number with decimal places in Italian.
   */
  function convertNumberToWordsWithDecimals(number) {
    const numberString = number.toString();
    const parts = numberString.split('.');
    let result = convertNumberToWords(parseInt(parts[0]));
  
    // Add '/00' if there are no decimal places
    if (parts.length === 1) {
      result += '/00';
    } else if (parts.length > 1) {
    // If there are decimal places, pad with zeros to ensure exactly 2 decimal digits
      result += '/' + parts[1].padEnd(2, '0');
    }
  
    return result;
  }