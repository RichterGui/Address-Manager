import assert from 'node:assert';



export default async function validateUserParams (name, lastname, email, password) {
  try {
    const minPasswordLength = 8;

  assert.strictEqual(typeof name, 'string', 'Invalid type on property "name".')
  assert.strictEqual(typeof lastname, 'string', 'Invalid type on property "lastname".')
  assert.strictEqual(typeof email, 'string', 'Invalid type on property "email".')
  assert.strictEqual(typeof password, 'string', 'Invalid type on property "password".')
  assert.strictEqual(password.length >= minPasswordLength, true, 'Invalid password length.')
  } catch (error) {
    throw Error(`Request body does not meet endpoint expectations on the attribute: ${error.message}`)
  }
}

