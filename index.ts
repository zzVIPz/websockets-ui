import { httpServer } from './src/http_server/index';
import { print } from './src/utils/print';

const HTTP_PORT = 8181;

print(`Start static http server on the ${HTTP_PORT} port!`, 'blue');
httpServer.listen(HTTP_PORT);
