class Client {
  getAllData() {
    return new Promise(
      (resolve, reject) => {
        return resolve(
          [
            {
              title: "January Sales", items: [
                {name: "shoe", count: 40},
                {name: "hat", count: 90},
                {name: "phone", count: 35},
                {name: "laptop", count: 10}
              ]
            }
          ]
        )
      }
    )

  }

  addData(data) {
    return new Promise(
      (resolve, reject) => {
        return resolve(
            {
              title: "January Sales", items: [
                {name: "shoe", count: 40},
                {name: "hat", count: 90},
                {name: "phone", count: 35},
                {name: "laptop", count: 10}
              ]
            }
        )
      }
    )
  }
}

export default Client