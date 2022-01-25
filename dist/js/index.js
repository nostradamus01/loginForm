const foo = async () => {
    const url = '/.netlify/functions/mongo';
    let result = await fetch(url);
    const res1 = await result.json();
    result = await fetch(url);
    const res2 = await result.text();
    console.log(result);
    console.log(res1);
    console.log(res2);
    // return result;
}

setTimeout( () => {
    foo();
}, 3000);