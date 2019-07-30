const { createClient } = require('contentful');
const client = createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_ACCESS_TOKEN
});

module.exports = async function() {
  const me = await client.getEntry('5JQ715oDQW68k8EiEuKOk8');
  // console.log(me.fields.profilePhoto.fields);
  return me;
};
