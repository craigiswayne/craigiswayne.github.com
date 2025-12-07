| Feature              | interface                                                        | type                                                                                        |
|----------------------|------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| Defines              | Object shapes and class contracts.                               | Any TypeScript type, including object shapes, unions, intersections, tuples, and primitives |
|                      |                                                                  |                                                                                             |
| Declaration Merging  | Yes                                                              | No                                                                                          |
|                      | Multiple interface blocks with the same name are merged into one | A type alias is final once declared and cannot be added to                                  |
|                      |                                                                  |                                                                                             |
| Extending            | Uses the extends keyword. Can extend multiple interfaces.        | Uses the & (intersection) keyword to combine shapes.                                        |
|                      |                                                                  |                                                                                             |
| Implemented by Class | Yes                                                              | Yes                                                                                         |
|                      | Use class MyClass implements MyInterface { ... }                 | A class can implement a type if the type represents an object shape.                        |
|                      |                                                                  |                                                                                             |
| Unions & Tuples      | No                                                               | Yes                                                                                         |
