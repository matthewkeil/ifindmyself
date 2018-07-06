const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    created: {
      // by: dbRef("User"),
      at: { type: mongoose.Schema.Types.Date, default: Date.now() }
    },
    emails: { type: [mongoose.Schema.Types.String], equired: true },
    passwords: { type: [mongoose.Schema.Types.String], required: true },
    tokens: { type: [mongoose.Schema.Types.String], required: true }
    // needs: [dbRef("Need")],
    // wants: [dbRef("Want")]
  },
  { toJSON: { virtuals: true, getters: true } }
);

UserSchema.virtual("email")
  .get(function() {
    // @ts-ignore: 'this' implicitly has type 'any'
    return this.emails[0];
  })
  .set(function(value) {
    // @ts-ignore: 'this' implicitly has type 'any'
    this.emails.unshift(value);
  });

UserSchema.virtual("password")
  .get(function() {
    // @ts-ignore: 'this' implicitly has type 'any'
    return this.passwords[0];
  })
  .set(function(value) {
    // @ts-ignore: 'this' implicitly has type 'any'
    this.passwords.unshift(value);
  });

UserSchema.virtual("token")
  .get(function() {
    // @ts-ignore: 'this' implicitly has type 'any'
    return this.tokens[0];
  })
  .set(function(value) {
    // @ts-ignore: 'this' implicitly has type 'any'
    this.tokens.unshift(value);
  });

console.log(UserSchema.virtuals.password.getters[0].toString());
