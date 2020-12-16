const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const models = require('./models')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

// const sequelize = new Sequelize('sequelize_tests', 'app1', 'welcome123', {
//   dialect: 'mysql'
// })

const app = express()
app.use(cors())
app.use(bodyParser.json())


app.get('/people', async (req, res, next) => {
  const query = {
    where: {}
  }
  if (req.query.filter) {
    query.where.name = {
      [Op.like]: `%${req.query.filter}%`
    }
  }
  let pageSize = 10
  if (req.query.pageSize) {
    pageSize = parseInt(req.query.pageSize)
  }
  if (req.query.page) {
    const page = parseInt(req.query.page)
    query.limit = pageSize
    query.offset = pageSize * page
  }
  console.warn(query)
  try {
    const people = await models.Person.findAll(query)
    res.status(200).json(people)
  } catch (err) {
    next(err)
  }
})

app.post('/people', async (req, res, next) => {
  try {
    await models.Person.create(req.body)
    res.status(201).json({ message: 'created' })
  } catch (err) {
    next(err)
  }
})

app.get('/people/:pid', async (req, res, next) => {
  try {
    const person = await Person.findByPk(req.params.pid)
    if (person) {
      res.status(200).json(person)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.put('/people/:pid', async (req, res, next) => {
  try {
    const person = await models.Person.findByPk(req.params.pid)
    if (person) {
      await person.update(req.body)
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.delete('/people/:pid', async (req, res, next) => {
  try {
    const person = await models.Person.findByPk(req.params.pid)
    if (person) {
      await person.destroy()
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.get('/people/:pid/cars', async (req, res, next) => {
  try {
    const person = await models.Person.findByPk(req.params.pid, {
      include: [ models.Car ]
    })
    if (person) {
      res.status(200).json(person.cars)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.post('/people/:pid/cars', async (req, res, next) => {
  try {
    const person = await models.Person.findByPk(req.params.pid)
    if (person) {
      let car = new models.Car(req.body)
      car.personId = person.id
      await car.save()
      res.status(201).json({ message: 'created' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.get('/people/:pid/cars/:cid', async (req, res, next) => {
  try {
    const person = await models.Person.findByPk(req.params.pid)
    if (person) {
      const cars = await person.getCars({ id: req.params.cid })
      const car = cars.shift()
      if (car) {
        res.status(200).json(car)
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.put('/people/:pid/cars/:cid', async (req, res, next) => {
  try {
    const person = await models.Person.findByPk(req.params.pid)
    if (person) {
      const cars = await person.getCars({ id: req.params.cid })
      const car = cars.shift()
      if (car) {
        car.maker = req.body.maker
        car.series = req.body.series
        car.type = req.body.type
        await car.save()
        res.status(202).json({ message: 'accepted' })
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})


app.delete('/people/:pid/cars/:cid', async (req, res, next) => {
  try {
    const person = await models.Person.findByPk(req.params.pid)
    if (person) {
      const cars = await person.getCars({ id: req.params.cid })
      const car = cars.shift()
      if (car) {
        await car.destroy()
        res.status(202).json({ message: 'accepted' })
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.use((err, req, res, next) => {
  console.warn(err)
  res.status(500).json({ message: 'server error' })
})

app.listen(8080)