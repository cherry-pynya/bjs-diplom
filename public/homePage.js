







const logoutButton = new LogoutButton()

logoutButton.action= fn => {
    ApiConnector.logout(response => {if (response.success) {location.reload()}})
}


ApiConnector.current(response => {if (response.success) {
    ProfileWidget.showProfile(response.data)
}})



const ratesBoard = new RatesBoard();



function getStocks() {

    ApiConnector.getStocks(response => {if (response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data)
    }})

}

setInterval(getStocks(), 60000)

const moneyManager = new MoneyManager()

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {if (response.success){
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, "денюжка на месте")
    } else if (!response.success){
        moneyManager.setMessage(response.success, response.error)
    }})
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "денюжка поменяна");
            console.log(response)
        } else if (!response.success) {
            moneyManager.setMessage(response.success, response.error)
        }
    })
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "денюжка ушла");
        } else if (!response.success) {
            moneyManager.setMessage(response.success, response.error)
        }
    })
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } if (!response.success) {
            moneyManager.setMessage(response.success, response.error)
        }
    })
}

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } if (!response.success) {
            moneyManager.setMessage(response.success, response.error)
        }
    })
}