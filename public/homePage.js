


const logoutButton = new LogoutButton()

logoutButton.action= fn => {
    ApiConnector.logout(response => {if (response.success) {location.reload()}})
}


ApiConnector.current(response => {if (response.success) {
    ProfileWidget.showProfile(response.data)
}})



const ratesBoard = new RatesBoard();

ApiConnector.getStocks(response => {if (response.success) {
    ratesBoard.clearTable();
    ratesBoard.fillTable(response.data)

    setInterval(() => {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data)
    }, 60000);
}})

