import React from 'react'
import axios from "axios"

class TaskService {

  getAllTask() {
    return axios
      .get(
        `https://z8sp8dl9if.execute-api.eu-west-2.amazonaws.com/dev/10057/tasks1`
      )
  }
}

export default new TaskService();
