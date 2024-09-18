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

  goals.forEach((m) => {
    m.checked = false
  })

  if(answers.length == 0) {
    console.log("No goal selected!")
    return
  }  

  answers.forEach((answer) => {
    const goal = goals.find((m) => {
      return m.value == answer
    })

    goal.checked = true
  })

  console.log("Goal(s) marked as completed")
}

const completedGoals = async () => {
  const completed = goals.filter((goal) => {
    return goal.checked
  })

  if(completed.length == 0) {
    console.log("There are no completed goals!:(")
    return
  }

  await select({
    message: 'Completed goals',
    choices: [...completed]
  })
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
          name: 'Completed goals',
          value: 'completed'
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
      case 'completed':
        await completedGoals()
        break
      case 'go back':
        console.log("See you soon")
        return
    }
  }
}

start()