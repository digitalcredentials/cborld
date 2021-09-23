mkdir ./dist/esm
cat >dist/esm/index.js <<!EOF
import cjsModule from '../index.js';
export const decode = cjsModule.decode;
export const encode = cjsModule.encode;
!EOF

cat >dist/esm/package.json <<!EOF
{
  "type": "module"
}
!EOF
