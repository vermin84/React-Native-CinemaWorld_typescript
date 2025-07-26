/*module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [ 
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
        allowlist: null,
        blocklist: null,
        safe: false,
        allowUndefined: true
      }
    ],
    ["@babel/plugin-transform-private-methods", { loose: true }],
    'react-native-reanimated/plugin' // ОБЯЗАТЕЛЬНО ПОСЛЕДНИМ
  ],
};
*/
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
        allowlist: null,
        blocklist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    ["@babel/plugin-transform-private-methods", { loose: true }],
    "react-native-reanimated/plugin", // обов’язково останнім
  ],
};
