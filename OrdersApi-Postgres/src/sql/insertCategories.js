const db = require('./_database');

const addCategory = async () => {
  const insertQuery = `
        INSERT INTO categories
               (name, description)
        VALUES ('FPS Games', 'Games free to play'),
               ('MMO Games', 'MMORPG p2p'),
               ('Xiaomi', 'SmartPhones Xiaomi'),
               ('Books', 'All books');
               `;
  await db.execute(insertQuery);
  console.log('All categories created sucellfully');
};
addCategory();
