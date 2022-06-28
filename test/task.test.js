const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const { newUser, id, id2, newUser2, task1, task2, setupDB } = require("./fixtures/db");


beforeAll(setupDB);

test('should create task for user', async () => {
    const response = await request(app).post("/tasks")
        .set("Authorization", newUser.tokens[0].token)
        .send({
            "description": "This is my task created using test case"
        })
        .expect(201);

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
})

test('should get all task of the user', async () => {
    const response = await request(app).get("/tasks")
        .set("Authorization", newUser.tokens[0].token)
        .expect(200);

    expect(response.body.length).toBe(2);
})

test('should not delete the task if user is unauthorized', async () => {
    await request(app).delete(`/tasks/${task2._id}`)
        .set("Authorization", newUser.tokens[0].token)
        .expect(404)
})

