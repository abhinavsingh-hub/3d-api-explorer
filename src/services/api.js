/**
 * API Service for Public API playground
 */

export const fetchDog = async () => {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    if (!response.ok) throw new Error('Failed to fetch dog image');
    const data = await response.json();

    // Extract breed from URL
    // Example: https://images.dog.ceo/breeds/poodle-standard/n02113799_2280.jpg
    const urlParts = data.message.split('/');
    const breedPart = urlParts[urlParts.indexOf('breeds') + 1];
    const breedName = breedPart
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .reverse()
        .join(' ');

    return { image: data.message, breed: breedName };
};

export const fetchJoke = async () => {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    if (!response.ok) throw new Error('Failed to fetch joke');
    return await response.json();
};

export const fetchUser = async () => {
    const response = await fetch('https://randomuser.me/api/');
    if (!response.ok) throw new Error('Failed to fetch user');
    const data = await response.json();
    const user = data.results[0];

    return {
        name: `${user.name.first} ${user.name.last}`,
        photo: user.picture.large,
        email: user.email,
        country: user.location.country,
        age: user.dob.age,
        phone: user.phone
    };
};

export const fetchJSONPlaceholder = async (type = 'posts') => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${type}?_limit=5`);
    if (!response.ok) throw new Error(`Failed to fetch ${type}`);
    return await response.json();
};
