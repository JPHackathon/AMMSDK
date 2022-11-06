export const GameSchema = {
  type: "object",
  required: ["signer", "name", "description", "symbol", "url", "endpoint"],
  properties: {
    signer: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    symbol: { type: "string" },
    url: { type: "string" },
    endpoint: { type: "string" },
  },
};

export const PairSchema = {
  type: "object",
  required: ["address0", "address1", "amount0", "amount1"],
  properties: {
    address0: { type: "string" },
    address1: { type: "string" },
    amount0: { type: "number" },
    amount1: { type: "number" },
  },
};

export const UserMappingSchema = {
  type: "object",
  required: ["game_address", "user_address", "game_user_id"],
  properties: {
    game_address: { type: "string" },
    user_address: { type: "string" },
    game_user_id: { type: "string" },
  },
};
