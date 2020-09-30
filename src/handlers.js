const {request} = require('./request');
const {getTokenOption, getUserInfoOption} = require('./option');

const login = (req, res) => {
  const {CLIENT_ID, SCOPE, REDIRECT_URI} = req.app.locals;
  console.log(CLIENT_ID, SCOPE, REDIRECT_URI);
  const query = `client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=code`;
  const url = `https://accounts.google.com/o/oauth2/v2/auth?${query}`;
  res.redirect(url);
};

const getUserData = (req, res) => {
  const {code} = req.query;
  const {users, db} = req.app.locals;
  const tokenOptions = getTokenOption(code, req.app.locals);
  request(tokenOptions)
    .then(({access_token}) => {
      request(getUserInfoOption(access_token)).then((userInfo) => {
        if (users.every((user) => user.sub !== userInfo.sub)) {
          users.push(userInfo);
        }
        req.session.name = userInfo.name;
        req.session.picture = userInfo.picture;
        db.set('users', users).then(() => res.redirect('/'));
      });
    })
    .catch((err) => console.log(err));
};

const attachDetails = (req, res, next) => {
  const db = req.app.locals.db;
  db.get('users')
    .then((users) => {
      req.app.locals.users = users || [];
    })
    .then(() =>
      db
        .get('topics')
        .then((topics) => {
          req.app.locals.topics = topics || [];
        })
        .then(next)
    );
};

const getUser = (req, res) => {
  if (req.session.isNew) {
    return res.json({user: null});
  }
  res.json({user: {name: req.session.name, picture: req.session.picture}});
};

const logout = (req, res) => {
  req.session = null;
  res.json({loggedOut: true});
};

const getTopics = (req, res) => {
  req.app.locals.db.get('topics').then((topics) => res.json({topics}));
};

const getContent = (req, res) => {
  const {id} = req.body;
  const topic = req.app.locals.topics.find((topic) => topic.id === +id);
  const content = topic ? topic.content : 'No content Found';
  res.json({content});
};

const setContent = (req, res) => {
  const {id, content} = req.body;
  const {db, topics} = req.app.locals;
  console.log(content);
  const topic = topics.find((topic) => topic.id === +id);
  topic.content = content;
  db.set('topics', topics).then(() => res.json({status: 'added'}));
};

const addTitle = (req, res) => {
  const {title} = req.body;
  const {topics, db} = req.app.locals;
  db.getId('titleId').then((id) => {
    topics.push({
      title,
      content: {
        time: 1550476186479,
        blocks: [
          {
            type: 'paragraph',
            data: {
              text: 'Add details...',
            },
          },
        ],
        version: '2.8.1',
      },
      id,
    });
    db.set('topics', topics).then(() => res.json({status: 'added'}));
  });
};

module.exports = {
  getUserData,
  logout,
  getUser,
  attachDetails,
  getTopics,
  getContent,
  addTitle,
  login,
  setContent,
};
