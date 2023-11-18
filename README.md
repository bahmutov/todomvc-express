# todomvc-express ![cypress version](https://img.shields.io/badge/cypress-13.5.1-brightgreen) [![ci](https://github.com/bahmutov/todomvc-express/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/bahmutov/todomvc-express/actions/workflows/ci.yml)

> TodoMVC with server-side rendering

[![NPM][todomvc-express-icon] ][todomvc-express-url]

[![semantic-release][semantic-image] ][semantic-url]

Live demo at [todomvc-express.herokuapp.com/](https://todomvc-express.herokuapp.com/) -
might be asleep, wait 10 seconds. Does not permanently store todos; they disappear when
the dyno goes to sleep.

Complete server-side rendering for TodoMVC using [ExpressJS](http://expressjs.com/) server and [virtual-dom](https://github.com/Matt-Esch/virtual-dom).

In fact, NO client side
JavaScript is allowed using
[Content Security Policy](https://glebbahmutov.com/blog/disable-inline-javascript-for-security/)
setting in the page "meta" tag (view page source). You can disable JavaScript in your browser
and the page will still work just fine.

Any new todo, or click leads to the form submission and new page rendering.

## Use

You can clone this repo and start the server locally

    npm start

The open `localhost:3000` to play with the application. Local data is saved in `todos.json`. The Express server itself is defined in file [src/app.js](src/app.js) that you can reuse from other environments

## Tests

To run the server and the Cypress test

```shell
npm run dev
```

Find the tests in the [cypress/integration](./cypress/integration) folder. There are UI and API tests.

## Related

I have written a couple of modules that help with TodoMVC applications.

- [virtual-todos](https://github.com/bahmutov/virtual-todos) - generates Virtual Dom from todos
- [fake-todos](https://github.com/bahmutov/fake-todos) to generate fake todo items
- [todomvc-model](https://github.com/bahmutov/todomvc-model) is the model that keeps
  todo items and responds to outside events
- [instant-vdom-todo](https://github.com/bahmutov/instant-vdom-todo) - instant web app
  using ServiceWorker

## Emit

The returned Express app is also an event emitter. Every data update it
emits the updated todo list.

```js
const app = require('todomvc-express')
app.on('todos', function (todos) {
  console.log('server has new %d todos', todos.length)
  // each todo object has {what, done, id} like this
  /*
    { what: 'new todo',
       done: false,
       id: '43e63255-5582-4f6f-85c2-dc2e85e44ffb' }
  */
})
```

## Caching

I have added a level of in-memory caching, see [src/cache.js](src/cache.js). Instead of calling `db` methods directly, like `db.loadTodos()` the app code goes through the cache methods, that have same API as db. To better show caching, I slowed down the `db.loadTodos` to take 1 second.

### Small print

Author: Gleb Bahmutov &copy; 2016

- [@bahmutov](https://twitter.com/bahmutov)
- [glebbahmutov.com](http://glebbahmutov.com)
- [blog](http://glebbahmutov.com/blog/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/todomvc-express/issues) on Github

## MIT License

Copyright (c) 2016 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[todomvc-express-icon]: https://nodei.co/npm/todomvc-express.svg?downloads=true
[todomvc-express-url]: https://npmjs.org/package/todomvc-express
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
