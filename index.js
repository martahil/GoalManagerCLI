const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let message = "Welcome to Goal Manager CLI!"

let goals

const loadGoals = async () => {
  try {
    const data = await fs.readFile("goals.json", 'utf-8')
    goals = JSON.parse(data)
  }
  catch (error) {
    goals = []
  }
}

const saveGoals = async () => {
  await fs.writeFile("goals.json", JSON.stringify(goals, null, 2))
}

const createGoal = async () => {
  const goal = await input({ message: "Type the goal:" })

  if (goal.length == 0) {
    message = "The goal field cannot be empty."
    return
  }

  goals.push({ value: goal, checked: false })

  message = 'Goal(s) successfully created!'
}

const listGoal = async () => {
  if(goals.length == 0) {
    message =  "There are no goals!"
    return
  }

  const answers = await checkbox({
    message: "Use the arrows to switch between goals, the spacebar to mark or unmark, and Enter to complete this step.",
    choices: [...goals],
    instructions: false,
  })

  goals.forEach((m) => {
    m.checked = false
  })

  if (answers.length == 0) {
    message = "No goal selected!"
    return
  }

  answers.forEach((answer) => {
    const goal = goals.find((m) => {
      return m.value == answer
    })

    goal.checked = true
  })

  message = "Goal(s) marked as completed"
}

const completedGoals = async () => {
  if(goals.length == 0) {
    message =  "There are no goals!"
    return
  }

  const completed = goals.filter((goal) => {
    return goal.checked
  })

  if (completed.length == 0) {
    message = "There are no completed goals! :("
    return
  }

  await select({
    message: 'Completed goals: ' + completed.length,
    choices: [...completed]
  })
}

const pendingGoals = async () => {
  if(goals.length == 0) {
    message =  "There are no goals!"
    return
  }

  const pending = goals.filter((goal) => {
    return goal.checked != true
  })

  if (pending.length == 0) {
    message = "There are no pending goals! :)"
    return
  }

  await select({
    message: 'Pending goals: ' + pending.length,
    choices: [...pending]
  })
}

const deleteGoals = async () => {
  if(goals.length == 0) {
    message =  "There are no goals!"
    return
  }
  
  const unmarkedGoals = goals.map((goal) => {
    return { value: goal.value, checked: false }
  })

  const itemsToDelete = await checkbox({
    message: "Select item to delete.",
    choices: [...unmarkedGoals],
    instructions: false,
  })

  if (itemsToDelete.length == 0) {
    message = "There are no items to delete."
    return
  }

  itemsToDelete.forEach((item) => {
    goals = goals.filter((goal) => {
      return goal.value != item
    })
  })

  message = 'Goal(s) successfully deleted!'
}

const showMessage = () => {
  console.clear()

  if (message != '') {
    console.log(message)
    console.log('')
    message = ''
  }
}

const start = async () => {
  await loadGoals()

  while (true) {
    showMessage()
    await saveGoals()

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
          name: 'Pending goals',
          value: 'pending'
        },
        {
          name: 'Delete goals',
          value: 'delete'
        },
        {
          name: "Go back",
          value: 'go back'
        }
      ]
    })

    switch (option) {
      case 'add':
        await createGoal()
        break
      case 'list':
        await listGoal()
        break
      case 'completed':
        await completedGoals()
        break
      case 'pending':
        await pendingGoals()
        break
      case 'delete':
        await deleteGoals()
        break
      case 'go back':
        console.log("See you soon")
        return
    }
  }
}

start()