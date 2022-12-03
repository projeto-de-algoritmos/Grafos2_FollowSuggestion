const { Octokit } = require("@octokit/core");
const axios = require("axios");
const fs = require("fs");
const _ = require("lodash");
const contribuitors = require("./uniqueContributors.json");

const octokit = new Octokit({
  auth: process.env.TOKEN
});

const main = async () => {
  // const usersFollowersPromisse = usersInfo.map(async (user) => {
  //   const { data : followers } = await octokit.request('GET /users/{username}/followers{?per_page,page}', {
  //     username: user.login
  //   })
  //   console.log(followers)
  //   return {
  //     userInfo: user,
  //     followers
  //   }
  // })

  // const usersFollowers = await Promise.all(usersFollowersPromisse)

  // console.log(usersFollowers)
};

main();
