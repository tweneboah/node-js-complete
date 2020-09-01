//Promise that resolve automatically
const p = Promise.resolve({ id: 20 });

//p.then(result => console.log(result));

//Promise that reject automatically

const p2 = Promise.reject(new Error('Something happend'));

//p2.catch(err => console.log(err));
