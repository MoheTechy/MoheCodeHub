var dns = require('dns');

//https://nodejs.org/api/dns.html
//NodeJS ---> DNS Services

dns.lookup('sit.anybank.co.in',(err, address, family) => {
    // if err throw console.log(err);
    if(err){
        console.log(err);
    }
    console.log('address: %j  family: IPv%s', address, family);
});

dns.resolve4('sit.anybank.co.in', (err, addresses) => {
    if (err) throw err;
  
    console.log(`addresses: ${JSON.stringify(addresses)}`);
  
    addresses.forEach((a) => {
      dns.reverse(a, (err, hostnames) => {
        if (err) {
          throw err;
        }
        console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);
      });
    });
  });