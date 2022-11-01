export const GameRules = {
  "allow write": {
    and: [
      { "!=": [{ var: "request.auth.signer" }, null] },
      {
        "==": [
          { var: "request.auth.signer" },
          { var: "resource.newData.signer" },
        ],
      },
    ],
  },
};

export const PairRules = {
  "allow write": {
    and: [
      { "!=": [{ var: "request.auth.signer" }, null] }, //デモ用なのでがばがば認証をしている。
    ],
  },
};

export const UserMappingRules = {
  "allow write": {
    and: [
      { "!=": [{ var: "request.auth.signer" }, null] },
      {
        "==": [
          { var: "request.auth.signer" },
          { var: "resource.newData.user_address" },
        ],
      },
    ],
  },
};
