const config = {
  local: {
    DB: {
      HOST: "localhost",
      PORT: "27017",
      DATABASE: "valasys",
      MONGOOSE: {
        useUnifinedTopology: true,
        useNewUrlParser: true,
      },
      UserName: "",
      Password: "",
    },
    PORTNO: 5000,
  },

  staging: {},
};
export const get = function get(env) {
  return config[env];
};
