export async function fauxios(url, customCfg = {}) {
  const cfg = {
    method: customCfg.body ? 'POST' : 'GET',
    ...customCfg,
    headers: {
      'content-type': 'application/json',
      ...customCfg.headers,
    },
  };

  if (customCfg.body) {
    if (cfg.headers['content-type'] === 'application/json') {
      cfg.body = JSON.stringify(customCfg.body);
    }
  }

  const res = await window.fetch(url, cfg);
  const data = await res.json();

  const headers = [...res.headers.entries()].reduce((p, c) => {
    p[c[0]] = c[1];

    return p;
  }, {});

  const customRes = {
    data,
    status: res.status,
    statusText: res.statusText,
    headers,
  };

  if (res.ok) {
    return customRes;
  }

  throw new Error(customRes);
}
