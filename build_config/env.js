const dotenv = require('dotenv')
const fs = require('fs')

const parseEnv = envPath => {
  const parsed = fs.readFileSync(envPath, 'utf8')
  const buf = Buffer.from(parsed)
  const envObj = dotenv.parse(buf)

  return envObj
}

const parseStringifiedEnv = envPath => {
  const stringifiedEnv = Object.entries(parseEnv(envPath))
    .reduce((acc, [key, value]) => ({
      ...acc,
      [`process.env.${key}`]: JSON.stringify(value)
    }), {})

  return stringifiedEnv
}

module.exports = {
  parseStringifiedEnv
}
