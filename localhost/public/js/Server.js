class Server {
    token = null;

    async send(method, data) {
        const arr = [];
        for (let key in data) {
            arr.push(`${key}=${data[key]}`);
        }
        if (this.token) {
            arr.push(`&token=${this.token}`);
        }
        const response = await fetch(`api/?method=${method}&${arr.join('&')}`);
        const answer = await response.json();
        if (answer && answer.result === 'ok') {
            
            return answer.data;
        } else if(answer && answer.result === 'error') {
            
            return false;
        }
    }

    async auth(login, password) {
        const data = await this.send('login', { login, password });
        if (data && data.token) {
            this.token = data.token;
        }
        return data;
    }

    logout(){
        return this.send('logout');
    }

    registration(login, password) {
        return this.send('registration', { login, password });
    }

    getName() {
        return this.send('getName');       
    }

    getBestScore() {
        return this.send('getBestScore');
    }

    setBestScore(score) {
        return this.send('setBestScore', {score});
    }

}