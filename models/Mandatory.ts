import mongoose from 'mongoose';

const GeneralInfoSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
});

const DocumentSchema = new mongoose.Schema({
  label: { type: String, required: true },
  fileUrl: { type: String, default: '#' },
});

const ResultSchema = new mongoose.Schema({
  year: { type: String, required: true },
  registered: { type: Number, required: true },
  passed: { type: Number, required: true },
  percentage: { type: String, required: true },
  remarks: { type: String, default: 'Nil' },
});

const MandatorySchema = new mongoose.Schema({
  // A: General Information
  generalInfo: {
    type: [GeneralInfoSchema],
    default: [
      { label: "NAME OF THE SCHOOL", value: "AGRASEN PUBLIC SCHOOL" },
      { label: "AFFILIATION NO.", value: "531056" },
      { label: "SCHOOL CODE", value: "41078" },
      { label: "COMPLETE ADDRESS WITH PIN CODE", value: "3.5Km. PUNHANA ROAD, HODAL, PALWAL, HARYANA, 121106" },
      { label: "PRINCIPAL NAME & QUALIFICATION", value: "DEEPIKA CHOUDHARY" },
      { label: "SCHOOL EMAIL ID", value: "apshodal@gmail.com" },
      { label: "CONTACT DETAILS", value: "08684946946" },
    ]
  },

  // B: Documents & Information
  documents: {
    type: [DocumentSchema],
    default: [
      { label: "COPIES OF AFFILIATION/UPGRADATION LETTER AND RECENT EXTENSION OF AFFILIATION, IF ANY", fileUrl: "#" },
      { label: "COPIES OF SOCIETIES/TRUST/COMPANY REGISTRATION/RENEWAL CERTIFICATE, AS APPLICABLE", fileUrl: "#" },
      { label: "COPY OF NO OBJECTION CERTIFICATE (NOC) ISSUED, IF APPLICABLE, BY THE STATE GOVT./UT", fileUrl: "#" },
      { label: "COPIES OF RECOGNITION CERTIFICATE UNDER RTE ACT, 2009, AND IT'S RENEWAL IF APPLICABLE", fileUrl: "#" },
      { label: "COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER THE NATIONAL BUILDING CODE", fileUrl: "#" },
      { label: "COPY OF VALID FIRE SAFETY CERTIFICATE ISSUED BY THE COMPETENT AUTHORITY", fileUrl: "#" },
      { label: "COPY OF THE DEO CERTIFICATE SUBMITTED BY THE SCHOOL FOR AFFILIATION/UPGRADATION/EXTENSION OF AFFILIATION OR SELF CERTIFICATION BY SCHOOL", fileUrl: "#" },
      { label: "COPIES OF VALID WATER, HEALTH AND SANITATION CERTIFICATES", fileUrl: "#" },
    ]
  },

  // C: Academics Documents (Name + Link)
  academicsDocs: {
    type: [{
      name: { type: String, required: true },
      link: { type: String, default: '#' }
    }],
    default: [
      { name: "FEE STRUCTURE OF THE SCHOOL", link: "#" },
      { name: "ANNUAL ACADEMIC CALANDER", link: "#" },
      { name: "LIST OF SCHOOL MANAGEMENT COMMITTEE (SMC)", link: "#" },
      { name: "LIST OF PARENTS TEACHERS ASSOCIATION (PTA) MEMBERS", link: "#" },
      { name: "LAST THREE-YEAR RESULT OF THE BOARD EXAMINATION AS PER APPLICABLILITY", link: "#" }
    ]
  },

  // Class X Results
  classXResults: {
    type: [ResultSchema],
    default: [
      { year: "2017", registered: 31, passed: 31, percentage: "100", remarks: "Nil" },
      { year: "2018", registered: 51, passed: 37, percentage: "72.55", remarks: "Nil" },
      { year: "2019", registered: 52, passed: 46, percentage: "88.46", remarks: "Nil" },
      { year: "2020", registered: 62, passed: 61, percentage: "98.39", remarks: "Nil" },
      { year: "2021", registered: 71, passed: 71, percentage: "100", remarks: "Nil" },
    ]
  },
  classXTitle: { type: String, default: 'RESULT CLASS: X' },
  classXYears: { type: String, default: '5 Years' },

  // Class XII Results
  classXIIResults: {
    type: [ResultSchema],
    default: [
      { year: "2017", registered: 19, passed: 12, percentage: "63.16", remarks: "NA" },
      { year: "2018", registered: 24, passed: 18, percentage: "75", remarks: "NA" },
      { year: "2019", registered: 16, passed: 12, percentage: "75", remarks: "NA" },
      { year: "2020", registered: 38, passed: 38, percentage: "100", remarks: "NA" },
    ]
  },
  classXIITitle: { type: String, default: 'RESULT CLASS: XII' },
  classXIIYears: { type: String, default: '4 Years' },

  // D: Staff
  staffData: {
    type: {
      principal: { type: Number, default: 1 },
      totalTeachers: { type: Number, default: 40 },
      pgtTeachers: { type: Number, default: 12 },
      tgtTeachers: { type: Number, default: 11 },
      prtTeachers: { type: Number, default: 15 },
      specialEducator: { type: Number, default: 1 },
      counsellor: { type: Number, default: 1 },
      teacherRatio: { type: String, default: '1.5' },
    },
    default: {
      principal: 1,
      totalTeachers: 40,
      pgtTeachers: 12,
      tgtTeachers: 11,
      prtTeachers: 15,
      specialEducator: 1,
      counsellor: 1,
      teacherRatio: '1.5',
    }
  },

  // E: Infrastructure
  infrastructureData: {
    type: {
      campusArea: { type: String, default: '8603 Sq.mts.' },
      classrooms: { type: String, default: '45 Classrooms with 46.5 Sq.mts. each' },
      physicsLab: { type: String, default: '71 Sq.mts.' },
      chemistryLab: { type: String, default: '93 Sq.mts.' },
      biologyLab: { type: String, default: '47 Sq.mts.' },
      computerLab: { type: String, default: '101 Sq.mts.' },
      mathsLab: { type: String, default: '47 Sq.mts.' },
      internet: { type: String, default: 'Yes' },
      girlsToilets: { type: String, default: '12' },
      boysToilets: { type: String, default: '12' },
      inspectionVideo: { type: String, default: 'https://youtu.be/5VVvEBqgqFc' },
    },
    default: {
      campusArea: '8603 Sq.mts.',
      classrooms: '45 Classrooms with 46.5 Sq.mts. each',
      physicsLab: '71 Sq.mts.',
      chemistryLab: '93 Sq.mts.',
      biologyLab: '47 Sq.mts.',
      computerLab: '101 Sq.mts.',
      mathsLab: '47 Sq.mts.',
      internet: 'Yes',
      girlsToilets: '12',
      boysToilets: '12',
      inspectionVideo: 'https://youtu.be/5VVvEBqgqFc',
    }
  },

  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Mandatory || mongoose.model('Mandatory', MandatorySchema);