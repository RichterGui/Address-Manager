import assert from 'node:assert';



export default async function validateUserParams (email, password) {
  try {
    const minPasswordLength = 8;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  assert.strictEqual(typeof email, 'string', 'Invalid type on property "email".')
  assert.strictEqual(typeof password, 'string', 'Invalid type on property "password".')
  assert.strictEqual(password.length >= minPasswordLength, true, 'Invalid password length.')
  assert.strictEqual(emailRegex.test(email), true, 'Invalid email')
  } catch (error) {
    throw Error(`Request body does not meet endpoint expectations on the attribute: ${error.message}`)
  }
}

