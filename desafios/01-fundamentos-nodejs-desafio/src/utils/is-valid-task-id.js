import { TASKS_TABLE_NAME } from './constants.js';

export function isValidTaskId(database, id) {
  const foundTask = database.select(TASKS_TABLE_NAME, { id })

  if(!foundTask) {
    return false
  }

  return true
}