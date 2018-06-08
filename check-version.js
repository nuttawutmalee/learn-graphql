var semver = require('semver');
var engines = require('./package.json').engines;
var version = engines.node;

if (!semver.satisfies(process.version, version)) {
  console.log(
    '\x1b[31m%s\x1b[0m %s',
    '\u2718',
    'Required node version ' + version + ' not satisfied with current node version ' + process.version + '\n'
  );
  process.exit(1);
}

console.log(
  '\x1b[32m%s\x1b[0m %s',
  '\u2713',
  'Current node version ' + process.version + ' satisfied the required node version ' + version + '\n'
);
