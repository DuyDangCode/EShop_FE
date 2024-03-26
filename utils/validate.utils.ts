import {
  EmailRegex,
  PasswordCNumber,
  PasswordCSpecial,
  PasswordCText
} from '@/constrant/regex'

export interface CheckFormatResultInterface {
  result: boolean
  mesage: string
}

const checkFormatUsername = (
  username: string = ''
): CheckFormatResultInterface => {
  if (username.length < 2)
    return {
      result: false,
      mesage: 'Username must be at least 2 characters'
    }
  return {
    result: true,
    mesage: ''
  }
}

const checkFormatEmail = (email: string = ''): CheckFormatResultInterface => {
  if (!EmailRegex.test(email))
    return {
      result: false,
      mesage: 'Incorrect email format'
    }
  return {
    result: true,
    mesage: ''
  }
}

const checkLength = (password: string = ''): CheckFormatResultInterface => {
  if (password.length < 8)
    return {
      result: false,
      mesage: 'Password must be at least 8 characters'
    }
  return {
    result: true,
    mesage: ''
  }
}
const checkText = (password: string = ''): CheckFormatResultInterface => {
  if (!PasswordCText.test(password))
    return {
      result: false,
      mesage: 'Password must contain at least one alphabetic character'
    }
  return {
    result: true,
    mesage: ''
  }
}
const checkNumber = (password: string = ''): CheckFormatResultInterface => {
  if (!PasswordCNumber.test(password))
    return {
      result: false,
      mesage: 'Password must contain at least one numeric character'
    }
  return {
    result: true,
    mesage: ''
  }
}
const checkSpecial = (password: string = ''): CheckFormatResultInterface => {
  if (!PasswordCSpecial.test(password))
    return {
      result: false,
      mesage: 'Password must contain at least one special character'
    }
  return {
    result: true,
    mesage: ''
  }
}

const checkFormatPassword: any = {
  checkLength,
  checkNumber,
  checkText,
  checkSpecial
}

export { checkFormatUsername, checkFormatEmail, checkFormatPassword }
