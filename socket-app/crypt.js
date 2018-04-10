//The crypto module provides cryptographic functionality that includes 
//a set of wrappers for OpenSSL's hash, HMAC, cipher, 
//decipher, sign, and verify functions.
var crypto = require('crypto');

//Node Js ---> Crypto Graphy
//https://nodejs.org/api/crypto.html

var secret = 'abcdef';
var hash =  crypto.createHmac('sha256', secret)
                    .update('I love bujibaby')
                    .digest('hex');

// console.log(hash);

var encrypt = crypto.createCipher('aes192','Mohe1991*');
console.log(encrypt);

let encrypted = '';
encrypt.on('readable', () => {
  const data = encrypt.read();
  if (data)
    encrypted = data.toString('hex');
    console.log(encrypted);
});
encrypt.on('end', () => {
  console.log(encrypted);
  // Prints: ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504
});
// encrypt.on('mohe', () => {
//     console.log(encrypt.read());
//     var str = encrypt.read();
//     encrypt.write('Mohe');
// });
// encrypt.write('some clear text data');
encrypt.end();
// encrypt.mohe();