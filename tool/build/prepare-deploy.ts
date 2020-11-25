#!./node_modules/.bin/ts-node

import fs from 'fs-extra';
import path from 'path';
import shelljs from 'shelljs';

shelljs.cp('package.json', path.join('dist', 'package.json'));
shelljs.cp('-R', path.join('src', 'data'), path.join('dist', 'data'));
shelljs.cp('-R', path.join('src', 'schema'), path.join('dist', 'schema'));
shelljs.cp('-R', path.join('src', 'types'), path.join('dist', 'types'));
fs.writeFileSync(path.join('dist', 'CNAME'), 'databank.retinue.app');
