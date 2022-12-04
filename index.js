const { Octokit } = require("@octokit/core");
require("dotenv/config");
const fs = require("fs");
const _ = require("lodash");
const contribuitors = require("./uniqueContributors.json");

console.log(process.env.TOKEN);
const octokit = new Octokit({
  auth: process.env.TOKEN,
});

const main = async () => {
  const hashMap = {};

  for (let i = 0; i < contribuitors.length; i++) {
    hashMap[contribuitors[i].login] = [];
  }

  const usersFollowersPromisse = contribuitors.map(
    async (contributor) => {
      const { login } = contributor;

      let page = 1;
      while (true) {
        try {
          const { data: followers } = await octokit.request(
            "GET /users/{username}/followers",
            {
              username: login,
              per_page: 100,
              page,
            }
          );
          console.log(`Fetching followers from ${login} page ${page}`);
          const followersLogin = followers
            .filter((follower) => hashMap[follower.login])
            .map((follower) => follower.login);
          hashMap[contributor.login].push(...followersLogin);
          if (followers.length !== 100) break;
        } catch (error) {
          console.log(error.message);
        }
        if(page > 10) break;
        page++;
      }
    }
  );

  // chunks of 415 promisses

  await Promise.all(usersFollowersPromisse);

  fs.writeFile("listOfFollowers.json", JSON.stringify(hashMap), (err) => {});
};

main();
