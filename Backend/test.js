const libgen = require('libgen');

async function test() {
  try {
    const urlString = await libgen.mirror();
    // console.log(`${urlString} is currently fastest`);

    const options = {
      mirror: urlString,
      query: 'cats',
      count: 5,
      sort_by: 'year',
      reverse: true
    };

    const data = await libgen.search(options);
    console.log(data)
    
    let n = data.length;
    console.log(`${n} results for "${options.query}"`);
    while (n--) {
      console.log('');
      console.log('Title: ' + data[n].title);
      console.log('Author: ' + data[n].author);
      console.log('Download: ' +
                  'http://gen.lib.rus.ec/book/index.php?md5=' +
                  data[n].md5.toLowerCase());
    }
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

test();
