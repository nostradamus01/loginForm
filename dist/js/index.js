const foo = async () => {
    const url = '/.netlify/functions/mongo';
    const result = await fetch(url);
    console.log(result)
    return result;
}

setTimeout( () => {
    foo();
}, 3000);