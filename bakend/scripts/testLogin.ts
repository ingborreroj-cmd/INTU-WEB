import fetch from 'node-fetch';

const API = 'http://localhost:4000';

async function main() {
  const res = await fetch(`${API}/admin/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@example.com', password: 'admin' }),
  });
  console.log('Status:', res.status);
  console.log('Headers:', Object.fromEntries(res.headers.entries()));
  const body = await res.text();
  console.log('Body:', body);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
