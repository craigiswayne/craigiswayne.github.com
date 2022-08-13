```
const data = [
  {
    id: 1,
    categories: [
      7,
      8,
      9,
      101
    ]
  },
  {
    id: 2,
    categories: [
      7,
      88,
      999,
      65
    ]
  }
];

console.log(data.map( x => x.categories ))
// [[7,8,9,101],[7,88,999,65]]

console.log(data.flatMap( x => x.categories ))
// [7, 8, 9, 101, 7, 88, 999, 65]

```
