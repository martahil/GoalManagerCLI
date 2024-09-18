const { select, input, checkbox } = require('@inquirer/prompts')

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

const listGoal = async () => {
  const answers = await checkbox({
    message: "Use the arrows to switch between goals, the spacebar to mark or unmark, and Enter to complete this step.",
    choices: [...goals],
    instructions: false,
  })

  if(answers.length == 0) {
    console.log("No goal selected!")
    return
  }

  goals.forEach((m) => {
    m.checked = false
  })

  answers.forEach((answer) => {
    const goal = goals.find((m) => {
      return m.value == answer
    })

    goal.checked = true
  })

  console.log("Goal(s) marked as completed")
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
        await listGoal()
        break
      case 'go back':
        console.log("See you soon")
        return
    }
  }
}

start()