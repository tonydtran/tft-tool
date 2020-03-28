class Store {
  constructor() {
    this.message = 'Hello, World'
  }

  handleUpdateMessage = message => {
    this.test = message
  }
}

export default Store
