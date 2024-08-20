
import crypto from "crypto"

function generateSecretCode(bits = 64) {
  const bytes = bits / 8;
  return crypto.randomBytes(bytes).toString('hex');
}

const secretCode = generateSecretCode(64);
console.log(`Generated 64-bit secret code: ${secretCode}`);