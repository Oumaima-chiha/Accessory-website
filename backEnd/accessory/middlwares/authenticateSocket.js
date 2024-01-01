const jwt = require('jsonwebtoken');

const authenticateSocket = (socket, next) => {
    const token = socket.handshake.auth.token; // Assuming token is passed in handshake

    if (!token) {
        console.log('Authentication error: Token not provided')
        return next(new Error('Authentication error: Token not provided'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err)

            return next(new Error('Authentication error: Invalid token'));
        }

        // If authentication is successful, attach user information to the socket
        socket.userId = decoded.id;
        next();
    });
};

module.exports = authenticateSocket;