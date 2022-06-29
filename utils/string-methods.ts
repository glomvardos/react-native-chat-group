class StringMethods {
  getInitialLetters(str: string) {
    const splitString = str.split(' ')
    const finalString = splitString[0][0].toUpperCase() + (splitString[1]?.[0]?.toUpperCase() ?? '')
    return finalString
  }
}

export default new StringMethods()
