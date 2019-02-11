const [_, fs, db, log, helpers] = [
  require('lodash'),
  require('fs'),
  require('../storage/query.js'),
  require('./util/logger.js')('advisorLog'),
  require('./util/helpers.js')
];

const BOUNTY_BENEFICIARIES = './file2db/list/advisors.tsv';
//const BOUNTY_BENEFICIARIES = './file2db/list/bountyBeneficiaries.tsv';

async function run() {
  const beneficiaries = fs
    .readFileSync(BOUNTY_BENEFICIARIES, 'utf8')
    .split('\n')
    .filter(el => el != '')
    .map(el => {
      const info = el.split('\t');

      return {
        email: info[0].trim(),
        eth_addr: info[1].trim(),
        fxt_amount: Number(info[2].trim()),
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
    await db.insertOne('advisors', beneficiary);
    log.info(`[${idx + 1}] ${JSON.stringify(beneficiary)}`);
  }

  db.end();
  log.warn('done');
}

run();