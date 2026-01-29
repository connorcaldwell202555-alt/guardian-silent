const fs = require('fs');
const p = JSON.parse(fs.readFileSync('package.json','utf8'));
p['lint-staged'] = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix","prettier --write"],
  "*.{json,md}": ["prettier --write"]
};
fs.writeFileSync('package.json', JSON.stringify(p, null, 2));
console.log('lint-staged added');
