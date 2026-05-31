const API = 'http://localhost:4000';

(async () => {
  try {
    const res = await fetch(`${API}/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'admin' }),
    });
    console.log('Status:', res.status);
    console.log('Headers:', Object.fromEntries(res.headers.entries()));
    const body = await res.text();
    console.log('Body:', body);
  } catch (error) {
    console.error('Fetch error:', error);
    process.exit(1);
  }
})();
