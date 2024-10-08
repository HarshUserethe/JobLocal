const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Schema definition
const userSchema = mongoose.Schema({
  userip: {
    type: String,
    required: true
  },
  fullname: {
  type: String,
  required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  hashpassword: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  phoneVerified: {
    type: Boolean,
    default: false
  },
  verificationCode: {
    type: String,
    default: ''
  },
  sector: {
    type: String,
    required: false
  },
  DOB: {
    type: Date,
    required: false
  },
  permanentAddress: {
    houseNo: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    state: {
      type: String,
      required: false
    },
    pin: {
      type: Number,
      required: false
    },
  },
  currentAddress: {
    houseNo: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    state: {
      type: String,
      required: false
    },
    pin: {
      type: Number,
      required: false
    },
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: false
  },
  jobSector: {
    type: String,
    required: false,
    default: null
   },
  objective: {
    type: String,
    required: false
  },
  education: [{
    degree: {
      type: String,
      required: false
    },
    stream: {
      type: String,
      required: false
    },
    institute: {
      type: String,
      required: false
    },
    year: {
      type: Number,
      required: false
    },
    cgpa: {
      type: Number,
      required: false
    }
  }],
 workExperience: [{
   role: {
     type: String,
     required: false
   },
   company: {
     type: String,
     required: false
   },
   startDate: {
     type: Date,
     required: false
   },
   endDate: {
     type: Date,
     required: false
   },
   about: {
     type: String,
     required: true
   }
 }],
  project: [{
    name: {
      type: String,
      required: false
    },
    start: {
      type: Date,
      required: false
    },
    end: {
      type: Date,
      required: false
    },
    about: {
      type: String,
      required: false
    },
    link: {
      type: String,
      required: false
    }
  }],
  keySkills: {
    type: [String],
    required: false
  },
  // certificates: [{
  //   name: {
  //     type: String,
  //     required: false
  //   },
  //   completion_id: {
  //     type: String,
  //     required: false
  //   },
  //   url: {
  //     type: String,
  //     required: false
  //   },
  //   cert_validity: {
  //     type: Date,
  //     required: false
  //   }
  // }],
  links: {
    github: {
      type: String,
      required: false
    },
    linkedin: {
      type: String,
      required: false
    },
    portfolio: {
      type: String,
      required: false
    },
    other: {
      type: String,
      required: false
    }
  },
  jobType: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Internship', 'Contract'],
    required: false
  },
}, {timestamps: true});


module.exports = mongoose.model("user", userSchema);