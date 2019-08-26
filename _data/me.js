const { createClient } = require('contentful');
const client = createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_ACCESS_TOKEN
});

module.exports = async function() {
  const me = await client.getEntry(process.env.CTF_PERSON_ID);
  return me;
};
