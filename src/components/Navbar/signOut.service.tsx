export async function signOut() {
  try {
    const res = await fetch(`/api-next/auth/sign-out`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
}
