const packageJson = require('#root/package.json');

const getAppName = () => {
    const name = packageJson.name;
    const dockerId = process.env.HOSTNAME || 'local';
    return `${name}:${dockerId}`;
}

module.exports = { getAppName };