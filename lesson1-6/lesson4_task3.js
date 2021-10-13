
const submitButton = document.querySelector('.forms')
const nameInput = document.querySelector('#NameInput')
const phoneInput = document.querySelector('#PhoneInput')
const emailInput = document.querySelector('#EmailInput')

const regExpLetters = new RegExp('(^[a-z]+$)|(^[а-яё]+$)', 'i')
const regExpPhone = new RegExp('^[\+]7[\(][0-9]{3}[\)][0-9]{3}[\-][0-9]{4}$')
const regExpEmail = new RegExp('^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.?]{1,6})$')

const nameWarning = document.createTextNode('Ошибка в имени')
const phoneWarning = document.createTextNode('Ошибка в формате телефона')
const emailWarning = document.createTextNode('Ошибка в email')

submitButton.addEventListener('click',(e) => {
    if (!regExpLetters.test(nameInput.value)) {
        if (nameInput.classList.contains('good-input')) {
            nameInput.classList.remove('good-input')
        }
        nameInput.classList.add('alert-input')
        nameInput.after(nameWarning)
    } else {
        if (nameInput.classList.contains('alert-input')) {
            nameWarning.remove()
            nameInput.classList.remove('alert-input')
        }
        nameInput.classList.add('good-input')
    }
    if (!regExpPhone.test(phoneInput.value)) {
        if (phoneInput.classList.contains('good-input')) {
            phoneInput.classList.remove('good-input')
        }
        phoneInput.classList.add('alert-input')
        phoneInput.after(phoneWarning)
    } else {
        if (phoneInput.classList.contains('alert-input')) {
            phoneWarning.remove()
            phoneInput.classList.remove('alert-input')
        }
        phoneInput.classList.add('good-input')
    }
    if (!regExpEmail.test(emailInput.value)) {
        if (emailInput.classList.contains('good-input')) {
            emailInput.classList.remove('good-input')
        }
        emailInput.classList.add('alert-input')
        emailInput.after(emailWarning)
    } else {
        if (emailInput.classList.contains('alert-input')) {
            emailWarning.remove()
            emailInput.classList.remove('alert-input')
        }
        emailInput.classList.add('good-input')
    }
    console.log(`nameInput.value - ${nameInput.value} - ${nameInput.value.match(regExpLetters)} - ${regExpLetters.test(nameInput.value)}`)
    console.log(`phoneInput.value - ${regExpPhone.test(phoneInput.value)}`)
    console.log(`emailInput.value - ${emailInput.value} - ${regExpEmail.test(emailInput.value)}`)
});


//+7(495)725-8880