db = db.getSiblingDB('perfMon');

db.createUser({
    user: "perfUser",
    pwd: "perfPassword",
    roles: [
        { role: "readWrite", db: "perfMon" }
    ]
});

db.createCollection('someFakeCollection');