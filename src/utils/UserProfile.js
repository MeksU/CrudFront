const UserProfile = (function () {
  let userId = localStorage.getItem("userId") || -1;

  const getUserId = function () {
    return userId;
  };

  const setUserId = function (id) {
    if (id === null || id === -1) {
      localStorage.removeItem("userId");
      userId = -1;
    } else {
      localStorage.setItem("userId", id);
      userId = id;
    }
  };

  return {
    getUserId: getUserId,
    setUserId: setUserId,
  };
})();

export default UserProfile;
