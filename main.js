const path = require('path')
const fs = require("fs");
const EventEmitter = require("events");
const emitter = new EventEmitter();
const os = require("os");
const zlib = require("zlib");
const http = require('http');

const filePath = './test.txt';
const dest = './test2.txt';
const destt = './test2.txt.gz';

//1
// const read = fs.createReadStream(filePath, {encoding : 'utf-8', highWaterMark : 3});
// read.on('data', (chunk) => {
//     console.log(chunk);
// })

// ---------------------------------------------

//2
// const read = fs.createReadStream(filePath);
// const write = fs.createWriteStream(dest);
// read.on("data", (chunk) => {
//     write.write(chunk);
// });

// ---------------------------------------------

//3
// const read = fs.createReadStream(filePath);
// const write = fs.createWriteStream(destt);
// const zip = zlib.createGzip();

// read.pipe(zip).pipe(write);

// ---------------------------------------------

//4

// const server = http.createServer((req, res) => {
//     if(req.method === 'POST' && req.url === '/user') {
//         let body = '';
//         let id = 0
//         req.on('data', chunk => {
//             body += chunk.toString();
//         });
//         req.on("end", () => {
//             try {
//                 const newUser = JSON.parse(body);
//                 const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));

//                 if (users.some(u => u.email === newUser.email)) {
//                     res.writeHead(400, { "Content-Type": "application/json" });
//                     res.end(JSON.stringify({ message: "Email already exists!" }));
//                     return;
//                 }
//                 const maxId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;
//                 newUser.id = maxId + 1;
//                 users.push(newUser);
//                 fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
//                 res.writeHead(201, { "Content-Type": "application/json" });
//                 res.end(JSON.stringify(newUser));
//             } catch (err) {
//                 res.writeHead(500, { "Content-Type": "application/json" });
//                 res.end(JSON.stringify({ message: err.message }));
//             }
//         });
//     }
//     else if(req.method === 'PATCH' && req.url.startsWith('/user/')) {
//         const id = parseInt(req.url.split("/")[2]);
//         let body = '';
//         req.on('data', chunk => {
//             body += chunk.toString();
//         });
//         req.on('end' , () => {
//             try{
//                 const updatedData = JSON.parse(body);
//                 const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
//                 const userIndex = users.findIndex(u => u.id === id);
//                 if(userIndex === -1){
//                     res.writeHead(404, {"Content-Type" : "application/json"});
//                     res.end(JSON.stringify({message : "User not found"}));
//                     return;
//                 }
//                 const updatedUser = {...users[userIndex], ...updatedData};
//                 users[userIndex] = updatedUser;
//                 fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
//                 res.writeHead(200, {"Content-Type" : "application/json"});
//                 res.end(JSON.stringify(updatedUser));
//             }catch(err){
//                 res.writeHead(500, {"Content-Type" : "application/json"});
//                 res.end(JSON.stringify({message : err.message}));
//             }
//         })
//     }
//     else if(req.method === 'DELETE' && req.url.startsWith('/user/')) {
//         const id = parseInt(req.url.split("/")[2]);
//         try{
//             const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
//             const userIndex = users.findIndex(u => u.id === id);
//             if(userIndex === -1){
//                 res.writeHead(404, {"Content-Type" : "application/json"});
//                 res.end(JSON.stringify({message : "User not found"}));
//                 return;
//             }
//             users.splice(userIndex, 1);
//             fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
//             res.writeHead(200, {"Content-Type" : "application/json"});
//             res.end(JSON.stringify({message : "User deleted successfully"}));
//         }catch(err){
//             res.writeHead(500, {"Content-Type" : "application/json"});
//             res.end(JSON.stringify({message : err.message}));
//         }
//     }
//     else if(req.method === 'GET' && req.url === '/user') {
//         try{
//             const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
//             res.writeHead(200, {"Content-Type" : "application/json"});
//             res.end(JSON.stringify(users));
//         }catch(err){
//             res.writeHead(500, {"Content-Type" : "application/json"});
//             res.end(JSON.stringify({message : err.message}));
//         }
//     }
//     else if(req.method === 'GET' && req.url.startsWith('/user/')) {
//         const id = parseInt(req.url.split("/")[2]);
//         try{
//             const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
//             const user = users.find(u => u.id === id);
//             if(!user){
//                 res.writeHead(404, {"Content-Type" : "application/json"});
//                 res.end(JSON.stringify({message : "User not found"}));
//                 return;
//             }
//             res.writeHead(200, {"Content-Type" : "application/json"});
//             res.end(JSON.stringify(user));
//         }catch(err){
//             res.writeHead(500, {"Content-Type" : "application/json"});
//             res.end(JSON.stringify({message : err.message}));
//         }
//     }
// });

// server.listen(3000, () => {
//     console.log('Hello');
// })

// ---------------------------------------------

//5
// 1- Event loop is a core thing in Node that handles async operations because js is a Single Thread that perform operation async using it
// 2- Libuv is a C lib that Node is built with it to handle async operation because C is a OS-level so its more efficient its role is: \event loop imp, Threading and fs operations
// 3- it handles async operations using Libuv for fs and threading and event loop for callbacks
// 4- 
    // Call Stack Where code is executed synchronously.
    // Event Queue Queue of callbacks waiting to be executed after async tasks.
    // Event Loop moves callbacks from queue to stack when stack is empty.
// 5- thread pool is used for tasks thata have blocking like fs, cyrpto and the default size is 4 and we change it through environment vars
// 6- blocking : runs code sync, non blocking : runs code async

// Postman Collection Link: https://www.postman.com/maimel0o-bakry-2611545/workspace/assignment-3/collection/47280745-e6ecfae4-e022-4487-a5f0-d7ecbb97b2be?action=share&creator=47280745

// BOUNS

// function majorityElement(nums) {
//     let candidate = null;
//     let count = 0;

//     for (let num of nums) {
//         if (count === 0) {
//             candidate = num;
//         }
//         count += (num === candidate) ? 1 : -1;
//     }

//     return candidate;
// }
// console.log(majorityElement([3,2,3]));
// console.log(majorityElement([2,2,1,1,1,2,2]));
