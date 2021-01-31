export const OT_TIME = 15 * 60 * 1000;
export const ROUND1_VIDEO = 40 * 60 * 1000;
export const ROUND1_INVEST = 5 * 60 * 1000;
export const ROUND2_VIDEO = 45 * 60 * 1000;
export const ROUND2_INVEST = 5 * 60 * 1000;
export const ROUND3_VIDEO = 25 * 60 * 1000;
export const ROUND3_INVEST = 5 * 60 * 1000;
export const FINAL_VIDEO = 20 * 60 * 1000;
export const FINAL_INVEST = 10 * 60 * 1000;
export const FINAL_REDIRECTION = 5 * 60 * 1000;
const YEAR = 2021;
const MONTH = 2;
const DATE = 1;
const HOUR = 13;
const MIN = 0;
const SEC = 0;

export const START_TIME = 1000*(1612105200+(DATE-1)*86400+HOUR*3600+MIN*60);
export const ACC_ROUND1_VIDEO_OFFSET = OT_TIME + ROUND1_VIDEO;
export const ACC_ROUND1_INVEST_OFFSET = ACC_ROUND1_VIDEO_OFFSET + ROUND1_INVEST;
export const ACC_ROUND2_VIDEO_OFFSET = ACC_ROUND1_INVEST_OFFSET + ROUND2_VIDEO;
export const ACC_ROUND2_INVEST_OFFSET = ACC_ROUND2_VIDEO_OFFSET + ROUND2_INVEST;
export const ACC_ROUND3_VIDEO_OFFSET = ACC_ROUND2_INVEST_OFFSET + ROUND3_VIDEO;
export const ACC_ROUND3_INVEST_OFFSET = ACC_ROUND3_VIDEO_OFFSET + ROUND3_INVEST;
export const ACC_FINAL_VIDEO_OFFSET = ACC_ROUND3_INVEST_OFFSET + FINAL_VIDEO;
export const ACC_FINAL_INVEST_OFFSET = ACC_FINAL_VIDEO_OFFSET + FINAL_INVEST;
export const ACC_FINAL_REDIRECTION_OFFSET = ACC_FINAL_INVEST_OFFSET + FINAL_REDIRECTION;