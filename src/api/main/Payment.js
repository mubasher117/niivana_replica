import API from ".."

export function Payment(data) {
  return API.post("/booking/pay_provider/", JSON.stringify(data))
}
export function getStripeToken(cardNo, cvc, expMonth, expYear) {
  return new Promise((resolve, reject) => {
    var data = `card%5Bnumber%5D=${cardNo}&card%5Bexp_month%5D=${expMonth}&card%5Bexp_year%5D=${expYear}&card%5Bcvc%5D=${cvc}`

    var xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        resolve(JSON.parse(this.responseText))
      }
    })

    xhr.open("POST", "https://api.stripe.com/v1/tokens")
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.setRequestHeader(
      "Authorization",
      "Bearer pk_test_51K1wwcHYLxafdjZpXxhDH7ufivygEeS49tcnPxmXwlUTkajA0K0DQms2KY1byw0pmtE4Gmi7QfeTW3HW1qs02Igq008eXBCpnx"
    )

    xhr.send(data)
  })
}

export function createCard(stripeToken) {
  var formdata = new FormData()
  formdata.append("token", stripeToken)
  return API.post("/booking/create_source/", JSON.stringify(formdata))
}
export function getUserCards() {
  return API.get("/booking/get_cards/")
}
export function makePayment(price, providerId, bookingTime, bookingHelp) {
  if (price) {
    price = price / 100
  }
  // console.log(price, providerId, bookingTime, bookingHelp)
  // var formdata = new FormData()
  // formdata.append("price", price?.toString())
  // formdata.append("recurring", "0")
  // formdata.append("provider_id", providerId?.toString())
  // formdata.append("booking_time", bookingTime)
  // formdata.append("booking_type", "urgent")
  // formdata.append("booking_help", bookingHelp)
  // // const data = JSON.stringify({
  //   "price": price?.toString(),
  //   "provider_id": providerId?.toString(),
  //   "recurring": "0",
  //   "booking_time": bookingTime,
  //   "booking_type": "urgent",
  //   "booking_help": bookingHelp
  // });
  const data = JSON.stringify({
    "price": price,
    "provider_id": providerId?.toString(),
    "booking_time": bookingTime,
    "booking_type": 2,
    "booking_help": bookingHelp
  });
  console.log(data)
  return API.post("/booking/pay_provider/", data)
}
