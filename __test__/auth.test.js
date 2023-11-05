const axios = require("axios")

let token = "";
let item_id = "";

test("Registration test", async () => {
    const response = await axios.post("http://localhost:8000/v1/auth/register", {
        full_name: "ismail Ola",
        username: "mentorT",
        role: "admin",
        password: "test1234", 
    });

    expect(response.status).toBe(201);
    expect(response.data.message).toBe("account created succesfully");
});

test("Login test", async () => {
    const response = await axios.post("http://localhost:8000/v1/auth/login", {
        username: "mentorT",
        password: "test1234", 
    });

    expect(response.status).toBe(200);
    expect(typeof(response.data)).toBe("object");
    token = response.data.token
});

test("Add an item", async () => {
    global.token = token;
    const response = await axios.post("http://localhost:8000/v1/shopitems", {
        name: "Bread",
        description: "lorem ipsum",
        price: 50, 
        isInStock: true
    }, {
        headers: {
            Authorization : `Bearer ${token}`
        }
    });

    item_id = response.data.newShopItem._id;
    expect(response.data.isRequestSuccesful).toBe(true);
});

test("Get items", async () => {
    global.token = token;
    const response = await axios.get("http://localhost:8000/v1/shopitems", {
        headers: {
            Authorization : `Bearer ${token}`
        }
    });

    expect(response.status).toBe(200);
    expect(typeof(response.data)).toBe("object");
});

test("delete a task", async () => {
    global.token = token;
    const response = await axios.delete(`http://localhost:8000/v1/shopitems/${item_id}`, {
        headers: {
            Authorization : `Bearer ${token}`
        }
    });

    expect(response.status).toBe(200);
    expect(response.data).toBe("item has been deleted sccessfully");
});