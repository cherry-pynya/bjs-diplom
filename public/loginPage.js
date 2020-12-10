"use strict"




const userForm = new UserForm()

userForm.loginFormCallback = function func(data) {
    ApiConnector.login(data, response => {if (response.success) {
        location.reload()} else if(!response.success) {
            userForm.setLoginErrorMessage(response.error)
        }})
}

userForm.registerFormCallback = function func(data) {
    ApiConnector.register(data, response => {if (response.success) {
        location.reload()
    } else if (!response.success) {
        userForm.setRegisterErrorMessage(response.error)
    }})
}
    


