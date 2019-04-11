const data = {
  labels: ['1', '2', '3', '4', '5', '6', '7'],
  datasets: [{
    data: [ 20, 30, 35, 37, 40, 40, 40 ],
    color: (opacity = 1) => `rgba(61, 176, 215, ${opacity})`, // optional
    strokeWidth: 10 // optional
  }]
}

export { data }
