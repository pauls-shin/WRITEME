export async function generateReadmeFromGitHub(input) {
  const baseURL = 'http://localhost:3001';
  let endpoint = '';

  if (input.type === 'github') {
    endpoint = `${baseURL}/github?url=${encodeURIComponent(input.value)}`;
  } else if (input.type === 'local') {
    endpoint = `${baseURL}/local?path=${encodeURIComponent(input.value)}`;
  } else {
    throw new Error('Invalid input type');
  }

  try {
    const res = await fetch(endpoint);
    const data = await res.text();
    console.log('Server Response:', data);
    return data;
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
}