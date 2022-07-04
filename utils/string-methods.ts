class StringMethods {
  getInitialLetters(str: string) {
    const splitString = str.split(' ')
    const finalString = splitString[0][0].toUpperCase() + (splitString[1]?.[0]?.toUpperCase() ?? '')
    return finalString
  }

  capitalizeWords = (str: string) =>
    str
      .split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ')
}

export default new StringMethods()
