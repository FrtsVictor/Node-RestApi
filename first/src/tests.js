// const getAll = async () => {
//   let resp = await fetch("localhost:300/users")
//     .then((response) => console.log(response.json()))
//     .catch((err) => console.log(err));
// };

// getAll();

let url = "http://localhost:3000/users";

const sla = null;

const apiget = async () => {
  await fetch(url, {})
    .then((resp) => {
      let test = resp.json();
      sla = test;
      console.log(test);
    })
    .catch((err) => console.log(err));
};
