const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('userLoggedIn', (user) => {
  console.log(`[event] userLoggedIn: ${user.id}`);
});

emitter.on('noteCreated', (note) => {
  console.log(`[event] noteCreated: "${note.title}"`);
});

module.exports = emitter;
