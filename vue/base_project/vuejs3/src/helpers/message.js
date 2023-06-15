export default {
  message: [
    {
      field: 'AdminProfileForm.Username',
      text: 'Username',
    },
    {
      field: 'AdminProfileForm.Firstname',
      text: 'Firstname',
    },
    {
      field: 'AdminProfileForm.Lastname',
      text: 'Lastname',
    },
    {
      field: 'AdminProfileForm.Email',
      text: 'Email',
    },
  ],
  getSystemMessage (message) {
    const validate = ['create', 'update', 'delete', 'success']
    const valid = validate.find((v) =>
      message.toLowerCase().includes(v.toLowerCase()),
    )
    let _message = message
    switch (valid) {
      case 'create':
        _message = 'บันทึกข้อมูลเรียบร้อยแล้ว'
        break
      case 'update':
        _message = 'แก้ไขข้อมูลเรียบร้อยแล้ว'
        break
      case 'delete':
        _message = 'ลบข้อมูลเรียบร้อยแล้ว'
        break
      case 'success':
        _message = 'ทำรายการสำเร็จ'
        break
      default:
        break
    }
    return `${_message}`
  },
  getErrorMessage (errors) {
    if (typeof errors === 'string') {
      return this.catchErrorMessage(errors)
    }
    let errorMessage = '<div class="row">'
    if (typeof errors.errors === 'string') {
      errorMessage += `
            <div class='column' style='float: left;width: 100%;'>
            <h4>${errors.errors}</h4></div>`
    } else {
      console.log(errors, typeof errors)
      errors.errors.map((err) => {
        console.log(err)
        if (err.tag === 'required') {
          errorMessage += `<div class='column' style='float: left;width: 100%;'>
          <h4>${this.mapTagMessage(err.tag)} ${this.mapFieldMessage(
            err.failedField,
          )}</div></h4>`
        } else {
          errorMessage += `
            <div class='column' style='float: left;width: 100%;'>
            <h4>${this.mapFieldMessage(err.failedField)} ${this.mapTagMessage(
            err.tag,
          )} ${err.value}</div></h4>`
        }
      })
    }
    return `${errorMessage}</div>`
  },
  mapFieldMessage (field) {
    console.log(field)
    const message = this.message.find((v) => field.includes(v.field))
    if (message) {
      return message.text
    } else {
      return field
    }
  },
  mapTagMessage (tag) {
    let valid = tag
    switch (tag) {
      case 'required':
        valid = 'กรุณาระบุ'
        break
      case 'min':
        valid = 'ขั้นต่ำควรมากกว่าหรือเท่ากับ'
        break
      case 'max':
        valid = 'สูงสุดควรน้อยกว่าหรือเท่ากับ'
        break
      case 'unique':
        valid = 'นี้มีการใช้งานในระบบแล้ว'
        break
      default:
        break
    }
    return valid
  },
  catchErrorMessage (error) {
    const validate = ['required', 'min', 'max', 'unique']
    const validateSystem = [
    ]
    if (typeof error !== 'string') {
      if (error.length > 0) {
        error = error.message
      }
      if (error.errors) {
        if (error.errors.length > 0) {
          return this.getMessage(error.errors)
        }
      } else if (error.message) {
        error = error.message
      }
    }
    const message = this.message.find((v) => error.includes(v.field))
      ? this.message.find((v) => error.includes(v.field)).text
      : error
    const validLogin = validateSystem.find((v) => error.includes(v))
    let valid = validate.find((v) => error.includes(v))
    if (validLogin) valid = validLogin
    let validMessage = error ?? ''
    switch (valid) {
      case 'required':
        validMessage = 'กรุณาระบุ'
        break
      case 'min':
        validMessage = 'ขั้นต่ำควรมากกว่าหรือเท่ากับ'
        break
      case 'max':
        validMessage = 'สูงสุดควรน้อยกว่าหรือเท่ากับ'
        break
      default:
        break
    }
    if (valid === undefined) {
      return error
    } else if (valid === 'required') {
      return `${validMessage} ${message}`
    } else if (valid === 'min' || valid === 'max') {
      return `${message} ${validMessage}`
    } else {
      return `${validMessage}`
    }
  },
}
