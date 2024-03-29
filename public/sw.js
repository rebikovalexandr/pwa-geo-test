self.addEventListener('message', (event) => {
    console.log('message', event.data.coords);
})