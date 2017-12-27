# Principles of Redux:

1. Represent the `whole application state` as a `single javascript 
object`. Everything that changes in your application including
the `data` and the `UI state` is contained in a single object called
`state` or `state tree`.

2. The `state` is _read only_. You can not modify or write to it. Instead
anytime you want to change the state, you need to dispatch an `action`.
An `action` is a plain javascript object describing the change.
**Note**: `state` is the representation of the data in your app, `actions` is the
minimal representation of the change to the data.  
The structure of the action object is upto us, the only requirement is
that, it should have a `type` property which is not undefined. The value
for `type` is recommended to be string, so that it is easy to serialize.

3. To describe state mutation you have a write a function which takes the 
previous state of the app, the action being dispatched and returns the
next state of the app. This function has to be `pure` and this is called
`reducers`.
