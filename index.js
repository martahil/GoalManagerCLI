const start = () => {

  while(true) {
    let option = 'create goal'
    switch(option) {
      case 'create goal':
        console.log("let's add")
        break
      case 'list':
        console.log("let's list")
        break
      case 'go back':
        return
    }
  }
}

start()