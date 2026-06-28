const express = require('express')

const app = express();

// the servers list
const servers = [
    {
        url: "http://localhost:3000/server1",
        health: "http://localhost:3000/health",
        healthy: true
    },
    {
        url: "http://localhost:3001/server2",
        health: "http://localhost:3001/health",
        healthy: true
    },
    {
        url: "http://localhost:3002/server3",
        health: "http://localhost:3002/health",
        healthy: true
    }
];
let currentServer = -1;

// checking the health of the servers
const checkHealth = async () => {
    for (let i = 0; i < servers.length; i++) {
        try {
            const res = await fetch(`${servers[i].health}`, {
                method: 'GET'
            });
            const data = await res.json();
            servers.healthy = data.status === "UP";
        } catch (err) {
            servers.healthy = false;
        }
        console.log(`${servers[i].url}---> ${servers[i].healthy ? "up" : "down"}`)
    }
}

// tis runs the func when server starts
checkHealth();

// and this continues the func for every 5 sec
setInterval(checkHealth,5000);

app.get('/load-balancer', async (req, res) => {
    try {

        // filter onlu healthy servers
        const healthyServers=servers.filter((server)=>server.healthy);

        // if all servers are crashed
        if(healthyServers.length===0){
            return res.status(503).json({
                message:"no servers available"
            })
        }

        // get the server from the healthy server
        currentServer = (currentServer + 1) % healthyServers.length;
        const selectedServer=healthyServers[currentServer];

        console.log(`healthy server, forwarding the req to this -> ${selectedServer.url}`);

        const response=await fetch(selectedServer.url);

        const data=await response.json();
        return res.json({
            server:selectedServer.url,
            data
        })
    } catch (err) {
        console.error("Error:", err);
    }
})

app.listen(8000, () => {
    console.log('server running in on 8000 port');
})