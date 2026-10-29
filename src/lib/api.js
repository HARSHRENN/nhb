let token = sessionStorage.getItem('nhb-admin-key') || '';
export function setAdminToken(value) {
  token = value;
  if (value) sessionStorage.setItem('nhb-admin-key', value);else sessionStorage.removeItem('nhb-admin-key');
}
export async function api(path, options = {}) {
  const headers = {
    ...(options.body instanceof FormData ? {} : {
      'Content-Type': 'application/json'
    }),
    ...(token ? {
      Authorization: `Bearer ${token}`
    } : {}),
    ...options.headers
  };
  const response = await fetch(`/api${path}`, {
    ...options,
    headers
  });
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('The website server is unavailable. Please try again.');
  }
  if (!response.ok) throw new Error(data.error || 'Could not save your changes.');
  return data;
}
