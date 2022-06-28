const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { id, newUser, setupDB } = require("./fixtures/db");

// It will run before all tests run every time
beforeAll(setupDB);

test('should signup a new user', async () => {
    const response = await request(app).post("/users")
        .send({
            name: "Alvish",
            email: "alvish@gmail.com",
            password: "andy1234"
        })
        .expect(201);

    // Assert that the DB was changed correctly
    const user = await User.findById(response.body.newUser._id);
    expect(user).not.toBeNull();
})

test('should login existing user', async () => {
    const response = await request(app).post("/users/login")
        .send({
            email: newUser.email,
            password: newUser.password
        })
        .expect(200)

    const user = await User.findById(id);
    expect(response.body.token).toBe(user.tokens[1].token);
})

test('should not login on invalid credentials', async () => {
    await request(app).post("/users/login")
        .send({
            email: "alsh@gmail.com",
            password: "andy1234"
        })
        .expect(400)
})

test('should get profile for authorized user', async () => {
    await request(app).get("/users/me")
        .set("Authorization", newUser.tokens[0].token)
        .send()
        .expect(200);
})

test('should not get profile for unauthorized user', async () => {
    await request(app).get("/users/me")
        .send()
        .expect(401);
})

// test('should delete profile for authorized user', async () => {
//     await request(app).delete("/users/me")
//         .set("Authorization", newUser.tokens[0].token)
//         .send()
//         .expect(200);

//     const user = await User.findById(id);
//     expect(user).toBeNull();
// })

// test('should not delete user profile unauthorized user', async () => {
//     await request(app).delete("/users/me")
//         .send()
//         .expect(401);
// })

test('should upload avatar image', async () => {
    await request(app).post("/users/me/avatar")
        .set("Authorization", newUser.tokens[0].token)
        .attach("avatar", "test/fixtures/img.jpg")
        .expect(200)

    const user = await User.findById(id);
    expect(user.avatar).toEqual(expect.any(Buffer));
})

test('should update user profile', async () => {
    await request(app).patch("/users/me")
        .set("Authorization", newUser.tokens[0].token)
        .send({
            name: "Updated Name",
            age: 20
        })
        .expect(200)

    const user = await User.findById(id);
    expect(user.name).toBe("Updated Name");
})

test('should update user profile', async () => {
    await request(app).patch("/users/me")
        .set("Authorization", newUser.tokens[0].token)
        .send({
            location: "New Location"
        })
        .expect(400)
})







