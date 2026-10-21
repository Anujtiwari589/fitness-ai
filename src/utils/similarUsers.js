function getSimilarUsers(goal, users) {
  if (!goal || !Array.isArray(users)) {
    return [];
  }

  return users.filter((user) => user.goal === goal);
}

export default getSimilarUsers;