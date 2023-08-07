const attempts = 2;

function sleep(msec = 0): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, msec);
  });
}

export async function retry<T>(fn: () => Promise<T>, attemptsLeft = attempts): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    if (attemptsLeft === 1) {
      throw e;
    }
    await sleep(250);
    return await retry(fn, attemptsLeft - 1);
  }
}
