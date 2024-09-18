const { select } = require('@inquirer/prompts')

const start = async () => {

  while(true) {

    const option = await select({
      message: 'Menu >',
      choices: [
        {
          name: 'Create goal',
          value: 'add'
        },
        {
          name: 'List goals',
          value: 'list'
        },
        {
          name: "Go back",
          value: 'go back'
        }
      ]        
    })

    switch(option) {
      case 'add':
        console.log("Let's add")
        break
      case 'list':
        console.log("Let's list")
        break
      case 'go back':
        console.log("See you soon")
        return
    }
  }
}

start()