const EmailRegex: RegExp =
  /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/

const PasswordCSpecial: RegExp =
  /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])\S+$/

const PasswordCNumber: RegExp = /^(?=.*\d)\S+$/

const PasswordCText: RegExp = /^(?=.*[a-zA-Z])\S+$/

export { EmailRegex, PasswordCNumber, PasswordCSpecial, PasswordCText }
