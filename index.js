const { select, input } = require('@inquirer/prompts')

let goal = {
  value: "Drink 3 liters of water per day",
  checked: false,
}

let goals = [ goal ]

const createGoal = async () => {
  const goal = await input({ message: "Type the goal:" })

  if(goal.length == 0) {
    console.log("The goal field cannot be empty.")
    return
  }

  goals.push({ value: goal, checked: false })
}

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
        await createGoal()
        console.log(goals)
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