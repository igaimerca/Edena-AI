exports.extractBasicInfo = (text) => {
    return {
      name: text.match(/^[A-Z][a-z]+\s[A-Z][a-z]+/)?.[0] || '',
      email: text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/)?.[0] || '',
      phoneNumber: text.match(/(\+\d{1,3}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}/)?.[0] || '',
    }
  }
  