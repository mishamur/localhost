window.onload = function() {
    const server = new Server();
    
    document.getElementById('loginButton').addEventListener('click', async function() {
        const login = document.getElementById('login').value;
        const playGame = document.querySelector('#playGame');
        const currResult = document.querySelector('.currResult');
        const bestResult = document.querySelector('.bestResult');
        playGame.onclick = (e) =>{
            playGame.classList.add('displayNone');
            renderGame(server);
        }
        const password = document.getElementById('password').value;
        if (login && password) {
       //     console.log(await server.auth(login, password)); 
            const token = await server.auth(login, password);
            console.log(token);
            if(token) {
                hide('auth');
                show('cookie');
                show('logoutButton');
                bestResult.classList.remove('displayNone');
                currResult.classList.remove('displayNone');
                playGame.classList.remove('displayNone');
                let error = document.querySelector('.error');
                if(error.classList.contains('displayNone')){
                error.classList.add('displayNone');
                }
            }
            else {
                let error = document.querySelector('.error');
                error.classList.remove('displayNone');   
            }
        } else {
            alert('Введите логин или пароль!!!');
        }
    }); 


    document.getElementById('registrationButton').addEventListener('click', async function() {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        if (login && password) {
            await server.registration(login, password)
        } else {    
           alert('Введите логин или пароль!!!');
        }
    });

    document.getElementById('logoutButton').addEventListener('click', async function() {
        //console.log(await server.logout());
        const logout = await server.logout();
        if(logout) {
            show('auth');
            hide('logoutButton');
            hide('cookie');
            playGame.classList.add('displayNone');
            const currResult = document.querySelector('.currResult');
            const bestResult = document.querySelector('.bestResult');

            const curr = document.getElementById('curNumber');
            const best = document.getElementById('bestNumber');
            curr.innerHTML = '';
            best.innerHTML = '';

            bestResult.classList.add('displayNone');
            currResult.classList.add('displayNone');
        }
    });

    document.getElementById('cook').addEventListener('click', async function() {
       userName = await server.getName();
       if(userName) {
           alert(`${userName}, C Наступающим !!!`);
       }
    })

    function hide(id) {
        document.getElementById(id).style.display = 'none';
    };
    
    function show(id) {
        document.getElementById(id).style.display = 'block';
    };
}