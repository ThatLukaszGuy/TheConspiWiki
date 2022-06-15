"use strict";



function redirect() {

    const links = []

    fetch('/api/articles/all').then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then((data) => {
        const baseRoute = '/categories/'
        data.map((i) => (
            links.push(baseRoute.concat(i._id))
        ))
        
    }).then(() => {
        const randomLink = links[(Math.random() * links.length) | 0]
        window.location.href = randomLink 
    })
    .catch((err) => {
        console.warn('Something went wrong.', err);
    });
};

document.getElementById('link').onclick = () => {
    redirect()

};

