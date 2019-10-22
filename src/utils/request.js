import fetch from 'dva/fetch';

function checkStatus(Response) {
  if (Response.status >= 200 && Response.status < 300) {
    return Response;
  }

  const error = new Error(Response.statusText);
  error.Response = Response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  const Response = await fetch(url, options);

  try{
    checkStatus(Response);
  }catch(e){
    console.warn(e);
    return {response: {}};
  }

  const response = await Response.json();

  const ret = {
    response,
    headers: {},
  };

  console.log('发送网络请求:',url)
  if (Response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = Response.headers.get('x-total-count');
  }

  return ret;
}