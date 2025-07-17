const display = document.getElementById("profile");

const users = [
    {
        name: "David",
        age: 28,
        bio: "Trying to make it as a footballer"
    },
    {
        name: "Yasmeen",
        age: 32,
        bio: "Astrophysicist, shooting beyond the stars"
    },
    {
        name: "Michelle",
        age: 26,
        bio: "Graphics designer"
    },
    {
        name: "Leah",
        age: 29,
        bio: "Entrepreneur: owner of Olea skincare products "
    }
];

let currentIndex = 0;

function showProfile() {
    const user = users[currentIndex];
    display.innerHTML = `
        <h3>Name: ${user.name}</h3>
        <p>Age: ${user.age}</p>
        <p>Bio: ${user.bio}</p>
    `;
}

function nextProfile() {
    currentIndex = (currentIndex + 1) % users.length;
    showProfile();
}

function prevProfile() {
    currentIndex = (currentIndex - 1 + users.length) % users.length;
    showProfile();
}


showProfile();
