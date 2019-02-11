const [_, fs, db, log, helpers] = [
  require('lodash'),
  require('fs'),
  require('../storage/query.js'),
  require('./util/logger.js')('fuzex_airdrop'),
  require('./util/helpers.js')
];

const BENEFICIARIES = './file2db/list/fuzex_airdrop.tsv';

async function run() {
  const beneficiaries = fs
    .readFileSync(BENEFICIARIES, 'utf8')
    .split('\n')
    .filter(el => el != '')
    .map(el => {
      const info = el.split('\t');

      return {
        ether_addr: info[0].trim(),
        fxt_amount: 1000
      }

      // const fields = ['email', 'eth_address', 'fxt_amount'];
      // return fields.reduce((obj, key, idx) => {
      // 	obj[key] = info[idx].trim();
      // 	return obj;
      // }, {});
    });

  const dupAddress = helpers.getDuplicates(beneficiaries.map(el => el.eth_address));

  //if (dupAddress.length != 0) {
  if (typeof dupAddress[0] != 'undefined') { //Issue 체크 - 위 코드의 오류 배열의 undefined가 들어감.
    log.err('[WARNING] There are duplicate addresses.');
    log.err(dupAddress);
    return;
  }

  for (const [idx, beneficiary] of beneficiaries.entries()) {
    await db.insertOne('fuzex_airdrop', beneficiary);
    log.info(`[${idx + 1}] ${JSON.stringify(beneficiary)}`);
  }

  db.end();
  log.warn('done');
}

run();