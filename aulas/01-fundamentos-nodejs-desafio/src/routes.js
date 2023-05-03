import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js';
import { isValidTaskId } from './utils/is-valid-task-id.js';
import { HTTP_METHODS, TASKS_TABLE_NAME } from './utils/constants.js';

const database = new Database()

export const routes = [
  {
    method: HTTP_METHODS.POST,
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'title is required' }),
        )
      }

      if (!description) {
        return res.writeHead(400).end(
          JSON.stringify({message: 'description is required' })
        )
      }

      database.insert(TASKS_TABLE_NAME, {
        id: randomUUID(),
        title, 
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: null,
       })

      return res.writeHead(201).end()
    }
  },
  {
    method: HTTP_METHODS.GET,
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const filter = Object.entries(req.query).reduce((result, [key, value]) => {
        result[key] = value

        return { ...result }
      }, {})

      const tasks = database.select(TASKS_TABLE_NAME, Object.values(filter).length >= 1 ? filter : null);

      return res.end(JSON.stringify(tasks));
    }
  },
  {
    method: HTTP_METHODS.PUT,
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body

      if (!title || !description) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'title or description are required' })
        )
      }

      if (!isValidTaskId(database, id)) {
        return res.writeHead(404).end(JSON.stringify({ message: 'Task id not exists'}));
      }

      database.update(TASKS_TABLE_NAME, id, {
        title,
        description,
        updated_at: new Date()
      })

      return res.writeHead(200).end()
    }
  },
  {
    method: HTTP_METHODS.PATCH,
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      if (!isValidTaskId(database, id)) {
        return res.writeHead(404).end(JSON.stringify({ message: 'Task id not exists'}));
      }

      const [task] = database.select('tasks', { id })

      const isTaskCompleted = !!task.completed_at
      const completed_at = isTaskCompleted ? null : new Date()

      database.update(TASKS_TABLE_NAME, id, { completed_at })

      return res.writeHead(204).end()
    }
  },
  {
    method: HTTP_METHODS.DELETE,
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      if (!isValidTaskId(database, id)) {
        return res.writeHead(404).end(JSON.stringify({ message: 'Task id not exists'}));
      }
  
      database.delete(TASKS_TABLE_NAME, id);

      return res.writeHead(204).end()
    }
  },
]