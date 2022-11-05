export const GameRules = {
  "allow write": {
    and: [{ "!=": [{ var: "request.auth.signer" }, null] }],
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
    and: [{ "!=": [{ var: "request.auth.signer" }, null] }],
  },
};
