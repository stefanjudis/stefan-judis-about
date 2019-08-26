const { createClient } = require('contentful');
const client = createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_ACCESS_TOKEN
});

module.exports = async function() {
  const { items: events } = await client.getEntries({
    content_type: process.env.CTF_EVENT_ID,
    limit: 1000
  });

  return events.filter(event => !!event.fields.slug);
};
